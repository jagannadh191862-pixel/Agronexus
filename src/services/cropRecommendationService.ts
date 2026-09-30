import { CROPS_DATA } from '../data/crops';
import { CropData, CropRecommendation, CropScoreBreakdown, SeasonType, SoilType, WaterAvailability } from '../types';

export interface CropScoringWeights {
  locationWeight: number; // 20
  soilWeight: number; // 20
  tempWeight: number; // 15
  rainfallWeight: number; // 15
  phWeight: number; // 10
  waterWeight: number; // 10
  seasonWeight: number; // 10
}

export const DEFAULT_WEIGHTS: CropScoringWeights = {
  locationWeight: 20,
  soilWeight: 20,
  tempWeight: 15,
  rainfallWeight: 15,
  phWeight: 10,
  waterWeight: 10,
  seasonWeight: 10
};

export class CropRecommendationService {
  private weights: CropScoringWeights;

  constructor(weights: CropScoringWeights = DEFAULT_WEIGHTS) {
    this.weights = weights;
  }

  public calculateLocationScore(crop: CropData, state: string): number {
    if (!state) return this.weights.locationWeight * 0.7; // default moderate prior
    if (crop.suitableStates.some(s => s.toLowerCase() === state.toLowerCase())) {
      return this.weights.locationWeight;
    }
    return this.weights.locationWeight * 0.35;
  }

  public calculateSoilScore(crop: CropData, soil: SoilType): number {
    if (!soil) return this.weights.soilWeight * 0.7;
    if (crop.soil.includes(soil)) {
      return this.weights.soilWeight;
    }
    // Partial affinity
    const isLoamy = soil === 'Loamy' || crop.soil.includes('Loamy');
    if (isLoamy) return this.weights.soilWeight * 0.65;
    return this.weights.soilWeight * 0.25;
  }

  public calculateTemperatureScore(crop: CropData, temp: number): number {
    if (temp === undefined || isNaN(temp)) return this.weights.tempWeight * 0.7;
    // Inside optimal window
    if (temp >= crop.temperature.optimalMin && temp <= crop.temperature.optimalMax) {
      return this.weights.tempWeight;
    }
    // Inside absolute tolerance
    if (temp >= crop.temperature.min && temp <= crop.temperature.max) {
      const dist = Math.min(
        Math.abs(temp - crop.temperature.optimalMin),
        Math.abs(temp - crop.temperature.optimalMax)
      );
      const span = Math.max(1, crop.temperature.optimalMin - crop.temperature.min);
      const factor = Math.max(0.4, 1 - (dist / (span * 2)));
      return +(this.weights.tempWeight * factor).toFixed(1);
    }
    return Math.max(0, +(this.weights.tempWeight * 0.1).toFixed(1));
  }

  public calculateRainfallScore(crop: CropData, rainfall: number): number {
    if (rainfall === undefined || isNaN(rainfall)) return this.weights.rainfallWeight * 0.7;
    if (rainfall >= crop.rainfall.optimalMin && rainfall <= crop.rainfall.optimalMax) {
      return this.weights.rainfallWeight;
    }
    if (rainfall >= crop.rainfall.min && rainfall <= crop.rainfall.max) {
      const dist = Math.min(
        Math.abs(rainfall - crop.rainfall.optimalMin),
        Math.abs(rainfall - crop.rainfall.optimalMax)
      );
      const span = Math.max(100, crop.rainfall.optimalMin - crop.rainfall.min);
      const factor = Math.max(0.4, 1 - (dist / (span * 2)));
      return +(this.weights.rainfallWeight * factor).toFixed(1);
    }
    return Math.max(0, +(this.weights.rainfallWeight * 0.15).toFixed(1));
  }

  public calculatePHScore(crop: CropData, ph: number): number {
    if (ph === undefined || isNaN(ph)) return this.weights.phWeight * 0.7;
    if (Math.abs(ph - crop.ph.optimal) <= 0.3) {
      return this.weights.phWeight;
    }
    if (ph >= crop.ph.min && ph <= crop.ph.max) {
      const factor = 1 - (Math.abs(ph - crop.ph.optimal) / (crop.ph.max - crop.ph.min));
      return +(this.weights.phWeight * Math.max(0.4, factor)).toFixed(1);
    }
    return Math.max(0, +(this.weights.phWeight * 0.1).toFixed(1));
  }

  public calculateWaterScore(crop: CropData, water: WaterAvailability): number {
    if (!water) return this.weights.waterWeight * 0.7;
    if (water === 'High' || water === 'Irrigated Canal' || water === 'Borewell') {
      if (crop.waterRequirement === 'High' || crop.waterRequirement === 'Very High' || crop.waterRequirement === 'Moderate') {
        return this.weights.waterWeight;
      }
      return this.weights.waterWeight * 0.85; // Low water crops can handle good water with drainage
    }
    if (water === 'Moderate') {
      if (crop.waterRequirement === 'Moderate' || crop.waterRequirement === 'Low') {
        return this.weights.waterWeight;
      }
      return this.weights.waterWeight * 0.45; // High water crops struggle
    }
    // Low water
    if (crop.waterRequirement === 'Low') {
      return this.weights.waterWeight;
    }
    if (crop.waterRequirement === 'Moderate') {
      return this.weights.waterWeight * 0.5;
    }
    return this.weights.waterWeight * 0.15; // Very high water crops fail
  }

  public calculateSeasonScore(crop: CropData, season: SeasonType): number {
    if (!season) return this.weights.seasonWeight * 0.7;
    if (crop.seasons.includes(season) || crop.seasons.includes('Whole Year')) {
      return this.weights.seasonWeight;
    }
    return this.weights.seasonWeight * 0.2;
  }

  public recommendCrops(params: {
    state: string;
    district: string;
    soil: SoilType;
    ph: number;
    temperature: number;
    rainfall: number;
    waterAvailability: WaterAvailability;
    season: SeasonType;
  }): CropRecommendation[] {
    const results: CropRecommendation[] = [];

    for (const crop of CROPS_DATA) {
      const locationScore = this.calculateLocationScore(crop, params.state);
      const soilScore = this.calculateSoilScore(crop, params.soil);
      const temperatureScore = this.calculateTemperatureScore(crop, params.temperature);
      const rainfallScore = this.calculateRainfallScore(crop, params.rainfall);
      const phScore = this.calculatePHScore(crop, params.ph);
      const waterScore = this.calculateWaterScore(crop, params.waterAvailability);
      const seasonScore = this.calculateSeasonScore(crop, params.season);

      const totalScore = Math.min(100, Math.round(
        locationScore + soilScore + temperatureScore + rainfallScore + phScore + waterScore + seasonScore
      ));

      const breakdown: CropScoreBreakdown = {
        locationScore,
        soilScore,
        temperatureScore,
        rainfallScore,
        phScore,
        waterScore,
        seasonScore
      };

      const reasons: string[] = [];
      const warnings: string[] = [];

      if (soilScore >= this.weights.soilWeight * 0.8) {
        reasons.push(`✓ Excellent compatibility with ${params.soil} soil`);
      } else {
        warnings.push(`⚠ Soil ${params.soil} is sub-optimal (prefers ${crop.soil.join(', ')})`);
      }

      if (temperatureScore >= this.weights.tempWeight * 0.8) {
        reasons.push(`✓ Temperature ${params.temperature}°C falls within optimal window (${crop.temperature.optimalMin}-${crop.temperature.optimalMax}°C)`);
      } else if (params.temperature > crop.temperature.max) {
        warnings.push(`⚠ Temperature ${params.temperature}°C exceeds maximum threshold (${crop.temperature.max}°C)`);
      } else if (params.temperature < crop.temperature.min) {
        warnings.push(`⚠ Temperature ${params.temperature}°C is below minimum biological threshold (${crop.temperature.min}°C)`);
      }

      if (rainfallScore >= this.weights.rainfallWeight * 0.8) {
        reasons.push(`✓ Rainfall ${params.rainfall} mm matches hydrologic requirement`);
      } else if (params.rainfall < crop.rainfall.min) {
        warnings.push(`⚠ Rainfall ${params.rainfall} mm is deficient for optimal yield (minimum ${crop.rainfall.min} mm required)`);
      }

      if (phScore >= this.weights.phWeight * 0.8) {
        reasons.push(`✓ Soil pH ${params.ph} is within preferred range (${crop.ph.min}-${crop.ph.max})`);
      } else {
        warnings.push(`⚠ Soil pH ${params.ph} lies outside optimal band (${crop.ph.min}-${crop.ph.max})`);
      }

      if (locationScore >= this.weights.locationWeight * 0.8) {
        reasons.push(`✓ Proven agro-climatic performance in ${params.state}`);
      }

      let suitabilityLevel: CropRecommendation['suitabilityLevel'] = 'Marginal';
      if (totalScore >= 85) {
        suitabilityLevel = 'Most Suitable';
      } else if (totalScore >= 72) {
        suitabilityLevel = 'High Suitability';
      } else if (totalScore >= 55) {
        suitabilityLevel = 'Moderate Suitability';
      }

      results.push({
        crop,
        totalScore,
        suitabilityLevel,
        reasons,
        warnings,
        scoreBreakdown: breakdown
      });
    }

    return results.sort((a, b) => b.totalScore - a.totalScore);
  }
}

export const cropRecommendationService = new CropRecommendationService();

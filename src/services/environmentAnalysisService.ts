import { getCropById } from '../data/crops';
import { EnvironmentAnalysisResult, SeasonType, SoilType, WaterAvailability } from '../types';

export class EnvironmentAnalysisService {
  public analyze(params: {
    state: string;
    district: string;
    cropName: string;
    soil: SoilType;
    temperature: number;
    humidity: number;
    rainfall: number;
    soilPh: number;
    waterAvailability: WaterAvailability;
    season: SeasonType;
  }): EnvironmentAnalysisResult {
    const crop = getCropById(params.cropName);
    const warnings: string[] = [];
    const factors: EnvironmentAnalysisResult['factors'] = [];

    if (!crop) {
      return {
        crop: params.cropName || 'Unknown Crop',
        overallScore: 50,
        status: 'MODERATE',
        factors: [],
        warnings: ['Selected crop is not recognized in agronomic database.'],
        explanation: 'Please select a valid crop from the catalog to run comprehensive environmental analysis.'
      };
    }

    // 1. Temperature Check
    let tempScore = 100;
    let tempStatus = '✓ Suitable';
    let tempWarning: string | undefined;

    if (params.temperature >= crop.temperature.optimalMin && params.temperature <= crop.temperature.optimalMax) {
      tempScore = 100;
      tempStatus = '✓ Optimal Range';
    } else if (params.temperature >= crop.temperature.min && params.temperature <= crop.temperature.max) {
      tempScore = 75;
      tempStatus = '△ Tolerable Range';
      tempWarning = `Temperature ${params.temperature}°C deviates slightly from optimal (${crop.temperature.optimalMin}-${crop.temperature.optimalMax}°C).`;
    } else if (params.temperature > crop.temperature.max) {
      tempScore = Math.max(10, 100 - (params.temperature - crop.temperature.max) * 12);
      tempStatus = '⚠ Heat Stress Alert';
      tempWarning = `Temperature ${params.temperature}°C is dangerously above the upper tolerance limit (${crop.temperature.max}°C) for ${crop.name}, causing pollen sterility or thermal scorch.`;
      warnings.push(tempWarning);
    } else {
      tempScore = Math.max(10, 100 - (crop.temperature.min - params.temperature) * 12);
      tempStatus = '⚠ Cold Injury Alert';
      tempWarning = `Temperature ${params.temperature}°C is below the minimal growth threshold (${crop.temperature.min}°C), suppressing metabolic rate.`;
      warnings.push(tempWarning);
    }

    factors.push({
      name: 'Temperature',
      inputValue: `${params.temperature}°C`,
      optimalRange: `${crop.temperature.optimalMin} - ${crop.temperature.optimalMax}°C`,
      score: Math.round(tempScore),
      isSuitable: tempScore >= 60,
      statusText: tempStatus,
      warning: tempWarning
    });

    // 2. Humidity Check
    let humScore = 90;
    let humStatus = '✓ Suitable';
    let humWarning: string | undefined;

    if (params.humidity > 82) {
      humScore = 65;
      humStatus = '⚠ High Disease Affinity';
      humWarning = `Relative humidity at ${params.humidity}% significantly elevates fungal sporulation and leaf bacterial infection risk for ${crop.name}.`;
      warnings.push(humWarning);
    } else if (params.humidity < 40 && crop.waterRequirement === 'High') {
      humScore = 55;
      humStatus = '⚠ Evapotranspiration Deficit';
      humWarning = `Low humidity (${params.humidity}%) accelerates moisture transpiration; ensure frequent supplemental micro-irrigation.`;
      warnings.push(humWarning);
    } else {
      humScore = 95;
      humStatus = '✓ Favorable Transpiration';
    }

    factors.push({
      name: 'Humidity',
      inputValue: `${params.humidity}%`,
      optimalRange: '50% - 80%',
      score: Math.round(humScore),
      isSuitable: humScore >= 60,
      statusText: humStatus,
      warning: humWarning
    });

    // 3. Soil Compatibility
    let soilScore = 40;
    let soilStatus = '⚠ Sub-optimal Soil';
    let soilWarning: string | undefined;

    if (crop.soil.includes(params.soil)) {
      soilScore = 100;
      soilStatus = '✓ Highly Compatible';
    } else if (params.soil === 'Loamy' || crop.soil.includes('Loamy')) {
      soilScore = 75;
      soilStatus = '△ Moderately Compatible';
      soilWarning = `${params.soil} soil is acceptable but ${crop.name} performs best in ${crop.soil.join(' or ')}.`;
    } else {
      soilScore = 35;
      soilStatus = '⚠ Soil Mismatch';
      soilWarning = `${params.soil} soil texture may limit drainage or root aeration. Recommended: ${crop.soil.join(', ')}.`;
      warnings.push(soilWarning);
    }

    factors.push({
      name: 'Soil Texture',
      inputValue: params.soil,
      optimalRange: crop.soil.join(', '),
      score: Math.round(soilScore),
      isSuitable: soilScore >= 60,
      statusText: soilStatus,
      warning: soilWarning
    });

    // 4. Soil pH
    let phScore = 100;
    let phStatus = '✓ Optimal pH';
    let phWarning: string | undefined;

    if (params.soilPh >= crop.ph.min && params.soilPh <= crop.ph.max) {
      if (Math.abs(params.soilPh - crop.ph.optimal) <= 0.4) {
        phScore = 100;
        phStatus = '✓ Optimal pH';
      } else {
        phScore = 80;
        phStatus = '✓ Acceptable pH';
      }
    } else if (params.soilPh > crop.ph.max) {
      phScore = Math.max(15, 100 - (params.soilPh - crop.ph.max) * 45);
      phStatus = '⚠ Alkaline Soil Hazard';
      phWarning = `Soil pH ${params.soilPh} exceeds the preferred upper bound (${crop.ph.max}), which induces micronutrient lockup (Fe, Zn, Mn deficiency).`;
      warnings.push(phWarning);
    } else {
      phScore = Math.max(15, 100 - (crop.ph.min - params.soilPh) * 45);
      phStatus = '⚠ Acidic Soil Hazard';
      phWarning = `Soil pH ${params.soilPh} is more acidic than preferred (${crop.ph.min}), risking aluminum toxicity and poor phosphorus absorption.`;
      warnings.push(phWarning);
    }

    factors.push({
      name: 'Soil pH Reaction',
      inputValue: params.soilPh.toString(),
      optimalRange: `${crop.ph.min} - ${crop.ph.max} (Opt: ${crop.ph.optimal})`,
      score: Math.round(phScore),
      isSuitable: phScore >= 60,
      statusText: phStatus,
      warning: phWarning
    });

    // 5. Rainfall Check
    let rainScore = 100;
    let rainStatus = '✓ Adequate Precipitation';
    let rainWarning: string | undefined;

    if (params.rainfall >= crop.rainfall.optimalMin && params.rainfall <= crop.rainfall.optimalMax) {
      rainScore = 100;
      rainStatus = '✓ Optimal Precipitation';
    } else if (params.rainfall >= crop.rainfall.min && params.rainfall <= crop.rainfall.max) {
      rainScore = 78;
      rainStatus = '△ Tolerable Moisture';
    } else if (params.rainfall < crop.rainfall.min) {
      rainScore = Math.max(15, (params.rainfall / crop.rainfall.min) * 60);
      rainStatus = '⚠ Drought Deficit';
      rainWarning = `Seasonal rainfall of ${params.rainfall} mm is significantly below the minimum threshold (${crop.rainfall.min} mm) required by ${crop.name}. Heavy reliance on canal or borewell irrigation is imperative.`;
      warnings.push(rainWarning);
    } else {
      rainScore = 65;
      rainStatus = '⚠ Excess Waterlogging Risk';
      rainWarning = `Rainfall of ${params.rainfall} mm exceeds optimal levels; ensure field bund drainage to prevent anaerobic root suffocation.`;
      warnings.push(rainWarning);
    }

    factors.push({
      name: 'Rainfall',
      inputValue: `${params.rainfall} mm`,
      optimalRange: `${crop.rainfall.optimalMin} - ${crop.rainfall.optimalMax} mm`,
      score: Math.round(rainScore),
      isSuitable: rainScore >= 60,
      statusText: rainStatus,
      warning: rainWarning
    });

    // 6. Water Availability
    let waterScore = 90;
    let waterStatus = '✓ Sufficient Supply';
    let waterWarning: string | undefined;

    if (params.waterAvailability === 'Low') {
      if (crop.waterRequirement === 'High' || crop.waterRequirement === 'Very High') {
        waterScore = 25;
        waterStatus = '⚠ Severe Water Deficit';
        waterWarning = `Low water availability cannot sustain a high-water crop like ${crop.name}. Risk of terminal wilting and crop failure.`;
        warnings.push(waterWarning);
      } else if (crop.waterRequirement === 'Moderate') {
        waterScore = 55;
        waterStatus = '△ Water Stressed';
        waterWarning = `Moderate moisture required; yield potential may drop without micro-drip fertigation.`;
      } else {
        waterScore = 95;
        waterStatus = '✓ Well Adapted to Low Water';
      }
    } else {
      waterScore = 95;
    }

    factors.push({
      name: 'Water Availability',
      inputValue: params.waterAvailability,
      optimalRange: crop.waterRequirement,
      score: Math.round(waterScore),
      isSuitable: waterScore >= 60,
      statusText: waterStatus,
      warning: waterWarning
    });

    // 7. Season Match
    let seasonScore = 50;
    let seasonStatus = '⚠ Off-Season Warning';
    let seasonWarning: string | undefined;

    if (crop.seasons.includes(params.season) || crop.seasons.includes('Whole Year')) {
      seasonScore = 100;
      seasonStatus = '✓ In-Season Sowing';
    } else {
      seasonScore = 30;
      seasonStatus = '⚠ Sub-optimal Season';
      seasonWarning = `${params.season} is not the standard planting season for ${crop.name} (recommended: ${crop.seasons.join(', ')}).`;
      warnings.push(seasonWarning);
    }

    factors.push({
      name: 'Cropping Season',
      inputValue: params.season,
      optimalRange: crop.seasons.join(', '),
      score: Math.round(seasonScore),
      isSuitable: seasonScore >= 60,
      statusText: seasonStatus,
      warning: seasonWarning
    });

    // 8. Location Context Check
    let locScore = 70;
    const isStateNative = crop.suitableStates.some(s => s.toLowerCase() === params.state.toLowerCase());
    if (isStateNative) {
      locScore = 100;
    } else {
      locScore = 45;
      const locWarn = `${crop.name} is not widely cultivated in ${params.state} according to regional agro-ecological records.`;
      warnings.push(locWarn);
    }

    factors.push({
      name: 'Regional Adaptation',
      inputValue: `${params.district ? params.district + ', ' : ''}${params.state}`,
      optimalRange: crop.suitableStates.slice(0, 4).join(', ') + '...',
      score: Math.round(locScore),
      isSuitable: locScore >= 60,
      statusText: isStateNative ? '✓ Core Production Zone' : '△ Experimental / Non-traditional Zone'
    });

    // Calculate Overall Weighted Score
    const overallScore = Math.min(100, Math.round(
      tempScore * 0.20 +
      humScore * 0.15 +
      soilScore * 0.15 +
      phScore * 0.15 +
      rainScore * 0.15 +
      waterScore * 0.10 +
      seasonScore * 0.10
    ));

    let status: EnvironmentAnalysisResult['status'] = 'GOOD';
    if (overallScore >= 85) status = 'OPTIMAL';
    else if (overallScore >= 70) status = 'GOOD';
    else if (overallScore >= 50) status = 'MODERATE';
    else if (overallScore >= 35) status = 'POOR';
    else status = 'HIGH RISK';

    // Dynamic AI Explanation
    const explanationParts: string[] = [];
    explanationParts.push(`Your entered field conditions in ${params.district ? params.district + ', ' : ''}${params.state} yield an overall environmental suitability of ${overallScore}% (${status}) for ${crop.name}.`);

    if (tempScore >= 80 && phScore >= 80 && soilScore >= 75) {
      explanationParts.push(`The thermal regime (${params.temperature}°C) and soil chemical characteristics (${params.soil} at pH ${params.soilPh}) align very favorably with ${crop.name}'s biological requirements.`);
    }

    if (params.humidity > 80) {
      explanationParts.push(`However, relative humidity is elevated at ${params.humidity}%, which warrants proactive scouting for foliar pathogens like ${crop.commonDiseases.slice(0, 2).join(' and ')}.`);
    }

    if (warnings.length > 0) {
      explanationParts.push(`Key limiting factors to address: ${warnings[0]}`);
    } else {
      explanationParts.push('All key agro-ecological parameters are well balanced for healthy crop establishment.');
    }

    return {
      crop: crop.name,
      overallScore,
      status,
      factors,
      warnings,
      explanation: explanationParts.join(' ')
    };
  }
}

export const environmentAnalysisService = new EnvironmentAnalysisService();

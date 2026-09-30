export type SupportedLanguage = 
  | 'en' | 'te' | 'hi' | 'ur' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa' | 'or';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  locale: string;
}

export type SoilType = 'Loamy' | 'Black' | 'Red' | 'Alluvial' | 'Clay' | 'Sandy' | 'Laterite';
export type SeasonType = 'Kharif' | 'Rabi' | 'Zaid' | 'Whole Year';
export type WaterAvailability = 'Low' | 'Moderate' | 'High' | 'Irrigated Canal' | 'Borewell';

export interface CropData {
  id: string;
  name: string;
  category: 'Cereal' | 'Cash Crop' | 'Fiber' | 'Pulse' | 'Oilseed' | 'Spice' | 'Horticulture' | 'Fruit' | 'Vegetable' | 'Plantation';
  soil: SoilType[];
  ph: { min: number; max: number; optimal: number };
  temperature: { min: number; max: number; optimalMin: number; optimalMax: number };
  rainfall: { min: number; max: number; optimalMin: number; optimalMax: number };
  waterRequirement: 'Low' | 'Moderate' | 'High' | 'Very High';
  seasons: SeasonType[];
  suitableStates: string[];
  commonDiseases: string[];
  commonPests: string[];
  description: string;
  growingPeriodDays: number;
}

export interface DiseaseData {
  id: string;
  name: string;
  scientificName?: string;
  affectedCrops: string[];
  symptoms: string[];
  visualIndicators: string[];
  environmentalRiskFactors: {
    tempMin: number;
    tempMax: number;
    optimalTemp: number;
    humidityMin: number; // in %
    rainfallAffinity: 'Low' | 'Moderate' | 'High';
    soilCondition?: string;
  };
  possibleCauses: string[];
  evidenceSources: {
    title: string;
    source: string;
    year: number;
    confidence: number;
    doiOrId: string;
  }[];
  confidenceBase: number;
  relatedGraphNodes: string[];
  preventiveMeasures: string[];
  organicTreatments: string[];
  chemicalInterventions: string[]; // contextual evidence-based
}

export interface EnvironmentAnalysisResult {
  crop: string;
  overallScore: number;
  status: 'OPTIMAL' | 'GOOD' | 'MODERATE' | 'POOR' | 'HIGH RISK';
  factors: {
    name: string;
    inputValue: string | number;
    optimalRange: string;
    score: number; // 0-100
    isSuitable: boolean;
    statusText: string;
    warning?: string;
  }[];
  warnings: string[];
  explanation: string;
}

export interface CropScoreBreakdown {
  locationScore: number; // max 20
  soilScore: number; // max 20
  temperatureScore: number; // max 15
  rainfallScore: number; // max 15
  phScore: number; // max 10
  waterScore: number; // max 10
  seasonScore: number; // max 10
}

export interface CropRecommendation {
  crop: CropData;
  totalScore: number; // 0 - 100
  suitabilityLevel: 'Most Suitable' | 'High Suitability' | 'Moderate Suitability' | 'Marginal';
  reasons: string[];
  warnings: string[];
  scoreBreakdown: CropScoreBreakdown;
}

export interface DiseaseAnalysisResult {
  potentialDiseases: {
    disease: DiseaseData;
    confidence: number;
    riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    matchFactors: {
      cropMatch: boolean;
      symptomMatchCount: number;
      tempSuitability: boolean;
      humiditySuitability: boolean;
      soilSuitability: boolean;
      visualEvidenceConfidence: number;
    };
    supportingEvidence: {
      claim: string;
      source: string;
      confidence: number;
      year: number;
    }[];
    conflictingEvidence: {
      claim: string;
      source: string;
      contradiction: string;
    }[];
    recommendations: string[];
  }[];
  primaryDiagnosis: string;
  overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  environmentalAlerts: string[];
  aiReasoningText: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'crop' | 'disease' | 'soil' | 'state' | 'district' | 'weather' | 'evidence' | 'sensor' | 'treatment' | 'observation';
  group?: string;
  details?: Record<string, any>;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: 'HAS_DISEASE' | 'INFLUENCED_BY' | 'GROWS_IN' | 'TREATED_BY' | 'SUPPORTED_BY' | 'OBSERVED_BY' | 'LOCATED_IN' | 'PART_OF' | 'PREFERS_SOIL' | 'SUITABLE_IN' | 'ASSOCIATED_WITH' | 'CONTRADICTS';
  strength?: number;
}

export interface EvidenceRecord {
  id: string;
  claim: string;
  crop: string;
  disease?: string;
  treatment?: string;
  source: string;
  sourceType: 'Peer-reviewed Journal' | 'Agricultural University' | 'ICAR Research Bulletin' | 'Field Trial' | 'Farmer Co-op Survey' | 'Govt Advisory';
  year: number;
  confidence: number;
  evidenceType: 'Empirical Trial' | 'Genomic Sequencing' | 'Field Observation' | 'Meta-analysis';
  status: 'VERIFIED' | 'PEER_REVIEWED' | 'PROVISIONAL' | 'CONTESTED';
  documentTitle: string;
  pageOrSection: string;
  doi: string;
  extractedText: string;
  dateAdded: string;
  reliabilityScore: number; // 0-100
}

export interface ConflictRecord {
  id: string;
  subject: string;
  topic: string;
  crop: string;
  sourceA: {
    claim: string;
    source: string;
    sourceType: string;
    confidence: number;
    year: number;
    stance: 'SUPPORTS' | 'HIGH EFFICACY';
  };
  sourceB: {
    claim: string;
    source: string;
    sourceType: string;
    confidence: number;
    year: number;
    stance: 'CONTRADICTS' | 'LOW EFFICACY';
  };
  environmentalContext: string;
  explanation: string;
  status: 'ACTIVE' | 'RESOLVED' | 'UNDER_REVIEW';
  resolutionNote?: string;
}

export interface SensorRecord {
  id: string;
  name: string;
  parameter: 'Temperature' | 'Humidity' | 'Soil Moisture' | 'Soil pH' | 'Solar Radiation' | 'Nitrogen' | 'Phosphorus' | 'Potassium';
  currentValue: number;
  unit: string;
  minAllowed: number;
  maxAllowed: number;
  normalMin: number;
  normalMax: number;
  location: string;
  status: 'HEALTHY' | 'WARNING' | 'ANOMALY' | 'QUARANTINED';
  lastUpdated: string;
  isSimulatedAnomaly?: boolean;
  quarantineReason?: string;
}

export interface DataSourceRecord {
  id: string;
  name: string;
  type: 'Research papers' | 'Weather service' | 'Field observations' | 'IoT Sensor Grid' | 'Government Body' | 'Agricultural Institute';
  recordsCount: number;
  lastUpdated: string;
  reliability: number;
  status: 'ACTIVE' | 'SYNCED' | 'STANDBY';
  url: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'ai';
  text: string;
  timestamp: string;
  language: SupportedLanguage;
  audioSpoken?: boolean;
  contextPills?: string[];
  actionLinks?: { label: string; route: string }[];
}

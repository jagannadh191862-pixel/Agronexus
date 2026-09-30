import { GraphNode, GraphEdge } from '../types';

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // Geographic Nodes
  { id: 'node_state_ts', label: 'Telangana', type: 'state', group: 'location', details: { type: 'State', agroClimaticZone: 'Southern Plateau and Hills Zone', rainfallAnnualAvg: '900-1100mm' } },
  { id: 'node_state_ap', label: 'Andhra Pradesh', type: 'state', group: 'location', details: { type: 'State', agroClimaticZone: 'East Coast Plains and Hills', rainfallAnnualAvg: '950-1200mm' } },
  { id: 'node_dist_warangal', label: 'Warangal', type: 'district', group: 'location', details: { state: 'Telangana', predominantSoil: 'Loamy / Black Clay', majorCrops: ['Paddy', 'Cotton', 'Chilli'] } },
  { id: 'node_dist_guntur', label: 'Guntur', type: 'district', group: 'location', details: { state: 'Andhra Pradesh', predominantSoil: 'Black Vertisols / Alluvial', majorCrops: ['Chilli', 'Cotton', 'Paddy'] } },

  // Crop Nodes
  { id: 'node_crop_paddy', label: 'Paddy (Rice)', type: 'crop', group: 'agronomy', details: { scientificName: 'Oryza sativa', waterDemand: 'High', optimalPH: '5.5 - 7.5', optimalTemp: '24 - 32°C' } },
  { id: 'node_crop_cotton', label: 'Cotton', type: 'crop', group: 'agronomy', details: { scientificName: 'Gossypium hirsutum', waterDemand: 'Moderate', optimalPH: '6.0 - 8.2', optimalSoil: 'Black Vertisol' } },
  { id: 'node_crop_chilli', label: 'Chilli', type: 'crop', group: 'agronomy', details: { scientificName: 'Capsicum annuum', waterDemand: 'Moderate', optimalPH: '6.0 - 7.8', majorZone: 'Guntur Tract' } },

  // Soil Nodes
  { id: 'node_soil_loamy', label: 'Loamy Soil', type: 'soil', group: 'agronomy', details: { drainage: 'Moderate to Good', waterRetention: 'Optimal', cationExchange: 'High' } },
  { id: 'node_soil_black', label: 'Black Soil (Regur)', type: 'soil', group: 'agronomy', details: { montmorillonite: 'High', crackingPorous: 'High in dry seasons', nutrient: 'Rich in Ca, Mg, Carbonates' } },

  // Disease Nodes
  { id: 'node_dis_brown_spot', label: 'Brown Spot', type: 'disease', group: 'pathology', details: { pathogen: 'Bipolaris oryzae', severeYieldLoss: 'Up to 45%', keyIndicator: 'Sesame-seed oval lesions' } },
  { id: 'node_dis_rice_blast', label: 'Rice Blast', type: 'disease', group: 'pathology', details: { pathogen: 'Magnaporthe oryzae', primaryPhase: 'Neck and Foliar blast' } },
  { id: 'node_dis_anthracnose', label: 'Anthracnose', type: 'disease', group: 'pathology', details: { pathogen: 'Colletotrichum capsici', host: 'Chilli Pods' } },

  // Environmental Condition Nodes
  { id: 'node_env_high_hum', label: 'High Humidity (>80%)', type: 'weather', group: 'environment', details: { criticalTrigger: 'Spore germination rate exceeds 90% within 6 hrs' } },
  { id: 'node_env_temp_29', label: 'Warm Temp (28-32°C)', type: 'weather', group: 'environment', details: { fungalGrowthOptimum: 'Peak mycelial radial growth' } },
  { id: 'node_env_kharif', label: 'Kharif Season', type: 'weather', group: 'environment', details: { monsoonMonitored: 'South-West Monsoon window (June - Oct)' } },

  // Evidence & Research Nodes
  { id: 'node_evd_iirr_bulletin', label: 'IIRR Research Study 2023', type: 'evidence', group: 'science', details: { institution: 'ICAR - Indian Institute of Rice Research', citation: 'IIRR-TR-2023-41', sampleSize: '120 test plots' } },
  { id: 'node_evd_angrau_advisory', label: 'ANGRAU Integrated Bulletin', type: 'evidence', group: 'science', details: { institution: 'ANGRAU Guntur', peerReviewed: 'Yes', reliability: '94%' } },

  // Treatment Nodes
  { id: 'node_trt_mancozeb', label: 'Mancozeb 75 WP / Propiconazole', type: 'treatment', group: 'management', details: { chemicalClass: 'Dithiocarbamate / Triazole', dosage: '2.0 g/L or 1.0 ml/L' } },
  { id: 'node_trt_neem', label: 'Neem Seed Kernel Extract 5%', type: 'treatment', group: 'management', details: { organicClass: 'Azadirachtin botanical systemic elicitor' } },

  // IoT Sensor & Observation Nodes
  { id: 'node_sensor_s07', label: 'Sensor Node S-007', type: 'sensor', group: 'telemetry', details: { parameter: 'Microclimate Humidity', location: 'Warangal Zone A', validationState: 'Guarded by Quarantine Engine' } },
  { id: 'node_obs_farmer', label: 'Farmer Voice & Image Observation', type: 'observation', group: 'telemetry', details: { modality: 'Multimodal (Mobile Camera + Telugu Voice)', status: 'Context Linked' } }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Geographic Hierarchies
  { id: 'e1', source: 'node_dist_warangal', target: 'node_state_ts', label: 'PART_OF' },
  { id: 'e2', source: 'node_dist_guntur', target: 'node_state_ap', label: 'PART_OF' },

  // Crop & Location
  { id: 'e3', source: 'node_dist_warangal', target: 'node_crop_paddy', label: 'SUITABLE_IN' },
  { id: 'e4', source: 'node_dist_warangal', target: 'node_crop_cotton', label: 'SUITABLE_IN' },
  { id: 'e5', source: 'node_dist_guntur', target: 'node_crop_chilli', label: 'SUITABLE_IN' },

  // Crop & Soil / Season
  { id: 'e6', source: 'node_crop_paddy', target: 'node_soil_loamy', label: 'PREFERS_SOIL' },
  { id: 'e7', source: 'node_crop_cotton', target: 'node_soil_black', label: 'PREFERS_SOIL' },
  { id: 'e8', source: 'node_crop_paddy', target: 'node_env_kharif', label: 'SUITABLE_IN' },

  // Crop & Disease
  { id: 'e9', source: 'node_crop_paddy', target: 'node_dis_brown_spot', label: 'HAS_DISEASE' },
  { id: 'e10', source: 'node_crop_paddy', target: 'node_dis_rice_blast', label: 'HAS_DISEASE' },
  { id: 'e11', source: 'node_crop_chilli', target: 'node_dis_anthracnose', label: 'HAS_DISEASE' },

  // Disease & Environmental Drivers
  { id: 'e12', source: 'node_dis_brown_spot', target: 'node_env_high_hum', label: 'ASSOCIATED_WITH' },
  { id: 'e13', source: 'node_dis_brown_spot', target: 'node_env_temp_29', label: 'ASSOCIATED_WITH' },
  { id: 'e14', source: 'node_dis_rice_blast', target: 'node_env_high_hum', label: 'ASSOCIATED_WITH' },

  // Evidence & Provenance Links
  { id: 'e15', source: 'node_evd_iirr_bulletin', target: 'node_dis_brown_spot', label: 'SUPPORTED_BY' },
  { id: 'e16', source: 'node_evd_angrau_advisory', target: 'node_dis_anthracnose', label: 'SUPPORTED_BY' },

  // Treatment Links
  { id: 'e17', source: 'node_dis_brown_spot', target: 'node_trt_mancozeb', label: 'TREATED_BY' },
  { id: 'e18', source: 'node_dis_brown_spot', target: 'node_trt_neem', label: 'TREATED_BY' },

  // IoT & Farmer Ground Observations
  { id: 'e19', source: 'node_sensor_s07', target: 'node_env_high_hum', label: 'OBSERVED_BY' },
  { id: 'e20', source: 'node_obs_farmer', target: 'node_dis_brown_spot', label: 'OBSERVED_BY' },
  { id: 'e21', source: 'node_obs_farmer', target: 'node_dist_warangal', label: 'LOCATED_IN' }
];

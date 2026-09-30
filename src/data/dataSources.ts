import { DataSourceRecord } from '../types';

export const INITIAL_DATA_SOURCES: DataSourceRecord[] = [
  {
    id: 'DS-01',
    name: 'ICAR - Indian Council of Agricultural Research Knowledge Portal',
    type: 'Agricultural Institute',
    recordsCount: 4280,
    lastUpdated: '10 mins ago',
    reliability: 98,
    status: 'ACTIVE',
    url: 'https://icar.org.in/evidence-base',
    description: 'National apex body for coordinating, guiding, and managing research and education in agriculture including 102 research institutes across India.'
  },
  {
    id: 'DS-02',
    name: 'India Meteorological Department (IMD) Agromet Advisory Services',
    type: 'Weather service',
    recordsCount: 18450,
    lastUpdated: 'Just now',
    reliability: 96,
    status: 'SYNCED',
    url: 'https://mausam.imd.gov.in/agromet',
    description: 'High-resolution numerical weather prediction models delivering block-level 5-day agro-meteorological risk forecasts and rainfall radar feeds.'
  },
  {
    id: 'DS-03',
    name: 'Indian Institute of Rice Research (IIRR) Germplasm & Pathology DB',
    type: 'Research papers',
    recordsCount: 3120,
    lastUpdated: '2 hours ago',
    reliability: 97,
    status: 'ACTIVE',
    url: 'https://icar-iirr.org/pathology',
    description: 'Comprehensive epidemiological data on paddy blast, brown spot, false smut and sheath blight across diverse agro-climatic zones.'
  },
  {
    id: 'DS-04',
    name: 'Warangal & Guntur LoRaWAN IoT Telemetry Mesh Grid',
    type: 'IoT Sensor Grid',
    recordsCount: 89400,
    lastUpdated: 'Continuous streaming',
    reliability: 95,
    status: 'ACTIVE',
    url: 'https://lora.agronexus.internal/gateway',
    description: 'Field-deployed soil capacitive moisture probes, atmospheric hygrometers, pyranometers, and multi-depth electrochemical NPK sensors.'
  },
  {
    id: 'DS-05',
    name: 'AgriStack & Digital Agriculture Mission (DAC&FW)',
    type: 'Government Body',
    recordsCount: 15600,
    lastUpdated: 'Yesterday',
    reliability: 94,
    status: 'SYNCED',
    url: 'https://agristack.gov.in',
    description: 'Unified geospatial registry of farmer cadastral records, regional soil health card databases, and MSP market arrivals.'
  },
  {
    id: 'DS-06',
    name: 'Farmer Co-op Field Validation & Ground Truth Network',
    type: 'Field observations',
    recordsCount: 6890,
    lastUpdated: '15 mins ago',
    reliability: 91,
    status: 'ACTIVE',
    url: 'https://observations.agronexus.internal/v1',
    description: 'Verified farmer ground-truthed symptom images, pest trap counts, and localized microclimate field notes from agricultural extension officers.'
  }
];

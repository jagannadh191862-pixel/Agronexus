import { DiseaseData } from '../types';

export const DISEASES_DATA: DiseaseData[] = [
  // --- PADDY DISEASES ---
  {
    id: 'paddy_brown_spot',
    name: 'Brown Spot',
    scientificName: 'Bipolaris oryzae / Cochliobolus miyabeanus',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Circular to oval brown spots on leaves with gray or light brown center',
      'Dark brown margins with yellow chlorotic halo',
      'Grain discoloration and black velvety spotting on glumes',
      'Seedling blight and withered young leaves'
    ],
    visualIndicators: [
      'Brown sesame-seed shaped lesions on leaf blade',
      'Yellow halo around necrotic center',
      'Discolored spikelets'
    ],
    environmentalRiskFactors: {
      tempMin: 22,
      tempMax: 34,
      optimalTemp: 28,
      humidityMin: 80,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Potassium and Silicon deficient sandy or unfertilized soils'
    },
    possibleCauses: [
      'Airborne fungal conidia dispersal',
      'Infected seed carryover',
      'Severe nutritional stress, particularly K, Si and micronutrients'
    ],
    evidenceSources: [
      {
        title: 'Epidemiology of Rice Brown Spot under Changing Climes in Southern India',
        source: 'ICAR-Indian Institute of Rice Research (IIRR) Bulletin',
        year: 2023,
        confidence: 0.94,
        doiOrId: 'IIRR-TR-2023-41'
      },
      {
        title: 'Nutrient interactions and Helminthosporium leaf spot resistance in wetland rice',
        source: 'Journal of Phytopathology & Agricultural Research',
        year: 2022,
        confidence: 0.89,
        doiOrId: '10.1016/j.phytopath.2022.04.112'
      }
    ],
    confidenceBase: 0.88,
    relatedGraphNodes: ['Paddy', 'High Humidity', 'Brown Spot', 'Telangana', 'Warangal', 'Potassium Nutrition'],
    preventiveMeasures: [
      'Seed treatment with Trichoderma viride @ 5g/kg or hot water soak (52°C for 10 min)',
      'Balanced NPK fertilization; avoid excessive nitrogen without potassium balance',
      'Maintain field sanitation and remove stubbles after harvest'
    ],
    organicTreatments: [
      'Spray Neem seed kernel extract (NSKE) 5%',
      'Foliar spray of Pseudomonas fluorescens @ 2.5 kg/ha'
    ],
    chemicalInterventions: [
      'Mancozeb 75 WP @ 2g/L or Propiconazole 25 EC @ 1ml/L at early tillering stage (Evidence-backed advisory)'
    ]
  },
  {
    id: 'paddy_rice_blast',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Spindle-shaped elliptical lesions with pointed ends and gray/ash centers',
      'Collar rot at leaf junction causing leaf blade detachment',
      'Neck rot causing panicle breakage and sterile white earheads'
    ],
    visualIndicators: [
      'Diamond or spindle shaped lesions on leaf surface',
      'Dark brown to black nodes on stem and neck'
    ],
    environmentalRiskFactors: {
      tempMin: 18,
      tempMax: 28,
      optimalTemp: 24,
      humidityMin: 85,
      rainfallAffinity: 'High',
      soilCondition: 'High nitrogenous fertile soil with prolonged morning dew'
    },
    possibleCauses: [
      'Prolonged leaf wetness (> 10 hours) from fog or drizzle',
      'Excessive chemical nitrogen application'
    ],
    evidenceSources: [
      {
        title: 'Pathogen dynamics of Magnaporthe oryzae under varying dew periods',
        source: 'International Rice Research Institute (IRRI)',
        year: 2024,
        confidence: 0.95,
        doiOrId: 'IRRI-MGT-2024-09'
      }
    ],
    confidenceBase: 0.91,
    relatedGraphNodes: ['Paddy', 'Rice Blast', 'High Humidity', 'Excess Nitrogen', 'Cool Nights'],
    preventiveMeasures: [
      'Cultivate blast-resistant cultivars (e.g., MTU-1010, RNR-15048)',
      'Split application of nitrogenous fertilizers',
      'Avoid late sowing in blast prone areas'
    ],
    organicTreatments: [
      'Spray cow urine distillate (10%) with turmeric extract',
      'Bio-agent Bacillus subtilis foliar spray'
    ],
    chemicalInterventions: [
      'Tricyclazole 75 WP @ 0.6g/L or Isoprothiolane 40 EC @ 1.5ml/L at boot leaf stage'
    ]
  },
  {
    id: 'paddy_bacterial_leaf_blight',
    name: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Water-soaked to yellowish-white wavy stripes starting from leaf tips and margins',
      'Milky bacterial ooze beads on young lesions early morning',
      'Wilting of whole seedlings known as "Kresek" phase'
    ],
    visualIndicators: [
      'Undulating wavy yellow leaf margins turning translucent straw color',
      'Dried curled leaf tips'
    ],
    environmentalRiskFactors: {
      tempMin: 25,
      tempMax: 35,
      optimalTemp: 30,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Flooded standing water during cyclonic rains'
    },
    possibleCauses: [
      'Wind-driven rainstorms and typhoon damage allowing bacterial entry',
      'Deep flood irrigation carrying bacteria from field to field'
    ],
    evidenceSources: [
      {
        title: 'Management of Xanthomonas pathovars in Kharif rice ecosystem',
        source: 'Tamil Nadu Agricultural University Journal',
        year: 2023,
        confidence: 0.92,
        doiOrId: 'TNAU-AGR-2023-18'
      }
    ],
    confidenceBase: 0.89,
    relatedGraphNodes: ['Paddy', 'Bacterial Leaf Blight', 'Cyclonic Rain', 'Xanthomonas'],
    preventiveMeasures: [
      'Drain excess standing water from infected fields',
      'Avoid clipping leaf tips during transplanting',
      'Apply bleaching powder @ 5kg/ha into irrigation water'
    ],
    organicTreatments: [
      'Foliar spray of fresh cow dung slurry supernatant (20%) + hing',
      'Copper hydroxide 77 WP bio-safe formulation'
    ],
    chemicalInterventions: [
      'Copper Oxychloride 50 WP @ 2.5g/L + Streptocycline @ 0.1g/L'
    ]
  },
  {
    id: 'paddy_sheath_blight',
    name: 'Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Oval or irregular grayish-green water-soaked spots on leaf sheath near water line',
      'Lesions enlarge with dark reddish-brown borders resembling snake skin',
      'Lodging of plants due to basal sheath rotting'
    ],
    visualIndicators: [
      'Banded grayish-white lesions on leaf sheath',
      'Sclerotial bodies attached to stem'
    ],
    environmentalRiskFactors: {
      tempMin: 26,
      tempMax: 35,
      optimalTemp: 31,
      humidityMin: 85,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Dense plant canopy with stagnant water'
    },
    possibleCauses: ['Floating soil-borne sclerotia', 'High planting density', 'Excess urea'],
    evidenceSources: [{ title: 'Sheath blight biocontrol review', source: 'ICAR-CRRI Cuttack', year: 2022, confidence: 0.90, doiOrId: 'CRRI-2022-SB' }],
    confidenceBase: 0.86,
    relatedGraphNodes: ['Paddy', 'Sheath Blight', 'Rhizoctonia', 'Canopy Density'],
    preventiveMeasures: ['Wider plant spacing (20x15 cm)', 'Summer ploughing to expose sclerotia'],
    organicTreatments: ['Trichoderma harzianum soil incorporation with enriched FYM'],
    chemicalInterventions: ['Hexaconazole 5 EC @ 2ml/L or Validamycin 3L @ 2.5ml/L']
  },
  {
    id: 'paddy_false_smut',
    name: 'False Smut',
    scientificName: 'Ustilaginoidea virens',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Individual grains transform into large greenish-yellow velvety smut balls',
      'Later turning dark olive green and orange-yellow powder release',
      'Sterility of neighboring florets in panicle'
    ],
    visualIndicators: ['Large powdery globose yellow-green spore balls replacing grains'],
    environmentalRiskFactors: {
      tempMin: 22,
      tempMax: 30,
      optimalTemp: 26,
      humidityMin: 90,
      rainfallAffinity: 'High',
      soilCondition: 'Late nitrogen topdressing under overcast cloudy weather during flowering'
    },
    possibleCauses: ['Airborne spores infecting during booting and floral opening'],
    evidenceSources: [{ title: 'False smut incidence and climatic drivers in Peninsular India', source: 'IIRR Hyderabad', year: 2023, confidence: 0.88, doiOrId: 'IIRR-FS-2023' }],
    confidenceBase: 0.85,
    relatedGraphNodes: ['Paddy', 'False Smut', 'Overcast Skies', 'Flowering Stage'],
    preventiveMeasures: ['Avoid excessive nitrogen during booting', 'Early planting to escape late rainfall'],
    organicTreatments: ['Foliar spray with Bacillus amyloliquefaciens'],
    chemicalInterventions: ['Copper hydroxide 77 WP @ 2g/L or Kresoxim-methyl 44.3 SC @ 1ml/L at boot leaf']
  },
  {
    id: 'paddy_tungro',
    name: 'Tungro',
    scientificName: 'Rice Tungro Spherical and Bacilliform Viruses',
    affectedCrops: ['Paddy'],
    symptoms: [
      'Severe plant stunting with reduced tillering',
      'Leaves turn yellow to orange-yellow starting from the tips',
      'Rusty dark brown mottling on older leaves',
      'Delayed flowering and empty sterile panicles'
    ],
    visualIndicators: ['Stunted hills with vivid orange-yellow leaf discoloration and erect stunted leaves'],
    environmentalRiskFactors: {
      tempMin: 25,
      tempMax: 36,
      optimalTemp: 30,
      humidityMin: 70,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Grassy bunds hosting green leafhopper vector'
    },
    possibleCauses: ['Transmitted by Green Leafhopper (Nephotettix virescens)'],
    evidenceSources: [{ title: 'Vector surveillance and Tungro virus dynamics', source: 'Indian Agricultural Research Institute', year: 2021, confidence: 0.93, doiOrId: 'IARI-TUNG-2021' }],
    confidenceBase: 0.87,
    relatedGraphNodes: ['Paddy', 'Tungro', 'Green Leafhopper', 'Stunting'],
    preventiveMeasures: ['Eradicate weed hosts on field bunds', 'Use light traps to monitor leafhopper population'],
    organicTreatments: ['Neem oil 1500 ppm @ 3ml/L against leafhopper nymphs'],
    chemicalInterventions: ['Imidacloprid 17.8 SL @ 0.3ml/L or Thiamethoxam 25 WG @ 0.2g/L targeting vector']
  },

  // --- TOMATO DISEASES ---
  {
    id: 'tomato_early_blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    affectedCrops: ['Tomato', 'Potato'],
    symptoms: [
      'Concentric target-board rings on older foliage',
      'Brown to black spots enlarging up to 1-2 cm with chlorotic yellow borders',
      'Stem cankers and dark sunken leathery spots at fruit stem end'
    ],
    visualIndicators: ['Concentric dark rings with target-board appearance on lower leaves'],
    environmentalRiskFactors: {
      tempMin: 20,
      tempMax: 32,
      optimalTemp: 26,
      humidityMin: 75,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Warm soil with splashing rain or overhead irrigation'
    },
    possibleCauses: ['Soil-borne conidia splashed onto lower leaves during rainfall'],
    evidenceSources: [{ title: 'Alternaria solani target board blight control', source: 'Horticultural Research Journal', year: 2023, confidence: 0.92, doiOrId: 'HRJ-2023-EB' }],
    confidenceBase: 0.90,
    relatedGraphNodes: ['Tomato', 'Early Blight', 'Alternaria', 'Target Board Pattern'],
    preventiveMeasures: ['Crop rotation with non-solanaceous crops', 'Mulching to prevent soil splashing'],
    organicTreatments: ['Copper soap spray or Trichoderma viride preventive application'],
    chemicalInterventions: ['Chlorothalonil 75 WP @ 2g/L or Azoxystrobin 23 SC @ 1ml/L']
  },
  {
    id: 'tomato_late_blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    affectedCrops: ['Tomato', 'Potato'],
    symptoms: [
      'Large irregular water-soaked pale green lesions on leaves rapidly turning purplish-black',
      'White downy cottony mold on the underside of leaves during high humidity',
      'Firm greasy brown rot expanding across green and ripe fruits'
    ],
    visualIndicators: ['Black greasy blotches with white frosty fungal growth on leaf undersides'],
    environmentalRiskFactors: {
      tempMin: 12,
      tempMax: 24,
      optimalTemp: 18,
      humidityMin: 90,
      rainfallAffinity: 'High',
      soilCondition: 'Cool foggy weather with continuous leaf moisture'
    },
    possibleCauses: ['Airborne sporangia germinating in free water films'],
    evidenceSources: [{ title: 'Phytophthora outbreak monitoring in hills and plains', source: 'CPRI Shimla', year: 2024, confidence: 0.96, doiOrId: 'CPRI-LB-2024' }],
    confidenceBase: 0.93,
    relatedGraphNodes: ['Tomato', 'Potato', 'Late Blight', 'Phytophthora', 'Cool Fog'],
    preventiveMeasures: ['Destroy infected cull piles', 'Avoid overhead sprinkler irrigation'],
    organicTreatments: ['Bordeaux mixture 1% spray at onset of cool humid spells'],
    chemicalInterventions: ['Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L or Cymoxanil 8% + Mancozeb 64% @ 2g/L']
  },
  {
    id: 'tomato_bacterial_wilt',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    affectedCrops: ['Tomato', 'Chilli', 'Potato', 'Eggplant'],
    symptoms: [
      'Rapid wilting and collapse of whole plant while leaves remain green',
      'Browning of vascular vascular bundles in stem cross-section',
      'White streaming bacterial streaming when stem cutting is suspended in clear water'
    ],
    visualIndicators: ['Sudden daytime wilting of green foliage with zero chlorosis'],
    environmentalRiskFactors: {
      tempMin: 26,
      tempMax: 38,
      optimalTemp: 32,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Heavy acidic poorly drained soils with root knot nematode injury'
    },
    possibleCauses: ['Soil bacterium invading roots through mechanical or nematode wounds'],
    evidenceSources: [{ title: 'Vascular wilt suppressive soils and Ralstonia resistance', source: 'IIHR Bengaluru', year: 2023, confidence: 0.91, doiOrId: 'IIHR-BW-2023' }],
    confidenceBase: 0.91,
    relatedGraphNodes: ['Tomato', 'Bacterial Wilt', 'Ralstonia', 'Acidic Soil'],
    preventiveMeasures: ['Grafting on resistant wild rootstocks (Solanum torvum)', 'Liming acidic soils to pH > 6.5'],
    organicTreatments: ['Bio-fumigation with mustard cake and Pseudomonas putida root dip'],
    chemicalInterventions: ['Streptocycline root drenching @ 100 ppm along with Copper Oxychloride @ 3g/L']
  },
  {
    id: 'tomato_leaf_curl',
    name: 'Leaf Curl',
    scientificName: 'Tomato Leaf Curl New Delhi Virus (ToLCNDV)',
    affectedCrops: ['Tomato', 'Chilli'],
    symptoms: [
      'Upward and downward curling, rolling, and puckering of leaves',
      'Extreme reduction in leaf size with thickening and leathery texture',
      'Severe stunting and bushy growth with flower drop and no fruit setting'
    ],
    visualIndicators: ['Crinkled curled tiny deformed leaves with pale yellow veins'],
    environmentalRiskFactors: {
      tempMin: 24,
      tempMax: 38,
      optimalTemp: 30,
      humidityMin: 50,
      rainfallAffinity: 'Low',
      soilCondition: 'Dry hot periods favoring explosive whitefly breeding'
    },
    possibleCauses: ['Begomovirus transmitted persistently by Whitefly (Bemisia tabaci)'],
    evidenceSources: [{ title: 'Whitefly vectored begomoviruses in solanaceous vegetables', source: 'IARI Division of Virology', year: 2022, confidence: 0.94, doiOrId: 'IARI-VIR-2022' }],
    confidenceBase: 0.92,
    relatedGraphNodes: ['Tomato', 'Leaf Curl', 'Whitefly', 'Dry Heat'],
    preventiveMeasures: ['Yellow sticky traps (15-20/acre) for whitefly mass trapping', '40-mesh insect-proof nylon nets in nursery'],
    organicTreatments: ['Spray fish amino acid + neem oil 10,000 ppm @ 2ml/L'],
    chemicalInterventions: ['Diafenthiuron 50 WP @ 1.2g/L or Cyantraniliprole 10.26 OD @ 1.8ml/L targeting vector']
  },
  {
    id: 'tomato_septoria_leaf_spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    affectedCrops: ['Tomato'],
    symptoms: [
      'Numerous small circular spots (1-3 mm) with dark brown margins and sunken grayish center',
      'Tiny black pycnidia specks visible inside older spot centers like ground black pepper',
      'Severe premature defoliation from ground upwards'
    ],
    visualIndicators: ['Dense clusters of tiny circular spots with dark rim and pepper-like dots inside'],
    environmentalRiskFactors: {
      tempMin: 20,
      tempMax: 30,
      optimalTemp: 25,
      humidityMin: 85,
      rainfallAffinity: 'High',
      soilCondition: 'Dense bushy foliage with poor air circulation'
    },
    possibleCauses: ['Fungal pycnidiospores splashing during overhead watering or rain'],
    evidenceSources: [{ title: 'Septoria lycopersici epidemiology in rainfed tomato', source: 'Agricultural Research Station', year: 2022, confidence: 0.87, doiOrId: 'ARS-SEP-2022' }],
    confidenceBase: 0.85,
    relatedGraphNodes: ['Tomato', 'Septoria', 'Pycnidia', 'High Humidity'],
    preventiveMeasures: ['Bottom pruning of lower 12 inches foliage for air flow', 'Stake plants upright'],
    organicTreatments: ['Potassium bicarbonate foliar spray @ 3g/L'],
    chemicalInterventions: ['Mancozeb 75 WP @ 2.5g/L or Zineb 75 WP @ 2g/L']
  },

  // --- COTTON DISEASES ---
  {
    id: 'cotton_bacterial_blight',
    name: 'Bacterial Blight',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    affectedCrops: ['Cotton'],
    symptoms: [
      'Angular water-soaked spots bounded by leaf veins ("Angular Leaf Spot")',
      'Black arm phase on stems causing breakage',
      'Water-soaked circular spots on bolls rotting the internal lint'
    ],
    visualIndicators: ['Angular vein-delimited blackish lesions on leaves and black necrotic streaks on petioles'],
    environmentalRiskFactors: {
      tempMin: 25,
      tempMax: 36,
      optimalTemp: 31,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Black cotton soil with prolonged leaf wetness'
    },
    possibleCauses: ['Seed-borne bacteria and rain splashes'],
    evidenceSources: [{ title: 'Bacterial blight resistance genes in Bt cotton hybrids', source: 'CICR Nagpur', year: 2023, confidence: 0.93, doiOrId: 'CICR-BB-2023' }],
    confidenceBase: 0.90,
    relatedGraphNodes: ['Cotton', 'Bacterial Blight', 'Angular Leaf Spot', 'Black Arm'],
    preventiveMeasures: ['Acid delinting of cotton seed with commercial sulfuric acid @ 100ml/kg', 'Resistant Bt cultivars'],
    organicTreatments: ['Pseudomonas fluorescens seed and foliar spray @ 10g/L'],
    chemicalInterventions: ['Copper Oxychloride 50 WP @ 2.5g/L + Streptocycline 100 mg/L']
  },
  {
    id: 'cotton_fusarium_wilt',
    name: 'Fusarium Wilt',
    scientificName: 'Fusarium oxysporum f. sp. vasinfectum',
    affectedCrops: ['Cotton'],
    symptoms: [
      'Yellowing and browning along leaf margins beginning on lower branches',
      'Characteristic one-sided wilting of branches',
      'Dark brown to black vascular ring staining when wood is peeled back'
    ],
    visualIndicators: ['Unilateral leaf wilting and brownish discoloration of vascular xylem cylinder'],
    environmentalRiskFactors: {
      tempMin: 22,
      tempMax: 34,
      optimalTemp: 28,
      humidityMin: 60,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Acidic to neutral sandy loam or nematode infested black soils'
    },
    possibleCauses: ['Soil-inhabiting fungal chlamydospores penetrating roots'],
    evidenceSources: [{ title: 'Fusarium wilt interaction with root knot nematodes in cotton', source: 'CICR Bulletin', year: 2022, confidence: 0.90, doiOrId: 'CICR-FW-2022' }],
    confidenceBase: 0.88,
    relatedGraphNodes: ['Cotton', 'Fusarium Wilt', 'Vascular Ring', 'Soil Chlamydospores'],
    preventiveMeasures: ['Use wilt-resistant cultivars', 'Apply neem cake @ 250 kg/ha to suppress soil fungi'],
    organicTreatments: ['Soil application of Trichoderma viride enriched FYM @ 5 kg in 500 kg FYM/acre'],
    chemicalInterventions: ['Carbendazim 50 WP @ 1g/L drenching around root zone at first notice']
  },
  {
    id: 'cotton_alternaria_leaf_spot',
    name: 'Alternaria Leaf Spot',
    scientificName: 'Alternaria macrospora / A. alternata',
    affectedCrops: ['Cotton'],
    symptoms: [
      'Small, round brown necrotic spots with concentric ridges on leaves and bracts',
      'Premature defoliation during boll development leading to smaller bolls',
      'Cracking and shot-hole appearance in center of older spots'
    ],
    visualIndicators: ['Concentric purplish-brown circular spots with dried centers that fall out forming shot-holes'],
    environmentalRiskFactors: {
      tempMin: 22,
      tempMax: 32,
      optimalTemp: 27,
      humidityMin: 80,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Potassium stressed crops during heavy boll load'
    },
    possibleCauses: ['Nutritional exhaustion combined with high relative humidity and intermittent rainfall'],
    evidenceSources: [{ title: 'Alternaria leaf spot management in irrigated cotton', source: 'Journal of Cotton Research', year: 2023, confidence: 0.89, doiOrId: 'JCR-2023-ALT' }],
    confidenceBase: 0.86,
    relatedGraphNodes: ['Cotton', 'Alternaria', 'Shot Hole', 'Potassium Stress'],
    preventiveMeasures: ['Foliar nutrition with 1% Potassium Nitrate (13:0:45) at boll bursting', 'Collect and burn diseased crop residues'],
    organicTreatments: ['Spray bio-fungicide Bacillus subtilis @ 5g/L'],
    chemicalInterventions: ['Pyraclostrobin 20 WG @ 1g/L or Kresoxim-methyl 44.3 SC @ 1ml/L']
  },

  // --- WHEAT DISEASES ---
  {
    id: 'wheat_rust',
    name: 'Wheat Rust',
    scientificName: 'Puccinia graminis / P. striiformis / P. triticina',
    affectedCrops: ['Wheat'],
    symptoms: [
      'Yellow/stripe, brown/leaf, or black/stem powdery pustules on leaves, sheaths and stems',
      'Yellow linear stripes on leaves releasing powdery urediniospores on fingers',
      'Shriveled light grain and lodging in severe stem rust attacks'
    ],
    visualIndicators: ['Bright yellow or rust-colored powdery pustule lines on green leaf blades'],
    environmentalRiskFactors: {
      tempMin: 10,
      tempMax: 24,
      optimalTemp: 16,
      humidityMin: 85,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Cool northern plains climate with morning dew and wind currents'
    },
    possibleCauses: ['Airborne spores transported across long distances from foothills (Himalayan foci)'],
    evidenceSources: [{ title: 'Yellow rust surveillance and race pathotyping in Northern India', source: 'IIWBR Karnal', year: 2024, confidence: 0.97, doiOrId: 'IIWBR-YR-2024' }],
    confidenceBase: 0.94,
    relatedGraphNodes: ['Wheat', 'Wheat Rust', 'Puccinia', 'Cool Dew', 'Punjab', 'Haryana'],
    preventiveMeasures: ['Sow rust-resistant varieties (HD-3086, DBW-187, PBW-725)', 'Avoid excessively late sowing in December'],
    organicTreatments: ['Spray fermented sour buttermilk (Lassi) 5% with cow urine'],
    chemicalInterventions: ['Propiconazole 25 EC (Tilt) @ 1ml/L or Tebuconazole 25.9 EC @ 1.25ml/L at first appearance']
  },
  {
    id: 'wheat_powdery_mildew',
    name: 'Powdery Mildew',
    scientificName: 'Blumeria graminis f. sp. tritici',
    affectedCrops: ['Wheat'],
    symptoms: [
      'White to light gray fluffy powdery patches on upper leaf surface and sheaths',
      'Patches enlarge, coalesce, and turn dull brownish-gray with tiny black specks (cleistothecia)',
      'Premature chlorosis and leaf death reducing photosynthesis during grain filling'
    ],
    visualIndicators: ['White talcum-powder like coating across the upper foliage surface'],
    environmentalRiskFactors: {
      tempMin: 12,
      tempMax: 22,
      optimalTemp: 17,
      humidityMin: 85,
      rainfallAffinity: 'Low',
      soilCondition: 'Dense crop canopy with high nitrogen fertilizer'
    },
    possibleCauses: ['High relative humidity with cool temperatures without heavy washing rains'],
    evidenceSources: [{ title: 'Wheat powdery mildew virulence and control', source: 'Indian Phytopathology', year: 2023, confidence: 0.91, doiOrId: 'IP-2023-PM' }],
    confidenceBase: 0.88,
    relatedGraphNodes: ['Wheat', 'Powdery Mildew', 'Dense Canopy', 'High Nitrogen'],
    preventiveMeasures: ['Optimum seed rate to prevent overcrowding', 'Balanced nitrogen application'],
    organicTreatments: ['Spray wettable sulfur 80 WDG @ 3g/L or baking soda solution (0.5%)'],
    chemicalInterventions: ['Triadimefon 25 WP @ 1g/L or Hexaconazole 5 EC @ 1ml/L']
  },
  {
    id: 'wheat_karnal_bunt',
    name: 'Karnal Bunt',
    scientificName: 'Tilletia indica',
    affectedCrops: ['Wheat'],
    symptoms: [
      'Partial conversion of wheat kernels into black powdery masses of smelly teliospores',
      'Emits a pungent rotten fish odor caused by trimethylamine gas',
      'Infected grains have intact seed coat partially ruptured at the embryo end'
    ],
    visualIndicators: ['Black powdery ruptured grain kernels emitting foul fishy smell'],
    environmentalRiskFactors: {
      tempMin: 15,
      tempMax: 22,
      optimalTemp: 18,
      humidityMin: 80,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Overcast rainy days during the 5-7 day earhead emergence window'
    },
    possibleCauses: ['Airborne allantooid sporidia infecting florets during ear emergence'],
    evidenceSources: [{ title: 'Quarantine and biology of Tilletia indica in wheat exports', source: 'ICAR-IIWBR', year: 2023, confidence: 0.95, doiOrId: 'IIWBR-KB-2023' }],
    confidenceBase: 0.90,
    relatedGraphNodes: ['Wheat', 'Karnal Bunt', 'Trimethylamine', 'Ear Emergence'],
    preventiveMeasures: ['Avoid field irrigation during wheat heading/anthesis', 'Crop rotation with non-host graminaceous crops'],
    organicTreatments: ['Seed treatment with Trichoderma viride @ 4g/kg seed'],
    chemicalInterventions: ['Single spray of Propiconazole 25 EC @ 1ml/L at ear emergence stage']
  },

  // --- MAIZE DISEASES ---
  {
    id: 'maize_turcicum_leaf_blight',
    name: 'Turcicum Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    affectedCrops: ['Maize'],
    symptoms: [
      'Long, elliptical grayish-green or tan lesions (3-15 cm) tapering at ends ("cigar-shaped")',
      'Dark fungal sporulation on lesions during humid periods',
      'Premature burning of leaves giving field an early scorched appearance'
    ],
    visualIndicators: ['Large elongated cigar-shaped tan lesions along leaf veins'],
    environmentalRiskFactors: {
      tempMin: 18,
      tempMax: 28,
      optimalTemp: 23,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Moderate temperatures with heavy rains and cloudy skies'
    },
    possibleCauses: ['Wind and rain splash dispersal of conidia from lower infected leaves'],
    evidenceSources: [{ title: 'Exserohilum turcicum host-pathogen interaction in hybrid maize', source: 'IIMR Ludhiana', year: 2023, confidence: 0.91, doiOrId: 'IIMR-TLB-2023' }],
    confidenceBase: 0.88,
    relatedGraphNodes: ['Maize', 'Turcicum Leaf Blight', 'Cigar Shape', 'High Rainfall'],
    preventiveMeasures: ['Grow resistant hybrids (e.g., PMH series, DKC series)', 'Deep ploughing of infected stubble'],
    organicTreatments: ['Foliar application of Pseudomonas fluorescens @ 5g/L'],
    chemicalInterventions: ['Mancozeb 75 WP @ 2.5g/L or Azoxystrobin + Difenoconazole @ 1ml/L']
  },
  {
    id: 'maize_common_rust',
    name: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    affectedCrops: ['Maize'],
    symptoms: [
      'Small, circular to elongated golden-brown powdery pustules on both upper and lower leaf surfaces',
      'Pustules rupture epidermal tissues releasing millions of cinnamon-brown urediniospores',
      'Severely affected leaves yellow, dry, and die prematurely'
    ],
    visualIndicators: ['Cinnamon-brown pustules scattered across both leaf surfaces'],
    environmentalRiskFactors: {
      tempMin: 16,
      tempMax: 25,
      optimalTemp: 20,
      humidityMin: 85,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Cool, humid weather with frequent morning dew'
    },
    possibleCauses: ['Airborne spores originating from alternate oxalis hosts or southern regions'],
    evidenceSources: [{ title: 'Puccinia sorghi epidemiology in rabi maize belt', source: 'Indian Journal of Agricultural Sciences', year: 2022, confidence: 0.89, doiOrId: 'IJAS-2022-CR' }],
    confidenceBase: 0.87,
    relatedGraphNodes: ['Maize', 'Common Rust', 'Cool Dew', 'Puccinia sorghi'],
    preventiveMeasures: ['Early planting to escape late season infection', 'Balanced fertilizer application'],
    organicTreatments: ['Spray sulfur 80 WDG @ 3g/L'],
    chemicalInterventions: ['Propiconazole 25 EC @ 1ml/L or Mancozeb @ 2g/L at pustule initiation']
  },

  // --- CHILLI DISEASES ---
  {
    id: 'chilli_anthracnose',
    name: 'Anthracnose',
    scientificName: 'Colletotrichum capsici / C. gloeosporioides',
    affectedCrops: ['Chilli', 'Mango'],
    symptoms: [
      'Circular sunken dark spots on ripe fruits with concentric rings of salmon-pink acervuli',
      'Die-back of twigs starting from tip downwards, turning dry straw color',
      'Premature fruit drop and blackened rotting dried pods'
    ],
    visualIndicators: ['Circular sunken spots with pinkish gelatinous spore masses on red chillies'],
    environmentalRiskFactors: {
      tempMin: 24,
      tempMax: 34,
      optimalTemp: 28,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Overhead watering or unseasonal rains during fruit ripening'
    },
    possibleCauses: ['Seed-borne inoculum and rain splash dispersal onto wounded or mature pods'],
    evidenceSources: [{ title: 'Colletotrichum capsici management in Guntur chilli tract', source: 'ANGRAU Research Bulletin', year: 2023, confidence: 0.94, doiOrId: 'ANGRAU-CH-2023' }],
    confidenceBase: 0.91,
    relatedGraphNodes: ['Chilli', 'Anthracnose', 'Die Back', 'Guntur', 'High Humidity'],
    preventiveMeasures: ['Seed treatment with Thiram or Trichoderma @ 5g/kg', 'Avoid overhead sprinkler irrigation during ripening'],
    organicTreatments: ['Spray garlic-chilli-kerosene emulsion or NSKE 5%'],
    chemicalInterventions: ['Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L or Copper Oxychloride @ 3g/L']
  },
  {
    id: 'chilli_leaf_curl',
    name: 'Leaf Curl',
    scientificName: 'Chilli Leaf Curl Virus (ChiLCV)',
    affectedCrops: ['Chilli', 'Tomato'],
    symptoms: [
      'Upward rolling and curling of leaves (boat-shaped leaf margin)',
      'Shortening of petioles and internodes giving bushy rosetted appearance',
      'Small, deformed, and puckered fruits with poor seed count'
    ],
    visualIndicators: ['Inverted boat-shaped upward leaf curling with stunted bushy canopy'],
    environmentalRiskFactors: {
      tempMin: 25,
      tempMax: 38,
      optimalTemp: 32,
      humidityMin: 45,
      rainfallAffinity: 'Low',
      soilCondition: 'Dry warm climatic periods promoting Thrips and Whitefly migration'
    },
    possibleCauses: ['Transmitted primarily by Whiteflies (Bemisia tabaci) and Thrips (Scirtothrips dorsalis)'],
    evidenceSources: [{ title: 'Multiplex diagnosis and vector suppression for chilli leaf curl', source: 'IIHR Bengaluru', year: 2023, confidence: 0.93, doiOrId: 'IIHR-CHLCV-2023' }],
    confidenceBase: 0.90,
    relatedGraphNodes: ['Chilli', 'Leaf Curl', 'Thrips', 'Whitefly', 'Upward Curling'],
    preventiveMeasures: ['Intercropping with maize or sorghum as border crop (barrier crop)', 'Install blue and yellow sticky cards (20/acre)'],
    organicTreatments: ['Spray neem oil 10,000 ppm @ 2ml/L + pongamia oil @ 2ml/L'],
    chemicalInterventions: ['Fipronil 5 SC @ 2ml/L or Spinetoram 11.7 SC @ 0.9ml/L for vector knockdown']
  },

  // --- GROUNDNUT DISEASES ---
  {
    id: 'groundnut_leaf_spot',
    name: 'Leaf Spot',
    scientificName: 'Cercospora arachidicola (Early) / Cercosporidium personatum (Late)',
    affectedCrops: ['Groundnut'],
    symptoms: [
      'Early leaf spot: Circular reddish-brown spots with prominent bright yellow halos',
      'Late leaf spot (Tikka): Dark black circular spots on leaf lower surface without yellow halo',
      'Severe defoliation leaving bare stems with only top young leaves intact'
    ],
    visualIndicators: ['Blackish-brown Tikka spots on both leaf surfaces causing rapid leaf drop'],
    environmentalRiskFactors: {
      tempMin: 22,
      tempMax: 32,
      optimalTemp: 26,
      humidityMin: 80,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Continuous monocropping in sandy loam soils'
    },
    possibleCauses: ['Airborne and soil-borne conidia surviving in unploughed crop debris'],
    evidenceSources: [{ title: 'Tikka disease management in semi-arid tropics', source: 'ICRISAT Research Report', year: 2023, confidence: 0.92, doiOrId: 'ICRISAT-TK-2023' }],
    confidenceBase: 0.89,
    relatedGraphNodes: ['Groundnut', 'Leaf Spot', 'Tikka', 'Cercospora', 'ICRISAT'],
    preventiveMeasures: ['Crop rotation with cereals like Pearl Millet or Sorghum', 'Deep burial of crop residue'],
    organicTreatments: ['Spray neem leaf extract (5%) mixed with soap solution'],
    chemicalInterventions: ['Hexaconazole 5 EC @ 2ml/L or Tebuconazole 25.9 EC @ 1.25ml/L']
  },
  {
    id: 'groundnut_rust',
    name: 'Rust',
    scientificName: 'Puccinia arachidis',
    affectedCrops: ['Groundnut'],
    symptoms: [
      'Pustules appear predominantly on the lower surface of leaflets as orange-brown blisters',
      'Unlike leaf spots, rust leaves do not shed immediately but remain attached, dry, and curled',
      'Drastic reduction in pod filling and 100-kernel seed weight'
    ],
    visualIndicators: ['Orange-brown blistering pustules on leaflet undersides with curled crisp leaves'],
    environmentalRiskFactors: {
      tempMin: 20,
      tempMax: 30,
      optimalTemp: 24,
      humidityMin: 85,
      rainfallAffinity: 'High',
      soilCondition: 'Warm wet humid spells in Kharif season'
    },
    possibleCauses: ['Urediniospores carried by monsoon air currents'],
    evidenceSources: [{ title: 'Integrated rust and late leaf spot control in groundnut', source: 'TNAU Agronomy', year: 2022, confidence: 0.90, doiOrId: 'TNAU-GN-2022' }],
    confidenceBase: 0.87,
    relatedGraphNodes: ['Groundnut', 'Rust', 'Puccinia arachidis', 'Blister Pustules'],
    preventiveMeasures: ['Use rust-tolerant varieties like ICGV series', 'Timely early planting at monsoon arrival'],
    organicTreatments: ['Foliar spray of datura and neem leaf fermented decoction'],
    chemicalInterventions: ['Chlorothalonil 75 WP @ 2g/L or Mancozeb @ 2g/L']
  },

  // --- SUGARCANE DISEASES ---
  {
    id: 'sugarcane_red_rot',
    name: 'Red Rot',
    scientificName: 'Colletotrichum falcatum',
    affectedCrops: ['Sugarcane'],
    symptoms: [
      'Yellowing and drooping of upper third and fourth leaves, followed by complete drying of the crown',
      'When cane is split longitudinally, internal pith shows dark red discoloration interrupted by white transverse bands',
      'Alcoholic or acidic fermentation odor emitted from split diseased stalks'
    ],
    visualIndicators: ['Internal red pith with crosswise white patches and alcoholic fermentation smell'],
    environmentalRiskFactors: {
      tempMin: 25,
      tempMax: 38,
      optimalTemp: 30,
      humidityMin: 80,
      rainfallAffinity: 'High',
      soilCondition: 'Waterlogged, poorly drained heavy clay soils'
    },
    possibleCauses: ['Infected seed setts and irrigation water dispersal from diseased stools'],
    evidenceSources: [{ title: 'Pathotype shift and red rot epidemics in subtropical sugarcane', source: 'ICAR-IISR Lucknow', year: 2024, confidence: 0.96, doiOrId: 'IISR-RR-2024' }],
    confidenceBase: 0.93,
    relatedGraphNodes: ['Sugarcane', 'Red Rot', 'White Transverse Bands', 'Sett Treatment', 'Uttar Pradesh'],
    preventiveMeasures: ['Hot water treatment of seed setts at 52°C for 30 minutes', 'Use certified disease-free nursery setts (e.g. Co-0238 substitutes)'],
    organicTreatments: ['Sett dipping in Trichoderma viride culture slurry (10g/L) for 15 minutes before planting'],
    chemicalInterventions: ['Sett treatment with Carbendazim 50 WP @ 1g/L for 15 minutes']
  },

  // --- BANANA DISEASES ---
  {
    id: 'banana_panama_disease',
    name: 'Panama Disease',
    scientificName: 'Fusarium oxysporum f. sp. cubense (Tropical Race 4)',
    affectedCrops: ['Banana'],
    symptoms: [
      'Progressive yellowing of older lower leaves moving inward to younger leaves',
      'Buckling of leaf petioles where leaves hang down around the pseudostem like a skirt',
      'Longitudinal splitting of the base of the pseudostem',
      'Continuous reddish-brown to dark purple discoloration of internal vascular bundles'
    ],
    visualIndicators: ['Skirt-like hanging dried leaves and intense red-brown internal vascular ring in pseudostem'],
    environmentalRiskFactors: {
      tempMin: 24,
      tempMax: 36,
      optimalTemp: 28,
      humidityMin: 70,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Acidic, poorly drained sandy loam or flood-prone soils'
    },
    possibleCauses: ['Soil-borne chlamydospores persisting in soil for up to 30 years and contaminated suckers'],
    evidenceSources: [{ title: 'Tropical Race 4 containment and biosecurity protocols in Indian banana tracts', source: 'NRCB Tiruchirappalli', year: 2024, confidence: 0.97, doiOrId: 'NRCB-TR4-2024' }],
    confidenceBase: 0.94,
    relatedGraphNodes: ['Banana', 'Panama Disease', 'Fusarium TR4', 'NRCB', 'Skirt Symptom'],
    preventiveMeasures: ['Quarantine affected field; do not transport suckers or machinery', 'Plant tissue-culture plantlets of resistant somaclones'],
    organicTreatments: ['Heavy soil application of bio-agent Pseudomonas striata + Trichoderma asperellum in enriched neem cake'],
    chemicalInterventions: ['Capsule application of 2,4-D or glyphosating infected stools for eradication; Carbendazim injection @ 2%']
  },
  {
    id: 'banana_sigatoka',
    name: 'Sigatoka',
    scientificName: 'Pseudocercospora fijiensis / P. musae',
    affectedCrops: ['Banana'],
    symptoms: [
      'Tiny yellowish-green specks on leaf surface running parallel to veins',
      'Enlarging into elliptical reddish-brown to black streaks with light gray depressed center',
      'Extensive leaf scorching and destruction of green canopy leading to poor fruit filling'
    ],
    visualIndicators: ['Linear dark brown to black streaks with silver-gray center surrounded by yellow halo'],
    environmentalRiskFactors: {
      tempMin: 23,
      tempMax: 35,
      optimalTemp: 27,
      humidityMin: 85,
      rainfallAffinity: 'High',
      soilCondition: 'Overcrowded plantations with standing water and poor drainage'
    },
    possibleCauses: ['Wind-borne ascospores and rain-splashed conidia during monsoon months'],
    evidenceSources: [{ title: 'Sigatoka leaf spot management in tropical banana', source: 'NRCB Technical Bulletin', year: 2023, confidence: 0.91, doiOrId: 'NRCB-SIG-2023' }],
    confidenceBase: 0.89,
    relatedGraphNodes: ['Banana', 'Sigatoka', 'Leaf Streaks', 'High Humidity'],
    preventiveMeasures: ['De-leafing and burning severely spotted dried leaves', 'Maintain plant spacing and desuckering'],
    organicTreatments: ['Mineral oil / petroleum spray oil (1%) emulsion with copper hydroxide'],
    chemicalInterventions: ['Propiconazole 25 EC @ 1ml/L + 1% mineral oil or Pyraclostrobin 20 WG @ 1g/L']
  },

  // --- ONION DISEASES ---
  {
    id: 'onion_purple_blotch',
    name: 'Purple Blotch',
    scientificName: 'Alternaria porri',
    affectedCrops: ['Onion', 'Garlic'],
    symptoms: [
      'Small, water-soaked lesions that turn brown and develop distinct deep purple or dark red centers',
      'Surrounded by a broad chlorotic yellow band extending up and down the leaf blade',
      'Leaves break over at the point of infection, girdling seed stalk and reducing bulb size'
    ],
    visualIndicators: ['Sunken oval lesions with distinctive deep purple centers and yellow margins on tubular leaves'],
    environmentalRiskFactors: {
      tempMin: 20,
      tempMax: 32,
      optimalTemp: 25,
      humidityMin: 85,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Warm humid spells with frequent fog or sprinkler irrigation'
    },
    possibleCauses: ['Airborne fungal conidia and contaminated seed bulbs'],
    evidenceSources: [{ title: 'Alternaria porri purple blotch management in rabi onion', source: 'DOGR Rajgurunagar Pune', year: 2023, confidence: 0.92, doiOrId: 'DOGR-PB-2023' }],
    confidenceBase: 0.89,
    relatedGraphNodes: ['Onion', 'Purple Blotch', 'Alternaria porri', 'Maharashtra', 'DOGR'],
    preventiveMeasures: ['Raised bed planting to avoid water logging', 'Crop rotation with non-allium crops for 2-3 years'],
    organicTreatments: ['Foliar spray with Trichoderma harzianum @ 5g/L + sticker'],
    chemicalInterventions: ['Mancozeb 75 WP @ 2.5g/L or Tebuconazole 25.9 EC @ 1.25ml/L + spreader-sticker']
  },
  {
    id: 'onion_downy_mildew',
    name: 'Downy Mildew',
    scientificName: 'Peronospora destructor',
    affectedCrops: ['Onion'],
    symptoms: [
      'Pale green or yellow elongated patches on leaf blades',
      'Violet or purplish-gray velvety downy growth covering the lesions in cool morning hours',
      'Infected leaves collapse, turn pale, and dry from tips downwards'
    ],
    visualIndicators: ['Purplish-gray velvety downy mold on pale oval leaf lesions during morning dew'],
    environmentalRiskFactors: {
      tempMin: 10,
      tempMax: 22,
      optimalTemp: 15,
      humidityMin: 90,
      rainfallAffinity: 'Moderate',
      soilCondition: 'Cool, damp foggy mornings followed by warm days'
    },
    possibleCauses: ['Systemic mycelium in volunteer bulbs and airborne sporangia'],
    evidenceSources: [{ title: 'Peronospora destructor forecasting model in western India', source: 'ICAR-DOGR', year: 2022, confidence: 0.90, doiOrId: 'DOGR-DM-2022' }],
    confidenceBase: 0.87,
    relatedGraphNodes: ['Onion', 'Downy Mildew', 'Purplish Velvety Mold', 'Cool Morning Dew'],
    preventiveMeasures: ['Use disease-free sets and certified seeds', 'Orient planting rows with prevailing wind direction'],
    organicTreatments: ['Copper oxychloride 50 WP spray @ 2.5g/L'],
    chemicalInterventions: ['Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L at first disease detection']
  }
];

export const getDiseasesForCrop = (cropName: string): DiseaseData[] => {
  if (!cropName) return [];
  const cleanName = cropName.trim().toLowerCase();
  return DISEASES_DATA.filter(d => 
    d.affectedCrops.some(c => c.toLowerCase() === cleanName)
  );
};

export const getDiseaseById = (id: string): DiseaseData | undefined => {
  return DISEASES_DATA.find(d => d.id === id);
};

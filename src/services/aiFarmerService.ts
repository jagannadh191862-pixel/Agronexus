import { SupportedLanguage } from '../types';

export interface FarmerContext {
  state: string;
  district: string;
  crop: string;
  soil: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  ph: number;
  waterAvailability: string;
  season: string;
  symptoms?: string;
  voiceObservation?: string;
  hasImage?: boolean;
  activeDiseaseName?: string;
  diseaseConfidence?: number;
  topRecommendedCrop?: string;
  envSuitabilityScore?: number;
}

type FarmerResponse = {
  text: string;
  contextPills: string[];
  actionLinks?: { label: string; route: string }[];
};

export class AiFarmerService {
  public answerFarmerQuery(
    query: string,
    context: FarmerContext,
    language: SupportedLanguage = 'en'
  ): FarmerResponse {
    const q = query.toLowerCase().trim();

    const crop = context.crop || 'your crop';
    const state = context.state || 'your state';
    const district = context.district || 'your district';
    const soil = context.soil || 'Unknown soil';
    const temperature = Number(context.temperature) || 0;
    const humidity = Number(context.humidity) || 0;
    const rainfall = Number(context.rainfall) || 0;
    const ph = Number(context.ph) || 0;
    const water = context.waterAvailability || 'Unknown';
    const season = context.season || 'Unknown';
    const envScore = Number(context.envSuitabilityScore) || 0;
    const diseaseConfidence =
      Number(context.diseaseConfidence || 0) * 100;

    const pills = [
      crop,
      `${district}, ${state}`,
      `${temperature}°C | ${humidity}% RH`,
    ];

    const actions = {
      field: {
        label: 'Field Analysis',
        route: '/field-analysis',
      },
      crop: {
        label: 'Crop Suggestor',
        route: '/crop-suggestor',
      },
      environment: {
        label: 'Environment Analyzer',
        route: '/environment-analyzer',
      },
      disease: {
        label: 'Disease Analysis',
        route: '/field-analysis',
      },
      graph: {
        label: 'Knowledge Graph',
        route: '/knowledge-graph',
      },
      evidence: {
        label: 'Evidence Explorer',
        route: '/evidence',
      },
    };

    /*
     * ------------------------------------------------------------
     * QUERY UNDERSTANDING
     * ------------------------------------------------------------
     */

    const asksDisease =
      this.hasAny(q, [
        'disease',
        'diseases',
        'infection',
        'infected',
        'pest',
        'pests',
        'fungus',
        'fungal',
        'brown spot',
        'leaf spot',
        'spots',
        'blight',
        'symptom',
        'symptoms',
        'వ్యాధి',
        'రోగం',
        'మచ్చ',
        'మచ్చలు',
        'పురుగు',
        'रोग',
        'कीट',
        'धब्बे',
        'बीमारी',
      ]);

    const asksCrop =
      this.hasAny(q, [
        'crop',
        'crops',
        'grow',
        'growing',
        'plant',
        'planting',
        'sow',
        'sowing',
        'cultivate',
        'cultivation',
        'recommend',
        'recommendation',
        'suggest',
        'suggestion',
        'what should i grow',
        'which crop',
        'ఏ పంట',
        'పంట',
        'వేసుకోవాలి',
        'फसल',
        'क्या उगाएं',
      ]);

    const asksEnvironment =
      this.hasAny(q, [
        'environment',
        'weather',
        'climate',
        'temperature',
        'humidity',
        'rain',
        'rainfall',
        'soil',
        'ph',
        'water',
        'irrigation',
        'suitable',
        'conditions',
        'వాతావరణం',
        'ఉష్ణోగ్రత',
        'తేమ',
        'వర్షం',
        'నీరు',
        'మట్టి',
        'मौसम',
        'तापमान',
        'नमी',
        'बारिश',
        'मिट्टी',
        'पानी',
      ]);

    const asksEvidence =
      this.hasAny(q, [
        'evidence',
        'proof',
        'research',
        'source',
        'sources',
        'study',
        'studies',
        'reference',
        'references',
        'why',
        'explain',
        'explanation',
        'आधार',
        'साक्ष्य',
        'शोध',
        'పరిశోధన',
        'ఆధారం',
        'ఎందుకు',
      ]);

    const asksIrrigation =
      this.hasAny(q, [
        'irrigation',
        'irrigate',
        'water',
        'watering',
        'how much water',
        'when to water',
        'నీరు',
        'నీటిపారుదల',
        'पानी',
        'सिंचाई',
      ]);

    const asksFertilizer =
      this.hasAny(q, [
        'fertilizer',
        'fertiliser',
        'fertilize',
        'fertilise',
        'nutrient',
        'nutrition',
        'nitrogen',
        'phosphorus',
        'potassium',
        'npk',
        'ఎరువు',
        'పోషకం',
        'निषेचन',
        'उर्वरक',
        'पोषक',
      ]);

    const asksSoil =
      this.hasAny(q, [
        'soil',
        'soil health',
        'soil type',
        'ph',
        'మట్టి',
        'నేల',
        'मिट्टी',
      ]);

    /*
     * ------------------------------------------------------------
     * DISEASE ANALYSIS
     * ------------------------------------------------------------
     */

    if (asksDisease) {
      const diseaseName =
        context.activeDiseaseName || 'no specific disease result';

      const confidenceText =
        diseaseConfidence > 0
          ? `${diseaseConfidence.toFixed(0)}%`
          : 'not available';

      const humidityRisk =
        humidity >= 80
          ? 'High humidity can increase the risk of moisture-related fungal problems.'
          : humidity >= 65
            ? 'Moderate humidity means disease monitoring is still important.'
            : 'Current humidity is relatively lower, although disease monitoring should continue.';

      const temperatureRisk =
        temperature >= 25 && temperature <= 32
          ? 'The current temperature is within a range where several crop diseases can become active.'
          : 'The current temperature is outside that commonly favorable range for many fungal problems.';

      const symptomText = context.symptoms
        ? `You reported: "${context.symptoms}".`
        : 'No symptom description has been entered yet.';

      const imageText = context.hasImage
        ? 'An image has also been provided for the existing disease-analysis workflow.'
        : 'No crop image has been provided yet.';

      const text = this.localize(
        language,
        {
          en: `Disease assessment for ${crop} in ${district}, ${state}: ${diseaseName}. Image-analysis confidence: ${confidenceText}. ${symptomText} ${imageText} ${humidityRisk} ${temperatureRisk} Treat this as a potential match, not a guaranteed diagnosis. Check the affected leaves and compare the result with the Evidence Explorer before applying any treatment.`,
          te: `${district}, ${state}లో ${crop} పంటకు వ్యాధి విశ్లేషణ: ${diseaseName}. ఇమేజ్ విశ్లేషణ నమ్మక స్థాయి: ${confidenceText}. ${context.symptoms ? `"${context.symptoms}" అనే లక్షణాన్ని మీరు నమోదు చేశారు.` : 'లక్షణాల వివరాలు ఇంకా నమోదు చేయలేదు.'} ${context.hasImage ? 'పంట చిత్రాన్ని కూడా విశ్లేషణకు అందించారు.' : 'ఇంకా పంట చిత్రం ఇవ్వలేదు.'} ${humidity >= 80 ? 'తేమ ఎక్కువగా ఉండటం వల్ల ఫంగస్ సంబంధిత సమస్యల ప్రమాదం పెరగవచ్చు.' : 'ప్రస్తుత తేమను కూడా పర్యవేక్షించడం అవసరం.'} ${temperatureRisk} ఇది ఖచ్చితమైన వ్యాధి నిర్ధారణ కాదు. చికిత్స చేయడానికి ముందు ఫలితాన్ని ఆధారాలతో పరిశీలించండి.`,
          hi: `${district}, ${state} में ${crop} की रोग जांच: ${diseaseName}. इमेज विश्लेषण का confidence: ${confidenceText}. ${context.symptoms ? `आपने "${context.symptoms}" लक्षण दर्ज किया है।` : 'अभी कोई लक्षण दर्ज नहीं किया गया है।'} ${context.hasImage ? 'फसल की तस्वीर भी उपलब्ध है।' : 'अभी फसल की तस्वीर उपलब्ध नहीं है।'} ${humidity >= 80 ? 'अधिक नमी फफूंद संबंधी समस्याओं का जोखिम बढ़ा सकती है।' : 'नमी की निगरानी जारी रखें।'} ${temperatureRisk} इसे निश्चित रोग निदान न मानें। उपचार से पहले परिणाम और उपलब्ध साक्ष्य की जांच करें।`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.disease,
          actions.evidence,
          actions.graph,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * CROP RECOMMENDATION
     * ------------------------------------------------------------
     */

    if (asksCrop) {
      const recommended = context.topRecommendedCrop || crop;

      const waterMessage = this.waterAdvice(water, language);

      const text = this.localize(
        language,
        {
          en: `For your field in ${district}, ${state}, the current AgroNexus recommendation is ${recommended}. The decision is based on the available field context: ${soil} soil, pH ${ph}, ${temperature}°C temperature, ${humidity}% humidity, ${rainfall} mm rainfall, ${water} water availability, and ${season} season. The current environment suitability score is ${envScore || 'not available'}%. ${waterMessage} I would compare this crop with at least one alternative before making the final planting decision.`,
          te: `${district}, ${state}లో మీ పొలానికి ప్రస్తుత AgroNexus సూచన ${recommended}. ఈ సూచన ${soil} నేల, pH ${ph}, ${temperature}°C ఉష్ణోగ్రత, ${humidity}% తేమ, ${rainfall} మిమీ వర్షపాతం, ${water} నీటి లభ్యత మరియు ${season} సీజన్ ఆధారంగా రూపొందించబడింది. ప్రస్తుత పర్యావరణ అనుకూలత స్కోర్ ${envScore || 'అందుబాటులో లేదు'}%. ${this.waterAdvice(water, language)} తుది నిర్ణయం ముందు కనీసం ఒక ప్రత్యామ్నాయ పంటను కూడా పోల్చండి.`,
          hi: `${district}, ${state} के आपके खेत के लिए वर्तमान AgroNexus सुझाव ${recommended} है। यह सुझाव ${soil} मिट्टी, pH ${ph}, ${temperature}°C तापमान, ${humidity}% नमी, ${rainfall} मिमी वर्षा, ${water} पानी की उपलब्धता और ${season} मौसम को ध्यान में रखता है। वर्तमान पर्यावरण suitability score ${envScore || 'उपलब्ध नहीं'}% है। ${this.waterAdvice(water, language)} अंतिम निर्णय से पहले कम से कम एक वैकल्पिक फसल की तुलना करें।`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.crop,
          actions.environment,
          actions.field,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * ENVIRONMENT
     * ------------------------------------------------------------
     */

    if (asksEnvironment) {
      const scoreLabel =
        envScore >= 80
          ? 'favorable'
          : envScore >= 60
            ? 'moderately favorable'
            : envScore > 0
              ? 'needs attention'
              : 'not calculated';

      const text = this.localize(
        language,
        {
          en: `Current field environment for ${crop}: ${scoreLabel}. Temperature is ${temperature}°C, humidity is ${humidity}%, rainfall is ${rainfall} mm, soil pH is ${ph}, soil type is ${soil}, and water availability is ${water}. AgroNexus environment suitability is ${envScore || 'not calculated'}%. ${this.environmentAdvice(language, temperature, humidity, rainfall, ph, water)}`,
          te: `${crop} పంటకు ప్రస్తుత పొల వాతావరణం ${scoreLabel}. ఉష్ణోగ్రత ${temperature}°C, తేమ ${humidity}%, వర్షపాతం ${rainfall} మిమీ, నేల pH ${ph}, నేల రకం ${soil}, నీటి లభ్యత ${water}. AgroNexus పర్యావరణ అనుకూలత ${envScore || 'లెక్కించలేదు'}%. ${this.environmentAdvice(language, temperature, humidity, rainfall, ph, water)}`,
          hi: `${crop} के लिए वर्तमान खेत का वातावरण ${scoreLabel} है। तापमान ${temperature}°C, नमी ${humidity}%, वर्षा ${rainfall} मिमी, मिट्टी का pH ${ph}, मिट्टी ${soil} और पानी की उपलब्धता ${water} है। AgroNexus environment suitability ${envScore || 'गणना नहीं हुई'}% है। ${this.environmentAdvice(language, temperature, humidity, rainfall, ph, water)}`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.environment,
          actions.field,
          actions.crop,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * IRRIGATION / WATER
     * ------------------------------------------------------------
     */

    if (asksIrrigation) {
      const text = this.localize(
        language,
        {
          en: `Water management for ${crop}: the recorded water availability is "${water}", with ${rainfall} mm rainfall and ${soil} soil. Avoid deciding irrigation from a single value. Check field moisture, recent rainfall and crop stage before watering. ${this.waterAdvice(water, language)}`,
          te: `${crop} పంటకు నీటి నిర్వహణ: ప్రస్తుతం నీటి లభ్యత "${water}", వర్షపాతం ${rainfall} మిమీ మరియు నేల ${soil}. ఒక్క విలువ ఆధారంగా నీరు ఇవ్వవద్దు. నేల తేమ, ఇటీవల వచ్చిన వర్షం మరియు పంట దశను పరిశీలించి నీరు ఇవ్వండి. ${this.waterAdvice(water, language)}`,
          hi: `${crop} के लिए पानी प्रबंधन: पानी की उपलब्धता "${water}", वर्षा ${rainfall} मिमी और मिट्टी ${soil} है। केवल एक मान के आधार पर सिंचाई न करें। मिट्टी की नमी, हाल की वर्षा और फसल की अवस्था देखकर पानी दें। ${this.waterAdvice(water, language)}`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.environment,
          actions.field,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * FERTILIZER
     * ------------------------------------------------------------
     */

    if (asksFertilizer) {
      const text = this.localize(
        language,
        {
          en: `For fertilizer planning in ${crop}, the current field record shows ${soil} soil and pH ${ph}. I would not recommend a fixed fertilizer dose from these values alone. A soil test, crop stage and nutrient requirement should be checked first. Avoid excessive nitrogen when disease pressure or high humidity is present.`,
          te: `${crop} పంటకు ఎరువుల ప్రణాళికలో ప్రస్తుతం ${soil} నేల మరియు pH ${ph} ఉన్నాయి. ఈ వివరాల ఆధారంగా మాత్రమే ఖచ్చితమైన ఎరువు మోతాదును సూచించకూడదు. ముందుగా నేల పరీక్ష, పంట దశ మరియు పోషక అవసరాలను పరిశీలించాలి. తేమ ఎక్కువగా ఉండి వ్యాధి ప్రమాదం ఉన్నప్పుడు అధిక నైట్రోజన్ వాడకాన్ని నివారించండి.`,
          hi: `${crop} के लिए उर्वरक योजना में वर्तमान मिट्टी ${soil} और pH ${ph} है। केवल इन मानों के आधार पर निश्चित उर्वरक मात्रा बताना उचित नहीं है। पहले मिट्टी परीक्षण, फसल की अवस्था और पोषक आवश्यकता देखें। अधिक नमी और रोग जोखिम की स्थिति में अत्यधिक नाइट्रोजन से बचें।`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.field,
          actions.evidence,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * SOIL
     * ------------------------------------------------------------
     */

    if (asksSoil) {
      const text = this.localize(
        language,
        {
          en: `Your recorded soil is ${soil} with pH ${ph}. Soil suitability should be interpreted together with crop, water availability, rainfall and season. If the pH value looks unusual for the selected crop, use the Field Analysis and verify it with a soil test before making major input decisions.`,
          te: `మీ నమోదు చేసిన నేల ${soil}, pH ${ph}. నేల అనుకూలతను పంట, నీటి లభ్యత, వర్షపాతం మరియు సీజన్‌తో కలిసి చూడాలి. pH విలువ పంటకు అసాధారణంగా ఉంటే, పెద్ద నిర్ణయాలు తీసుకునే ముందు Field Analysis మరియు నేల పరీక్షను ఉపయోగించండి.`,
          hi: `आपकी दर्ज मिट्टी ${soil} है और pH ${ph} है। मिट्टी की suitability को फसल, पानी, वर्षा और मौसम के साथ देखना चाहिए। यदि pH फसल के लिए असामान्य लगे, तो बड़े निर्णय से पहले Field Analysis और मिट्टी परीक्षण से सत्यापन करें।`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.field,
          actions.environment,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * EVIDENCE / WHY
     * ------------------------------------------------------------
     */

    if (asksEvidence) {
      const text = this.localize(
        language,
        {
          en: `I am your AgroNexus AI Farmer assistant. I am analyzing your ${crop} field in ${district}, ${state}. Current conditions: ${temperature}°C temperature, ${humidity}% humidity, ${rainfall} mm rainfall, ${soil} soil, pH ${ph}, ${water} water availability and ${season} season.${context.symptoms ? ` You reported these symptoms: "${context.symptoms}".` : ''}

You can ask me about crop diseases, yellow or damaged leaves, pests, crop selection, irrigation, fertilizer, soil health, weather conditions, crop suitability, or why AgroNexus made a recommendation.

I will use the available field information to give you practical guidance. If the available information is not enough, I will tell you what additional information is needed.`,
          te: `ప్రస్తుత AgroNexus సమాధానం అప్లికేషన్‌లో ఉన్న ఫీల్డ్ సమాచారంపై ఆధారపడింది: ${crop}, ${soil} నేల, pH ${ph}, ${temperature}°C, ${humidity}% తేమ, ${rainfall} మిమీ వర్షపాతం, ${water} నీటి లభ్యత మరియు ${season} సీజన్. అందుబాటులో ఉంటే వ్యాధి మరియు పంట సూచనలు కూడా ఉపయోగించబడతాయి. ఈ సమాధానాన్ని స్వతంత్ర శాస్త్రీయ నిర్ధారణగా కాకుండా Evidence Explorerలో ఆధారాలు మరియు provenanceను పరిశీలించండి.`,
          hi: `वर्तमान AgroNexus उत्तर एप्लिकेशन में उपलब्ध खेत की जानकारी पर आधारित है: ${crop}, ${soil} मिट्टी, pH ${ph}, ${temperature}°C, ${humidity}% नमी, ${rainfall} मिमी वर्षा, ${water} पानी और ${season} मौसम। उपलब्ध होने पर रोग और फसल सुझाव भी उपयोग किए जाते हैं। इस उत्तर को स्वतंत्र वैज्ञानिक निदान न मानें; Evidence Explorer में उपलब्ध evidence और provenance देखें।`,
        }
      );

      return {
        text,
        contextPills: pills,
        actionLinks: [
          actions.evidence,
          actions.graph,
        ],
      };
    }

    /*
     * ------------------------------------------------------------
     * SMART GENERAL RESPONSE
     * ------------------------------------------------------------
     */

    const generalText = this.localize(
      language,
      {
        en: `I am analyzing your current ${crop} field in ${district}, ${state}. The recorded conditions are ${temperature}°C, ${humidity}% humidity, ${rainfall} mm rainfall, ${soil} soil, pH ${ph}, ${water} water availability and ${season} season.${context.symptoms ? ` You also reported: "${context.symptoms}".` : ''} You can ask me things like "Is my environment suitable?", "Which crop should I grow?", "What disease risk do I have?", "How should I manage water?", or "Why did AgroNexus give this recommendation?"`,
        te: `నేను ${district}, ${state}లో మీ ${crop} పంటను విశ్లేషిస్తున్నాను. ప్రస్తుత పరిస్థితులు ${temperature}°C, ${humidity}% తేమ, ${rainfall} మిమీ వర్షపాతం, ${soil} నేల, pH ${ph}, ${water} నీటి లభ్యత మరియు ${season} సీజన్.${context.symptoms ? ` మీరు "${context.symptoms}" అనే లక్షణాన్ని కూడా నమోదు చేశారు.` : ''} మీరు "నా వాతావరణం అనుకూలంగా ఉందా?", "ఏ పంట వేయాలి?", "వ్యాధి ప్రమాదం ఉందా?", "నీటిని ఎలా నిర్వహించాలి?", లేదా "ఈ సూచన ఎందుకు వచ్చింది?" అని అడగవచ్చు.`,
        hi: `मैं ${district}, ${state} में आपकी ${crop} फसल का विश्लेषण कर रहा हूँ। वर्तमान स्थिति ${temperature}°C, ${humidity}% नमी, ${rainfall} मिमी वर्षा, ${soil} मिट्टी, pH ${ph}, ${water} पानी और ${season} मौसम है।${context.symptoms ? ` आपने "${context.symptoms}" लक्षण भी दर्ज किया है।` : ''} आप पूछ सकते हैं: "क्या वातावरण उपयुक्त है?", "कौन सी फसल उगाऊं?", "रोग का जोखिम क्या है?", "पानी कैसे प्रबंधित करूं?", या "यह सुझाव क्यों दिया गया?"`,
      }
    );

    return {
      text: generalText,
      contextPills: pills,
      actionLinks: [
        actions.field,
        actions.crop,
        actions.environment,
        actions.disease,
      ],
    };
  }

  private hasAny(query: string, words: string[]): boolean {
    return words.some((word) => query.includes(word));
  }

  private localize(
    language: SupportedLanguage,
    messages: {
      en: string;
      te: string;
      hi: string;
    }
  ): string {
    if (language === 'te') return messages.te;
    if (language === 'hi') return messages.hi;
    return messages.en;
  }

  private waterAdvice(
    water: string,
    language: SupportedLanguage
  ): string {
    const value = water.toLowerCase();

    if (
      value.includes('low') ||
      value.includes('poor') ||
      value.includes('scarce') ||
      value.includes('limited')
    ) {
      if (language === 'te') {
        return 'నీటి లభ్యత తక్కువగా ఉన్నందున నీటి అవసరం తక్కువగా ఉండే పంటలు మరియు సమర్థవంతమైన నీటిపారుదల పద్ధతులను పరిగణించండి.';
      }

      if (language === 'hi') {
        return 'पानी की उपलब्धता कम होने पर कम पानी वाली फसल और कुशल सिंचाई पद्धति पर विचार करें।';
      }

      return 'Because water availability is limited, consider lower-water-demand crops and efficient irrigation methods.';
    }

    if (
      value.includes('good') ||
      value.includes('high') ||
      value.includes('available')
    ) {
      if (language === 'te') {
        return 'నీటి లభ్యత మంచిగా ఉన్నా, అవసరానికి మించి నీరు ఇవ్వకండి మరియు నేల తేమను పర్యవేక్షించండి.';
      }

      if (language === 'hi') {
        return 'पानी उपलब्ध होने पर भी जरूरत से ज्यादा सिंचाई न करें और मिट्टी की नमी की निगरानी करें।';
      }

      return 'Even with good water availability, avoid over-irrigation and monitor actual soil moisture.';
    }

    return language === 'te'
      ? 'నీటి నిర్వహణకు నేల తేమ మరియు పంట దశను కూడా పరిశీలించండి.'
      : language === 'hi'
        ? 'सिंचाई के लिए मिट्टी की नमी और फसल की अवस्था भी देखें।'
        : 'Also consider soil moisture and crop stage when planning irrigation.';
  }

  private environmentAdvice(
    language: SupportedLanguage,
    temperature: number,
    humidity: number,
    rainfall: number,
    ph: number,
    water: string
  ): string {
    const points: string[] = [];

    if (temperature > 35) {
      points.push(
        language === 'te'
          ? 'ఉష్ణోగ్రత ఎక్కువగా ఉంది; వేడి ఒత్తిడిని గమనించండి.'
          : language === 'hi'
            ? 'तापमान अधिक है; गर्मी के तनाव पर नजर रखें।'
            : 'Temperature is high, so monitor heat stress.'
      );
    } else if (temperature < 15) {
      points.push(
        language === 'te'
          ? 'ఉష్ణోగ్రత తక్కువగా ఉంది; చల్లని వాతావరణ ప్రభావాన్ని గమనించండి.'
          : language === 'hi'
            ? 'तापमान कम है; ठंड के प्रभाव पर नजर रखें।'
            : 'Temperature is low, so monitor cold-related stress.'
      );
    }

    if (humidity >= 80) {
      points.push(
        language === 'te'
          ? 'తేమ ఎక్కువగా ఉంది; ఆకులపై వ్యాధి లక్షణాలను గమనించండి.'
          : language === 'hi'
            ? 'नमी अधिक है; पत्तियों पर रोग के लक्षण देखें।'
            : 'Humidity is high, so monitor foliage for disease symptoms.'
      );
    }

    if (rainfall <= 20) {
      points.push(
        language === 'te'
          ? 'వర్షపాతం తక్కువగా ఉంది; నీటి నిర్వహణను పరిశీలించండి.'
          : language === 'hi'
            ? 'वर्षा कम है; पानी प्रबंधन पर ध्यान दें।'
            : 'Rainfall is low, so water management deserves attention.'
      );
    }

    if (rainfall >= 150) {
      points.push(
        language === 'te'
          ? 'వర్షపాతం ఎక్కువగా ఉంది; నీరు నిల్వ కాకుండా డ్రైనేజ్‌ను పరిశీలించండి.'
          : language === 'hi'
            ? 'वर्षा अधिक है; जलभराव से बचने के लिए drainage देखें।'
            : 'Rainfall is high, so check drainage and avoid waterlogging.'
      );
    }

    if (ph > 0 && (ph < 5.5 || ph > 8)) {
      points.push(
        language === 'te'
          ? 'pH పరిధి అసాధారణంగా ఉంది; నేల పరీక్షతో ధృవీకరించండి.'
          : language === 'hi'
            ? 'pH सीमा असामान्य है; मिट्टी परीक्षण से सत्यापन करें।'
            : 'The pH is outside a broad common range, so verify it with a soil test.'
      );
    }

    if (points.length === 0) {
      return language === 'te'
        ? 'ప్రస్తుత విలువల్లో ప్రత్యేకమైన హెచ్చరిక కనిపించడం లేదు. పంట దశను కూడా పరిగణించండి.'
        : language === 'hi'
          ? 'वर्तमान मानों में कोई प्रमुख चेतावनी नहीं दिख रही है। फसल की अवस्था भी ध्यान में रखें।'
          : 'No major warning is detected from these values alone. Crop stage should also be considered.';
    }

    return points.join(' ');
  }
}

export const aiFarmerService = new AiFarmerService();
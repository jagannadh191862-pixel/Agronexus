import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLanguage, SoilType, SeasonType, WaterAvailability, 
  CropRecommendation, EnvironmentAnalysisResult, DiseaseAnalysisResult, 
  SensorRecord, ChatMessage, DataSourceRecord 
} from '../types';
import { getDistricts, validateDistrictForState } from '../data/locations';
import { cropRecommendationService } from '../services/cropRecommendationService';
import { environmentAnalysisService } from '../services/environmentAnalysisService';
import { diseaseAnalysisService } from '../services/diseaseAnalysisService';
import { sensorValidationService } from '../services/sensorValidationService';
import { aiFarmerService } from '../services/aiFarmerService';
import { INITIAL_DATA_SOURCES } from '../data/dataSources';

interface AppContextType {
  // Localization & Route
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  activeRoute: string;
  navigateTo: (route: string) => void;

  // Agricultural Inputs
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
  selectedSoil: SoilType;
  setSelectedSoil: (soil: SoilType) => void;
  selectedSeason: SeasonType;
  setSelectedSeason: (season: SeasonType) => void;
  waterAvailability: WaterAvailability;
  setWaterAvailability: (water: WaterAvailability) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  humidity: number;
  setHumidity: (hum: number) => void;
  rainfall: number;
  setRainfall: (rain: number) => void;
  soilPh: number;
  setSoilPh: (ph: number) => void;
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
  voiceObservation: string;
  setVoiceObservation: (text: string) => void;
  capturedImage: string | null;
  setCapturedImage: (img: string | null) => void;

  // Computed Intelligence Results
  cropRecommendations: CropRecommendation[];
  environmentAnalysis: EnvironmentAnalysisResult;
  diseaseAnalysis: DiseaseAnalysisResult;
  isAnalyzing: boolean;
  runFieldAnalysis: () => void;
  runCropSuggestions: () => void;
  runEnvironmentAnalysis: () => void;
  resetAnalysis: () => void;

  // Sensors & Telemetry
  sensors: SensorRecord[];
  isQuarantined: boolean;
  simulateSensorAnomaly: () => void;
  resetSensors: () => void;

  // AI Farmer Chat
  chatHistory: ChatMessage[];
  sendFarmerMessage: (msg: string) => void;
  clearChat: () => void;
  isSpeaking: boolean;
  speakText: (text: string, lang?: SupportedLanguage) => void;
  stopSpeaking: () => void;

  // Data Sources
  dataSources: DataSourceRecord[];
  addDataSource: (source: Omit<DataSourceRecord, 'id' | 'recordsCount' | 'lastUpdated'>) => void;

  // UI Modals & Opening Animation
  isOpeningAnimationVisible: boolean;
  dismissOpeningAnimation: () => void;
  showOpeningAnimation: () => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Localization & Route
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('agronexus_lang') as SupportedLanguage) || 'en';
  });

  const [activeRoute, setActiveRoute] = useState<string>(() => {
    const path = window.location.pathname;
    return path && path.length > 1 ? path : '/';
  });

  // Agricultural Inputs - Initializing with Warangal, Telangana demo context
  const [selectedState, setSelectedStateInternal] = useState<string>('Telangana');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Warangal');
  const [selectedCrop, setSelectedCrop] = useState<string>('Paddy');
  const [selectedSoil, setSelectedSoil] = useState<SoilType>('Loamy');
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('Kharif');
  const [waterAvailability, setWaterAvailability] = useState<WaterAvailability>('High');
  const [temperature, setTemperature] = useState<number>(29);
  const [humidity, setHumidity] = useState<number>(84);
  const [rainfall, setRainfall] = useState<number>(1200);
  const [soilPh, setSoilPh] = useState<number>(6.5);
  const [symptoms, setSymptoms] = useState<string>('Brown spots on leaves');
  const [voiceObservation, setVoiceObservation] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Status flags
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isQuarantined, setIsQuarantined] = useState<boolean>(false);
  const [sensors, setSensors] = useState<SensorRecord[]>(() => sensorValidationService.getSensors());
  const [dataSources, setDataSources] = useState<DataSourceRecord[]>(INITIAL_DATA_SOURCES);
  const [isOpeningAnimationVisible, setIsOpeningAnimationVisible] = useState<boolean>(() => {
    return !sessionStorage.getItem('agronexus_animation_seen');
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Dynamic State -> District change handler
  const setSelectedState = (newState: string) => {
    setSelectedStateInternal(newState);
    const availableDistricts = getDistricts(newState);
    if (availableDistricts.length > 0) {
      // If previous district is not valid in new state, reset to first
      if (!validateDistrictForState(newState, selectedDistrict)) {
        setSelectedDistrict(availableDistricts[0]);
      }
    } else {
      setSelectedDistrict('');
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('agronexus_lang', lang);
  };

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Compute recommendations
  const computeCropRecommendations = (): CropRecommendation[] => {
    return cropRecommendationService.recommendCrops({
      state: selectedState,
      district: selectedDistrict,
      soil: selectedSoil,
      ph: soilPh,
      temperature,
      rainfall,
      waterAvailability,
      season: selectedSeason
    });
  };

  // Compute environment analysis
  const computeEnvironmentAnalysis = (): EnvironmentAnalysisResult => {
    return environmentAnalysisService.analyze({
      state: selectedState,
      district: selectedDistrict,
      cropName: selectedCrop,
      soil: selectedSoil,
      temperature,
      humidity,
      rainfall,
      soilPh,
      waterAvailability,
      season: selectedSeason
    });
  };

  // Compute disease analysis
  const computeDiseaseAnalysis = (): DiseaseAnalysisResult => {
    return diseaseAnalysisService.analyze({
      cropName: selectedCrop,
      state: selectedState,
      district: selectedDistrict,
      temperature,
      humidity,
      soil: selectedSoil,
      symptoms,
      voiceObservation,
      hasImage: !!capturedImage
    });
  };

  const [cropRecommendations, setCropRecommendations] = useState<CropRecommendation[]>(() => computeCropRecommendations());
  const [environmentAnalysis, setEnvironmentAnalysis] = useState<EnvironmentAnalysisResult>(() => computeEnvironmentAnalysis());
  const [diseaseAnalysis, setDiseaseAnalysis] = useState<DiseaseAnalysisResult>(() => computeDiseaseAnalysis());

  // Re-compute whenever primary inputs change
  useEffect(() => {
    setCropRecommendations(computeCropRecommendations());
    setEnvironmentAnalysis(computeEnvironmentAnalysis());
    setDiseaseAnalysis(computeDiseaseAnalysis());
  }, [
    selectedState, selectedDistrict, selectedCrop, selectedSoil, selectedSeason, 
    waterAvailability, temperature, humidity, rainfall, soilPh, symptoms, 
    voiceObservation, capturedImage
  ]);

  const runFieldAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setEnvironmentAnalysis(computeEnvironmentAnalysis());
      setDiseaseAnalysis(computeDiseaseAnalysis());
      setIsAnalyzing(false);
    }, 600);
  };

  const runCropSuggestions = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setCropRecommendations(computeCropRecommendations());
      setIsAnalyzing(false);
    }, 400);
  };

  const runEnvironmentAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setEnvironmentAnalysis(computeEnvironmentAnalysis());
      setIsAnalyzing(false);
    }, 400);
  };

  const resetAnalysis = () => {
    setSelectedState('Telangana');
    setSelectedDistrict('Warangal');
    setSelectedCrop('Paddy');
    setSelectedSoil('Loamy');
    setSelectedSeason('Kharif');
    setWaterAvailability('High');
    setTemperature(29);
    setHumidity(84);
    setRainfall(1200);
    setSoilPh(6.5);
    setSymptoms('Brown spots on leaves');
    setVoiceObservation('');
    setCapturedImage(null);
    sensorValidationService.resetSensors();
    setSensors(sensorValidationService.getSensors());
    setIsQuarantined(false);
  };

  // Sensor Anomaly Simulation
  const simulateSensorAnomaly = () => {
    const updated = sensorValidationService.simulateSensorAnomaly('S-007', 180.0);
    setSensors(updated);
    setIsQuarantined(true);
  };

  const resetSensors = () => {
    const restored = sensorValidationService.resetSensors();
    setSensors(restored);
    setIsQuarantined(false);
  };

  // AI Farmer Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Namaste! I am your explainable AgroNexus assistant. Your active field in Warangal, Telangana (Paddy, 29°C, 84% RH) is loaded. Ask me anything, or speak your question.',
      timestamp: 'Just now',
      language: 'en',
      contextPills: ['Paddy', 'Warangal, Telangana', '29°C | 84% RH'],
      actionLinks: [
        { label: 'View Disease Risk', route: '/field-analysis' },
        { label: 'Check Crop Suggestions', route: '/crop-suggestor' },
        { label: 'Inspect Knowledge Graph', route: '/knowledge-graph' }
      ]
    }
  ]);

  const sendFarmerMessage = (msg: string) => {
    if (!msg.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'farmer',
      text: msg,
      timestamp: 'Just now',
      language
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Generate context-aware response
    const context = {
      state: selectedState,
      district: selectedDistrict,
      crop: selectedCrop,
      soil: selectedSoil,
      temperature,
      humidity,
      rainfall,
      ph: soilPh,
      waterAvailability,
      season: selectedSeason,
      symptoms,
      voiceObservation,
      hasImage: !!capturedImage,
      activeDiseaseName: diseaseAnalysis.primaryDiagnosis,
      diseaseConfidence: diseaseAnalysis.potentialDiseases[0]?.confidence || 0.82,
      topRecommendedCrop: cropRecommendations[0]?.crop.name || 'Paddy',
      envSuitabilityScore: environmentAnalysis.overallScore
    };

    setTimeout(() => {
      const response = aiFarmerService.answerFarmerQuery(msg, context, language);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        language,
        contextPills: response.contextPills,
        actionLinks: response.actionLinks
      };
      setChatHistory(prev => [...prev, aiMessage]);
    }, 450);
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  // Text to Speech
  const speakText = (text: string, lang: SupportedLanguage = language) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to locale
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      ur: 'ur-IN'
    };

    utterance.lang = localeMap[lang] || 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Add Data Source
  const addDataSource = (source: Omit<DataSourceRecord, 'id' | 'recordsCount' | 'lastUpdated'>) => {
    const newRecord: DataSourceRecord = {
      id: `DS-0${dataSources.length + 1}`,
      ...source,
      recordsCount: 1,
      lastUpdated: 'Just now'
    };
    setDataSources(prev => [newRecord, ...prev]);
  };

  const dismissOpeningAnimation = () => {
    setIsOpeningAnimationVisible(false);
    sessionStorage.setItem('agronexus_animation_seen', 'true');
  };

  const showOpeningAnimation = () => {
    setIsOpeningAnimationVisible(true);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeRoute,
        navigateTo,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        selectedCrop,
        setSelectedCrop,
        selectedSoil,
        setSelectedSoil,
        selectedSeason,
        setSelectedSeason,
        waterAvailability,
        setWaterAvailability,
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        rainfall,
        setRainfall,
        soilPh,
        setSoilPh,
        symptoms,
        setSymptoms,
        voiceObservation,
        setVoiceObservation,
        capturedImage,
        setCapturedImage,
        cropRecommendations,
        environmentAnalysis,
        diseaseAnalysis,
        isAnalyzing,
        runFieldAnalysis,
        runCropSuggestions,
        runEnvironmentAnalysis,
        resetAnalysis,
        sensors,
        isQuarantined,
        simulateSensorAnomaly,
        resetSensors,
        chatHistory,
        sendFarmerMessage,
        clearChat,
        isSpeaking,
        speakText,
        stopSpeaking,
        dataSources,
        addDataSource,
        isOpeningAnimationVisible,
        dismissOpeningAnimation,
        showOpeningAnimation,
        isSearchModalOpen,
        setIsSearchModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

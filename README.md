# Agronexus — Evidence-Driven Agricultural Intelligence

> **"Agricultural AI Should Not Just Answer. It Should Show Why."**

AgroNexus connects crops, diseases, soil, weather, IoT telemetry, and scientific research into one unified, explainable, and multimodal agricultural intelligence platform.

---

## 🌾 Key Features

1. **Multimodal Perception**:
   - **Microphone Voice Input**: Powered by Web Speech recognition with native locale support for 12 Indian languages.
   - **Camera Vision Scanner**: Live camera leaf observation targeting reticle, capture, retake, and image feature matching.
   - **Text-to-Speech (TTS)**: Voice responses spoken aloud in the farmer's selected language.

2. **12 Indian Languages**:
   - English, Telugu (తెలుగు), Hindi (हिन्दी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Marathi (मराठी), Bengali (বাংলা), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Urdu (اردو).

3. **Dynamic Indian Location System**:
   - All 28 States and 8 Union Territories with dynamic State $\rightarrow$ District dependent cascade.

4. **Multi-Crop (25+) & Disease Pathology (36+) Engine**:
   - Dynamic host-pathogen filtering matching crops to their exact biological diseases.

5. **AI Crop Suggestor (`/crop-suggestor`)**:
   - Deterministic 7-factor weighted scoring (Location 20%, Soil 20%, Temp 15%, Rain 15%, pH 10%, Water 10%, Season 10%).
   - Transparent score breakdown and side-by-side comparison matrix.

6. **AI Environment Analyzer (`/environment-analyzer`)**:
   - 9-factor agro-meteorological validation with circular suitability gauge and limiting factor alerts.

7. **Interactive Semantic Knowledge Graph (`/knowledge-graph`)**:
   - 12,480 nodes and typed relationships with zoom, pan, search, filter, and inspector drawer.

8. **Scientific Provenance (`/evidence`) & Conflict Center (`/conflicts`)**:
   - 3,842 peer-reviewed records with provenance certificates.
   - Preserves opposing research studies and explains disagreements conditioned on environmental factors.

9. **IoT Telemetry Gatekeeper & Anomaly Quarantine (`/sensor-monitor`)**:
   - Live LoRaWAN sensor grid with real-time physical bounds validation and quarantine protection.

10. **AI Farmer Companion (`/ai-farmer`)**:
    - Context-aware conversational assistant powered by live telemetry and agronomic evidence.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/jagannadh191862-pixel/Agronexus.git
cd Agronexus

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Build Tool**: Vite
- **Architecture**: Hybrid Rule Engine + Deterministic Agronomic Modeling + Multi-modal Browser APIs

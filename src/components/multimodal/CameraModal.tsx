import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, Check, X, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageCaptured: (imageDataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onImageCaptured }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample verified field images for instant simulation or desktop environments
  const sampleLeafImages = [
    {
      name: 'Paddy Brown Spot Sample (Warangal)',
      url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
      description: 'Rice leaf with brown oval necrotic lesions and chlorotic borders.'
    },
    {
      name: 'Tomato Blight Leaf Sample',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22521?auto=format&fit=crop&w=600&q=80',
      description: 'Concentric ring target-board lesions on foliage.'
    },
    {
      name: 'Healthy Crop Leaf Reference',
      url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
      description: 'Vibrant green chlorophyll canopy with zero visible lesions.'
    }
  ];

  // Stop camera stream cleanly
  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setCameraError(null);
      initCamera();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen]);

  const initCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API is not supported in this browser. You can upload an image or choose a field sample below.');
      setIsInitializing(false);
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      setIsInitializing(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in your browser, or upload an image file directly.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera hardware detected on this device. You can upload a photo or use a sample below.');
      } else {
        setCameraError(`Camera unavailable (${err.message || 'System error'}). Use file upload or test samples.`);
      }
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopStream();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          stopStream();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    initCamera();
  };

  const handleConfirmImage = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
      stopStream();
      onClose();
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setCapturedImage(sampleUrl);
    stopStream();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Camera Crop Observation</h3>
              <p className="text-xs text-stone-400">Position infected leaf blade within scanner reticle</p>
            </div>
          </div>
          <button
            onClick={() => { stopStream(); onClose(); }}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {capturedImage ? (
            /* Image Preview Stage */
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Captured crop leaf observation"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Ready for Multi-modal Vision Extraction
              </div>
            </div>
          ) : stream ? (
            /* Live Camera Feed */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Agricultural Scanner Reticle Overlay */}
              <div className="absolute inset-8 border-2 border-emerald-400/60 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
                  <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
                </div>
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-black/60 text-emerald-300 text-[11px] font-mono tracking-wider backdrop-blur-sm border border-emerald-500/30">
                    ALIGN LEAF LESION
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
                  <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400" />
                </div>
              </div>
            </div>
          ) : isInitializing ? (
            <div className="flex flex-col items-center gap-3 text-stone-400">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
              <span className="text-xs">Initializing High-Resolution Camera Sensor...</span>
            </div>
          ) : cameraError ? (
            <div className="p-6 text-center max-w-sm flex flex-col items-center">
              <AlertTriangle className="w-10 h-10 text-amber-400 mb-2" />
              <p className="text-xs text-amber-200 mb-4">{cameraError}</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Upload className="w-4 h-4" /> Upload Leaf Photo
              </button>
            </div>
          ) : null}

          {/* Hidden Canvas for Frame Capture */}
          <canvas ref={canvasRef} className="hidden" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Sample Images & Controls */}
        <div className="p-4 bg-stone-950/60 border-t border-stone-800">
          {!capturedImage ? (
            <div>
              {/* Primary Capture Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-emerald-400" /> Upload Photo
                </button>
                {stream && (
                  <button
                    onClick={handleCapturePhoto}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Camera className="w-4 h-4" /> Capture Photo
                  </button>
                )}
              </div>

              {/* Sample Field Images for Instant Validation */}
              <div className="border-t border-stone-800/80 pt-3">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Or Select Verified Ground-Truth Sample:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sampleLeafImages.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(s.url)}
                      className="p-1.5 rounded-xl bg-stone-800/60 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
                    >
                      <img src={s.url} alt={s.name} className="w-full h-14 object-cover rounded-lg mb-1.5" />
                      <div className="text-[11px] font-medium text-stone-200 group-hover:text-emerald-300 truncate">
                        {s.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Preview State Controls */
            <div className="flex items-center justify-between">
              <button
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Photo
              </button>
              <button
                onClick={handleConfirmImage}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Use Image for Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

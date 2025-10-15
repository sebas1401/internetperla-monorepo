import { useState } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Gestiona tus Tareas",
    description: "Visualiza todas tus instalaciones y mantenimientos asignados en tiempo real",
    icon: "📋",
  },
  {
    title: "Control de Asistencia",
    description: "Registra tu entrada y salida con geolocalización automática",
    icon: "⏰",
  },
  {
    title: "Inventario Personal",
    description: "Controla tus equipos asignados y solicita reposiciones fácilmente",
    icon: "📦",
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between p-6 py-12">
      {/* Indicators */}
      <div className="flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="text-7xl mb-4">{slides[currentSlide].icon}</div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
          <p className="text-muted-foreground max-w-xs">{slides[currentSlide].description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full space-y-3">
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <Button variant="outline" onClick={handlePrev} className="flex-1">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentSlide < slides.length - 1 ? (
              <>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Comenzar"
            )}
          </Button>
        </div>
        {currentSlide < slides.length - 1 && (
          <Button variant="ghost" onClick={onComplete} className="w-full text-muted-foreground">
            Saltar
          </Button>
        )}
      </div>
    </div>
  );
}

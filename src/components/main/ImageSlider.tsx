
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Training Session",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dk6dHh9wG6t2a55KEarzx9kNhfHQDz.png",
    description: "Professional training and development sessions for students",
  },
  {
    id: 2,
    title: "Study Abroad",
    image: "/placeholder.svg?height=600&width=1200",
    description: "International education opportunities",
  },
  {
    id: 3,
    title: "Test Preparation",
    image: "/placeholder.svg?height=600&width=1200",
    description: "Expert guidance for international exams",
  },
]

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const timerRef = React.useRef<NodeJS.Timeout>()

  const goToNextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const startTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(goToNextSlide, 15000)
  }, [goToNextSlide])

  React.useEffect(() => {
    if (isPlaying) {
      startTimer()
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, startTimer])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying && timerRef.current) {
      clearInterval(timerRef.current)
    } else {
      startTimer()
    }
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Main Image Container */}
      <div className="relative aspect-[16/9] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-transform duration-500 ease-in-out",
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full",
            )}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black/30">
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <h3 className="text-xl font-bold">{slide.title}</h3>
                <p className="mt-2 text-sm text-gray-200">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Play/Pause Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 rounded-full bg-white/80 hover:bg-white"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="sr-only">{isPlaying ? "Pause slideshow" : "Play slideshow"}</span>
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-4" : "bg-white/50 hover:bg-white/75",
            )}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}



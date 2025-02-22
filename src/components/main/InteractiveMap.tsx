"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const countries = {
  USA: {
    name: "United States",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 210 120 L 380 120 L 380 200 L 210 200 Z",
    universities: [
      "Harvard University",
      "Massachusetts Institute of Technology",
      "Stanford University",
      "Yale University",
      "Columbia University",
    ],
    coordinates: { x: 280, y: 160 },
  },
  Canada: {
    name: "Canada",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 210 50 L 380 50 L 380 119 L 210 119 Z",
    universities: [
      "University of Toronto",
      "McGill University",
      "University of British Columbia",
      "University of Montreal",
      "University of Alberta",
    ],
    coordinates: { x: 280, y: 85 },
  },
  UK: {
    name: "United Kingdom",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 470 100 L 490 100 L 490 120 L 470 120 Z",
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "UCL",
      "University of Edinburgh",
    ],
    coordinates: { x: 480, y: 110 },
  },
  Australia: {
    name: "Australia",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 800 300 L 900 300 L 900 380 L 800 380 Z",
    universities: [
      "University of Melbourne",
      "University of Sydney",
      "Australian National University",
      "University of Queensland",
      "Monash University",
    ],
    coordinates: { x: 850, y: 340 },
  },
  Japan: {
    name: "Japan",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 850 140 L 870 140 L 870 180 L 850 180 Z",
    universities: [
      "University of Tokyo",
      "Kyoto University",
      "Osaka University",
      "Tohoku University",
      "Nagoya University",
    ],
    coordinates: { x: 860, y: 160 },
  },
  India: {
    name: "India",
    color: "#FF6B38",
    image: "/placeholder.svg?height=200&width=300",
    path: "M 700 180 L 750 180 L 750 240 L 700 240 Z",
    universities: [
      "Indian Institute of Technology Bombay",
      "Indian Institute of Science",
      "University of Delhi",
      "Indian Institute of Technology Delhi",
      "Indian Institute of Technology Madras",
    ],
    coordinates: { x: 725, y: 210 },
  },
}

export default function DestinationMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(selectedCountry === countryId ? null : countryId)
  }

  const handleDropdownMouseEnter = () => {
    if (hoveredCountry) {
      setSelectedCountry(hoveredCountry)
    }
  }

  return (
    <div className="min-h-screen bg-[#005AAB] relative overflow-hidden p-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
      >
        Choose Your Destination
      </motion.h1>

      {/* Map Container */}
      <div className="relative w-full max-w-6xl mx-auto aspect-[2/1] bg-[#005AAB]">
        {/* World Map SVG */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))" }}
        >
          {/* Base World Map */}
          <path d="M50,20 L950,20 L950,480 L50,480 Z" fill="#0070CC" stroke="#fff" strokeWidth="0.5" />

          {/* Continents Outline */}
          <path
            d="M150,60 L400,60 L400,250 L150,250 Z
               M420,80 L520,80 L520,200 L420,200 Z
               M600,100 L800,100 L800,300 L600,300 Z
               M750,250 L950,250 L950,400 L750,400 Z"
            fill="#0080E5"
            stroke="#fff"
            strokeWidth="0.5"
          />

          {/* Interactive Country Areas */}
          {Object.entries(countries).map(([id, country]) => (
            <g key={id}>
              <path
                d={country.path}
                fill={selectedCountry === id || hoveredCountry === id ? "#FF8B38" : "#FF6B38"}
                stroke="#fff"
                strokeWidth="1"
                className="cursor-pointer transition-colors duration-300"
                onMouseEnter={() => setHoveredCountry(id)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => handleCountryClick(id)}
              />
              <text
                x={country.coordinates.x}
                y={country.coordinates.y}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                className="pointer-events-none"
              >
                {country.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Country Information Dropdown */}
        <AnimatePresence>
          {(selectedCountry || hoveredCountry) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bg-white rounded-xl shadow-2xl p-6 w-80 z-50"
              style={{
                left: countries[selectedCountry || (hoveredCountry as keyof typeof countries)].coordinates.x,
                top: countries[selectedCountry || (hoveredCountry as keyof typeof countries)].coordinates.y,
                transform: "translate(-50%, calc(-100% - 20px))",
              }}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={() => setSelectedCountry(null)}
            >
              <div className="relative">
                {/* Country Image */}
                <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                  <img
                    src={countries[selectedCountry || (hoveredCountry as keyof typeof countries)].image}
                    alt={countries[selectedCountry || (hoveredCountry as keyof typeof countries)].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {countries[selectedCountry || (hoveredCountry as keyof typeof countries)].name}
                  </h3>
                </div>

                {/* Universities List */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Top Universities:</h4>
                  {countries[selectedCountry || (hoveredCountry as keyof typeof countries)].universities.map(
                    (uni, index) => (
                      <motion.div
                        key={uni}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center group"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#FF6B38] mr-3" />
                        <a href="#" className="text-gray-600 hover:text-[#FF6B38] transition-colors">
                          {uni}
                        </a>
                      </motion.div>
                    ),
                  )}
                </div>

                {/* Learn More Button */}
                <a
                  href={`/destinations/${selectedCountry || hoveredCountry}`}
                  className="mt-6 block w-full bg-[#FF6B38] text-white py-2 rounded-lg hover:bg-[#E55A27] transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



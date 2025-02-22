"use client"
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import UniversityList from './UniversityList';
import { HoverCard } from '@/components/ui/hover-card';
import { Card } from '@/components/ui/card';


const highlightedCountries = {
  USA: {
    color: '#FF6B6B',
    universities: [
      { name: 'Harvard University', location: 'Cambridge, MA' },
      { name: 'Stanford University', location: 'Stanford, CA' },
      { name: 'MIT', location: 'Cambridge, MA' },
    ]
  },
  Canada: {
    color: '#FF6B6B',
    universities: [
      { name: 'University of Toronto', location: 'Toronto' },
      { name: 'McGill University', location: 'Montreal' },
      { name: 'University of British Columbia', location: 'Vancouver' },
    ]
  },
  India: {
    color: '#FF6B6B',
    universities: [
      { name: 'IIT Delhi', location: 'New Delhi' },
      { name: 'IIT Bombay', location: 'Mumbai' },
      { name: 'IIT Madras', location: 'Chennai' },
    ]
  },
  Australia: {
    color: '#FF6B6B',
    universities: [
      { name: 'University of Melbourne', location: 'Melbourne' },
      { name: 'University of Sydney', location: 'Sydney' },
      { name: 'Australian National University', location: 'Canberra' },
    ]
  },
  Japan: {
    color: '#FF6B6B',
    universities: [
      { name: 'University of Tokyo', location: 'Tokyo' },
      { name: 'Kyoto University', location: 'Kyoto' },
      { name: 'Osaka University', location: 'Osaka' },
    ]
  }
};
const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Configure mapboxgl with the token
      mapboxgl.accessToken = mapboxToken;
      
      console.log('Initializing map with token:', mapboxToken.substring(0, 8) + '...');

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20],
        zoom: 1.5,
        trackResize: true,
        crossSourceCollisions: false,
        preserveDrawingBuffer: true,
        antialias: true
      });

      map.current = newMap;

      // Add comprehensive error handling
      newMap.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(e.error?.message || 'An error occurred loading the map');
      });

      newMap.on('load', () => {
        console.log('Map loaded successfully');
        setMapLoaded(true);
        setMapError(null);
        
        // Add hover interactions after map is loaded
        Object.keys(highlightedCountries).forEach(country => {
          newMap.on('mousemove', country, () => {
            setHoveredCountry(country);
          });

          newMap.on('mouseleave', country, () => {
            setHoveredCountry(null);
          });
        });
      });

      // Clean up on unmount
      return () => {
        console.log('Cleaning up map instance');
        newMap.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(error instanceof Error ? error.message : 'Failed to initialize map');
    }
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Mapbox Token Required</h2>
        <p className="mb-4">Please enter your public Mapbox access token to view the map.</p>
        <input
          type="text"
          placeholder="Enter Mapbox token"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          You can find your token at{' '}
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            mapbox.com/account/access-tokens
          </a>
        </p>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <p className="text-red-600 p-4 bg-white rounded shadow">{mapError}</p>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      {hoveredCountry && (
        <HoverCard>
          <Card className="absolute top-4 right-4 w-80 bg-white/90 backdrop-blur-sm p-4 shadow-lg">
            <UniversityList 
              country={hoveredCountry}
              universities={highlightedCountries[hoveredCountry as keyof typeof highlightedCountries].universities}
            />
          </Card>
        </HoverCard>
      )}
    </div>
  );
};

export default WorldMap;


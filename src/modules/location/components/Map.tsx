import React, { useEffect, useRef } from 'react';
import { useOnScreen } from '../../../shared/hooks/UseOnScreen';

const isBrowser = typeof window !== 'undefined';

type CenterProps = {
  lat: number;
  lng: number;
};

type StylersProps = {
  color: string;
};

type StylesProps = {
  featureType?: string;
  elementType: string;
  stylers: StylersProps[];
};

type OptionsProps = {
  center: CenterProps;
  zoom: number;
  mapTypeControl: boolean;
  fullscreenControl: boolean;
  streetViewControl: boolean;
  styles: StylesProps[];
  zoomControl?: boolean;
};

type MapsProps = {
  id: string;
  // customStyle?: { featureType?: string, elementType?:string, stylers: [{ [key: string]: string | number }] }[];
  options: OptionsProps;
  onMapLoad: (param: unknown) => void;
  height?: string | undefined;
};

const Map: React.FC<MapsProps> = ({ id, options, onMapLoad, height }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    const onScriptLoad = (): void => {
      if (isBrowser && window.google) {
        const map: google.maps.Map = new window.google.maps.Map(
          document.getElementById(id),
          options,
        );
        map.setOptions({
          styles: [
            {
              featureType: 'poi.sports_complex',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.school',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.place_of_worship',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.medical',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.government',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.attraction',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }],
            },
            { elementType: 'geometry', stylers: [{ color: '#282828' }] },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#000000' }],
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }],
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#1b1b1b' }],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#747474' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#747474' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#747474' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#1a1a1a' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#363636' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#5a5a5a' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#343434' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1a1a1a' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#8a8a8a' }],
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#1b1b1b' }],
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#1b1b1b' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#2b323a' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#626264' }],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#2b323a' }],
            },
            // ...customStyle
          ],
        });
        onMapLoad(map);
      }
    };
    if (isVisible) {
      onScriptLoad();
    }
  }, [id, options, onMapLoad, isVisible]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: height || 'calc(100% - 76px)',
      }}
      id={id}
    />
  );
};

export default Map;

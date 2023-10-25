import React, { useState } from 'react';
import Map from './components/Map';
import Address from './components/Address';

const isBrowser = typeof window !== 'undefined';

type LocationProps = {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
};

export const Location: React.FC<LocationProps> = ({
  name,
  address,
  city,
  state,
}): JSX.Element => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const addressComplete = `${address} ${city} ${state}`;

  if (isBrowser && window.google) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: addressComplete }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
      }
    });
  }

  return (
    <>
      <Map
        id="myMap"
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          center: { lat, lng },
          zoom: 17,
          styles: [],
        }}
        onMapLoad={(map: google.maps.Map | undefined) => {
          if (isBrowser) {
            const marker = new window.google.maps.Marker({
              position: { lat, lng },
              map,
              title: name,
            });
            return marker;
          }
          return null;
        }}
      />
      <Address address={addressComplete} lat={lat} lng={lng} />
    </>
  );
};

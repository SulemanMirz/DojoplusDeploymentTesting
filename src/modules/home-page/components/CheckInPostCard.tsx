import router from 'next/router';
import React from 'react';
import MapComponent from '../../location/components/MapComponent';
import {
  LetDo,
  MapContainer,
  SchoolAvatar,
  SchoolInfo,
  SchoolLocation,
  SchoolName,
  SchoolNameLocation,
  TeamSchoolLogo,
} from './posts.styled';

type CheckInPostCardProps = {
  caption?: string;
  lat: string;
  lng: string;
  mapId: string;
  schoolAvatar: string;
  schoolName: string;
  schoolLocation: string;
  schoolSlug: string;
};

const CheckInPostCard: React.FC<CheckInPostCardProps> = ({
  caption,
  lat,
  lng,
  mapId,
  schoolAvatar,
  schoolName,
  schoolLocation,
  schoolSlug,
}) => {
  const defaultSchoolAvatar = '/assets/logo/dojo.png';
  return (
    <>
      <LetDo>{caption}</LetDo>
      <MapContainer>
        <MapComponent
          lat={parseFloat(lat)}
          lng={parseFloat(lng)}
          title={schoolName?.[0]}
          id={mapId}
          zoomControl={false}
        />
      </MapContainer>
      <SchoolInfo onClick={() => router.push(`/school/${schoolSlug}/info`)}>
        <TeamSchoolLogo>
          <SchoolAvatar
            variant="circular"
            src={schoolAvatar || defaultSchoolAvatar}
          />
        </TeamSchoolLogo>
        <SchoolNameLocation>
          <SchoolName>{schoolName}</SchoolName>
          <SchoolLocation>{schoolLocation}</SchoolLocation>
        </SchoolNameLocation>
      </SchoolInfo>
    </>
  );
};

export default CheckInPostCard;

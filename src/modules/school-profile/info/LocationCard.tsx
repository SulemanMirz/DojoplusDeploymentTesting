import React from 'react';
import styled from 'styled-components';
import { School } from '../../../shared/models/school.model';
import MapComponent from '../../location/components/MapComponent';

const Container = styled.div`
  margin-top: 25px;
`;
const TitleDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LocationTitle = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
`;
const Location = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;

const ProfileMapContainer = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 24px;
  overflow: hidden;
  margin-top: 25px;
`;

const Street = styled.div`
  margin-top: 8px;
`;

// const customLocationColor: any = [
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{ color: '#f3f3f3' }],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [{ color: '#B6E59E' }],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [{ color: '#447E27' }],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [{ color: '#737A99' }],
//   },
//   { elementType: 'geometry', stylers: [{ color: '#F3EEE8' }] },
//   // #8086A3
// ];

// type LocationCardProps = {
//   customStyle?: {
//     featureType?: string;
//     elementType?: string;
//     stylers: [{ [key: string]: string | number }];
//   }[];
// };

type LocationCardProps = {
  data: School;
};

const LocationCard: React.FC<LocationCardProps> = ({ data }) => {
  return (
    <Container>
      <TitleDescriptionContainer>
        <LocationTitle>Location</LocationTitle>
        <Street>{data?.address1}</Street>
        <Location>
          {data?.city || ''} {data?.state || ''} {data?.country || ''}
        </Location>
      </TitleDescriptionContainer>
      <ProfileMapContainer>
        <MapComponent
          // customStyle={customLocationColor}
          lat={data?.lat}
          lng={data?.long}
          title="hammad"
          id="1"
          zoomControl={false}
        />
      </ProfileMapContainer>
    </Container>
  );
};

export default LocationCard;

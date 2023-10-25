import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  background: #282828;
  width: 100%;
  height: 80px;
  border-top: 1px solid rgba(255, 89, 95, 1);
`;

const AddressStyled = styled.a`
  font-style: normal;
  font-weight: 600;
  height: 5rem;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  display: flex;
  cursor: default;
  border-top-width: 10px;
  border-color: rgba(255, 89, 95, 1);
  text-decoration: none;
  cursor: pointer;
  color: #fff;
`;

type AddressProps = {
  address: string;
  lat: number;
  lng: number;
};

const Address: React.FC<AddressProps> = ({ address, lat, lng }) => {
  return (
    <Content>
      <AddressStyled
        href={`https://maps.google.com/?q=${lat},${lng}`}
        target="_blank"
        rel="noreferrer">
        {address}
      </AddressStyled>
    </Content>
  );
};

export default Address;

import React from 'react';
import styled from 'styled-components';
import { TextWhite15Regular } from '../../../shared/components/texts';

const YoutubeCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  position: relative;
  @media screen and (max-width: 600px) {
    /* width: 100%; */
  }
`;

const TitleLink = styled.a`
  text-decoration: none;
  padding-block: 1rem;
`;

export const YoutubeEmbed: React.FC<{
  id: string;
  snippet: { title: string };
}> = ({ id, snippet }) => (
  <YoutubeCont>
    <iframe
      height="155.75px"
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
      allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{ borderRadius: 4 }}
    />
    <TitleLink
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer">
      <TextWhite15Regular>{snippet.title}</TextWhite15Regular>
    </TitleLink>
  </YoutubeCont>
);

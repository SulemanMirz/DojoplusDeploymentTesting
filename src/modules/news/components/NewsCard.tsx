import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { NewsCardContainer, PosterContainer, PosterImg } from './news.styled';
import { INews } from '../../../shared/models/news.model';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';

export const TextWhite24CapitalizeBold = styled.span`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 24px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 700;
  margin: 0;
  line-height: 28px;
`;

const TextGray11Regular = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 11px;
  color: #b3b3b3;
  font-weight: 400;
  line-height: 16px;
  margin-block: 0px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TextGray14Regular = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: #b3b3b3;
  font-weight: 400;
  line-height: 16px;
  margin-block: 0px;
`;

const Logo = styled.img`
  height: 9px;
  margin-right: 4px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
`;
const DescriptionContainer = styled.div`
  padding: 6px 0px 0px;
`;
const NonFeaturedNewsCardWraper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const NonFeaturePosterImage = styled.img`
  width: 100%;
  min-width: 100%;
  border-radius: 4px;
`;
export const NonFeaturePosterContainer = styled.div`
  position: relative;
  height: 100% !important;
  cursor: pointer;
  flex: 1;
`;

const NonFeatureDescriptionContainer = styled.div`
  flex: 1;
`;

const NonFeatureTextWhite18CapitalizeBold = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 18px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
  padding-right: 2px;
  line-height: 21px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

type FeaturedNewsCardProps = {
  data: INews;
};

export const FeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({ data }) => {
  const title = data?.headline;

  const coverImage = data?.cover;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.published
    ? dayjs(data.published).format('MMMM D, YYYY')
    : '';

  return (
    <NewsCardContainer>
      {imgUrl && (
        <PosterContainer>
          <PosterImg src={imgUrl} alt={data.channel?.channel} />
        </PosterContainer>
      )}
      <DescriptionContainer
        style={{
          ...(!imgUrl && {
            paddingTop: 0,
          }),
        }}>
        <Item>
          <TextWhite24CapitalizeBold>{title}</TextWhite24CapitalizeBold>
        </Item>
        <Item style={{ paddingBlock: 6 }}>
          {data.channel?.logo ? (
            <Logo src={data.channel?.logo[0].url} />
          ) : (
            <TextGray11Regular style={{ paddingRight: 4 }}>
              {data.channel?.channel}
            </TextGray11Regular>
          )}
          <TextGray11Regular>{`${formatedDate} ${data.author ? 'by' : ''} ${
            data.author || ''
          }`}</TextGray11Regular>
        </Item>
        <TextGray14Regular>{data.subtitle}</TextGray14Regular>
      </DescriptionContainer>
    </NewsCardContainer>
  );
};

export const NonFeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({
  data,
}) => {
  const title = data?.headline;

  const coverImage = data?.cover;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.published
    ? dayjs(data.published).format('MMMM D, YYYY')
    : '';

  return (
    <NewsCardContainer>
      <NonFeaturedNewsCardWraper>
        {imgUrl && (
          <NonFeaturePosterContainer>
            <NonFeaturePosterImage src={imgUrl} alt={data.channel?.channel} />
          </NonFeaturePosterContainer>
        )}
        <NonFeatureDescriptionContainer>
          <Item>
            <NonFeatureTextWhite18CapitalizeBold>
              {title}
            </NonFeatureTextWhite18CapitalizeBold>
          </Item>
          <Item style={{ paddingBlock: 6 }}>
            {data.channel?.logo ? (
              <Logo src={data.channel?.logo[0].url} />
            ) : (
              <TextGray11Regular style={{ paddingRight: 4 }}>
                {data.channel?.channel}
              </TextGray11Regular>
            )}
            <TextGray11Regular
              style={{ paddingLeft: 4 }}>{`${formatedDate}`}</TextGray11Regular>
          </Item>
          {!imgUrl && <TextGray14Regular>{data.subtitle}</TextGray14Regular>}
        </NonFeatureDescriptionContainer>
      </NonFeaturedNewsCardWraper>
    </NewsCardContainer>
  );
};

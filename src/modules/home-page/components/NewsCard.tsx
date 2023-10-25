import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';
import {
  NewsCardContainer,
  PosterContainer,
  PosterImg,
} from '../../news/components/news.styled';
import { Post } from '../../../shared/models/post.model';

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
  text-decoration: none;
`;

type FeaturedNewsCardProps = {
  data: Post;
};

export const FeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({ data }) => {
  const title = data?.headlineFromAllArticles;

  const coverImage = data?.coverFromAllArticles;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.posted
    ? dayjs(data.posted).format('MMMM D, YYYY')
    : '';

  return (
    <NewsCardContainer>
      {imgUrl && (
        <PosterContainer>
          <PosterImg src={imgUrl} alt={data?.channelFromAllArticles?.[0]} />
        </PosterContainer>
      )}
      <DescriptionContainer
        style={{
          ...(!imgUrl && {
            paddingTop: 0,
          }),
        }}
      >
        <Item>
          <TextWhite24CapitalizeBold>{title}</TextWhite24CapitalizeBold>
        </Item>
        <Item style={{ paddingBlock: 6 }}>
          {data?.logoFromAllArticles ? (
            <Logo src={data?.logoFromAllArticles[0].url} />
          ) : (
            <TextGray11Regular style={{ paddingRight: 4 }}>
              {data?.channelFromAllArticles}
            </TextGray11Regular>
          )}
          <TextGray11Regular>{`${formatedDate} ${
            data.authorFromAllArticles ? 'by' : ''
          } ${data.authorFromAllArticles || ''}`}</TextGray11Regular>
        </Item>
        <TextGray14Regular>{data.subtitleFromAllArticles}</TextGray14Regular>
      </DescriptionContainer>
    </NewsCardContainer>
  );
};

export const NonFeaturedNewsCard: React.FC<FeaturedNewsCardProps> = ({
  data,
}) => {
  const title = data?.headlineFromAllArticles;

  const coverImage = data?.coverFromAllArticles;
  const imgUrl = coverImage && coverImage[0]?.url;

  const formatedDate = data?.posted
    ? dayjs(data.posted).format('MMMM D, YYYY')
    : '';

  return (
    <NewsCardContainer>
      <NonFeaturedNewsCardWraper>
        {imgUrl && (
          <NonFeaturePosterContainer>
            <NonFeaturePosterImage
              src={imgUrl}
              alt={data?.channelFromAllArticles?.[0]}
            />
          </NonFeaturePosterContainer>
        )}
        <NonFeatureDescriptionContainer>
          <Item>
            <NonFeatureTextWhite18CapitalizeBold>
              {title}
            </NonFeatureTextWhite18CapitalizeBold>
          </Item>
          <Item style={{ paddingBlock: 6 }}>
            {data?.logoFromAllArticles ? (
              <Logo src={data?.logoFromAllArticles[0].url} />
            ) : (
              <TextGray11Regular
                style={{ paddingRight: 4, whiteSpace: 'nowrap' }}
              >
                {data?.channelFromAllArticles}
              </TextGray11Regular>
            )}
            <TextGray11Regular
              style={{ paddingLeft: 4 }}
            >{`${formatedDate}`}</TextGray11Regular>
          </Item>
          {!imgUrl && (
            <TextGray14Regular>
              {data.subtitleFromAllArticles}
            </TextGray14Regular>
          )}
        </NonFeatureDescriptionContainer>
      </NonFeaturedNewsCardWraper>
    </NewsCardContainer>
  );
};

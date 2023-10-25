import React from 'react';
import {
  TextWhite24CapitalizeBold,
  TextWhite14CapitalizeRegular,
  TextGray14CapitalizeRegular,
  TextWhite14UppercaseRegular,
  LinkWhite24CapitalizeBold,
} from '../../../shared/components/texts';
import { ExternalVideo } from '../../../shared/models/video.model';
import { Buy } from './Icons';
import {
  CategoryTitle,
  VideosRow,
  MoreVideosCard,
  MoreVideosPoster,
  MoreVideosPosterImg,
  MoreVideosText,
  ButtonCard,
  IconButton,
} from './videos-styled';

type VideoProps = {
  videos: ExternalVideo[];
  category: string;
  url: string | null | undefined;
};
export const VideoLinks: React.FC<VideoProps> = ({ videos, category, url }) => {
  return (
    <>
      <CategoryTitle>
        {url ? (
          <LinkWhite24CapitalizeBold
            rel="nofollow"
            target="=_blank"
            href={`${url}?utm_source=DOJO+&utm_medium=Social%20Media&utm_campaign=Profile&utm_content=Videos&utm_term=DOJO+`}
          >
            {category}
          </LinkWhite24CapitalizeBold>
        ) : (
          <TextWhite24CapitalizeBold>{category}</TextWhite24CapitalizeBold>
        )}
      </CategoryTitle>
      <VideosRow className="no-scroll-element">
        {videos.map((video) => (
          <MoreVideosCard
            rel="nofollow"
            target="=_blank"
            href={
              `${video.videoUrlProfilePage}?utm_source=DOJO+&utm_medium=Social%20Media&utm_campaign=Profile&utm_content=Videos&utm_term=DOJO+` ||
              'https://bjjfanatics.com/products/the-half-guard-anthology-by-lachlan-giles'
            }
          >
            <MoreVideosPoster>
              <MoreVideosPosterImg
                src={
                  video.videoCover ? video.videoCover[0].url : video.imageUrl
                }
                alt={video.videoTitle}
              />
              <MoreVideosText>
                <TextWhite14CapitalizeRegular>
                  {video.videoTitle || ''}
                </TextWhite14CapitalizeRegular>
                <TextGray14CapitalizeRegular>
                  {video.platform || ''}
                </TextGray14CapitalizeRegular>
              </MoreVideosText>
            </MoreVideosPoster>
            <ButtonCard>
              <IconButton>
                <Buy size={14} />
              </IconButton>
              <TextWhite14UppercaseRegular>
                buy video
              </TextWhite14UppercaseRegular>
            </ButtonCard>
          </MoreVideosCard>
        ))}
      </VideosRow>
    </>
  );
};

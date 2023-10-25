import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';

import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { LinkWhite24CapitalizeBold } from '../../shared/components/texts';

import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';
import { CategoryTitle, VideoCard } from './components/videos-styled';
import { VideoLinks } from './components/VideoLinks';
import { YoutubeEmbed } from './components/YoutubeEmbed';
import { ExternalVideo, YoutubeVideo } from '../../shared/models/video.model';
import { User } from '../../shared/models/user.model';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  @media screen and (max-width: 425px) {
    justify-content: center;
  }
`;

type VideosProps = {
  username: string;
  youtube: string | null | undefined;
  profile: User | null | undefined;
};

export const Videos: React.FC<VideosProps> = ({
  username,
  youtube,
  profile,
}) => {
  const [externalVideos, setExternalVideos] = useState<ExternalVideo[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      const requests = [];
      requests.push(
        axios('/api/Video', {
          params: {
            username,
          },
        }).then((res) => {
          setExternalVideos(res.data);
        }),
      );
      const channelId: string | undefined = youtube?.split('channel/')
        ? youtube.split('channel/')[1]?.split('?')[0]
        : undefined;
      let forUsername: string | undefined;
      if (!channelId) {
        forUsername = youtube?.split('c/')
          ? youtube.split('c/')[1]?.split('?')[0]
          : undefined;
      }
      if (channelId || forUsername) {
        requests.push(
          axios('/api/Youtube', {
            params: {
              ...(channelId ? { channelId } : { forUsername }),
            },
          }).then((res) => {
            setYoutubeVideos(res.data);
          }),
        );
      }

      Promise.all(requests).then(() => setLoading(false));
    }
  }, [username, youtube]);

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (youtubeVideos.length === 0 && externalVideos.length === 0) {
    return <ProfileTabEmptyMessage value="There is no videos to show" />;
  }
  const cate: string[] = externalVideos.map((item) => item.platform);
  const categories = Array.from(new Set(cate));
  return (
    <Container>
      {youtubeVideos.length > 0 && (
        <>
          <CategoryTitle>
            <LinkWhite24CapitalizeBold
              rel="nofollow"
              target="=_blank"
              href={
                `${youtube}?utm_source=DOJO+&utm_medium=Social%20Media&utm_campaign=Profile&utm_content=Videos&utm_term=DOJO+` ||
                'https://bjjfanatics.com/products/the-half-guard-anthology-by-lachlan-giles'
              }>
              YouTube
            </LinkWhite24CapitalizeBold>
          </CategoryTitle>
          <VideoCard className="no-scroll-element">
            {youtubeVideos.map(({ id, snippet }) => {
              return (
                <YoutubeEmbed
                  id={id.videoId}
                  snippet={snippet}
                  key={id.videoId}
                />
              );
            })}
          </VideoCard>
        </>
      )}
      {categories.map((cat) => {
        const videos = externalVideos.filter((video) => video.platform === cat);
        return (
          <VideoLinks
            key={cat}
            videos={videos}
            category={cat}
            url={profile ? profile[_.camelCase(cat)] : ''}
          />
        );
      })}
    </Container>
  );
};

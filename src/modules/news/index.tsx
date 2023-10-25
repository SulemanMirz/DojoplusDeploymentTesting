import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';
import { FeaturedNewsCard, NonFeaturedNewsCard } from './components/NewsCard';
import { INews } from '../../shared/models/news.model';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

interface NewsViewProps {
  username: string;
}
export const News: React.FC<NewsViewProps> = ({ username }) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios('/api/News', {
      params: {
        username,
      },
    }).then((res) => {
      setNews(res.data.news);
      setLoading(false);
    });
  }, [username]);

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (!news || news.length === 0) {
    return <ProfileTabEmptyMessage value="There is no news to show" />;
  }

  return (
    <Container>
      {news &&
        [
          ...news.sort(
            (a, b) => +new Date(b.published) - +new Date(a.published),
          ),
        ].map((data) => {
          if (data.featured) {
            return (
              <a
                href={data.link}
                target="_blank"
                rel="noreferrer"
                key={data.id}
                style={{ textDecoration: 'none' }}
              >
                <FeaturedNewsCard data={data} />
              </a>
            );
          }
          return (
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              key={data.id}
              style={{ textDecoration: 'none' }}
            >
              <NonFeaturedNewsCard data={data} />
            </a>
          );
        })}
    </Container>
  );
};

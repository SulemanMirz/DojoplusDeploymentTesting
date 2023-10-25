import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import BottomNavBar from '../bottom-nav/BottomNav';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import HeaderDojo from '../headers/HeaderDojo';
import PostCard from './components/PostCard';
import { HomeSearchModal } from './components/HomeSearchModal';
import ModalOverlay from '../modal-overlay';
import HomeSkeleton from './components/HomeSkeleton';

const Icon = styled.img``;

const LoadingWrapper = styled.div<{ loading }>`
  height: ${({ loading }) => (loading ? '24px' : '0px')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 15px;
  position: relative;
  transition: all ease-in-out 1s;
`;

const Home: React.FC = () => {
  const { authUser } = useFirebaseAuth();
  const [posts, setPosts] = useState([]);
  const [postLength, setPostLength] = useState(0);
  const [pageNo, setPageNo] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchMore = async (page?: number): Promise<void> => {
    setLoading(true);
    await axios('/api/Posts', {
      params: {
        pageNo: page || pageNo,
      },
    })
      .then((res) => {
        setPosts(
          page ? [...res?.data?.posts] : [...posts, ...res?.data?.posts],
        );
        setPostLength(res.data.length);
        setLoading(false);
        setPageNo((page || pageNo) + 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log('An error occurred while updating the posts', e);
      });
  };
  useEffect(() => {
    fetchMore(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Loader = (): JSX.Element => (
    <LoadingWrapper loading={loading}>
      <CircularProgress color="primary" size={loading ? 20 : 0} />
    </LoadingWrapper>
  );

  return (
    <>
      <HeaderDojo
        backgroundColor="#101010"
        IconRight={<Icon src="/assets/icons/search.svg" />}
        onIconRightClick={handleModal}
        IconLeft={<Icon src="/assets/icons/notification-bell.svg" />}
      />
      <InfiniteScroll
        style={{
          padding: '50px 16px 100px',
          height: '100%',
        }}
        next={fetchMore}
        hasMore={posts?.length <= postLength}
        loader={<Loader />}
        endMessage={
          <LoadingWrapper loading>
            {' '}
            Hey! You&apos;ve seen all available posts{' '}
          </LoadingWrapper>
        }
        releaseToRefreshContent={<Loader />}
        pullDownToRefresh
        pullDownToRefreshThreshold={150}
        refreshFunction={() => {
          setPageNo(1);
          fetchMore(1);
        }}
        dataLength={posts?.length}
      >
        <LoadingWrapper loading>
          <CircularProgress
            color="primary"
            size={20}
            variant="determinate"
            value={65}
          />
        </LoadingWrapper>

        {posts.length === 0 ? (
          <>
            {['', '', '', ''].map(() => (
              <HomeSkeleton />
            ))}
          </>
        ) : (
          <>
            <Loader />
            {[...posts]
              ?.sort((a, b) => +new Date(b.posted) - +new Date(a.posted))
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </>
        )}
      </InfiniteScroll>
      <ModalOverlay
        open={isModalVisible}
        width="100%"
        isHeaderHidden
        color="cyan"
        onCloseClick={handleModal}
        borderRadius="none"
        maxWidth="100%"
        height="100%"
      >
        <HomeSearchModal handleModal={handleModal} />
      </ModalOverlay>
      {authUser && <BottomNavBar />}
    </>
  );
};

export default Home;

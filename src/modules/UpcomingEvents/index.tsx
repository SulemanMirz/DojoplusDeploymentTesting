import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { EventCard } from './components/EventCard';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import BottomNavBar from '../bottom-nav/BottomNav';
import { EventsFilterModal, FilterData } from './components/EventsFilterModal';
import { SAFE_AREA_VIEW_PADDING_TOP } from '../../shared/styles/SafeAreaView';
import HeaderDojo from '../headers/HeaderDojo';
import { Container } from '../../shared/components/layout/Container';
import EventsCardSkeleton from './components/EventsCardSkeleton';

const EventsWrapper = styled.div`
  padding-top: ${`${SAFE_AREA_VIEW_PADDING_TOP + 56}px`};
  display: flex;
  flex-wrap: wrap;
`;

const FilterIcon = styled.img``;

const LoadingWrapper = styled.div<{ loading }>`
  height: ${({ loading }) => (loading ? '24px' : '0px')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: ${({ loading }) => (loading ? '25px' : '0px')};
  position: relative;
  transition: all ease-in-out 1s;
`;

export const UpcomingEvents: React.FC = () => {
  const [eventPosts, setEventPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventPostLength, setEventPostLength] = useState(1);
  const [pageNo, setPageNo] = useState(2);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const { authUser } = useFireBaseAuth();

  const fetchMore = async (page?: number): Promise<void> => {
    setLoading(true);
    if (selectedCountries?.length && page === 1) setEventPosts([]);
    await axios('/api/UpcomingEvents', {
      params: {
        offset: page || pageNo,
        countries: JSON.stringify(selectedCountries),
      },
    })
      .then((res) => {
        if (selectedCountries?.length && page === 1) {
          setEventPosts([...res?.data?.events]);
        } else {
          setEventPosts([...eventPosts, ...res?.data?.events]);
        }
        setEventPostLength(res.data.length);
        if (!selectedCountries?.length) setLocations(res.data?.countries);
        setLoading(false);
        setPageNo((page || pageNo) + 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log('An error occurred while updating the eventPosts', e);
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

  // const allMartialArts = eventPosts
  //   ?.map((e) => {
  //     if (e.martialArts)
  //       return e?.martialArts?.split(',')?.map((martialArt) => ({
  //         name: martialArt,
  //         selected: false,
  //       }));
  //     return { name: '' };
  //   })
  //   .flat();

  // const availableMartialArts = allMartialArts.filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.name === value.name && t.name !== ''),
  // );

  // const allEventTypes = eventPosts.map((e) => {
  //   const name = e?.eventType;
  //   return { name, selected: false };
  // });
  // const availableEventTypes = allEventTypes.filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.name === value.name),
  // );

  // const allLocations = eventPosts.map((e) => {
  //   const name = e?.country && e?.country;
  //   return { name, selected: false };
  // });
  // const availableCountries = allLocations.filter(
  //   (value, index, self) =>
  //     index ===
  //     self.findIndex((t) => t.name === value.name && t.name !== undefined),
  // );

  // const [martialArts, setMartialArts] = useState(availableMartialArts);
  // const [eventTypes, setEventTypes] = useState(availableEventTypes);

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleApply: (
    martial: FilterData[],
    type: FilterData[],
    locationParam: FilterData[],
  ) => void = (martial, type, locationParam) => {
    setSelectedCountries([
      ...locationParam?.filter((loc) => loc.selected)?.map((loc) => loc.name),
    ]);
    setPageNo(1);
    fetchMore(1);
    // setMartialArts(martial);
    // setEventTypes(type);
    // setLocations(locationParam);

    // const selectedMartial = martial
    //   .filter((val) => val.selected === true)
    //   .map((el) => el.name);
    // const selectedType = type
    //   .filter((val) => val.selected === true)
    //   .map((el) => el.name);
    const selectedLocation = locationParam
      .filter((val) => val.selected === true)
      .map((el) => el.name);

    // let eventsTemp = [...eventPosts];

    // if (selectedMartial.length !== 0) {
    //   eventsTemp = eventsTemp.filter((el) => {
    //     if (el.martialArts) {
    //       return el.martialArts.find((martialArt) =>
    //         selectedMartial.includes(martialArt),
    //       );
    //     }
    //     return false;
    //   });
    // }
    // if (selectedType.length !== 0) {
    //   eventsTemp = eventsTemp.filter((el) =>
    //     selectedType.includes(el.eventType),
    //   );
    // }


    if (selectedLocation.length !== 0) {
      // eventsTemp = eventsTemp.filter((el) =>
      //   selectedLocation.includes(el.country),
      // );
      setLocations(locationParam);
    }
    // setEventPosts(eventsTemp);
    handleModal();
  };

  return (
    <>
      <HeaderDojo
        title="Events"
        IconRight={<FilterIcon src="/assets/icons/filter-icon.svg" />}
        onIconRightClick={handleModal}
      />
      <Container
        notGutters
        style={{ padding: '0px 0px 65px 0px', backgroundColor: '#282828' }}>
        <>
          <InfiniteScroll
            loader={<Loader />}
            hasMore={eventPosts?.length < eventPostLength}
            next={fetchMore}
            endMessage={
              <LoadingWrapper loading>
                Hey! You&apos;ve seen all available eventPosts{' '}
              </LoadingWrapper>
            }
            refreshFunction={() => {
              setPageNo(1);
              fetchMore(1);
            }}
            dataLength={eventPosts?.length}>
            <EventsWrapper>
              {eventPosts.length === 0 ? (
                <>
                  {[...new Array(4)].map(() => (
                    <EventsCardSkeleton />
                  ))}
                </>
              ) : (
                <>
                  {eventPosts &&
                    eventPosts.map((data) => {
                      return (
                        <>
                          <EventCard key={data.recordId} data={data} />
                        </>
                      );
                    })}
                </>
              )}
            </EventsWrapper>
          </InfiniteScroll>
        </>
        <EventsFilterModal
          open={isModalVisible}
          handleModal={handleModal}
          locations={locations}
          handleApply={handleApply}
          // martialArts={martialArts}
          // eventTypes={eventTypes}
        />
        {authUser && <BottomNavBar />}
      </Container>
    </>
  );
};

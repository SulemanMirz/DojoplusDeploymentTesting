import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React from 'react';
import styled from 'styled-components';
import useLiveTime from '../../../shared/hooks/useLiveTime';
import UserAvatar from '../../userAvatar';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: '',
    past: '%s',
    s: 'a few sec',
    m: 'a min',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dmonths',
    y: 'a year',
    yy: '%dyears',
  },
});

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

const DescriptionContainer = styled.div`
  padding-left: 10px;
`;

const DescriptionHeader = styled.div`
  font-family: Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: rgb(252, 252, 252);
`;

const DescriptionDetail = styled.div`
  font-family: 'Saira';
  margin: 5px 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
`;

const SinceText = styled.span`
  color: gray;
  font-weight: 200;
  padding-left: 5px;
`;

type CommentsType = {
  contentData: any;
};

const Comments: React.FC<CommentsType> = ({ contentData }) => {
  const liveTime = useLiveTime();
  const lastActive = dayjs(liveTime).to(
    dayjs(contentData?.data?.createdAt?.toDate()),
  );
  return (
    <CommentContainer>
      <AvatarContainer>
        <UserAvatar
          avatarDimension={30}
          username={contentData?.data?.username}
        />
      </AvatarContainer>
      <DescriptionContainer>
        <DescriptionHeader>
          {contentData?.data?.displayName}
          <SinceText>
            {'  '}
            {lastActive}
          </SinceText>
        </DescriptionHeader>
        <DescriptionDetail>{contentData?.data?.comment}</DescriptionDetail>
      </DescriptionContainer>
    </CommentContainer>
  );
};

export default Comments;

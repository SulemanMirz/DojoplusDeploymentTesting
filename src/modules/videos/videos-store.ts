import { createEvent } from '@cobuildlab/react-simple-state';
import { GetProfileVideosQuery as GetProfileVideosQueryType } from '../../shared/types/generated';

export const ProfileVideosStore = createEvent<GetProfileVideosQueryType>();
export const ErrorGetProfileVideos = createEvent<Error>();

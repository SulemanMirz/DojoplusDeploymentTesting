import { createEvent } from '@cobuildlab/react-simple-state';
import { GetProfileQuery as GetProfileQueryType } from '../../shared/types/generated';

export const Profile = createEvent<GetProfileQueryType>();
export const ErrorGetProfile = createEvent<Error>();

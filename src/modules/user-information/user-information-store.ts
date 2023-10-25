import { createEvent } from '@cobuildlab/react-simple-state';
import { GetUserInformationQuery as GetUserInformationQueryType } from '../../shared/types/generated';

export const UserInformationStore = createEvent<GetUserInformationQueryType>();
export const ErrorGetUserInformation = createEvent<Error>();

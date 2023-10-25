import { createEvent } from '@cobuildlab/react-simple-state';
import { GetProfileGroupsQuery as GetProfileGroupsQueryType } from '../../shared/types/generated';

export const GroupsStore = createEvent<GetProfileGroupsQueryType>();
export const ErrorGetGroups = createEvent<Error>();

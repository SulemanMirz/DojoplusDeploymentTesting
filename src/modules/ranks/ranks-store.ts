import { createEvent } from '@cobuildlab/react-simple-state';
import { GetRanksQuery as GetRanksQueryType } from '../../shared/types/generated';

export const RanksStore = createEvent<GetRanksQueryType>();
export const ErrorGetRanks = createEvent<Error>();

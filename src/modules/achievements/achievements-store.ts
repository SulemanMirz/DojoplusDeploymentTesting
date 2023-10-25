import { createEvent } from '@cobuildlab/react-simple-state';
import { GetAchivementsQuery as GetAchivementsQueryType } from '../../shared/types/generated';

export const Achivement = createEvent<GetAchivementsQueryType>();
export const ErrorGetAchivement = createEvent<Error>();

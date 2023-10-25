import { createEvent } from '@cobuildlab/react-simple-state';
import { GetPlansQuery } from '../../shared/types/generated';

export const Plans = createEvent<GetPlansQuery>();
export const ErrorGetPlan = createEvent<Error>();

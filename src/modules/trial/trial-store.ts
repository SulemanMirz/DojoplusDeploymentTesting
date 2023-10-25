import { createEvent } from '@cobuildlab/react-simple-state';
import { CreatePreSignupMutation as CreatePreSignupMutationType } from '../../shared/types/generated';

export const OnCreatedSchoolTrial =
  createEvent<CreatePreSignupMutationType['preSignupCreate']>();
export const OnErrorCreateTrial = createEvent<Error>();

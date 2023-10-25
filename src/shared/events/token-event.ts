import { createEvent } from '@cobuildlab/react-simple-state';

export interface InitialStateType {
  token: null | string;
}

const INITIAL_STATE = {
  token: null,
};

export const OnTokenEvent = createEvent<InitialStateType>({
  initialValue: INITIAL_STATE,
});
export const OnTokenErrorEvent = createEvent<Error>();

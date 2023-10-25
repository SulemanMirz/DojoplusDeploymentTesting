import { AirtableImage } from './AirtableImage';

export interface Tournament {
  id: string;
  eventName: string | undefined | null;
  date: string | undefined | null;
  registrationLink: string | undefined | null;
  martialArtsLink: string | undefined | null;
  city: string | undefined | null;
  state: string | undefined | null;
  country: string | undefined | null;
  information: string | undefined | null;
  email: string | undefined | null;
  eventWebsite: string | undefined | null;
  instagram: string | undefined | null;
  facebook: string | undefined | null;
  youtube: string | undefined | null;
  dateEnd: string | undefined | null;
  martialArtsFromMartialArts: string | undefined | null;
  recordId: string | undefined | null;
  endDate: string | undefined | null;
  addressLocation: string | undefined | null;
  cover: AirtableImage[] | undefined | null;
}

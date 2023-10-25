import { SchoolSchedules } from './school.model';

export interface SeminarData {
  id: string;
  eventTitle: string | null | undefined;
  priceMembers: number | null | undefined;
  priceNonMembers: number | null | undefined;
  currency: string | null | undefined;
  address: string | null | undefined;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  martialArts: string | null | undefined;
  martialArtsFromMartialArts: string | null | undefined;
  recordId: string;
  eventType: string;
  coverImage:
    | [
        {
          url: string | null | undefined;
        },
      ]
    | null
    | undefined;
  description: string | null | undefined;
  registrationLink: string | null | undefined;
}

export interface Seminar extends SeminarData {
  school: SchoolSchedules | null | undefined;
}

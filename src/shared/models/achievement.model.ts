import { AirtableImage } from './AirtableImage';

export interface Achievement {
  __typename?: string;
  _description: string;
  beltLevel: string;
  championship: string;
  createdAt: string;
  createdBy: string;
  gender: string;
  id: number;
  location: string;
  month: number;
  name: string;
  rank: number;
  updatedAt: string;
  weight: string;
  year: number;
  eventNameFromEventName: string[] | null | undefined;
  medal: { url: string }[];
  martialArtFromBeltLevel: string[] | null | undefined;
  weightDivision?: string;
  ageDivision?: string;
  rankLevelFromMartialArtsLevels: string[] | null | undefined;
  verified: boolean | undefined | null;
  eventNameUserEntry: string | null | undefined;
  photos: AirtableImage[] | null | undefined;
}

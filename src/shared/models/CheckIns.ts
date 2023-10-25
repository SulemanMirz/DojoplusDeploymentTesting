import { AirtableImage } from './AirtableImage';
import { AirtableVideo } from './AirtableVideo';

export interface CheckIns {
  id: string;
  username: string | null | undefined;
  classId: string | null | undefined;
  createdTime: string | null | undefined;
  classDurationFromClassId: string | null | undefined;
  classNameFromClassName: string | null | undefined;
  martialArtsLinkFromClassId: string | null | undefined;
  displayName: string | null | undefined;
  checkInsCount: number | null | undefined;
  notes: string | null | undefined;
  schoolLogoFromSchoolLinkFromClassId: Array<AirtableImage> | null | undefined;
  schoolDetails: {
    schoolLogo: Array<AirtableImage> | null | undefined;
  };
  lastCheckIn: string | null | undefined;
  images: Array<AirtableImage> | null | undefined;
  videos: Array<AirtableVideo> | null | undefined;
  schoolLinkFromClassId: string | null | undefined;
  instructorLinkFromClassId: string | null | undefined;
  instructorLookupFromClassId: string | null | undefined;
  weekdayFromClassId: string | string[] | null | undefined;
}

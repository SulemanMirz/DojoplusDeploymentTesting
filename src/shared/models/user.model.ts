export interface User {
  __typename?: 'Profile';
  recordId: string;
  id: string | null | undefined;
  username: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  fullName: string | null | undefined;
  displayName: string | null | undefined;
  nickname: string | null | undefined;
  gender: string | null | undefined;
  nationality: string | null | undefined;
  birthDate: string | null | undefined;
  height: string | null | undefined;
  weight: string | null | undefined;
  biography: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  facebook: string | null | undefined;
  instagram: string | null | undefined;
  twitter: string | null | undefined;
  youTube: string | null | undefined;
  bjjHeroes: string | null | undefined;
  tapology: string | null | undefined;
  bjjFanatics: string | null | undefined;
  bjjBeltChecker: string | null | undefined;
  floGrappling: string | null | undefined;
  mmaJunkie: string | null | undefined;
  sherdog: string | null | undefined;
  ufc: string | null | undefined;
  boxRec: string | null | undefined;
  espn: string | null | undefined;
  ibjjf: string | null | undefined;
  agf: string | null | undefined;
  ajpTour: string | null | undefined;
  jiuJitsuX: string | null | undefined;
  website: string | null | undefined;
  oneChampionship: string | null | undefined;
  wikipedia: string | null | undefined;
  smoothcomp: string | null | undefined;
  souCompetidor: string | null | undefined;
  firebaseId: string | null | undefined;
  accountType: Array<string | null | undefined> | null | undefined;
  schoolNameFromSchools: Array<string> | null | undefined;
  lineage: Array<string> | null | undefined;
  profileSchool:
    | {
        __typename?: 'SchoolProfileListResponse';
        count: number;
      }
    | null
    | undefined;
  rankw375h24:
    | {
        __typename?: 'File';
        downloadUrl: string | null | undefined;
      }
    | null
    | undefined;
  photo:
    | {
        url: string | null | undefined;
      }[]
    | null
    | undefined;
}

export interface PrivateClasses {
  endTime: number | null | undefined;
  instructor: Array<string> | null | undefined;
  currency: string | null | undefined;
  stripeProductId: string | null | undefined;
  classPrice: number | null | undefined;
  duration: number | null | undefined;
  id: number | null | undefined;
  active: boolean | null | undefined;
  school: Array<string> | null | undefined;
  weekdays: Array<string> | null | undefined;
  startTime: number | null | undefined;
  bookings: Array<string> | null | undefined;
  className: string | null | undefined;
  usernameFromInstructor: Array<string> | null | undefined;
  schoolNameFromSchool: Array<string> | null | undefined;
  recordId: string;
}

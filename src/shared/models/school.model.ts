import { AirtableImage } from './AirtableImage';

export interface SchoolSchedules {
  __typename?: 'School';
  id: string | null | undefined;
  recordId: string;
  phone: string | null | undefined;
  schoolName: string | null | undefined;
  email: string | null | undefined;
  schoolPhoneType: string | null | undefined;
  phoneType: string | null | undefined;
  address1: string | null | undefined;
  fullAddress: string | null | undefined;
  address: string | null | undefined;
  state: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  zip: string | null | undefined;
  classData: string | null | undefined;
  schoolLogo:
    | { __typename?: 'File'; url: string | null | undefined }[]
    | null
    | undefined;
  scheduleSchool: Array<Schedule>;
  plans: Array<Product>;
  plansCategories: Array<PlansCategories>;
  schoolProductRelation:
    | { __typename?: 'ProductListResponse'; count: number }
    | null
    | undefined;
}

export interface Schedule {
  __typename?: 'Schedule';
  id: string | null | undefined;
  className: string | null | undefined;
  instructorLookup: string[] | null | undefined;
  martialArtLookup: string[] | null | undefined;
  schoolLink: string[] | null | undefined;
  usernameFromInstructorLink: string[] | null | undefined;
  name: string | null | undefined;
  timeStart: number | null | undefined;
  timeEnd: number | null | undefined;
  room: string | null | undefined;
  weekday: string | null | undefined;
  martialArtsLink: string | null | undefined;
  countryFromSchoolLink: string | null | undefined;
  instructorLink: string | null | undefined;
  recordId: string | null | undefined;
  startTime: string | null | undefined;
  endTime: string | null | undefined;
  idProfile:
    | {
        __typename?: 'Profile';
        firstName: string | null | undefined;
        lastName: string | null | undefined;
      }
    | null
    | undefined;
  idMartialArt:
    | { __typename?: 'MartialArt'; name: string | null | undefined }
    | null
    | undefined;
}

export type Product = {
  currency: string | null | undefined;
  frequency: string | null | undefined;
  planDescription: string | null | undefined;
  planName: string | null | undefined;
  price: number | null | undefined;
  school: string[] | null | undefined;
  schoolNameFromSchool: string[] | null | undefined;
  type: string | null | undefined;
  lookupKey: string;
  feesLookupKey: string;
  stripePriceId: string | null | undefined;
  setupFee: number | null | undefined;
  category: PlansCategories;
  recordId: string;
};

export interface PlansCategories {
  name: string | null | undefined;
  recordId: string;
  id: string;
  notes: string;
}

export interface School {
  schoolName: string | null | undefined;
  website: string | null | undefined;
  phone: string | null | undefined;
  email: string | null | undefined;
  address1: string | null | undefined;
  slug: string | null | undefined;
  schoolLogo: Array<{
    url: string;
  }>;
  phoneType: string | null | undefined;
  geo: string | null | undefined;
  fullAddress: string | null | undefined;
  city: string | null | undefined;
  description: string | null | undefined;
  nameFromCategory: string | null | undefined;
  planDescription: string | null | undefined;
  state: string | null | undefined;
  country: string | null | undefined;
  lat: number | null | undefined;
  long: number | null | undefined;
  location: string | null | undefined;
  usernameFromInstructors: Array<string> | null | undefined;
  displayNameFromInstructor: string | any | null | undefined;
  displayName2FromInstructor: string | any | null | undefined;
  lastModifiedTime: string | null | undefined;
  recordId: string;
  displayNameFromAdmin: Array<string> | null | undefined;
  displayNameFromManager: Array<string> | null | undefined;
  id: string;
  amenities: string[] | undefined | null;
  gallery: Array<AirtableImage>;
}

export type Plans = {
  id: string;
  category: string[] | string;
  currency: string;
  frequency: string;
  planDescription: string;
  planName: string;
  price: number | string;
  recordId: string;
  school: string[] | string;
  schoolNameFromSchool: string[] | string;
  slugFromSchool: string[] | string;
  stripePriceId: string;
  stripeDate: string | undefined;
  priceFromPlan: string | undefined;
  planNameFromPlan: string | undefined;
  type: string;
  nameFromCategory: string;
  displayNameFromProfile: string | undefined;
  setupFee: string | number | undefined;
  length: string | number | undefined;
  phoneNumber: string | number | undefined;
  fullAddressFromSchool: string | undefined;
  emailFromProfile: string | undefined;
  subscribers: any;
  overdue: PlanSubscriber[] | undefined;
  createdTime: Date;
  disabled: boolean | undefined;
  schoolSlugFromPlan: string[] | null | undefined;
  recordIdFromProfile: string[] | null | undefined;
  usernameFromProfile: string[] | null | undefined;
  photoFromProfile: Array<{
    url: string;
  }>;
};

export interface PlanCategories {
  id: string;
  notes: string;
  name: string;
  attachments: string | null | undefined;
}

export interface PlanSubscriber {
  id: string;
  usernameFromProfile: string[];
  displayNameFromProfile: string[] | null | undefined;
  isCoach: boolean | null | undefined;
}
export interface SchoolRating {
  comment: string | null | undefined;
  createdTime: string | null | undefined;
  displayNameFromUser: Array<string> | null | undefined;
  fullNameFromUser: Array<string> | null | undefined;
  id: Array<string> | null | undefined;
  rating: number | null | undefined;
  school: string | null | undefined;
  slugFromSchool: Array<string> | null | undefined;
  srNo: string | number | undefined;
  user: Array<string> | null | undefined;
}

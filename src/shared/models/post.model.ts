import { AirtableImage } from './AirtableImage';

export enum PostType {
  CHECK_IN = 'CHECK-IN',
  RANK = 'RANK',
  ACHIEVEMENT = 'ACHIEVEMENT',
  NEWS = 'NEWS',
}

export interface Post {
  // Existing types
  id: string | undefined | null;
  checkIns: string | undefined | null;
  postType: string | undefined | null;
  action: string | undefined | null;
  caption: string | undefined | null;
  posted: string | undefined | null;
  classNameFromCheckIns: string | undefined | null;
  usernameFromCheckIns: string | string[] | undefined | null;
  latFromCheckIns: string | undefined | null;
  longFromCheckIns: string | undefined | null;
  cityFromCheckIns: string | undefined | null;
  stateFromCheckIns: string | undefined | null;
  schoolLogoFromCheckIns: AirtableImage | undefined | null;
  schoolNameFromCheckIns: string | undefined | null;
  schoolLinkFromCheckIns: string | undefined | null;
  displayNameFromCheckIns: string | undefined | null;
  // Rank Specific
  usernameFromRankId: string | string[] | undefined | null;
  displayNameFromRankId: string | undefined | null;
  levelFromRankId: string | undefined | null;
  verifiedFromRankId: boolean | undefined | null;
  rankImageW375H24FromRankId: AirtableImage[] | undefined | null;
  schoolNameFromRankId: string | string[] | undefined | null;
  // Achievement specific
  usernameFromAchievement: string | string[] | undefined | null;
  eventNameFromAchievement: string | string[] | undefined | null;
  eventNameUserEntryFromAchievement: string | string[] | undefined | null;
  eventName2FromAchievement: string | string[] | undefined | null;
  locationFromAchievement: string | string[] | undefined | null;
  yearFromAchievement: number | number[] | undefined | null;
  dateFromAchievement: string | string[] | undefined | null;
  displayNameFromAchievement: string | string[] | undefined | null;
  rankFromAchievement: number | number[] | undefined | null;
  medalFromAchievement: AirtableImage[] | undefined | null;
  featuredFromAllArticles: boolean | undefined | null;
  // News Specific
  headlineFromAllArticles: string | string[] | undefined | null;
  coverFromAllArticles: AirtableImage[] | undefined | null;
  channelFromAllArticles: string | string[] | undefined | null;
  logoFromAllArticles: AirtableImage[] | undefined | null;
  authorFromAllArticles: string | string[] | undefined | null;
  subtitleFromAllArticles: string | string[] | undefined | null;
  linkFromAllArticles: string | string[] | undefined | null;
  slugLookupFromCheckIns: string | string[] | undefined | null;
}

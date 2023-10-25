export interface IRank {
  __typename?: 'RankIssued';
  id: string | null | undefined;
  graduated: any | null | undefined;
  verified: boolean | null | undefined;
  certificate?: {
    __typename?: 'File';
    url: string | null | undefined;
  }[];
  master:
    | {
        __typename?: 'Profile';
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        fullName: string | null | undefined;
        username: string | null | undefined;
        displayName: string | null | undefined;
        nickName: string | null | undefined;
        photo?: {
          __typename?: 'File';
          url: string | null | undefined;
        }[];
        rankw375h24:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
        rankw80h8:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
        rankSmall:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  masterPhoto:
    | {
        __typename?: 'File';
        downloadUrl: string | null | undefined;
      }
    | null
    | undefined;
  school:
    | {
        __typename?: 'School';
        schoolName: string | null | undefined;
        schoolLogo:
          | {
              __typename?: 'File';
              url: string | null | undefined;
            }[]
          | null
          | undefined;
        location: string | null | undefined;
      }
    | null
    | undefined;
  photos: {
    __typename?: 'File';
    url: string | null | undefined;
  }[];
  rank:
    | {
        __typename?: 'Rank';
        id: string | null | undefined;
        level: string | null | undefined;
        order: number | null | undefined;
        degree: string | null | undefined;
        martialArt:
          | {
              __typename?: 'MartialArt';
              name: string | null | undefined;
            }
          | null
          | undefined;
        rankImageW375H24:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  rankImageW375H24FromMartialArtsRanks:
    | {
        url: string;
      }[]
    | undefined;
  rankImageW64H8FromMartialArtsRanks:
    | {
        url: string;
      }[]
    | undefined;
  recordId: string;
  martialArtFromMartialArtsRanks: string[] | undefined | null;
  levelFromMartialArtsRanks: string[] | undefined | null;
  displayNameFromUsername: string[] | undefined | null;
  teamFromAllSchools: string[] | undefined | null;
  displayNameFromMaster: string[] | undefined | null;
  schoolNameFromAllSchools: string[] | undefined | null;
  usernameFromAllProfiles: string[] | undefined | null;
  masterFromAllProfiles: string[] | undefined | null;
  schoolLogoFromAllSchools:
    | {
        url: string;
      }[];
  certificatePhoto:
    | {
        url: string;
      }[];
  martialArt:
    | {
        order: number | null | undefined;
      }
    | null
    | undefined;
  featuredRank: boolean | null | undefined;
}

export interface RankType {
  __typename?: 'RankIssued';
  id: string | null | undefined;
  graduated: any | null | undefined;
  verified: boolean | null | undefined;
  certificate?: {
    __typename?: 'File';
    url: string | null | undefined;
  }[];
  master:
    | {
        __typename?: 'Profile';
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        fullName: string | null | undefined;
        username: string | null | undefined;
        displayName: string | null | undefined;
        nickName: string | null | undefined;
        photo?: {
          __typename?: 'File';
          url: string | null | undefined;
        }[];
        rankw375h24:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
        rankw80h8:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
        rankSmall:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  masterPhoto:
    | {
        __typename?: 'File';
        downloadUrl: string | null | undefined;
      }
    | null
    | undefined;
  school:
    | {
        __typename?: 'School';
        schoolName: string | null | undefined;
        schoolLogo:
          | {
              __typename?: 'File';
              url: string | null | undefined;
            }[]
          | null
          | undefined;
        location: string | null | undefined;
      }
    | null
    | undefined;
  photos: {
    __typename?: 'File';
    url: string | null | undefined;
  }[];
  rank:
    | {
        __typename?: 'Rank';
        id: string | null | undefined;
        level: string | null | undefined;
        order: number | null | undefined;
        degree: string | null | undefined;
        martialArt:
          | {
              __typename?: 'MartialArt';
              name: string | null | undefined;
            }
          | null
          | undefined;
        rankImageW375H24:
          | {
              __typename?: 'File';
              downloadUrl: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  rankImageW375H24FromMartialArtsRanks:
    | {
        url: string;
      }[]
    | undefined;
  rankImageW64H8FromMartialArtsRanks:
    | {
        url: string;
      }[]
    | undefined;
  recordId: string;
  martialArtFromMartialArtsRanks: string[] | undefined | null;
  levelFromMartialArtsRanks: string[] | undefined | null;
  displayNameFromUsername: string[] | undefined | null;
  teamFromAllSchools: string[] | undefined | null;
  displayNameFromMaster: string[] | undefined | null;
  schoolNameFromAllSchools: string[] | undefined | null;
  usernameFromAllProfiles: string[] | undefined | null;
  masterFromAllProfiles: string[] | undefined | null;
  slugFromSchool: string[] | undefined | null;
  schoolLogoFromAllSchools:
    | {
        url: string;
      }[];
  certificatePhoto:
    | {
        url: string;
      }[];
  martialArt:
    | {
        order: number | null | undefined;
      }
    | null
    | undefined;
  featuredRank: boolean | null | undefined;
}

export interface Rank extends IRank {
  masterRanks: IRank[];
  slugFromSchool: string | null | undefined;
}

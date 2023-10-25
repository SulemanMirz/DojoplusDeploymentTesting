/* eslint-disable array-callback-return */
// import {
//   useSetSlugSchoolMutation,
//   useGetSlugSchoolQuery,
//   useGetSlugProfileQuery,
//   useSetSlugProfileMutation,
// } from '../types/generated';
// import { getSlugUrl } from '../utils/ultils';

export const useSlugSchoolScript = (): void => {
  // const [setSlug] = useSetSlugSchoolMutation();
  // useGetSlugSchoolQuery({
  //   onCompleted: (res) => {
  //     const schools = res.schoolsList.items;
  //     schools.map((item): void => {
  //       const slug = getSlugUrl(item.schoolName || '');
  //       const shortRelation = item.schoolShortUrlRelation?.items[0];
  //       if (item?.slug && !shortRelation.slug) {
  //         setSlug({
  //           variables: {
  //             id: item.id,
  //             short: { create: [{ slug }] },
  //           },
  //         });
  //       } else if (!item?.slug && !shortRelation.slug) {
  //         schools
  //           .filter((fil) => fil.schoolName === item.schoolName)
  //           .map((ma, inx): void => {
  //             const rep = inx === 0 ? '' : inx;
  //             setSlug({
  //               variables: {
  //                 id: ma.id,
  //                 slug: slug + rep,
  //                 short: { create: [{ slug: slug + rep }] },
  //               },
  //             });
  //           });
  //       }
  //     });
  //   },
  // });
};

export const useSlugProfileScript = (): void => {
  // const [setSlug] = useSetSlugProfileMutation();
  // useGetSlugProfileQuery({
  //   onCompleted: (res) => {
  //     const profiles = res.profilesList.items;
  //     profiles.map((item): void => {
  //       // if (i > 15) return;
  //       const slug = getSlugUrl(
  //         `${item.firstName || item.nickname || item.lastName}` || '',
  //       );
  //       const shortRelation = item.profileShortUrlRelation?.items[0];
  //       console.log(slug);
  //       console.log(item);
  //       if (item?.username.startsWith('@') && !shortRelation?.slug) {
  //         setSlug({
  //           variables: {
  //             id: item.id,
  //             short: { create: [{ slug: item.username }] },
  //           },
  //         });
  //       } else if (!item?.username.startsWith('@') && !shortRelation?.slug) {
  //         profiles
  //           .filter((fil) => fil.username === item.username)
  //           .map((ma, inx): void => {
  //             const rep = inx === 0 ? '' : inx;
  //             const arr = '@';
  //             const username = arr + slug + rep;
  //             setSlug({
  //               variables: {
  //                 id: ma.id,
  //                 username,
  //                 short: { create: [{ slug: username }] },
  //               },
  //             });
  //           });
  //       }
  //     });
  //   },
  // });
};

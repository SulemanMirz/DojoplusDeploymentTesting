export const a = null; // import React from 'react';
// import { GetServerSideProps, NextPage } from 'next';
// import { EmptyViewAlert } from '../../shared/components/EmptyViewAlert';

// import { Section } from '../../shared/components/layout/Section';
// import { Header } from '../../shared/components/layout/header/Header';
// import { ProfileHeader } from '../../shared/components/layout/header/ProfileHeader';
// import { MainProfile } from '../../shared/components/layout/Main';
// import { Container } from '../../shared/components/layout/Container';

// import { GetProfileQuery as GetProfileQueryType } from '../../shared/types/generated';
// import { InstructorProfile } from '../../modules/instructor-profile/InstructorProfile';
// import { getProfile } from '../../modules/profile/profile-actions';

// type UserProfileViewProps = {
//   data: GetProfileQueryType | null;
// };

// const UserProfileView: NextPage<UserProfileViewProps> = ({ data }) => (
//   <Section>
//     <Header>
//       <ProfileHeader />
//     </Header>
//     <MainProfile>
//       <Container notGutters isFlexGrow>
//         {data?.profile ? (
//           <InstructorProfile initialData={data} />
//         ) : (
//           <EmptyViewAlert />
//         )}
//       </Container>
//     </MainProfile>
//   </Section>
// );

// export const getServerSideProps: GetServerSideProps<UserProfileViewProps> =
//   async (context) => {
//     const username = context.query?.username;
//     if (typeof username === 'string') {
//       try {
//         const response = await getProfile(username);
//         return {
//           props: {
//             data: response,
//           },
//         };
//       } catch (error) {
//         return {
//           props: {
//             data: null,
//           },
//         };
//       }
//     }
//     return {
//       props: {
//         data: null,
//       },
//     };
//   };

// export default UserProfileView;

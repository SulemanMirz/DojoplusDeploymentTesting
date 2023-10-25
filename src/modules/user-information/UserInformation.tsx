import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import styled from 'styled-components';
import _ from 'lodash';

import axios from 'axios';
import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { TitleSection } from './components/TitleSection'; // LockIcon
import { InformationItem } from './components/InformationItem';
import { Biography } from './components/Biography';

import { User } from '../../shared/models/user.model';
import { LinkTag } from './components/LinkTag';
import { MasterAvatar } from './components/MasterAvatar';
import { IRank } from '../../shared/models/Rank.model';

const Container = styled.div`
  padding: 16px;
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const titleSectionStyle = {
  borderBottom: 'none',
  marginBottom: 0,
  marginTop: 10,
};

type UserInformationProps = {
  initialData: { profile: User };
};

interface MasterAvatarView extends User {
  rank: IRank[];
}

export const UserInformation: React.FC<UserInformationProps> = ({
  initialData,
}) => {
  const { profile } = initialData;
  const { t } = useTranslation('common');
  const [isLoading, setLoading] = useState(true);
  const [lineages, setLineages] = useState<MasterAvatarView[]>([]);
  const textbasicInf = t('basicInf').toUpperCase();
  const textfirstName = t('firstName').toUpperCase();
  const textlastName = t('lastName').toUpperCase();
  const textnickname = t('nickname').toUpperCase();
  const textgender = t('gender').toUpperCase();
  const textnationality = t('nationality').toUpperCase();
  const textbasbirthdateicInf = t('birthdate').toUpperCase();
  const textweight = t('weight').toUpperCase();
  const textheight = t('height').toUpperCase();
  const textbiography = t('biography').toUpperCase();
  const textFacebook = t('facebook').toUpperCase();
  const textYoutube = t('youtube').toUpperCase();
  const textTwitter = t('twitter').toUpperCase();
  const textInstagram = t('instagram').toUpperCase();
  const dateFormat = t('dateFormat');
  const textSocialProfiles = t('socialProfile');
  const textBjjHeroes = t('bjjHeroes');
  const textBjjFanatics = t('bjjFanatics');
  const textFloGrappling = t('floGrappling');
  const textUfc = t('ufc');
  const textMmaJunkie = t('mmaJunkie');
  const textSherdog = t('sherdog');
  const textBoxrec = t('boxrec');
  const textEspn = t('espn');
  const textIbjjf = t('ibjjf');
  const textWikipedia = t('wikipedia');
  const textSmoothcomp = t('smoothcomp');
  const textSoucompetidor = t('soucompetidor');
  const textLineage = t('lineage');
  const otherProfiles = t('OtherProfiles');

  useEffect(() => {
    const requests = [];

    profile.lineage?.map((masterUsername) =>
      requests.push(
        axios('/api/User', {
          params: {
            username: masterUsername,
          },
        }).then((res) => {
          const masters = res.data.map((master) =>
            _.mapKeys(master.fields, (v, k) => _.camelCase(k)),
          );
          return masters[0];
        }),
      ),
    );

    Promise.all(requests).then((res) => {
      const requests2 = [];
      res.forEach((master) =>
        requests2.push(
          axios('/api/Rank', {
            params: {
              username: master.username,
            },
          }).then((ranksRes) => {
            const formatedRes = ranksRes.data.map((rank) =>
              _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
            );
            return { ...master, rank: formatedRes };
          }),
        ),
      );
      Promise.all(requests2).then((res2) => {
        setLineages(res2);
        setLoading(false);
      });
    });

    Promise.all(requests);
  }, [profile.lineage]);

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  const socialProfile =
    profile.facebook || profile.youTube || profile.twitter || profile.instagram;

  const otherProfile =
    profile.bjjHeroes ||
    profile.bjjFanatics ||
    profile.floGrappling ||
    profile.ufc ||
    profile.mmaJunkie ||
    profile.sherdog ||
    profile.boxRec ||
    profile.espn ||
    profile.ibjjf ||
    profile.wikipedia ||
    profile.smoothcomp ||
    profile.souCompetidor ||
    profile.tapology ||
    profile.bjjBeltChecker ||
    profile.ajpTour ||
    profile.jiuJitsuX ||
    profile.agf ||
    profile.website ||
    profile.oneChampionship;
  return (
    <Container>
      <TitleSection
        title={textbasicInf}
        style={{ ...titleSectionStyle, marginBottom: 0, paddingBottom: 0 }}
      />
      <Section>
        {initialData?.profile.firstName && (
          <InformationItem
            label={textfirstName}
            value={initialData?.profile.firstName}
          />
        )}
        {initialData?.profile.lastName && (
          <InformationItem
            label={textlastName}
            value={initialData?.profile.lastName}
          />
        )}
        {initialData?.profile.nickname && (
          <InformationItem
            label={textnickname}
            value={initialData?.profile.nickname}
          />
        )}
        {initialData?.profile.nationality && (
          <InformationItem
            label={textnationality}
            value={initialData?.profile.nationality}
          />
        )}
        {initialData?.profile.weight && (
          <InformationItem
            label={textweight}
            value={initialData?.profile.weight}
          />
        )}
        {initialData?.profile.height && (
          <InformationItem
            label={textheight}
            value={initialData?.profile.height}
          />
        )}
        {initialData?.profile.gender && (
          <InformationItem
            label={textgender}
            value={initialData?.profile.gender}
          />
        )}

        {initialData?.profile.birthDate && (
          <InformationItem
            label={textbasbirthdateicInf}
            value={dayjs(initialData?.profile.birthDate).format(dateFormat)}
          />
        )}
      </Section>
      {initialData?.profile.biography && (
        <>
          <TitleSection title={textbiography} style={titleSectionStyle} />
          <Section>
            <Biography value={initialData?.profile.biography} />
          </Section>
        </>
      )}
      {lineages.length > 0 && (
        <>
          <TitleSection title={textLineage} style={titleSectionStyle} />
          <Section>
            {lineages.map((lineage) => (
              <MasterAvatar data={{ master: lineage, rank: lineage.rank }} />
            ))}
          </Section>
        </>
      )}
      {socialProfile && (
        <>
          <TitleSection title={textSocialProfiles} style={titleSectionStyle} />
          <Section style={{ display: 'flex', flexWrap: 'wrap' }}>
            {profile.facebook && (
              <LinkTag btnText={textFacebook} link={profile.facebook} />
            )}
            {profile.youTube && (
              <LinkTag btnText={textYoutube} link={profile.youTube} />
            )}
            {profile.twitter && (
              <LinkTag btnText={textTwitter} link={profile.twitter} />
            )}
            {profile.instagram && (
              <LinkTag btnText={textInstagram} link={profile.instagram} />
            )}
          </Section>
        </>
      )}

      {otherProfile && (
        <>
          <TitleSection title={otherProfiles} style={titleSectionStyle} />
          <Section style={{ display: 'flex', flexWrap: 'wrap' }}>
            {profile.bjjHeroes && (
              <LinkTag btnText={textBjjHeroes} link={profile.bjjHeroes} />
            )}
            {profile.bjjFanatics && (
              <LinkTag btnText={textBjjFanatics} link={profile.bjjFanatics} />
            )}
            {profile.floGrappling && (
              <LinkTag btnText={textFloGrappling} link={profile.floGrappling} />
            )}
            {profile.ufc && <LinkTag btnText={textUfc} link={profile.ufc} />}
            {profile.mmaJunkie && (
              <LinkTag btnText={textMmaJunkie} link={profile.mmaJunkie} />
            )}
            {profile.sherdog && (
              <LinkTag btnText={textSherdog} link={profile.sherdog} />
            )}
            {profile.boxRec && (
              <LinkTag btnText={textBoxrec} link={profile.boxRec} />
            )}
            {profile.espn && <LinkTag btnText={textEspn} link={profile.espn} />}
            {profile.ibjjf && (
              <LinkTag btnText={textIbjjf} link={profile.ibjjf} />
            )}
            {profile.wikipedia && (
              <LinkTag btnText={textWikipedia} link={profile.wikipedia} />
            )}
            {profile.smoothcomp && (
              <LinkTag btnText={textSmoothcomp} link={profile.smoothcomp} />
            )}
            {profile.souCompetidor && (
              <LinkTag
                btnText={textSoucompetidor}
                link={profile.souCompetidor}
              />
            )}
            {profile.tapology && (
              <LinkTag btnText="Tapology" link={profile.tapology} />
            )}

            {profile.bjjBeltChecker && (
              <LinkTag
                btnText="BJJ Belt Checker"
                link={profile.bjjBeltChecker}
              />
            )}
            {profile.agf && <LinkTag btnText="AGF" link={profile.agf} />}
            {profile.ajpTour && (
              <LinkTag btnText="AJP Tour" link={profile.ajpTour} />
            )}
            {profile.jiuJitsuX && (
              <LinkTag btnText="Jiu Jitsu X" link={profile.jiuJitsuX} />
            )}
            {profile.oneChampionship && (
              <LinkTag
                btnText="One Championship"
                link={profile.oneChampionship}
              />
            )}
            {profile.website && (
              <LinkTag btnText="Website" link={profile.website} />
            )}
          </Section>
        </>
      )}
      {/* <TitleSection title="CONTACT INFO" icon={<LockIcon />} />
      <Section>
        {data?.profile.email &&<InformationItem label="Email" value={data?.profile.email} />}
        {data?.profile.phone && <InformationItem label="Phone" value={data?.profile.phone} />}
      </Section> */}
    </Container>
  );
};

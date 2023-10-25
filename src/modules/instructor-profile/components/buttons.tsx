import React from 'react';
// import { useState } from 'react';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonAddIconDisabled from '@mui/icons-material/PersonAddDisabled';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

type ButtonInstructorProfileProps = {
  url: string;
};

const ButtonInstructorProfile: React.FC<ButtonInstructorProfileProps> = ({
  url,
}) => {
  // const [activedButton, setActiveButton] = useState('secondary');
  // const [isFollowed, setIsFollowed] = useState(false);

  const router = useRouter();

  // const HandleClick = () => {
  //   activedButton === 'secondary' ? setActiveButton('primary') : setActiveButton('secondary');
  //   isFollowed ? setIsFollowed(false) : setIsFollowed(true);
  // };

  const GoToInstagram = (): void => {
    router.push(url);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* {
        isFollowed 
          ? <Button color={activedButton} onClick={HandleClick} startIcon={<PersonAddIconDisabled />} style={{ marginRight: '4px', fontSize: '12px' }} >
            following
          </Button>
          : <Button color={activedButton} onClick={HandleClick} startIcon={<PersonAddIcon />} style={{ marginRight: '4px', fontSize: '12px' }} >
           follow
          </Button>
      } */}
      <Button
        color="secondary"
        variant="contained"
        onClick={GoToInstagram}
        style={{ minWidth: 'fit-content' }}
      >
        <InstagramIcon style={{ fontSize: 'medium' }} />
      </Button>
    </div>
  );
};

export default ButtonInstructorProfile;

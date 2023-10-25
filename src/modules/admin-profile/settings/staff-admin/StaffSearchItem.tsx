import React from 'react';
import UserAvatar from '../../../userAvatar';

interface StaffSearchItemProps {
  option?;
}

const StaffSearchItem: React.FC<StaffSearchItemProps> = ({
  option,
  ...props
}) => {
  return (
    <li
      {...props}
      style={{
        display: 'flex',
        marginBlock: '3px',
        padding: '3px 10px',
        alignItems: 'center',
      }}
    >
      <UserAvatar avatarDimension={42} username={option?.displayName} />
      <span
        style={{
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: '15px', lineHeight: '15px' }}>
          {option?.inputValue || option?.displayName2}
        </span>
        <span style={{ fontSize: '12px', color: 'gray' }}>
          {option?.displayName}
        </span>
      </span>
    </li>
  );
};

export default StaffSearchItem;

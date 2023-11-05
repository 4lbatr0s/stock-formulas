import React from 'react';
import { useSelector } from 'react-redux';
import ProfileDetailsCard from 'components/cards/profile/ProfileDetails.card';

export default function ProfileDetails() {
  const { userInfo } = useSelector((state) => state.auth);
  const getProfileDetailsCard = () => {
    if (userInfo) {
      const { fullName, email, roles, id } = userInfo;
      return <ProfileDetailsCard fullName={fullName} email={email} roles={roles} id={id} />;
    } else {
      // You can also provide a message or return null here
      return null;
    }
  };

  return <>{getProfileDetailsCard()}</>;
}

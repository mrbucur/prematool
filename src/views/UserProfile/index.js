import React, { useContext } from "react";
import { ApplicationContext } from '../../contexts/Application';

const UserProfile = () => {
  const {
    userProfile,
  } = useContext(ApplicationContext);
  return (
    <div className="mt-8 ml-4">
      <div className="font-medium">Profil utilizator</div>
      <hr />
      <ul>
        <li className='p-3'>
          Nume: {userProfile.lastName}
        </li>
        <li className='p-3'>
          Prenume: {userProfile.firstName}
        </li>
        <li className='p-3'>
          Email: {userProfile.email}
        </li>
        <li className='p-3'>
          Rol: {userProfile.rol}
        </li>
        <li className='p-3'>
          ID: {userProfile.id}
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;

import React from 'react';

const DateProfil = ({
  profile,
}) => {


  return (
    <div className="mt-8">
      <div className="font-medium">Date profil</div>
      <hr />
      {
        profile ?
          <ul>
            <li className='p-3'>
              Nume: {profile.lastName}
            </li>
            <li className='p-3'>
              Prenume: {profile.firstName}
            </li>
            <li className='p-3'>
              Data nasterii: {new Date(profile.dateOfBirth).toLocaleDateString('ro-RO')}
            </li>
            <li className='p-3'>
              Greutate la nastere: {profile.weightAtBirth} g
            </li>
            <li className='p-3'>
              Scor APGAR: {profile.apgarScore}
            </li>
          </ul>
          :
          <div>Profilul cu acest ID nu a fost gasit in baza de date</div>
      }
    </div>
  );
};

export default DateProfil;

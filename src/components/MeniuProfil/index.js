import React from 'react';

const MeniuProfil = ({
  profile,
  rol,
  handleAddMeasurement,
  handleEditProfile,
  handleShareProfile,
}) => {
  return (
    <>
      {
        rol === 'parinte' &&
        <div className="mt-8">
          <button
            type="button"
            onClick={handleEditProfile}
            className="mr-4 rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Editare profil
          </button>
          <button
            type="button"
            onClick={handleShareProfile}
            className="mr-4 rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Partajeaza cu un medic
          </button>
          <button
            type="button"
            onClick={handleAddMeasurement}
            className="mr-4 rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Adauga masuratoare
          </button>
        </div>
      }
    </>
  );
}

export default MeniuProfil;

import React from 'react';

const Masuratori = ({
  rol,
  measurements,
  setShowConfirmationDialog,
  setSelectedMeasurementId,
}) => {
  return (
    <>
      <div className="mt-8">
        <div className="font-medium">Masuratori</div>
        <hr />
        <ul>
          {measurements.length > 0 ? (
            measurements.map((measurement) => {
              const { id, measurementDate, measurementType, measurementValue } =
                measurement;
              return (
                <div key={id}>
                  <li className="p-3">
                    <div className="flex">
                      <div className="flex-1">
                        Data:{' '}
                        {new Date(measurementDate).toLocaleDateString('ro-RO')}
                      </div>
                      <div className="flex-1">Tipul: {measurementType}</div>
                      <div className="flex-1">Valoare: {measurementValue}</div>
                      {rol === 'parinte' && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setShowConfirmationDialog(true);
                              setSelectedMeasurementId(measurement.id);
                            }}
                            className="rounded-md bg-red-700 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Sterge
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                  <hr />
                </div>
              );
            })
          ) : (
            <div>Acest profil nu contine nici o masuratoare</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Masuratori;

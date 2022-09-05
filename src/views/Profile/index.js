import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../contexts/Application";
import clsx from 'clsx';
import MeniuProfil from "../../components/MeniuProfil";
import Masuratori from "../../components/Masuratori";
import DateProfil from "../../components/DateProfil";
import { getChildrenProfileById, addChildrenMeasurement, getMeasurementsByChildrenProfileId, deleteMeasurement } from "../../services";
import { AuthContext } from "../../contexts/Auth";
import { Dialog, Transition } from '@headlessui/react';
import ConfirmationDialog from "../../components/ConfirmationDialog";
import EditProfileDialog from "../../components/EditProfileDialog";
import ShareProfileDialog from "../../components/ShareProfileDialog";


const Profile = () => {
  const {
    id,
  } = useParams();

  const {
    userProfile: {
      rol,
    },
  } = useContext(ApplicationContext);
  const {
    accessToken,
  } = useContext(AuthContext);

  const [isInitialized, setIsInitialized] = useState(false);
  const [profile, setProfile] = useState({});
  const [isAddMeasurementDialogOpen, setIsAddMeasurementDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [isShareProfileDialogOpen, setIsShareProfileDialogOpen] = useState(false);
  const [values, setValues] = useState({
    measurementDate: '',
    measurementValue: '',
    measurementType: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    measurementDate: '',
    measurementValue: '',
    measurementType: '',
  });


  const [measurements, setMeasurements] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState(null);

  useEffect(() => {
    const initProfile = async () => {
      const profileResult = await getChildrenProfileById({ accessToken, id });
      const profileMeasurements = await getMeasurementsByChildrenProfileId({
        accessToken,
        childrenProfileId: id,
      });

      setMeasurements(profileMeasurements);

      setProfile(profileResult);

      setIsInitialized(true);
    }

    if (!isInitialized) {
      initProfile();
    }
  }, [accessToken, id, isInitialized]);

  const handleInputChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsAddMeasurementDialogOpen(false);
    setValues({
      measurementDate: '',
      measurementValue: '',
      measurementType: '',
    });
    setErrors({
      measurementDate: '',
      measurementValue: '',
      measurementType: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const addMeasurementResult = await addChildrenMeasurement({
      accessToken,
      childrenProfileId: id,
      measurement: {
        ...values,
      }
    });

    setMeasurements([
      ...measurements,
      {
        ...addMeasurementResult,
      }
    ]);

    closeModal();
  };

  const validateForm = (values) => {
    const validation = {
      errors: {
        measurementDate: '',
        measurementType: '',
        measurementValue: '',
      },
      isValid: true,
    };

    if (!values.measurementDate) {
      validation.isValid = false;
      validation.errors.measurementDate =
        'Te rugam sa introduci data masuratorii.';
    }

    if (!values.measurementType) {
      validation.isValid = false;
      validation.errors.measurementType =
        'Te rugam sa selectezi tipul masuratorii.';
    }

    if (!values.measurementValue) {
      validation.isValid = false;
      validation.errors.measurementValue =
        'Te rugam sa introduci valoarea masuratorii';
    }

    return validation;
  };

  const handleDeleteMeasurement = async () => {
    await deleteMeasurement({
      accessToken,
      childrenProfileId: id,
      measurementId: selectedMeasurementId,
    });

    const profileMeasurements = await getMeasurementsByChildrenProfileId({
      accessToken,
      childrenProfileId: id,
    });

    setMeasurements(profileMeasurements);

    setShowConfirmationDialog(false);
    setSelectedMeasurementId(null);
  }

  const handleAddMeasurement = () => {
    setIsAddMeasurementDialogOpen(true);
  };

  const handleEditProfile = () => {
    setIsEditProfileDialogOpen(true)
  };

  const handleShareProfile = () => {
    setIsShareProfileDialogOpen(true);
  }

  return (
    <div className="ml-4">
      <MeniuProfil
        profile={profile}
        rol={rol}
        handleAddMeasurement={handleAddMeasurement}
        handleEditProfile={handleEditProfile}
        handleShareProfile={handleShareProfile}
      />
      <DateProfil
        profile={profile}
      />
      <Masuratori
        rol={rol}
        measurements={measurements}
        setShowConfirmationDialog={setShowConfirmationDialog}
        setSelectedMeasurementId={setSelectedMeasurementId}
      />
      <Transition appear show={isAddMeasurementDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-10"
                    >
                      Adaugare masuratoare
                    </Dialog.Title>
                    <div className="flex mt-4">
                      <div className="flex w-[150px]">
                        <label htmlFor="measurementDate">Data masuratorii</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx('w-[100%] border rounded border-black ml-1', {
                            'border-red-800': errors.measurementDate,
                          })}
                          type="date"
                          name="measurementDate"
                          id="measurementDate"
                          value={values.measurementDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.measurementDate && (
                      <p className="mt-1 text-red-800">{errors.measurementDate}</p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[150px]">
                        <label htmlFor="measurementType">Tipul masuratorii</label>
                      </div>
                      <div className="flex grow">
                        <select
                          name="measurementType"
                          id="measurementType"
                          value={values.measurementType}
                          onChange={handleInputChange}
                          className={clsx('w-[100%] border rounded border-black ml-1', {
                            'border-red-800': errors.measurementType,
                          })}
                        >
                          <option value="" disabled>Selecteaza...</option>
                          <option value="Greutate">Greutate</option>
                          <option value="Vaccin">Vaccin</option>
                          <option value="Control Obligatoriu">Control obligatoriu</option>
                        </select>
                      </div>
                    </div>
                    {errors.measurementType && (
                      <p className="mt-1 text-red-800">{errors.measurementType}</p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[150px]">
                        <label htmlFor="measurementValue">Valoarea masuratorii</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx('w-[100%] border rounded border-black ml-1', {
                            'border-red-800': errors.measurementValue,
                          })}
                          type="text"
                          name="measurementValue"
                          id="measurementValue"
                          value={values.measurementValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.measurementValue && (
                      <p className="mt-1 text-red-800">
                        {errors.measurementValue}
                      </p>
                    )}
                    <div className="flex mt-10 justify-end">
                      <button
                        type="submit"
                        className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        Salveaza masuratoare
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <EditProfileDialog
        isEditProfileDialogOpen={isEditProfileDialogOpen}
        setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
        profile={profile}
        setProfile={setProfile}
      />
      <ConfirmationDialog
        showConfirmationDialog={showConfirmationDialog}
        setShowConfirmationDialog={setShowConfirmationDialog}
        handleConfirmation={handleDeleteMeasurement}
      />
      <ShareProfileDialog
        isShareProfileDialogOpen={isShareProfileDialogOpen}
        setIsShareProfileDialogOpen={setIsShareProfileDialogOpen}
        childrenProfileId={id}
      />
    </div>
  );
};

export default Profile;

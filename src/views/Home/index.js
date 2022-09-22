import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../contexts/Application';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AuthContext } from '../../contexts/Auth';
import {
  getChildrenProfiles,
  addChildrenProfile,
  deleteChildrenProfile,
} from '../../services';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const Home = () => {
  const {
    userProfile: { rol, id: userId },
  } = useContext(ApplicationContext);
  const { accessToken } = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(false);
  const [childrenProfiles, setChildrenProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedProfileIdForDeletion, setSelectedrPofileIdForDeletion] =
    useState(null);

  useEffect(() => {
    const initHome = async () => {
      const getChildrenProfilesResult = await getChildrenProfiles({
        accessToken,
        userId,
      });

      setChildrenProfiles(getChildrenProfilesResult);

      setIsInitialized(true);
    };

    if (!isInitialized) {
      initHome();
    }
  }, [accessToken, isInitialized, userId]);

  const handleInputChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsOpen(false);
    setValues({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      weightAtBirth: '',
      apgarScore: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      weightAtBirth: '',
      apgarScore: '',
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const profileResult = await addChildrenProfile({
      accessToken,
      userId,
      childrenProfile: {
        ...values,
      },
    });

    setChildrenProfiles([
      ...childrenProfiles,
      {
        ...profileResult,
      },
    ]);

    closeModal();
  };

  const openConfirmationDialog = () => {
    setShowConfirmationDialog(true);
  };

  const handleDeleteChildrenProfile = async () => {
    await deleteChildrenProfile({
      accessToken,
      childrenProfileId: selectedProfileIdForDeletion,
    });
    const getChildrenProfilesResult = await getChildrenProfiles({
      accessToken,
      userId,
    });

    setChildrenProfiles(getChildrenProfilesResult);
    setShowConfirmationDialog(false);
  };

  const validateForm = (values) => {
    const validation = {
      errors: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        weightAtBirth: '',
        apgarScore: '',
      },
      isValid: true,
    };

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName =
        'Te rugam sa introduci prenumele copilului.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName =
        'Te rugam sa introduci numele de familie al copilului.';
    }

    if (!values.dateOfBirth) {
      validation.isValid = false;
      validation.errors.dateOfBirth =
        'Te rugam sa introduci data de nastere copilului.';
    }

    if (!values.weightAtBirth) {
      validation.isValid = false;
      validation.errors.weightAtBirth =
        'Te rugam sa introduci greutatea la nastere a copilului (g).';
    }

    if (!values.apgarScore) {
      validation.isValid = false;
      validation.errors.apgarScore =
        'Te rugam sa introduci nota APGAR primita la nastere.';
    }

    return validation;
  };

  return (
    <>
      <div className="mt-8 ml-4">
        {rol === 'parinte' && (
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Adauga Profil
          </button>
        )}
        <div className="mt-8">
          {childrenProfiles.length > 0 ? (
            <>
              <div className="font-medium">Profile existente</div>
              <hr />
              <ul>
                {childrenProfiles.map((profile) => {
                  const { id, lastName, firstName } = profile;

                  const url = `/profile/${id}`;

                  return (
                    <div key={id}>
                      <li className="p-3">
                        <div className="flex">
                          <div className="flex-1">
                            <Link to={url}>
                              {lastName} {firstName}
                            </Link>
                          </div>
                          {rol === 'parinte' && (
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  openConfirmationDialog();
                                  setSelectedrPofileIdForDeletion(id);
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
                })}
              </ul>
            </>
          ) : (
            <>
              {rol === 'parinte'
                ? 'Nu aveti adaugat nici un profil.'
                : 'Nu aveti acces la nici un profil.'}
            </>
          )}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-10"
                    >
                      Creare profil copil
                    </Dialog.Title>
                    <div className="flex mt-4">
                      <div className="flex w-[180px]">
                        <label htmlFor="firstName">Prenume</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx(
                            'w-[100%] border rounded border-black ml-1',
                            {
                              'border-red-800': errors.firstName,
                            }
                          )}
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={values.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-red-800">{errors.firstName}</p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[180px]">
                        <label htmlFor="lastName">Nume</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx(
                            'w-[100%] border rounded border-black ml-1',
                            {
                              'border-red-800': errors.lastName,
                            }
                          )}
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={values.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-red-800">{errors.lastName}</p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[180px]">
                        <label htmlFor="dateOfBirth">Data nasterii</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx(
                            'w-[100%] border rounded border-black ml-1',
                            {
                              'border-red-800': errors.dateOfBirth,
                            }
                          )}
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={values.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-red-800">{errors.dateOfBirth}</p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[180px]">
                        <label htmlFor="weightAtBirth">
                          Greutatea la nastere (g)
                        </label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx(
                            'w-[100%] border rounded border-black ml-1',
                            {
                              'border-red-800': errors.weightAtBirth,
                            }
                          )}
                          type="text"
                          pattern="[0-9]*"
                          name="weightAtBirth"
                          id="weightAtBirth"
                          value={values.weightAtBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.weightAtBirth && (
                      <p className="mt-1 text-red-800">
                        {errors.weightAtBirth}
                      </p>
                    )}

                    <div className="flex mt-4">
                      <div className="flex w-[180px]">
                        <label htmlFor="apgarScore">Nota APGAR</label>
                      </div>
                      <div className="flex grow">
                        <input
                          className={clsx(
                            'w-[100%] border rounded border-black ml-1',
                            {
                              'border-red-800': errors.apgarScore,
                            }
                          )}
                          type="text"
                          name="apgarScore"
                          id="apgarScore"
                          value={values.apgarScore}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {errors.apgarScore && (
                      <p className="mt-1 text-red-800">{errors.apgarScore}</p>
                    )}
                    <div className="flex mt-10 justify-end">
                      <button
                        type="submit"
                        className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        Creaza profil
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ConfirmationDialog
        showConfirmationDialog={showConfirmationDialog}
        setShowConfirmationDialog={setShowConfirmationDialog}
        handleConfirmation={handleDeleteChildrenProfile}
      />
    </>
  );
};

export default Home;

import { Fragment, useEffect, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AuthContext } from '../../contexts/Auth';
import { updateChildrenProfile } from '../../services';

const EditProfileDialog = ({
  isEditProfileDialogOpen,
  setIsEditProfileDialogOpen,
  profile,
  setProfile,
}) => {

  const {
    accessToken,
  } = useContext(AuthContext);

  const [profileValues, setProfileValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  })
  const [profileErrors, setProfileErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  });

  useEffect(() => {
    setProfileValues({
      ...profile,
    })
  }, [profile]);

  const closeModal = () => {
    setIsEditProfileDialogOpen(false);
    setProfileValues({
      ...profile,
    });
    setProfileErrors({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      weightAtBirth: '',
      apgarScore: '',
    });
  };

  const handleInputChange = (e) => {
    setProfileErrors({ ...profileErrors, [e.target.name]: '' });
    setProfileValues({ ...profileValues, [e.target.name]: e.target.value });
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(profileValues);

    if (!validation.isValid) {
      setProfileErrors(validation.errors);
      return;
    }

    await updateChildrenProfile({
      accessToken,
      childrenProfileId: profile.id,
      profileValues,
    });

    setProfile({
      ...profileValues,
    });

    closeModal();
  };

  return (
    <Transition appear show={isEditProfileDialogOpen} as={Fragment}>
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
                    Editare profil
                  </Dialog.Title>
                  <div className="flex mt-4">
                    <div className="flex w-[180px]">
                      <label htmlFor="lastName">Nume</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.lastName,
                        })}
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={profileValues.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.lastName && (
                    <p className="mt-1 text-red-800">{profileErrors.lastName}</p>
                  )}


                  <div className="flex mt-4">
                    <div className="flex w-[180px]">
                      <label htmlFor="firstName">Prenume</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.firstName,
                        })}
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={profileValues.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.firstName && (
                    <p className="mt-1 text-red-800">{profileErrors.firstName}</p>
                  )}

                  <div className="flex mt-4">
                    <div className="flex w-[180px]">
                      <label htmlFor="dateOfBirth">Data nasterii</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.dateOfBirth,
                        })}
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={profileValues.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.dateOfBirth && (
                    <p className="mt-1 text-red-800">
                      {profileErrors.dateOfBirth}
                    </p>
                  )}

                  <div className="flex mt-4">
                    <div className="flex w-[180px]">
                      <label htmlFor="weightAtBirth">Greutate la nastere (g)</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.weightAtBirth,
                        })}
                        type="text"
                        name="weightAtBirth"
                        id="weightAtBirth"
                        value={profileValues.weightAtBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.weightAtBirth && (
                    <p className="mt-1 text-red-800">
                      {profileErrors.weightAtBirth}
                    </p>
                  )}

                  <div className="flex mt-4">
                    <div className="flex w-[180px]">
                      <label htmlFor="apgarScore">Scor AGPAR</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.apgarScore,
                        })}
                        type="text"
                        name="apgarScore"
                        id="apgarScore"
                        value={profileValues.apgarScore}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.apgarScore && (
                    <p className="mt-1 text-red-800">
                      {profileErrors.apgarScore}
                    </p>
                  )}

                  <div className="flex mt-10 justify-end">
                    <button
                      type="submit"
                      className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Salveaza profil
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
};

export default EditProfileDialog;

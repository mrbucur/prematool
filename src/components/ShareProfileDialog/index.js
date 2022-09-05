import { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AuthContext } from '../../contexts/Auth';
import { shareProfile } from '../../services';

const ShareProfileDialog = ({
  isShareProfileDialogOpen,
  setIsShareProfileDialogOpen,
  childrenProfileId,

}) => {

  const {
    accessToken,
  } = useContext(AuthContext);

  const [shareProfileValues, setShareProfileValues] = useState({
    userEmail: ''
  })
  const [profileErrors, setProfileErrors] = useState({
    userEmail: ''
  });

  const closeModal = () => {
    setIsShareProfileDialogOpen(false);
    setShareProfileValues({
      userEmail: '',
    });
    setProfileErrors({
      userEmail: '',
    });
  };

  const handleInputChange = (e) => {
    setProfileErrors({ ...profileErrors, [e.target.name]: '' });
    setShareProfileValues({ ...shareProfileValues, [e.target.name]: e.target.value });
  }

  const validateForm = (values) => {
    const validation = {
      errors: {
        userEmail: '',
      },
      isValid: true,
    };

    if (!values.userEmail) {
      validation.isValid = false;
      validation.errors.userEmail =
        'Te rugam sa introduci adresa de e-mail';
    }

    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(shareProfileValues);

    if (!validation.isValid) {
      setProfileErrors(validation.errors);
      return;
    }

    await shareProfile({
      accessToken,
      userEmail: shareProfileValues.userEmail,
      childrenProfileId,
    });

    closeModal();
  };

  return (
    <Transition appear show={isShareProfileDialogOpen} as={Fragment}>
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
                    Partajeaza profil
                  </Dialog.Title>
                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="userEmail">Adresa email</label>
                    </div>
                    <div className="flex grow">
                      <input
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': profileErrors.userEmail,
                        })}
                        type="text"
                        name="userEmail"
                        id="userEmail"
                        value={shareProfileValues.userEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {profileErrors.userEmail && (
                    <p className="mt-1 text-red-800">{profileErrors.userEmail}</p>
                  )}

                  <div className="flex mt-10 justify-end">
                    <button
                      type="submit"
                      className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Partajeaza profil
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

export default ShareProfileDialog;

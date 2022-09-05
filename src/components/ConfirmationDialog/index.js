import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ConfirmationDialog = ({
  showConfirmationDialog,
  setShowConfirmationDialog,
  handleConfirmation,
}) => {

  const closeModal = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <Transition appear show={showConfirmationDialog} as={Fragment}>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <p className="mb-10">Confirmare</p>
                </Dialog.Title>

                <p className="mb-10">Sunteti sigur ca doriti sa efectuati aceasa actiune?</p>
                <div className="flex justify-end">
                  <div className="flex mt-4 mr-4">
                    <button
                      onClick={closeModal}
                      className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Anuleaza
                    </button>
                  </div>
                  <div className="flex mt-4">
                    <button
                      onClick={handleConfirmation}
                      className="rounded-md bg-red-700 bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Da, sunt sigur
                    </button>
                  </div>

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmationDialog;

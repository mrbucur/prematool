import { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AuthContext } from '../../contexts/Auth';
import { registerUser } from '../../services';

const RegisterDialog = ({
  isRegisterDialogOpen,
  setIsRegisterDialogOpen,
}) => {
  const {
    accessToken,
  } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    lastName: '',
    firstName: '',
    rol: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    lastName: '',
    firstName: '',
    rol: '',
  });

  const closeModal = () => {
    setIsRegisterDialogOpen(false);
    setValues({
      email: '',
      password: '',
      retype_password: '',
      lastName: '',
      firstName: '',
      rol: '',
    });
    setErrors({
      email: '',
      password: '',
      retype_password: '',
      lastName: '',
      firstName: '',
      rol: '',
    });
  };

  const handleInputChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const validateForm = (values) => {

    const validation = {
      errors: {
        email: '',
        password: '',
        retype_password: '',
        lastName: '',
        firstName: '',
        rol: '',
      },
      isValid: true,
    };

    /* eslint-disable no-control-regex*/
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    if (!values.email || !emailRegex.test(values.email)) {
      validation.isValid = false;
      validation.errors.email = 'Te rugam sa introduci o adresa de email valida';
    }

    if (!values.password || values.password.length < 6) {
      validation.isValid = false;
      validation.errors.password =
        'Te rugam sa introduci o parola de minim 6 caractere.';
    }

    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'Cele doua parole nu coincid.';
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'Te rugam sa introduci prenumele tau.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = 'Te rugam sa introduci numele de familie.';
    }

    if (!values.rol) {
      validation.isValid = false;
      validation.errors.rol = 'Te rugam sa alegi categoria de utilizator.';
    }

    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const {
      retype_password,
      ...rest
    } = values;

    await registerUser({
      accessToken,
      values: {
        ...rest,
      }
    });

    closeModal();
  };

  return (
    <Transition appear show={isRegisterDialogOpen} as={Fragment}>
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
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-10"
                  >
                    Inregistreare cont
                  </Dialog.Title>
                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="email">Email / User Name</label>
                    </div>
                    <div className="flex grow">
                      <input
                        autoComplete="false"
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.email,
                        })}
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleInputChange}
                      />

                    </div>
                  </div>
                  {errors.email && <p className="mt-1 text-red-800">{errors.email}</p>}

                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="password">Parola</label>
                    </div>
                    <div className="flex grow">
                      <input
                        autoComplete="false"
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.password,
                        })}
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-red-800">{errors.password}</p>
                  )}

                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="retype_password">Retype password</label>
                    </div>
                    <div className="flex grow">
                      <input
                        autoComplete="false"
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.retype_password,
                        })}
                        type="password"
                        name="retype_password"
                        id="retype_password"
                        value={values.retype_password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {errors.retype_password && (
                    <p className="mt-1 text-red-800">{errors.retype_password}</p>
                  )}

                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="firstName">Prenume</label>
                    </div>
                    <div className="flex grow">
                      <input
                        autoComplete="false"
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.firstName,
                        })}
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
                    <div className="flex w-[150px]">
                      <label htmlFor="lastName">Nume</label>
                    </div>
                    <div className="flex grow">
                      <input
                        autoComplete="false"
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.lastName,
                        })}
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {errors.lastName && <p className="mt-1 text-red-800">{errors.lastName}</p>}

                  <div className="flex mt-4">
                    <div className="flex w-[150px]">
                      <label htmlFor="rol">Rol</label>
                    </div>
                    <div className="flex grow">
                      <select
                        name="rol"
                        id="rol"
                        value={values.rol}
                        onChange={handleInputChange}
                        className={clsx('w-[100%] border rounded border-black ml-1', {
                          'border-red-800': errors.rol,
                        })}
                      >
                        <option value="" disabled>Selecteaza...</option>
                        <option value="parinte">parinte</option>
                        <option value="medic">medic</option>
                      </select>
                    </div>
                  </div>
                  {errors.rol && <p className="mt-1 text-red-800">{errors.rol}</p>}

                  <div className="flex mt-10 justify-end">
                    <button
                      type="submit"
                      className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Creaza cont
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
};

export default RegisterDialog;


import React, { useState, useContext } from 'react';
import { login } from '../../services';
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../contexts/Application';
import RegisterDialog from '../../components/RegisterDialog';
import logo from './logo.png';

const Login = () => {
  const { setIsAuthenticated, setAccessToken, setEmail } =
    useContext(AuthContext);

  const { setUserProfile } = useContext(ApplicationContext);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    const { email, password } = values;
    const data = await login({ email, password });

    if (typeof data === 'string') {
      return setError(data);
    }

    localStorage.setItem('accessToken', data.accessToken);
    setAccessToken(data.accessToken);
    localStorage.setItem('email', data.user.email);
    setEmail(data.user.username);

    setUserProfile({
      ...data.user,
    });

    setIsAuthenticated(true);

    navigate('/');
  };

  const handleInputChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <>
      <img
        src={logo}
        width={250}
        height={250}
        alt="PremaTool Logo"
        className="center"
      />
      <div className="flex grow justify-center pt-20">
        <div className="flex w-[400px]">
          <form onSubmit={handleOnSubmit}>
            <div className="flex mt-10 grow">
              <div className="flex w-[100px]">
                <label htmlFor="email">Email</label>
              </div>
              <div className="flex grow">
                <input
                  className="border rounded border-black ml-1 w-[100%]"
                  type="text"
                  id="email"
                  style={{ border: '1px solid black', borderRadius: 5 }}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex mt-10 grow">
              <div className="flex w-[100px]">
                <label htmlFor="password">Password</label>
              </div>
              <div className="flex grow">
                <input
                  className="border rounded border-black ml-1 w-[100%]"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex mt-10 grow justify-between">
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setIsRegisterDialogOpen(true);
                }}
                className="w-[120px] rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Creaza cont
              </button>
              <button
                type="submit"
                className="w-[120px] rounded-md bg-black bg-opacity-80 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Login
              </button>
            </div>
            <div className="flex mt-10 grow justify-center">{error}</div>
          </form>
        </div>
      </div>
      <RegisterDialog
        isRegisterDialogOpen={isRegisterDialogOpen}
        setIsRegisterDialogOpen={setIsRegisterDialogOpen}
      />
    </>
  );
};

export default Login;

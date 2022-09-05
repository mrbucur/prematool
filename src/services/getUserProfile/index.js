import { API } from '../config';

export const getUserProfile = async ({ email, accessToken }) => {
  try {
    const result = await fetch(
      `${API}/users?email=${email}&accessToken=${accessToken}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const formattedResult = await result.json();
    delete formattedResult[0].password;
    delete formattedResult[0].accessToken;
    return formattedResult[0];
  } catch (error) {
    return error;
  }
};

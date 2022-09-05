import { API } from '../config';

export const checkAuth = async ({ email, accessToken }) => {
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

    return formattedResult.length > 0;
  } catch (error) {
    return error;
  }
};


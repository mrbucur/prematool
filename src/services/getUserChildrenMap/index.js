import { API } from '../config';

export const getUserChildrenMap = async ({ accessToken }) => {
  try {
    const userChildrenMapResult = await fetch(
      `${API}/user-children-map`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const formattedResult = await userChildrenMapResult.json()
    return formattedResult;
  } catch (error) {
    return error;
  }
};

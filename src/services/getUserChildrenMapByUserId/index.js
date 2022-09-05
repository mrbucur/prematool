import { API } from '../config';

export const getUserChildrenMapByUserId = async ({ accessToken, userId }) => {
  try {
    const userChildrenMapResult = await fetch(
      `${API}/user-children-map/${userId}`,
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

import { API } from '../config';

export const updateUserChildrenMap = async ({ accessToken, userId, childrenProfileIds }) => {
  try {
    await fetch(
      `${API}/user-children-map/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ childrenProfileIds })
      }
    );

    return true;
  } catch (error) {
    return error;
  }
};

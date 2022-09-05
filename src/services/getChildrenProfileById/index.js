import { API } from '../config';

export const getChildrenProfileById = async ({ accessToken, id }) => {
  const result = await fetch(
    `${API}/children-profiles/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const formattedResult = await result.json();
  return formattedResult;
};

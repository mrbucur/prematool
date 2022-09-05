import { API } from '../config';
import { v4 as uuidv4 } from 'uuid';

export const addChildrenProfile = async ({ accessToken, userId, childrenProfile }) => {
  try {
    const newId = uuidv4();

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

    if (userChildrenMapResult.status === 404) {
      await fetch(
        `${API}/user-children-map`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            childrenProfileIds: [
              newId,
            ],
            id: userId,
          })
        }
      );
    } else {
      const userChildrenMap = await userChildrenMapResult.json();
      const {
        childrenProfileIds,
      } = userChildrenMap;

      await fetch(
        `${API}/user-children-map/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            ...userChildrenMap,
            childrenProfileIds: [
              ...childrenProfileIds,
              newId,
            ]
          })
        }
      );
    }

    await fetch(
      `${API}/children-profiles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...childrenProfile,
          id: newId,
        })
      }
    );

    return {
      ...childrenProfile,
      id: newId,
    };
  } catch (error) {
    return error;
  }
};


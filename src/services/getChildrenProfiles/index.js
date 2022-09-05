import { API } from '../config';

export const getChildrenProfiles = async ({ accessToken, userId }) => {
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

    const formattedUserChildrenMapResult = await userChildrenMapResult.json();

    const {
      childrenProfileIds,
    } = formattedUserChildrenMapResult;

    if (childrenProfileIds) {
      const result = await fetch(
        `${API}/children-profiles`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const formattedResult = await result.json();
      const filteredResult = formattedResult.filter((profile) => childrenProfileIds.includes(profile.id));
      return filteredResult;
    } else {
      return [];
    }

  } catch (error) {
    return error;
  }
};

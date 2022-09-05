import { API } from "../config";

export const updateChildrenProfile = async ({
  accessToken,
  profileValues,
  childrenProfileId,
}) => {
  try {
    await fetch(
      `${API}/children-profiles/${childrenProfileId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profileValues),
      }
    )
  } catch (error) {
    return error;
  }
};

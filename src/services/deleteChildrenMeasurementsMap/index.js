import { API } from "../config";

export const deleteChildrenMeasurementsMap = async ({
  accessToken,
  childrenProfileId,
}) => {
  try {
    await fetch(
      `${API}/children-measurements-map/${childrenProfileId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
}

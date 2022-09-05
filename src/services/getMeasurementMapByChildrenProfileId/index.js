import { API } from "../config"

export const getMeasurementMapByChildrenProfileId = async ({
  accessToken,
  childrenProfileId,
}) => {
  try {
    const result = await fetch(
      `${API}/children-measurement-map/${childrenProfileId}`,
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
  } catch (error) {
    return [];
  }
}

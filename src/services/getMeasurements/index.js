import { API } from "../config";

export const getMeasurements = async ({
  accessToken,
}) => {
  const result = await fetch(
    `${API}/measurements`,
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

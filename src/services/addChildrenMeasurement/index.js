import { API } from "../config"
import { v4 as uuidv4 } from 'uuid';

export const addChildrenMeasurement = async ({
  accessToken,
  childrenProfileId,
  measurement,
}) => {
  try {
    const newId = uuidv4();

    const childrenMeasurementMapResult = await fetch(
      `${API}/children-measurement-map/${childrenProfileId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (childrenMeasurementMapResult.status === 404) {
      await fetch(
        `${API}/children-measurement-map`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            measurementIds: [
              newId,
            ],
            id: childrenProfileId,
          })
        }
      );
    } else {
      const childrenMeasurementMap = await childrenMeasurementMapResult.json();
      const {
        measurementIds,
      } = childrenMeasurementMap;

      await fetch(
        `${API}/children-measurement-map/${childrenProfileId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            ...childrenMeasurementMap,
            measurementIds: [
              ...measurementIds,
              newId,
            ]
          })
        }
      );
    }

    await fetch(
      `${API}/measurements`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...measurement,
          id: newId,
        })
      }
    );

    return {
      ...measurement,
      id: newId,
    };

  } catch (error) {
    return error;
  }
};

import { API } from "../config";
import { getMeasurementMapByChildrenProfileId } from '../getMeasurementMapByChildrenProfileId';

export const deleteMeasurement = async ({
  accessToken,
  measurementId,
  childrenProfileId,
}) => {
  try {
    const measurementMap = await getMeasurementMapByChildrenProfileId({
      accessToken,
      childrenProfileId,
    });

    const {
      measurementIds,
    } = measurementMap;

    const filteredMeasurementIds = [
      ...measurementIds.slice(0, measurementIds.indexOf(measurementId)),
      ...measurementIds.slice(measurementIds.indexOf(measurementId) + 1),
    ];

    await fetch(
      `${API}/children-measurement-map/${childrenProfileId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          measurementIds: filteredMeasurementIds,
        })
      }
    );

    await fetch(
      `${API}/measurements/${measurementId}`,
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

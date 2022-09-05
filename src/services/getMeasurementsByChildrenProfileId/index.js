import { getMeasurements } from "../getMeasurements";
import { getMeasurementMapByChildrenProfileId } from "../getMeasurementMapByChildrenProfileId";

export const getMeasurementsByChildrenProfileId = async ({
  accessToken,
  childrenProfileId,
}) => {

  const result = await getMeasurementMapByChildrenProfileId({
    accessToken,
    childrenProfileId
  });

  const {
    measurementIds,
  } = result;

  if (measurementIds) {
    const measurements = await getMeasurements({
      accessToken,
    });

    const filteredMeasurements = measurements.filter((measurement) => {
      return measurementIds.includes(measurement.id);
    });

    return filteredMeasurements;
  } else {
    return [];
  }
};

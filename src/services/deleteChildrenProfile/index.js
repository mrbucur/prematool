import { API } from '../config';
import { getMeasurementMapByChildrenProfileId } from '../getMeasurementMapByChildrenProfileId';
import { getUserChildrenMap } from '../getUserChildrenMap';
import { updateUserChildrenMap } from '../updateUserChildrenMap';

export const deleteChildrenProfile = async ({ accessToken, childrenProfileId }) => {
  try {
    const userChildrenMap = await getUserChildrenMap({ accessToken });

    userChildrenMap.map(async (mapObj) => {
      if (mapObj.childrenProfileIds.includes(childrenProfileId)) {
        mapObj.childrenProfileIds = [
          ...mapObj.childrenProfileIds.slice(0, mapObj.childrenProfileIds.indexOf(childrenProfileId)),
          ...mapObj.childrenProfileIds.slice(mapObj.childrenProfileIds.indexOf(childrenProfileId) + 1),
        ];

        await updateUserChildrenMap({ accessToken, userId: mapObj.id, childrenProfileIds: mapObj.childrenProfileIds });
      }
    });

    await fetch(
      `${API}/children-profiles/${childrenProfileId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const measurementMap = await getMeasurementMapByChildrenProfileId({
      accessToken,
      childrenProfileId,
    });

    const {
      measurementIds,
    } = measurementMap;

    measurementIds.forEach(async (id) => {
      await fetch(
        `${API}/measurements/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    });

    await fetch(
      `${API}/children-measurement-map/${childrenProfileId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  } catch (error) {
    return error;
  }
};

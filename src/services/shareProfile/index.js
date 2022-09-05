import { API } from "../config";
import { getUserChildrenMapByUserId } from "../getUserChildrenMapByUserId";

export const shareProfile = async ({
  accessToken,
  userEmail,
  childrenProfileId,
}) => {
  try {
    const users = await fetch(
      `${API}/users`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const formattedUsers = await users.json();

    const filteredUser = formattedUsers.filter(user => user.email === userEmail)[0];

    if (filteredUser) {
      if (filteredUser.rol !== 'medic') {
        return 'Userul nu este medic'
      } else {

        const {
          id,
        } = filteredUser;

        const userChildrenMap = await getUserChildrenMapByUserId({
          accessToken,
          userId: id,
        })

        const {
          childrenProfileIds,
        } = userChildrenMap;

        if (childrenProfileIds) {
          await fetch(
            `${API}/user-children-map/${id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                childrenProfileIds: [
                  ...childrenProfileIds,
                  childrenProfileId,
                ],
                id: id,
              })
            }
          )
        } else {
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
                  childrenProfileId,
                ],
                id: id,
              })
            }
          )
        }
      }
    } else {
      return 'Userul nu exista in baza de date'
    }
  } catch (error) {
    return error;
  }
};

import { API } from "../config";
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async ({
  accessToken,
  values,
}) => {
  try {
    const newId = uuidv4();
    await fetch(
      `${API}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...values,
          id: newId,
        })
      }
    )

  } catch (error) {
    return error
  }
};

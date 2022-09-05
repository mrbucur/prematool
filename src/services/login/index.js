import { API } from '../config';

export const login = async ({ email, password }) => {
  try {
    const result = await fetch(
      `
      ${API}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const formattedResult = await result.json();
    return formattedResult;
  } catch (error) {
    return error;
  }
};


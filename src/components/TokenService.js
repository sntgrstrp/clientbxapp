import axios from 'axios';

const API_URL = 'https://c8cqb4ir7g.execute-api.us-east-1.amazonaws.com';

const getToken = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/get_tokens_convenio_empresa`, {
      username: username,
      password: password,
    });

    if (response.status === 200 && response.data && response.data.data) {
      const token = response.data.data.IdToken;
      console.log('token:', token);
      return token;
    } else {
      throw new Error('Error al obtener el token.');
    }
  } catch (error) {
    throw error;
  }
};

export { getToken };

import axios from 'axios';

const API_URL = 'https://c8cqb4ir7g.execute-api.us-east-1.amazonaws.com';
const USERNAME = process.env.REACT_APP_API_USERNAME;
const PASSWORD = process.env.REACT_APP_API_PASSWORD;

const getToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/get_tokens_convenio_empresa`, {
      username: USERNAME,
      password: PASSWORD,
    });
    return response.data.IdToken;
  } catch (error) {
    throw error;
  }
};

export { getToken };

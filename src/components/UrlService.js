import axios from 'axios';

const API_URL = 'https://c8cqb4ir7g.execute-api.us-east-1.amazonaws.com';

const generateUrl = async (token, requestData) => {
  try {
    const response = await axios.post(`${API_URL}/generate_url`, requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200 && response.data && response.data.data) {
      const url = response.data.data.url;
      console.log('url:', url);
      return url;
    } else {
      throw new Error('Error al generar la URL.');
    }
  } catch (error) {
    throw error;
  }
};

export { generateUrl };

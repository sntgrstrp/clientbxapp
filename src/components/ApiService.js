import axios from 'axios';

const API_URL = 'https://c8cqb4ir7g.execute-api.us-east-1.amazonaws.com';

const generateUrl = async (token, requestData) => {
  try {
    const response = await axios.post(`${API_URL}/generate_url`, requestData, {
      headers: { Authorization: token },
    });
    return response.data.URL;
  } catch (error) {
    throw error;
  }
};

export { generateUrl };

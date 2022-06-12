const axios = require('axios');

const postRequest = async function fetchAsync(url, body, authHeaders) {
  const data = await axios.post(url, body, { headers: authHeaders });
  return data.data;
};

module.exports = postRequest;

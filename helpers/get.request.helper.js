const axios = require('axios');

const getRequest = async function fetchAsync(url, auth) {
  const data = await axios.get(url, {}, { headers: { Authorization: +auth } });
  return data.data;
};

module.exports = getRequest;

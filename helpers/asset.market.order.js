const crypto = require('crypto');
const postRequest = require('./post.request.helper');

const API_KEY = process.env.BUDA_KEY;
const API_SECRET = process.env.BUDA_SECRET;

const METHOD = 'POST';

function generateURL(ticker) {
  return `https://www.buda.com/api/v2/markets/${ticker}-clp/orders`;
}

function generatePath(url) {
  return url.split('.com')[1];
}

function generateBody(amount, transactionType) {
  return {
    type: transactionType,
    price_type: 'market',
    amount,
  };
}

function generateNonce() {
  return (Date.now() * 1000).toString();
}

const authHeader = function authHeaderGenerate(method, path, body) {
  const nonce = generateNonce();
  let message;
  if (body) {
    const base64EncodedBody = Buffer.from(JSON.stringify(body)).toString('base64');
    message = `${method} ${path} ${base64EncodedBody} ${nonce}`;
  } else {
    message = `${method} ${path} ${nonce}`;
  }
  const signature = crypto.createHmac('sha384', API_SECRET).update(message).digest('hex');

  return {
    'X-SBTC-APIKEY': API_KEY,
    'X-SBTC-NONCE': nonce,
    'X-SBTC-SIGNATURE': signature,
  };
};

const marketOrder = async function postMarketOrder(amount, ticker, transactionType) {
  const URL = generateURL(ticker);
  const BODY = generateBody(amount, transactionType);
  const PATH = generatePath(URL);
  const HEADERS = authHeader(METHOD, PATH, BODY);
  return postRequest(URL, BODY, HEADERS);
};
module.exports = marketOrder;

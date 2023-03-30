const axios = require("axios");

const BINANCE_P2P_API =
  "https://c2c.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

const REQUEST_BODY = {
  page: 1,
  rows: 10,
  payTypes: [],
  asset: "USDT",
  tradeType: "BUY",
  fiat: "ARS",
  publisherType: null,
  merchantCheck: false,
};

const TOKENS = ["USDT", "BUSD", "DAI", "ETH", "BTC", "BNB"];

const BINANCE_P2P_BUY_URL = `https://p2p.binance.com/en/trade/buy/USDT?fiat=ARS`;

const bestPrices = [];

async function getBuyPrices() {
  //BEST PRICES
  TOKENS.map(async (token) => {
    //REQUEST BODY
    let requestBody = {
      page: 1,
      rows: 10,
      payTypes: [],
      asset: token,
      tradeType: "BUY",
      fiat: "ARS",
      publisherType: null,
      merchantCheck: false,
    };

    //FUNCTION
    await axios.post(BINANCE_P2P_API, requestBody).then((r) => {
      console.log(process_p2p(r, token));
    });
  });
}

function viewResult(result) {
  bestPrices.push(result);
}

function process_p2p(response, token) {
  let { data } = response;

  if (data == undefined || data == "") {
    return {};
  }

  // {data: { data: {} }}
  data = data.data;
  if (data == undefined || data == "") {
    return {};
  }

  let filtered = [];

  data.map((e) => {
    let { adv } = e;

    let price = Number;

    //VERIFIED TRADE METHOD
    if (adv.tradeMethods.length == 1) {
      if (adv.tradeMethods[0].identifier !== "CashInPerson") {
        price = Number(adv.price);
        filtered.push(price);
      }
      return;
    }

    price = Number(adv.price);

    filtered.push(price);
  });

  let bestPrice = Math.min(...filtered);

  let bestData = { price: bestPrice, asset: token };
  return bestData;
}

getBuyPrices();

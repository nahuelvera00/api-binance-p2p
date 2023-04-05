import axios from "axios";

const BINANCE_P2P_API =
  "https://c2c.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

async function getPrice() {
  const TOKENS = ["USDT", "BUSD", "DAI", "ETH", "BTC", "BNB"];

  const bestPrices = TOKENS.map(async (token) => {
    //REQUEST BODY
    let requestBody = {
      page: 1,
      rows: 10,
      payTypes: [],
      asset: token,
      tradeType: "SELL",
      fiat: "ARS",
      publisherType: null,
      merchantCheck: false,
    };

    const response = await axios
      .post(BINANCE_P2P_API, requestBody)
      .then((response) => {
        let { data } = response.data;

        //BEST PRICE
        let allPrices = [];

        data.map((order) => {
          let { adv } = order;

          //VERIFIED TRADE METHOD
          if (adv.tradeMethods.length == 1) {
            if (adv.tradeMethods[0].identifier != "CashInPerson") {
              allPrices.push(Number(adv.price));
            }
            return;
          }

          allPrices.push(Number(adv.price));
        });

        let bestPrice = Math.min(...allPrices);
        return bestPrice;
      });

    return { price: response, token };
  });

  return Promise.all(bestPrices).then((values) => {
    return values;
  });
}

export async function getSellPrices() {
  const SellPrices = await getPrice();
  return SellPrices;
}

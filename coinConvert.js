import Binance from "node-binance-api";

const binance = new Binance().options({
  APIKEY: "tdxkAyfhefIjFsQRtiv9NYTKOHY3OFmFKYLuSWpujlhw8BpoSqBmtPWCaYW2us7W",
  APISECRET: "87Gb7coI7c0cMFiwWr3XjbEqcybQ3QoQ9saW7izbaFVEdinFgtWWtG89AkH3QIb7",
});

export async function coinConvert(buy, sell) {
  const BTC_PRICE = await binance.prices();
  let { BTCUSDT, BNBUSDT, ETHUSDT } = BTC_PRICE;

  const buyArr = buy.map((value) => {
    if (value.token === "ETH") {
      return {
        price: value.price / ETHUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else if (value.token === "BTC") {
      return {
        price: value.price / BTCUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else if (value.token === "BNB") {
      return {
        price: value.price / BNBUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else {
      return { price: value.price, token: value.token, priceP2P: value.price };
    }
  });

  const sellArr = sell.map((value) => {
    if (value.token === "ETH") {
      return {
        price: value.price / ETHUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else if (value.token === "BTC") {
      return {
        price: value.price / BTCUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else if (value.token === "BNB") {
      return {
        price: value.price / BNBUSDT,
        token: value.token,
        priceP2P: value.price,
      };
    } else {
      return { price: value.price, token: value.token, priceP2P: value.price };
    }
  });

  return { buyArr, sellArr };
}

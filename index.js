import { coinConvert } from "./coinConvert.js";
import { getBuyPrices } from "./getBuyPrices.js";
import { getSellPrices } from "./getSellPrices.js";

async function start() {
  const buy = await getBuyPrices();
  const sell = await getSellPrices();

  //Conver BTC, ETH and BNB to USD
  const prices = await coinConvert(buy, sell);
  let { buyArr, sellArr } = prices;

  //Get the lowest and Highest price
  //Sell
  const highest = getHighestPrice(buyArr);

  //Buy
  const lowest = getLowestPrice(sellArr);

  console.log(
    `La Mejor opcion actualmente es crear una orden de compra de: ${
      lowest.token
    } a ${lowest.priceP2P} AR$ \n y crear una orden de venta de: ${
      highest.token
    } a ${highest.priceP2P},\n obteniendo una ganancia de: ${(
      highest.price - lowest.price
    ).toFixed(2)} AR$ por cada Dolar comprado y vendido`
  );

  function getLowestPrice(arr) {
    let lowPrice = arr[0];

    arr.map((value) => {
      if (value.price < lowPrice.price) {
        lowPrice = value;
      }
    });

    return lowPrice;
  }

  //Get the highest price
  function getHighestPrice(arr) {
    let highPrice = arr[0];
    arr.map((value) => {
      if (value.price > highPrice.price) {
        highPrice = value;
      }
    });
    return highPrice;
  }
}

start();

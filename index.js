import { getBuyPrices } from "./getBuyPrices.js";
import { getSellPrices } from "./getSellPrices.js";

async function start() {
  const buy = await getBuyPrices();
  const sell = await getSellPrices();

  console.log("----------BUY PRICES-----------");
  console.log(
    buy.map((value) => {
      return `The purchase price of ${value.token} is: ${value.price} AR$`;
    })
  );
  console.log("--------SELL PRICES-----------");
  console.log(
    sell.map((value) => {
      return `The sale price of ${value.token} is: ${value.price} AR$`;
    })
  );
}

start();

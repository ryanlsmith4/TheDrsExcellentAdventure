// Event.js

// eslint-disable-next-line no-var
var OregonH = OregonH || {};

OregonH.Event = {};

// OregonH.Event.eventTypes = [
OregonH.eventTypes = [
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -4,
    text: 'Tardis Crash lands on World: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -3,
    text: 'Rose Tyler Gets Pissed Lose some crew: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'food',
    value: -10,
    text: 'The Dr. eats all your fish fingers and custard: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'money',
    value: -50,
    text: 'The Tardis mistakes someones bag for a DALEK., Lose Money! ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'oxen',
    value: -1,
    text: 'Universal Power Leak: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'The Tardis miraculously generated food: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'The Dr. Stopped to get more Jammie Dodgers: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'oxen',
    value: 1,
    text: 'Found a unit of Universal Power floating outside the tardis: ',
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a Space Post',
    products: [
      { item: 'Freeze-dried pills', qty: 20, price: 50 },
      { item: 'Universal Power', qty: 1, price: 200 },
      { item: 'Defense Points', qty: 2, price: 50 },
      { item: 'crew', qty: 5, price: 80 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      { item: 'Freeze-dried pills', qty: 30, price: 50 },
      { item: 'Universal Power', qty: 1, price: 200 },
      { item: 'Defense Points', qty: 2, price: 20 },
      { item: 'crew', qty: 10, price: 80 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'The Drs. Friend is offering various goods',
    products: [
      { item: 'Freeze-dried pills', qty: 20, price: 60 },
      { item: 'Universal Power', qty: 1, price: 300 },
      { item: 'Defense Points', qty: 2, price: 80 },
      { item: 'crew', qty: 5, price: 60 },
    ],
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'DALEKS are attacking you!!',
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'CYBERMEN are attacking you!!',
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'The Silence are attacking you',
  },
];

function randomInt(n) {
  const { floor, random } = Math;
  return floor(random() * n);
}

// =============================================================================
class Event {
  constructor(game) {
    this.game = game;
    this.eventTypes = OregonH.eventTypes;
  }

  generateEvent() {
    const eventIndex = randomInt(this.eventTypes.length);
    const eventData = this.eventTypes[eventIndex];

    // events that consist in updating a stat
    if (eventData.type === 'STAT-CHANGE') {
      this.stateChangeEvent(eventData);
    } else if (eventData.type === 'SHOP') {
      // shops
      // pause game
      this.game.pauseJourney();

      // notify user
      this.ui.notify(eventData.text, eventData.notification);

      // prepare event
      this.shopEvent(eventData);
    } else if (eventData.type === 'ATTACK') {
      // attacks
      // pause game
      this.game.pauseJourney();

      // notify user
      this.ui.notify(eventData.text, eventData.notification);

      // prepare event
      this.attackEvent(eventData);
    }
  }

  stateChangeEvent(eventData) {
    // can't have negative quantities
    if (eventData.value + this.caravan[eventData.stat] >= 0) {
      this.caravan[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  }

  shopEvent(eventData) {
    // number of products for sale
    const numProds = Math.ceil(Math.random() * 4);

    // product list
    const products = [];
    let j;
    let priceFactor;

    for (let i = 0; i < numProds; i += 1) {
      // random product
      j = randomInt(eventData.products.length);

      // multiply price by random factor +-30%
      priceFactor = 0.7 + 0.6 * Math.random();

      products.push({
        item: eventData.products[j].item,
        qty: eventData.products[j].qty,
        price: Math.round(eventData.products[j].price * priceFactor),
      });
    }

    this.ui.showShop(products);
  };


  attackEvent() {
    const firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_FIREPOWER_AVG);
    const gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_GOLD_AVG);

    this.ui.showAttack(firepower, gold);
  }
}

// =============================================================================



OregonH.Event = new Event();

console.log(OregonH.Event);
// OregonH.Event.generateEvent = function generateEvent() {
//   // pick random one
//   const eventIndex = randomInt(this.eventTypes.length);
//   const eventData = this.eventTypes[eventIndex];
//
//   // events that consist in updating a stat
//   if (eventData.type === 'STAT-CHANGE') {
//     this.stateChangeEvent(eventData);
//   } else if (eventData.type === 'SHOP') {
//     // shops
//     // pause game
//     this.game.pauseJourney();
//
//     // notify user
//     this.ui.notify(eventData.text, eventData.notification);
//
//     // prepare event
//     this.shopEvent(eventData);
//   } else if (eventData.type === 'ATTACK') {
//     // attacks
//     // pause game
//     this.game.pauseJourney();
//
//     // notify user
//     this.ui.notify(eventData.text, eventData.notification);
//
//     // prepare event
//     this.attackEvent(eventData);
//   }
// };
//
// OregonH.Event.stateChangeEvent = function stateChangeEvent(eventData) {
//   // can't have negative quantities
//   if (eventData.value + this.caravan[eventData.stat] >= 0) {
//     this.caravan[eventData.stat] += eventData.value;
//     this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
//   }
// };
//
// OregonH.Event.shopEvent = function shopEvent(eventData) {
//   // number of products for sale
//   const numProds = Math.ceil(Math.random() * 4);
//
//   // product list
//   const products = [];
//   let j;
//   let priceFactor;
//
//   for (let i = 0; i < numProds; i += 1) {
//     // random product
//     j = randomInt(eventData.products.length);
//
//     // multiply price by random factor +-30%
//     priceFactor = 0.7 + 0.6 * Math.random();
//
//     products.push({
//       item: eventData.products[j].item,
//       qty: eventData.products[j].qty,
//       price: Math.round(eventData.products[j].price * priceFactor),
//     });
//   }
//
//   this.ui.showShop(products);
// };

// // prepare an attack event
// OregonH.Event.attackEvent = function attackEvent() {
//   const firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_FIREPOWER_AVG);
//   const gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_GOLD_AVG);
//
//   this.ui.showAttack(firepower, gold);
// };

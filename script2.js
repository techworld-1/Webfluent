'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-03-15T17:01:17.194Z',
    '2023-03-21T23:36:17.929Z',
    '2023-03-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// nice Formatted Function
const niceFormatted = function (date, locale) {
  // Calculate days between dates
  const calcDaysUsingDates = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysUsingDates(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = `${date.getFullYear()}`;
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const functionForCurrency = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const display = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = niceFormatted(date, acc.locale);

    const formattedMov = functionForCurrency(mov, acc.currency, acc.locale);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = functionForCurrency(
    acc.balance,
    acc.currency,
    acc.locale
  );
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = functionForCurrency(
    income,
    acc.currency,
    acc.locale
  );

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = functionForCurrency(
    Math.abs(outcome),
    acc.currency,
    acc.locale
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = functionForCurrency(
    interest,
    acc.currency,
    acc.locale
  );
};

const proceed = function (namee) {
  namee.forEach(function (names) {
    names.username = names.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
console.log(proceed(accounts));

const updatUI = function (acc) {
  display(acc);
  // Display Balance
  calcPrintBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers

// Experimental API
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long',
// };

// Automatic language find on the support of browser
// const locale = navigator.language;
// console.log(locale);

// const datee = new Date();
// labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(datee);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

let currentAccount, timer;

// Implement Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display Ui And Welcome Message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };

    // Implementing Dates With Internationalizing API
    const datee = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(datee);

    // const datee = new Date();
    // const month = `${datee.getMonth() + 1}`.padStart(2, 0);
    // const year = datee.getFullYear();
    // const day = `${datee.getDate()}`.padStart(2, 0);
    // const hours = datee.getHours();
    // const mins = datee.getMinutes();
    // labelDate.textContent = `${day}/${month}/${year} , ${hours}:${mins}`;

    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Display Movments, Blance & Summary
    updatUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveAcc);

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    receiveAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    // ADD transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiveAcc.movementsDates.push(new Date().toISOString());

    updatUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add Movments
      currentAccount.movements.push(amount);

      // ADD loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Uodate UI
      updatUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2000);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
});

let sorting = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  display(currentAccount, !sorting);
  sorting = !sorting;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('23px'));
console.log(Number.parseInt('9938cndneiw'));

console.log(Number.parseFloat('3.89pc'));
console.log(Number.parseFloat('8.3802mm'));

console.log(Number.isNaN(+'20px'));
console.log(Number.isNaN(20));
console.log(Number.isNaN(19));

console.log(Number.isFinite(20));
console.log(Number.isFinite(20 / 0));
console.log(Number.isFinite('20'));

console.log(Number.isInteger(20));
console.log(Number.isInteger('+20pc'));
console.log(Number.isInteger(78.1));

// Math Operations
console.log(Math.sqrt(49));

console.log(Math.max(739, 839, 2, 45, 25, 24, 78, 4));
console.log(Math.max(732, 568, 267, 47, 384, 73));

console.log(Math.min(74, 728, 46492, 8, 5673, 782, 6));

console.log(Math.PI * Number.parseFloat('10px') ** 2);
//console.log(Math.trunc(Math.random() * 6));

// Perform Some Funtionality
const randomNum = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomNum(10, 20));

// Round Up  To the Number
console.log(Math.round(2.88));
console.log(Math.ceil(2.88));
console.log(Math.round(1.9));
console.log(Math.round('23.9'));

// Floor down to the Number
console.log(Math.floor(3.9));
console.log(Math.floor(1.35));
console.log(Math.floor(1.9));
console.log(Math.floor('23.9'));

// Rounding decimals
console.log((278.8937).toFixed(3));
console.log(+(78.27).toFixed(4));

// Remainder Operator
console.log(4 / 2);
console.log(4 % 2);
console.log(7 / 2);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (movs, i) {
    if (i % 2 === 0) movs.style.backgroundColor = 'orangered';

    if (i % 3 === 0) movs.style.backgroundColor = 'pink';
  });
});

const remainder = el => el % 2 === 0;
console.log(remainder(10));
console.log(remainder(15));

// Numeric Seperators
// 245,993,000,000
const num = 245993000000;
console.log(num);

const nums = 236_567_933_000;
console.log(nums);

// bigInt
console.log(typeof 379709807413094794982395259n);
console.log(843n === 843);

// Creating Dates
const date = new Date();
console.log(date);

console.log(new Date('Aug 29 2020 23:19:17'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2021, 11, 19, 3, 17, 56));

const newDate = new Date();
console.log(newDate);

console.log(newDate.getDate());
console.log(newDate.getDay());
console.log(newDate.getFullYear());
console.log(newDate.getHours());
console.log(newDate.getMinutes());
console.log(newDate.getMonth());
console.log(newDate.getTime());
console.log(newDate.getSeconds());

console.log(newDate.toISOString());
console.log(Date.now());

newDate.setFullYear(2050);
console.log(newDate);

// Operations with Dates
const newDates = new Date();
console.log(+newDates);

const calcDaysUsingDates = (date1, date2) =>
  (date2 - date1) / (1000 * 60 * 60 * 24);

console.log(calcDaysUsingDates(new Date(2037, 3, 15), new Date(2037, 3, 16)));

// Internationalizing Numbers
const option = {
  style: 'currency',
  currency: 'USD',
};

const Numbers = 83939.92;
const inter = ('US', new Intl.NumberFormat('ar-SY', option).format(Numbers));
console.log(inter);

//////////// setInterval
setInterval(function () {
  const date = new Date();
  const intl = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);
  //console.log(intl);
}, 1000);

/////////////  setTimeout
const ingArray = ['Pizza', 'Burger'];
const timerr = setTimeout(
  (ing1, ing2) => {
    console.log(`Welcome! Today You Are Eating ${ing1} & ${ing2}`);
  },
  1000,
  ...ingArray
);
if (ingArray.includes('pizza')) clearTimeout(timerr);
p;

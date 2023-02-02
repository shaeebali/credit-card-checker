const { createDeflate } = require("zlib")

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// An array of all the invalid credit card arrays above
const invalidBatch = [invalid1, invalid2, invalid3, invalid4, invalid5]


// Add your functions below:
const validateCred = card => {
  let digits = 0;
  let sum = 0
  for (let i = card.length - 1; i >= 0; i--) {
    digits ++;
    let currentNum = card[i];
    if (digits % 2 === 0) {
      currentNum *= 2;
      if (currentNum > 9) {
        currentNum -= 9;
      }
    }
    sum += currentNum;
  }
  if (sum % 10 === 0) {
    return true;
  }
  return false;
}
validateCred(valid1);
validateCred(invalid1);
console.log(validateCred(valid1));
console.log(validateCred(invalid1));

const findInvalidCards = cards => {
  // check through nested array for invalid credit card numbers
  // 1. loop through the array (don't need to create new loop - we will use the function from above and the filter method)
  // 2. use the validateCred() function (from above ^^) to check if cards are invalid
  // 3. create an empty array that stores the invalid credit cards by iteration using filter
  const invalidCards = [];
  const invalid = cards.filter(card => {
    if (!validateCred(card)) {
      invalidCards.push(card)
    }
  })
  return invalidCards;
}
findInvalidCards(batch)
console.log(findInvalidCards(batch))

const idInvalidCardCompanies = invalidCards => {
  // 1. the function will take a nested array of invalid credit card numbers
  // 2. we need to return an array of companies that sent out invalid cards
  // 3. therefore an empty array will be required to store these
  // 4. to find the companies names we will need to check the first digit of each invalid card i.e. 3 amex, 4 visa, 5 mastercard, and 6 discover
  const invalidCompanies = [];
  invalidCards.forEach(card => {
    // switch statement for card at first index(i.e. 0) to check first digit in the array
    switch(card[0]) {
      case 3:
        if (invalidCompanies.findIndex(company => company === 'Amex (American Express)') === -1) {
          invalidCompanies.push('Amex (American Express)')
        }
        break;
      case 4:
        if (invalidCompanies.findIndex(company => company === 'Visa') === -1) {
          invalidCompanies.push('Visa')
        }
        break;
      case 5:
        if (invalidCompanies.findIndex(company => company === 'Mastercard') === -1) {
          invalidCompanies.push('Mastercard')
        }
        break;
      case 6:
        if (invalidCompanies.findIndex(company => company === 'Discover') === -1) {
          invalidCompanies.push('Discover')
        }
        break;

      default:
        console.log('Company not found')  
    }
  })
  return invalidCompanies;
}
idInvalidCardCompanies(invalidBatch)
console.log(idInvalidCardCompanies(invalidBatch))

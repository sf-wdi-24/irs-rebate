/*
 * Send a rebate to all the people with rebates after they've been found in the list of allPeople.
 * @param allPeople {Your Choice} All the people in the country.
 * @param thieves {Your Choice} All the thieves.
 * @param peopleWithRebates {Your Choice} The people you need to send rebates to.
 * @todo Implement this function to call `sendRebate` on all those who aren't thieves.
 */
function sendRebates(allPeople, thieves, peopleWithRebates) {
}

var allPeople; // Assign a datatype you'd like to use.
var thieves; // Assign a datatype you'd like to use.
var peopleWithRebates; // Assign a dataype you'd like to use.

// Implement these three callbacks which will add people to your allPeople variable, thieves variable and
// peopleWithRebates variable.
var personCallback = function (person) {
}

var thiefCallback = function (person) {
}

var rebateRecipientCallback = function (person) {
}

createPopulation(personCallback, thiefCallback, rebateRecipientCallback);


/* ===========================================================================================
 * DON'T CHANGE ANY OF THIS WHICH FOLLOWS!
 * =========================================================================================== */

/*
 * @constructor
 * Person is the class which each person is, don't change this.
 */
function Person() {
  // A quick way to add a GUID looking random number for each person. Don't change this.
  this.guid = Math.pow((1 + Math.random()) * 65536 << 0, 4).toString(16);
}

/* Send a rebate to this person. */
Person.prototype.send = function () {
  return this.guid;
}

/*
 * Generate a bunch of people, some will be thieves but you'll have to add them to your population.
 * Don't change this but you can change the callback.
 * @param personCallback {function} The callback to call with each person who was created.
 * @param thiefCallback {function} The callback to call with each thief who was created.
 * @param rebateRecipientCallback {function} The callback to call with each person who will receive a rebate.
 */
function createPopulation(personCallback, thiefCallback, rebateRecipientCallback) {
  for (var i = 0; i < 10000; i++) {
    var person = new Person();

    personCallback(person);
    
    var randomNumber = Math.random() * 100 << 0;
    if (randomNumber % 3 == 0) {
      thiefCallback(person)
    } else if (randomNumber % 2 == 0) {
      rebateRecipientCallback(person);
    }
  }

  for (var i = 0; i < 10000; i++) {
    thiefCallback(new Person());
  }
}

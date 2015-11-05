/*
 * Send a rebate to all the people with rebates after they've been found in the list of allPeople.
 * @param allPeople {Object} All the people in the country.
 * @param thieves {Object} All the thieves.
 * @param peopleWithRebates {Object} The people you need to send rebates to.
 */
function sendRebates(allPeople, thieves, peopleWithRebates) {
  for (var guid in peopleWithRebates) {
    if (guid in thieves) {
      console.log("THIEF!");
    } else {
      console.log("Sending Rebate");
      peopleWithRebates[guid].sendRebate();
    }
  }
}

var allPeople = {};
var thieves = {};
var peopleWithRebates = {};

var personCallback = function (person) {
  allPeople[person.guid] = person;
}

var thiefCallback = function (person) {
  thieves[person.guid] = person;
}

var rebateRecipientCallback = function (person) {
  peopleWithRebates[person.guid] = person;
}

createPopulation(personCallback, thiefCallback, rebateRecipientCallback);

sendRebates(allPeople, thieves, peopleWithRebates);

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

  /* Send a rebate to this person. */
  Person.prototype.sendRebate = function () {
    return this.guid;
  }
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

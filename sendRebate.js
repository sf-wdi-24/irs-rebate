/*
 * Send a rebate to all the people with rebates after they've been found in the list of allPeople.
 * @param allPeople {Your Choice} All the people in the country.
 * @param thieves {Your Choice} All the thieves.
 * @param peopleWithRebates {Your Choice} The people you need to send rebates to.
 * @todo this takes too long to run, won't work as our solution.
 */
function sendRebates(allPeople, thieves, peopleWithRebates) {
  // Let's go over every person.
  for (var i = 0; i < allPeople.length; i++) {
    var person = allPeople[i];
    var sendRebate = false;

    // Check if they have a rebate to send.
    for (var j = 0; j < peopleWithRebates.length; j++) {
      var rebater = peopleWithRebates[j];

      if (person.guid == rebater.guid) {
        sendRebate = true;
        break;
      }
    }

    // If they don't have a rebate then we can check the next person.
    if (!sendRebate) {
      continue;
    }

    // We should send them a rebate but now check if they're labled a thief.
    for (var k = 0; k < thieves.length; k++) {
      var thief = thieves[k];

      if (person.guid == thief.guid) {
        // We've discovered a thief!
        sendRebate = false;
        break;
      }
    }

    // They aren't a thief, we'll send a rebate!
    if (sendRebate) {
      person.sendRebate();
    }
  }
}

var allPeople = [];
var thieves = [];
var peopleWithRebates = [];

var personCallback = function (person) {
  allPeople.push(person);
}

var thiefCallback = function (person) {
  thieves.push(person);
}

var rebateRecipientCallback = function (person) {
  peopleWithRebates.push(person);
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
  for (var i = 0; i < 100000; i++) {
    var person = new Person();

    personCallback(person);
    
    var randomNumber = Math.random() * 100 << 0;
    if (randomNumber % 3 == 0) {
      thiefCallback(person)
    } else if (randomNumber % 2 == 0) {
      rebateRecipientCallback(person);
    }
  }

  for (var i = 0; i < 100000; i++) {
    thiefCallback(new Person());
  }
}

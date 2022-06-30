/*There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand. */
/********************************************************************************/
/*Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.*/

//Create a shuffle deck and return output 2 random cards for each player stored into playercard (create array til numOfPlayers.Length)
//Output results of both cards
//Compare results of who win.
//GameMode = initialise player info , deal cards for all players, compare winner

//gameMode= "GET PLAYER INFO", "DEALCARDS", "GETWINNER"
var GET_PLAYER_INFO = "GET PLAYER INFO";
var DEAL_CARDS = "DEAL CARDS";
var CARDS_DRAWN = "CARDS DRAWN";
var GET_WINNER = "GET WINNER";
var HIT_OR_STAND = "HIT OR STAND";
var DISPLAY_WINNER = "DISPLAY WINNER";
var RESTART = "RESTART";

//Initialise variables
var gameMode = GET_PLAYER_INFO;
var playerName = "";
var playerCard = [];
var dealerCard = [];
var playerScore = 0;
var dealerScore = 0;

//Initialise card deck
var cardDeck = [];
var shuffledDeck = [];

var myOutputValue = "";

//Create deck - helper function
var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♠️", "♣️"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};
//shuffle deck
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//compare results of both player hands
var checkBlackjack = function (cardArr) {
  console.log("check blackjack");
  // - check if anyone have blackjack
  playerCardOne = cardArr[0];
  playerCardTwo = cardArr[1];
  var gotBlackJack = false;
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    gotBlackJack = true;
  }
  return gotBlackJack;
};

var calculateHands = function (cardArr) {
  var totalHandValue = 0;
  aceCounter = 0;
  for (i = 0; i < cardArr.length; i++) {
    var currCard = cardArr[i];
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
  }

  for (i = 0; i < aceCounter; i++) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
  }
  return totalHandValue;
};

var displayCardsnResults = function (playerCard, dealerCard) {
  var totalplayerScore = Number(calculateHands(playerCard));
  var totaldealerScore = Number(calculateHands(dealerCard));
  var playerMessage = `${playerName} has been dealt: <br>`;

  for (i = 0; i < playerCard.length; i++) {
    playerMessage =
      playerMessage + ` ${playerCard[i].name} of ${playerCard[i].suit}<br>`;
  }

  playerMessage = playerMessage + `Player score: ${totalplayerScore}`;

  var dealerMessage = `<br><br> Dealer has dealt: <br>`;
  for (i = 0; i < dealerCard.length; i++) {
    dealerMessage =
      dealerMessage + ` ${dealerCard[i].name} of ${dealerCard[i].suit}<br>`;
  }

  return playerMessage + dealerMessage;
};

var main = function (input) {
  if (gameMode == GET_PLAYER_INFO) {
    if (input == "" || input == null) {
      return `please enter a valid amount`;
    }
    playerName = input;
    gameMode = DEAL_CARDS;
    return `Hello ${playerName}. Welcome to Blackjack!<br>Press Submit to deal cards`;
  }

  if (gameMode == DEAL_CARDS) {
    //make deck and shuffle
    shuffledDeck = shuffleCards(makeDeck());
    //deal to player and dealer
    playerCard.push(shuffledDeck.pop());
    playerCard.push(shuffledDeck.pop());

    dealerCard.push(shuffledDeck.pop());
    dealerCard.push(shuffledDeck.pop());
    console.log(playerCard);
    console.log(dealerCard);
    gameMode = CARDS_DRAWN;
  }

  if (gameMode == CARDS_DRAWN) {
    //button.addEventListener("click", () => { });
    var playerGotBlackjack = checkBlackjack(playerCard);
    var dealerGotBlackjack = checkBlackjack(dealerCard);
    console.log(playerGotBlackjack, playerCard);
    console.log(dealerGotBlackjack, dealerCard);

    if (playerGotBlackjack == true || dealerGotBlackjack == true) {
      if (playerGotBlackjack == true && dealerGotBlackjack == true) {
        gameMode = RESTART;
        return (
          displayCardsnResults(playerCard, dealerCard) +
          ` It's a blackjack tie! Press Submit to play again`
        );
      }

      if (playerGotBlackjack == true && dealerGotBlackjack == false) {
        gameMode = RESTART;
        return (
          displayCardsnResults(playerCard, dealerCard) +
          ` ${playerName} wins by blackjack! Press Submit to play again `
        );
      }

      if (playerGotBlackjack == false && dealerGotBlackjack == true) {
        gameMode = RESTART;
        return (
          displayCardsnResults(playerCard, dealerCard) +
          `Dealer wins by blackjack! Press Submit to play again`
        );
      }
    }
    gameMode = HIT_OR_STAND;
    button.setAttribute("disabled", "disabled");
    hitButton.removeAttribute("disabled");
    standButton.removeAttribute("disabled");
    return (
      displayCardsnResults(playerCard, dealerCard) +
      `Nobody has blackjack.<br><br> To continue, ${playerName} please select h for 'hit' or s for 'stand'`
    );
  }

  if (gameMode == HIT_OR_STAND) {
    console.log("first hit");

    if (input == "hit") {
      playerCard.push(shuffledDeck.pop());
      totalplayerScore = Number(calculateHands(playerCard));
      if (totalplayerScore == 21) {
        hitButton.setAttribute("disabled", "disabled");
        standButton.setAttribute("disabled", "disabled");
        resultButton.removeAttribute("disabled");

        return `You got 21! Press Results to view results`;
      }
      if (totalplayerScore > 21) {
        hitButton.setAttribute("disabled", "disabled");
        standButton.setAttribute("disabled", "disabled");
        resultButton.removeAttribute("disabled");
        gameMode = DISPLAY_WINNER;
        return `Oh you went bust!! Press Results to view results`;
      }

      return (
        `You drew another card.<br><br> ` +
        displayCardsnResults(playerCard, dealerCard) +
        `<br>To continue, ${playerName} please select h for 'hit' or s for 'stand'`
      );
    } else if (input == "stand") {
      button.removeAttribute("disabled");
      hitButton.setAttribute("disabled", "disabled");
      resultButton.setAttribute("disabled", "disabled");
      totalplayerScore = Number(calculateHands(playerCard));
      totaldealerScore = Number(calculateHands(dealerCard));

      console.log("player:", totalplayerScore);
      console.log("dealer:", totaldealerScore);

      if (totaldealerScore < 17) {
        dealerCard.push(shuffledDeck.pop());
        totaldealerScore = calculateHands(dealerCard);
        console.log(totaldealerScore);
      }

      //tie and both burst
      if (
        totalplayerScore == totaldealerScore ||
        (totalplayerScore > 21 && totaldealerScore > 21)
      ) {
        gameMode = RESTART;
        return `It's a tie! <br>${displayCardsnResults(
          playerCard,
          dealerCard
        )} <br> Press Submit to play again!`;
      }
      //user more than dealer & never burst or dealer burst and user never burst
      if (
        (totalplayerScore > totaldealerScore && totalplayerScore <= 21) ||
        (totaldealerScore > 21 && totalplayerScore <= 21)
      ) {
        gameMode = RESTART;
        return `Player ${playerName} wins!<br> ${displayCardsnResults(
          playerCard,
          dealerCard
        )} <br> Press Submit to play again!`;
      } else gameMode = RESTART;
      return `Dealer wins!<br> ${displayCardsnResults(
        playerCard,
        dealerCard
      )} <br> Press Submit to play again!`;
    }
  }

  if (gameMode == DISPLAY_WINNER) {
    console.log("after button");
    button.removeAttribute("disabled");
    hitButton.setAttribute("disabled", "disabled");
    standButton.setAttribute("disabled", "disabled");
    gameMode = RESTART;
    return `${displayCardsnResults(
      playerCard,
      dealerCard
    )} <br> Press Submit to play again!`;
  }
  //*********************************** */

  // if (input != "h" && input != "s") {
  //        return `please input either 'h' for hit or 's' for stand<br><br> ${displayCardsnResults(
  //          playerCard,
  //          dealerCard
  //        )}`;
  //   }

  if ((gameMode = RESTART)) {
    playerName = "";
    playerCard = [];
    dealerCard = [];
    totalplayerScore = 0;
    totaldealerScore = 0;
    cardDeck = [];
    shuffledDeck = [];
    gameMode = GET_PLAYER_INFO;
    console.log("restart");
    return `Please enter name to restart`;
  }
};

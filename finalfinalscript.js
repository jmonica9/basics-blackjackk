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
var playerCard = [];
var dealerCard = [];
var playerScore = 0;
var dealerScore = 0;
var userCredit = 100;
var userBet = 0;
var canHit = true;
//Initialise card deck
var cardDeck = [];
var shuffledDeck = [];

var myOutputValue = "";

//Create deck - helper function
var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["H", "D", "S", "C"];
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
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
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
    (playerCardOne.name == "A" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "A" && playerCardOne.rank >= 10)
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
    if (currCard.name == "K" || currCard.name == "Q" || currCard.name == "J") {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "A") {
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
  var playerMessage = `You have been dealt: <br>`;

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
    if (input == "" || input == null || isNaN(input) || input > 100) {
      return `please enter a valid amount (more than 0)`;
    }
    userBet = input;
    userCredit = userCredit - userBet;
    gameMode = DEAL_CARDS;
    document.getElementById("Credit").innerText = "Credit:" + userCredit;
    return `Hello. Welcome to Blackjack!<br>You have bet $${userBet} Press Submit to deal cards`;
  }

  if (gameMode == DEAL_CARDS) {
    //make deck and shuffle
    shuffledDeck = shuffleCards(makeDeck());
    //deal to player and dealer
    playerCard.push(shuffledDeck.pop());
    playerCard.push(shuffledDeck.pop());
    for (let i = 0; i < 2; i++) {
      var yourImg = document.createElement("img");
      yourImg.src = `cards/${String(playerCard[i].name)}${String(
        playerCard[i].suit
      )}.svg`;
      document.getElementById("You").append(yourImg);
    }
    totalplayerScore = calculateHands(playerCard);

    document.querySelector("#Your-score").innerText =
      "Your score:" + totalplayerScore;

    dealerCard.push(shuffledDeck.pop());
    dealerCard.push(shuffledDeck.pop());
    totaldealerScore = calculateHands(dealerCard);

    for (let i = 0; i < 2; i++) {
      var dealerImg = document.createElement("img");
      dealerImg.src = `cards/${String(dealerCard[i].name)}${String(
        dealerCard[i].suit
      )}.svg`;
      document.getElementById("Dealer").append(dealerImg);
    }
    document.querySelector("#Dealer-score").innerText =
      "Dealer score:" + totaldealerScore;
    gameMode = HIT_OR_STAND;
    button.setAttribute("disabled", "disabled");
    hitButton.removeAttribute("disabled");
    standButton.removeAttribute("disabled");
    instructionsText.innerHTML = "Press Hit or Stand to Continue";
    return `Press hit or stand`;
  }

  if (gameMode == HIT_OR_STAND) {
    totalplayerScore = Number(calculateHands(playerCard));
    console.log("first hit");
    if (input == "hit") {
      if (totalplayerScore == 21) {
        hitButton.setAttribute("disabled", "disabled");
        //  restartButton.removeAttribute("disabled");
        return `You got 21! Press Stand to view results`;
      }

      if (totalplayerScore > 21) {
        hitButton.setAttribute("disabled", "disabled");
        //restartButton.removeAttribute("disabled");
        canHit = false;
        return `Oh you went bust!! Press Stand to view results`;
      }

      playerCard.push(shuffledDeck.pop());
      var lastIndex = playerCard.length - 1;
      var yourImg = document.createElement("img");
      yourImg.src = `cards/${String(playerCard[lastIndex].name)}${String(
        playerCard[lastIndex].suit
      )}.svg`;
      document.getElementById("You").append(yourImg);
      console.log(playerCard[lastIndex].name, "playerrcardddarayyyy");
      totaldealerScore = calculateHands(dealerCard);
      totalplayerScore = calculateHands(playerCard);
      document.querySelector("#Dealer-score").innerText =
        "Dealer score:" + totaldealerScore;
      document.querySelector("#Your-score").innerText =
        "Your score:" + totalplayerScore;

      totalplayerScore = Number(calculateHands(playerCard));

      return (
        `You drew another card.<br><br>` +
        "Your score:" +
        totalplayerScore +
        `<br>To continue, please select hit or stand`
      );
    } else if (input == "stand") {
      var playerGotBlackjack = checkBlackjack(playerCard);
      var dealerGotBlackjack = checkBlackjack(dealerCard);
      //check blackjack
      if (playerGotBlackjack == true || dealerGotBlackjack == true) {
        if (playerGotBlackjack == true && dealerGotBlackjack == true) {
          gameMode = RESTART;
          userCredit = userCredit + userBet;
          button.removeAttribute("disabled", "disabled");
          document.getElementById("Credit").innerText = "Credit:" + userCredit;
          return (
            displayCardsnResults(playerCard, dealerCard) +
            ` It's a blackjack tie! Press Submit to play again`
          );
        }

        if (playerGotBlackjack == true && dealerGotBlackjack == false) {
          gameMode = RESTART;
          userCredit += 2 * userBet;
          button.removeAttribute("disabled", "disabled");
          document.getElementById("Credit").innerText = "Credit:" + userCredit;
          return (
            displayCardsnResults(playerCard, dealerCard) +
            ` You win by blackjack! Press Submit to play again `
          );
        }

        if (playerGotBlackjack == false && dealerGotBlackjack == true) {
          gameMode = RESTART;
          button.removeAttribute("disabled", "disabled");
          document.getElementById("Credit").innerText = "Credit:" + userCredit;
          return (
            displayCardsnResults(playerCard, dealerCard) +
            `Awww nooo... Dealer wins by blackjack! Press Submit to play again`
          );
        }
      } //
      else
        while (totaldealerScore < 17) {
          dealerCard.push(shuffledDeck.pop());
          totaldealerScore = calculateHands(dealerCard);
          var lastIndex = dealerCard.length - 1;
          var dealerImg = document.createElement("img");
          dealerImg.src = `cards/${String(dealerCard[lastIndex].name)}${String(
            dealerCard[lastIndex].suit
          )}.svg`;
          document.getElementById("Dealer").append(dealerImg);
        }
      document.querySelector("#Dealer-score").innerText =
        "Dealer score:" + totaldealerScore;
      button.removeAttribute("disabled");
      hitButton.setAttribute("disabled", "disabled");
      totalplayerScore = Number(calculateHands(playerCard));
      totaldealerScore = Number(calculateHands(dealerCard));

      console.log("player:", totalplayerScore);
      console.log("dealer:", totaldealerScore);

      //tie and both burst
      if (
        totalplayerScore == totaldealerScore ||
        (totalplayerScore > 21 && totaldealerScore > 21)
      ) {
        gameMode = DISPLAY_WINNER;
        userCredit = userCredit + userBet;
        document.getElementById("Credit").innerText = "Credit:" + userCredit;
        myOutputValue = `It's a tie! <br>${displayCardsnResults(
          playerCard,
          dealerCard
        )} <br> Press Submit to play again!`;
      }
      //user more than dealer & never burst or dealer burst and user never burst
      if (
        (totalplayerScore > totaldealerScore && totalplayerScore <= 21) ||
        (totaldealerScore > 21 && totalplayerScore <= 21)
      ) {
        gameMode = DISPLAY_WINNER;
        userCredit = userCredit + 2 * userBet;
        document.getElementById("Credit").innerText = "Credit:" + userCredit;
        myOutputValue = `You wins<br> ${displayCardsnResults(
          playerCard,
          dealerCard
        )} <br> Press Submit to play again!`;
      }
    } else gameMode = DISPLAY_WINNER;
    document.getElementById("Credit").innerText = "Credit:" + userCredit;
    myOutputValue = `Aww nooo...Dealer wins!<br> ${displayCardsnResults(
      playerCard,
      dealerCard
    )} <br> Press Submit to play again!`;
    return myOutputValue;
  }

  if (gameMode == DISPLAY_WINNER) {
    console.log("after button");
    gameMode = RESTART;
    button.removeAttribute("disabled");
    hitButton.setAttribute("disabled", "disabled");
    standButton.setAttribute("disabled", "disabled");
    return `<br> Press Submit to play again! or Refresh`;
  }

  if ((gameMode = RESTART)) {
    if (input == "restart") {
      var dealerElm = document.getElementById("#Dealer");
      dealerElm.innerHTML = null;
      // dealerElm.removeChild(dealerElm);
      var YouElm = document.getElementById("#You");
      // YouElm.removeChild(YouElm);
      YouElm.innerHTML = "";
    } else playerCard = [];
    dealerCard = [];
    totalplayerScore = 0;
    totaldealerScore = 0;
    cardDeck = [];
    shuffledDeck = [];
    userBet = 0;
    hit = 0;
    gameMode = GET_PLAYER_INFO;
    console.log("restart");
    return `Please enter bet to restart or refresh`;
  }
};

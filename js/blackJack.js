	  /////////////////////
	 ////  BLACK JACK ////
	/////////////////////

// TO DO
//
// *) Improve Dealer
	// -) show his hand after game									+ DONE
// *) Stop giving cards when user over 21 points - disable anotherCard button? 				+ DONE
	// -) also after pressed noCards - probably let both buttons vanish				+ DONE
// *) Give cards from the same deck as long as it's the same player or the deck is empty		+ DONE
// *) Delay time a little bit, until cards are shown							- DISCARD
// *) Show a statistic of the wins, draws and loses							+ DONE
	// NEUES PROBLEM:											+ works
		// Aendert den Namen nicht, wenn neuer Spieler!	
	// macht Probleme: zaehlt +2 fuer den Gewinner der 2.Runde oder sowas in der Richtung			+ works
		// Quellen: Variablen: win, draw, lose in VARIABLES definiert und auf 0 gesetzt,
		// um Line 180:
			// in declareWinner werden in der if-Schleife variablen ++ gesetzt 
			// gleich darunter wird in statisticResults() das ergebins auf die HP eingespielt
			// mit dem Klick auf noCard-Button wird die Statistik aufgerufen. 
// *) Erase the last result for a new game								+ DONE
// *) Improve visual of the page
	// -) Animations										-
	// -) Pictures 											-
	// -) Shadows											-


// HELPFUL PAGES
//
// +) http://girlswhogeek.com


// VARIABLES
// ---------
var cardNumber = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
var cardSuit = ["Hearts", "Spades", "Diamonds", "Clubs"];
var firstHand = 2;
var deck = [];							// should be filled in the cardDeck function
var numOfCards = cardNumber.length*cardSuit.length;		// the number of cards will be one less with every deal
var valueOfAce1 = 11;						// first value for ace
var valueOfAce2 = 1;						// alternative value for ace
var valueOfHead = 10;						// value of jack, queen and king
var maxScore = 21;						// maxium score for winning this game
var maxScoreDealer = 17;					// Dealer stopps taking cards when he has at least this score
var userName = "";						// will be filled with prompt
var win;							////
var draw;							// will keep track of wins, draws and loses for the statistic
var lose;							////
var countDeck;							// counts the number of used decks
var cardNumUser;						// counts the number of used cards
var cardNumDealer;						// 		--//--



// FUNCTIONALITY
// -------------

function showStuff(id) {					// shows hidden content
    document.getElementById(id).style.display = 'block';	
}

function hideStuff(id) {
    document.getElementById(id).style.display = 'none';		// hides content
}


// DECK
// ----

// Create a full deck
function cardDeck(){
    countDeck++;
    for (var i = 0; i < cardNumber.length; i++) {
	for (var j = 0; j < cardSuit.length; j++) {
		deck.push([i, j]); 			// only the index numbers are pushed into the "deck" array
	}
    }
}

// check, if there are enough cards in the deck left
function checkCardDeck() {
    if(deck.length === 0) {
    	alert("The " + countDeck + ".Deck is empty. We'll now use a new one."); 	// Player gets informed, that there was a change of decks.
	cardDeck();
    }
}


// Take a random card from the deck and delete it from the deck
function deal() {
    var randomCard = Math.floor(Math.random()*numOfCards);
    checkCardDeck();
    var card = new Card(deck[randomCard][0], deck[randomCard][1]);
    deck.splice(randomCard,1);
    numOfCards = deck.length;
    return card;
}

// CONSTRUCTORS
// ------------

// Card Constructor
function Card(n, s){
    var num = n;
    var suit = s;
    this.getNumber = function(){
        return num;
    };
    this.getSuit = function(){
        return suit;
    };
	// Get the Value of a Card
    this.getValue = function(){
        if (num === 0) {		// Ace has indexnumber 0
            return valueOfAce1;			// return 11, the possible value of 1 is coded later
        } else if (num > 9) {		// Headcards have indexnumbers 10 (Jack), 11 (Queen) and 12 (King)
            return valueOfHead;			// they all have a value of 10
        } else {			// all other numbers have there own value
            return (num+1);			// but their indexnumber is one smaller
        }
    };
}


// Hand Constructor
function Hand(){
    var hand = [];
    for (var i = 0; i < firstHand; i++) {
	hand[i] = deal();
    } 
    this.getHand = function(){
        return hand;
    };
	// Get the Scores of the Hand
    this.score = function(){
        var sum = 0;				// define a variable sum and ace
        var ace = 0;
        for (var i=0; i<hand.length; i++) {	// count the ace in the hand
            if (hand[i].getValue() === valueOfAce1) {
                ace++;
            }
           sum += hand[i].getValue();		// add the value of every card in the hand
        }
        while (sum > maxScore && ace > 0) {		// if the value is higher than 21 and there is an ace in the hand
            sum -= (valueOfAce1 - valueOfAce2);		// give the ace the value of 1 (11-(11-1)=1)
            ace--;					// subtract one ace, so if there is one more, it can be done again
        } 
        return sum;
    };
	// Show what's in your Hand
    this.printHand = function(id){		// loop though the hand and add the card to the printOut String
	var printOut = "";
        for (var i=0; i<hand.length; i++) {
		printOut += "<li class='cardInHand'>" + this.showCard(i) + "</li>";	
        }
        $(id).html(printOut);
    };
    this.showCard = function(i){
	var x = hand[i].getNumber();	// x shows the Indexnumber of the Card in cardNumber
	var y = hand[i].getSuit();	// y the Indexnumber of the Card in cardSuit
	return cardNumber[x] + " of <img class='suitImg' src='images/" + y + "suit.png' alt='" + cardSuit[y] + "' />";
	//return cardNumber[x] + " of " + cardSuit[y];
    };
	// Want another Card? Call "Hit Me!"
    this.hitMe = function(){
        cardNew = deal();
        hand.push(cardNew);			// add a new card to the hand
    };
}



// THE GAME
// --------

// Computers Game
function playAsDealer(){
    var dealerHand = new Hand();				// Computer gets a new Hand
    $("#dealer").text(dealerHand.showCard(0));			// show dealers first card in hand
    while (dealerHand.score() < maxScoreDealer){		// as long as the score is under 17, the computer gets one card more
        dealerHand.hitMe();
	cardNumDealer++;
    } 
    $("#dealHand").text("Dealer's first card: ");
    $("#dealer2").html("<li>" + dealerHand.showCard(0) + "</li>");
    dealerHand.printHand("#dealer");
    hideStuff('dealer');
    return dealerHand;
    
}

// Human Players Game
function playAsUserStart(){				// The human players first hand of two cards
    var startHand = new Hand();
    startHand.printHand("#hand");	
    return startHand;
}

function playAsUserNewCard(hand) {			// The human player decides, how often he wants a new card
    hand.hitMe();
    cardNumUser++;
    hand.printHand("#hand");
    if (hand.score() > maxScore) {			// hide the anotherCard button if score is higher than maxScore
        hideStuff('cardsButton1');
    }
    return hand;
}


// The Result of the Game
function declareWinner(userHand, dealerHand){
    this.getScore = function(hand) {			// if the score is higher than 21 set the score to 0
	return hand.score() > maxScore ? 0 : hand.score();		// so it's allways smaller than the other hand
    };
    var dealerScore = getScore(dealerHand);
    var userScore = getScore(userHand);
	// Tell the player the scores
    this.scoreAlert = function() {										// VIEW	
	if (userScore === 0 && dealerScore === 0){								//	
		return " Both of you had higher scores than " + maxScore + ".";					//
	} else if (userScore === 0) {
		return userName +"'s score was higher than <span class='score'>" + maxScore + "</span> with " + cardNumUser + " cards" +
			"<br />Dealer scored <span class='score'>" + dealerScore + "</span> with " + cardNumDealer + " cards";
	} else if (dealerScore === 0){
		return userName + " scored <span class='score'>" + userScore + "</span> with " + cardNumUser + " cards" + 
			"<br />Dealer had a higher score than <span class='score'>" + maxScore + "</span> with " + cardNumDealer + " cards";
	} else {
		return userName + " scored <span class='score'>" + userScore + "</span> with " + cardNumUser + " cards" +
			"<br />Dealer scored <span class='score'>" + dealerScore + "</span> with " + cardNumDealer + " cards";
	}
    };
	// Who won the game:
    if (userScore > dealerScore){										// VIEW
        $("#result").html("<p id='win'>" + userName+ " wins!</p><p id='points'>" + this.scoreAlert() + "</p>");	//
	win++;
    } else if (userScore === dealerScore){									//
        $("#result").html("<p id='tied'>Draw!</p><p id='points'>" + this.scoreAlert() + "</p>");		//
	draw++;
    } else if (userScore < dealerScore){													//
        $("#result").html("<p id='lose'>Dealer wins!</p><p id='points'>" + this.scoreAlert() + "</p>");		//
	lose++;
    }

}

// Statistic of the Game
function statisticResults() {
    $('#statistic').html("<tr id='userStat'><th>" + userName + "</th><td>" + win + "</td></tr>" + 
				"<tr id='drawStat'><th>Draw </th><td>" + draw + "</td></tr>" +
				"<tr id='dealerStat'><th>Dealer </th><td>" + lose + "</td></tr>");
}

// DISPLAY OF THE NAME IN CARDS
// ----------------------------
function showNamesInCards() {
    $("#nameHand").text(userName + "'s Hand is: ");
}

function showButtonsInCards() {
    showStuff('cardsButton1');
    showStuff('cardsButton2');
    $("#cardsButton1").html('<button type="button" id="anotherCard">Another card, please!</button>');
    $("#cardsButton2").html('<button type="button" id="noCard">Thanks, I have enough.</button>');
    $("#newGame").html("<button  type='button' id='anotherGame'>Do you want an new Hand?</button>");
}

function showHideStuffInCards() {			// after noCard is clicked hide or show content in the card div
    	hideStuff('cardsButton1');
    	hideStuff('cardsButton2');
    	$("#nameHand").text(userName + "'s Hand was: ");
    	$("#dealHand").text("Dealer's Hand was: ");
    	hideStuff('dealer2');
    	showStuff('dealer');
}

// -------------- //
// START THE GAME //
// -------------- //

function startNewGame() {
    showStuff('dealer2');
    hideStuff('result');
    hideStuff('newGame');
    playGame();	
}


// Starts the Game with a Click on the Deck of Cards
function playGame(){
    checkCardDeck();					// Checks, if the deck of cards is empty
    cardNumDealer = firstHand;				// starts counting cards (2 because in the first  hand are 2 cards)
    cardNumUser = firstHand;;
    var userHand = playAsUserStart();			// create 2 new hands for both players
    var dealerHand = playAsDealer();
    showButtonsInCards();				// shows buttons
    $("#anotherCard").click(function() {		// new card with a click on a button
	userHand = playAsUserNewCard(userHand);
    });
    $("#noCard").click(function() {			// ends game and shows results with a click on a button
	declareWinner(userHand, dealerHand);
    	showStuff('result');				// shows content in results div
    	showStuff('newGame');
	statisticResults();
	showHideStuffInCards();				// changes the display in the card div 
   });
    $("#anotherGame").click(function() {
	startNewGame();
    });
}

// START THE FIRST GAME or a game with a new Player
    function newPlayersGame() {							// starts with a Click on the picture of a deck of cards
	hideStuff('welcome');
    	userName = prompt("Welcome to Dani's Casino. What's your name?"); 	// Ask for the players name
    	showNamesInCards();							// Displays text for the cards in the hand	
    	$("span.name").text(userName);					// Name is displayed on the screen where it's needed
	win = 0;							////
	draw = 0;							// will keep track of wins, draws and loses for the statistic
	lose = 0;							////
	statisticResults();						//// 		
	countDeck = 0;
	cardDeck();							// new Deck of Cards with the new player
    	playGame();
    }								// game starts

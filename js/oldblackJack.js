// Card Constructor
// ----------------
function Card(s, n){
    var suit = s;
    var number = n;
    this.getSuit = function(){
        return suit;
    };
    this.getNumber = function(){
        return number;
    };
    this.getValue = function(){
        if (number === 1) {
            return 11;
        } else if (number > 10) {
            return 10;
        } else {
            return number;
        }
    };
}

// Deal Constructor
// ----------------
function Deal() {
    this.s = Math.floor(Math.random()*4+1);
    this.n = Math.floor(Math.random()*13+1);
    var card = new Card(s,n);
    return card;
}

// Hand Constructor
// ----------------
function Hand(){
	// you start with 2 cards
    var hand = []; 
    hand[0] = Deal(); 
    hand[1] = Deal();
    this.getHand = function(){
        return hand;
    };

	// Score
	// Sums the cards in the hand
	// if you have more than 21 it checks for aces and makes its value to 1
    this.score = function(){
        var sum = 0;
        for (var i=0; i<hand.length; i++) {
           sum += hand[i].getValue();
        }
        if (sum <= 21) {
            return sum;
        } else {
            var i = 0;
            function checkAce(i) {
                if (i === hand.length) {
                    return sum;
                } else {
                    if (hand[i].getNumber === 1) { 
                        sum -= 10;
                        checkAce(i++);
                    } else {
                        checkAce(i++);
                    }
                }
            }
        }
        
    };

	// Print Hand
	// Shows the hand
    this.printHand = function(){
        var suitName = ["hearts", "diamonds", "clubs", "spades"];
        var numberName = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        var printOut = "";
        for (var i=0; i<hand.length; i++) {
            if (i === hand.length-1) {
                printOut += numberName[hand[i].getNumber()-1] + " of suit " + suitName[hand[i].getSuit()-1];
            } else {
                printOut += numberName[hand[i].getNumber()-1] + " of suit " + suitName[hand[i].getSuit()-1] + ", ";
            }
           
        }
        return printOut;
    };

	// Hit Me
	// To get a new card
    this.hitMe = function(){
        cardNew = Deal();
        hand.push(cardNew);
    };
}


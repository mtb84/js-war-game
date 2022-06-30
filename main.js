const player1Card = document.querySelector('.player1')
const player2Card = document.querySelector('.player2')
const player1Deck = document.querySelector('.player1-deck')
const player2Deck = document.querySelector('.player2-deck')
const drawButton = document.querySelector('.draw')



function Card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function Deck() {
    this.name = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
    this.value = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        J: 11,
        Q: 12,
        K: 13,
        A: 14
      }
    this.suit = ['♠︎', '♣︎', '♥︎', '♦︎'];
    let cards = [];
    for (let s = 0; s < this.suit.length; s++) {
        for (let n = 0; n < this.name.length; n++) {
            cards.push(new Card(n + 1, this.name[n], this.suit[s]));
        }
    }
    return cards;
}

function Player({
    playerName
} = playerName, hand = []) {
    this.playerName = playerName;
    this.hand = hand;
}

function Game() {
    const player1 = "You"
    const player2 = "Computer"

    this.player1 = new Player({
        playerName: player1
    });
    this.player2 = new Player({
        playerName: player2
    });
    this.deck = new Deck();
    this.pot = [];
};

Game.prototype.shuffle = function () {
    const deck = this.deck;

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

Game.prototype.deal = function () {
    this.shuffle();
    this.player1.hand = this.deck.splice(0, 26)
    this.player2.hand = this.deck.splice(-26)

}

Game.prototype.compare = function () {

    if (this.player1.cardInPlay.value > this.player2.cardInPlay.value) { 
        this.player1.hand = [...this.player1.hand, ...this.pot, ]
    } else if (this.player1.cardInPlay.value < this.player2.cardInPlay.value) { 
        this.player2.hand = [...this.player2.hand, ...this.pot];
    } else {
        alert("WAR!")
        this.pot = [...this.player1.hand.splice(0, 3), ...this.player2.hand.splice(0, 3), ...this.pot];
        return;
    }
    this.pot = [];
}

Game.prototype.draw = function () {

    this.player1.cardInPlay = this.player1.hand.shift();
    this.player2.cardInPlay = this.player2.hand.shift();

    player2Card.innerHTML = `Computer Card:<br>${this.player2.cardInPlay.name}${this.player2.cardInPlay.suit}`;

    player1Card.innerHTML = `Your Card:<br>${this.player1.cardInPlay.name}${this.player1.cardInPlay.suit}`;

    player1Deck.innerHTML = `You have: <br>${this.player1.hand.length} cards left`;

    player2Deck.innerHTML = `Computer has: <br>${this.player2.hand.length} cards left`;
    this.pot = [this.player1.cardInPlay, this.player2.cardInPlay, ...this.pot];
    this.compare();
}

const game = new Game()
game.deal()

drawButton.addEventListener('click', function () {
    game.draw()
})
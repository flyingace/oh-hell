"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revealTrump = exports.generateHands = void 0;
const deck_json_1 = __importDefault(require("./deck.json"));
const shuffleDeck = () => {
    const deckToShuffle = deck_json_1.default.slice(0);
    let m = deckToShuffle.length, t, i;
    // While there remain elements to shuffleDeck…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = deckToShuffle[m];
        deckToShuffle[m] = deckToShuffle[i];
        deckToShuffle[i] = t;
    }
    return deckToShuffle;
};
function generateHands(noOfCards = 1, noOfPlayers = 5) {
    const shuffledDeck = shuffleDeck();
    const hands = [[], [], [], [], []];
    for (let i = 0; i < noOfPlayers; i++) {
        for (let j = 0; j < noOfCards; j++) {
            hands[i].push(shuffledDeck[j * noOfPlayers + i]);
        }
    }
    return hands;
}
exports.generateHands = generateHands;
const revealTrump = () => { };
exports.revealTrump = revealTrump;

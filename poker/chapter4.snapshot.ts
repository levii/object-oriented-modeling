import { Rank, Suit } from './index';

class Card {
    constructor(private readonly suit: Suit, private readonly rank: Rank) {}
}

class Hand {
    private readonly cards: Readonly<Card[]>;

    constructor(cards: Card[]) {
        this.cards = cards;
    }
}

enum PokerHandName {
    OnePair = 'OnePair',
    TwoPair = 'TwoPair',
    FullHouse = 'FullHouse',
}

interface IPokerHand {
    getName(): PokerHandName;
    compareByStrength(other: IPokerHand): number;
}

class OnePair implements IPokerHand {
    private static readonly pokerHandName = PokerHandName.OnePair;

    constructor(private readonly cards: [Card, Card]) {}

    getName(): PokerHandName {
        return OnePair.pokerHandName;
    }

    compareByStrength(other: IPokerHand): number {
        return 0; // TODO
    }
}

class TwoPair implements IPokerHand {
    private static readonly pokerHandName = PokerHandName.TwoPair;

    // FIXME: 引数の型を [Pair, Pair] に変えたい
    constructor(private readonly pairs: [[Card, Card], [Card, Card]]) {}

    getName(): PokerHandName {
        return TwoPair.pokerHandName;
    }

    compareByStrength(other: IPokerHand): number {
        return 0; // TODO
    }
}

class Hand {
    public readonly cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    toString(): string {
        const cards = this.cards.map((card) => `${card}`);
        return `Hand(${cards.join(', ')})`;
    }
}

class Card {
    public readonly suit: Suit;
    public readonly rank: Rank;

    constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
    }

    toString(): string {
        return `[${this.suit}${this.rank}]`;
    }
}

class Rank {
    public readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    toString(): string {
        switch (this.value) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return `${this.value}`;
        }
    }
}

class Suit {
    public readonly value: string;

    private mapping = {
        Spade: '♠',
        Heart: '♥',
        Diamond: '♦',
        Club: '♣',
    };

    private constructor(value: string) {
        this.value = value;
    }

    toString(): string {
        return this.mapping[this.value];
    }

    public static Spade = new Suit('Spade');
    public static Heart = new Suit('Heart');
    public static Diamond = new Suit('Diamond');
    public static Club = new Suit('Club');
}

export { Hand, Card, Rank, Suit };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPokerHand {}

class OnePairPokerHand implements IPokerHand {
    readonly pair: [Card, Card];

    constructor(cardA: Card, cardB: Card) {
        if (cardA.rank === cardB.rank) {
            this.pair = [cardA, cardB];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}`);
        }
    }
}

class ThreeCardPokerHand implements IPokerHand {
    readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.rank === cardB.rank && cardB.rank === cardC.rank) {
            this.cards = [cardA, cardB, cardC];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}, ${cardC}`);
        }
    }
}

class FullHousePokerHand implements IPokerHand {
    readonly pair: [Card, Card];
    readonly threeCards: [Card, Card, Card];

    constructor(pair: [Card, Card], threeCards: [Card, Card, Card]) {
        this.pair = pair;
        this.threeCards = threeCards;

        if (this.pair[0].rank !== this.pair[1].rank) {
            throw new Error(`Invalid pair: ${this.pair}`);
        }
        if (
            this.threeCards[0].rank !== this.threeCards[1].rank ||
            this.threeCards[0].rank !== this.threeCards[2].rank
        ) {
            throw new Error(`Invalid cards: ${this.threeCards}`);
        }

        if (this.pair[0].rank === this.threeCards[0].rank) {
            throw new Error(`Invalid cards`);
        }
    }
}

export { IPokerHand, OnePairPokerHand, ThreeCardPokerHand, FullHousePokerHand };

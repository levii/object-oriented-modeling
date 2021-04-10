class Hand {
    public readonly cards: Card[];

    constructor(cards: Card[]) {
        if (cards.length != 5) {
            throw new Error(
                `Invalid the number of cards: expected 5 cards, but got ${cards.length} cards`
            );
        }
        this.cards = cards;
    }

    toString(): string {
        const cards = this.cards.map((card) => `${card}`);
        return `Hand(${cards.join(', ')})`;
    }

    contain(other: Card): boolean {
        return !!this.cards.find((card) => card.isEqual(other));
    }

    isEqual(other: Hand): boolean {
        return this.cards.every((card) => {
            return other.contain(card);
        });
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

    isEqual(other: Card): boolean {
        return this.suit.isEqual(other.suit) && this.rank.isEqual(other.rank);
    }

    compareByStrength(other: Card): number {
        const compareRank = this.rank.compareByStrength(other.rank);

        if (compareRank == 0) {
            return this.suit.compareByStrength(other.suit);
        } else {
            return compareRank;
        }
    }

    static compareByStrength(a: Card, b: Card): number {
        return a.compareByStrength(b);
    }
}

class Rank {
    private readonly value: number;

    constructor(value: number) {
        if (value < 1 || 13 < value || !Number.isInteger(value)) {
            throw new Error(`Invalid value of Rank: got ${value}`);
        }

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

    isEqual(other: Rank): boolean {
        return this.toString() === other.toString();
    }

    private strength(): number {
        if (this.value == 1) {
            return 14;
        }
        return this.value;
    }

    /**
     * Rankの強い順に並び替える
     *
     *  - other のほうが強い時には、正の値を
     *  - other のほうが弱い時には、負の値を
     *  - other と this が同じランクのときには、 0 を返します。
     *
     * @param other {Rank}
     */
    compareByStrength(other: Rank): number {
        return other.strength() - this.strength();
    }

    static compareByStrength(a: Rank, b: Rank): number {
        return a.compareByStrength(b);
    }
}

class Suit {
    private readonly value: string;

    private readonly strengthOrder = ['Spade', 'Heart', 'Diamond', 'Club'];
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

    isEqual(other: Suit): boolean {
        return this.toString() === other.toString();
    }

    public static Spade = new Suit('Spade');
    public static Heart = new Suit('Heart');
    public static Diamond = new Suit('Diamond');
    public static Club = new Suit('Club');

    compareByStrength(other: Suit): number {
        const myOrder = this.strengthOrder.indexOf(this.value);
        const otherOder = this.strengthOrder.indexOf(other.value);
        return myOrder - otherOder;
    }

    static compareByStrength(a: Suit, b: Suit): number {
        return a.compareByStrength(b);
    }
}

export { Hand, Card, Rank, Suit };

class Pair {
    private readonly cards: [Card, Card];

    constructor(cardA: Card, cardB: Card) {
        if (cardA.rank.isEqual(cardB.rank)) {
            this.cards = [cardA, cardB];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}`);
        }
    }

    get rank(): Rank {
        return this.cards[0].rank;
    }

    get suits(): Suit[] {
        return this.cards.map((card) => card.suit).sort(Suit.compareByStrength);
    }

    toString(): string {
        return `Pair(${this.rank}, ${this.suits.join(', ')})`;
    }
}

class Triple {
    private readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.rank.isEqual(cardB.rank) && cardB.rank.isEqual(cardC.rank)) {
            this.cards = [cardA, cardB, cardC];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}, ${cardC}`);
        }
    }

    get rank(): Rank {
        return this.cards[0].rank;
    }

    get suits(): Suit[] {
        return this.cards.map((card) => card.suit).sort(Suit.compareByStrength);
    }

    toString(): string {
        return `Triple(${this.rank}, ${this.suits.join(', ')})`;
    }
}

export { Pair, Triple };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface IPokerHand {}
//
// class OnePairPokerHand implements IPokerHand {
//     private readonly pair: Pair;
//
//     constructor(cardA: Card, cardB: Card) {
//         this.pair = new Pair(cardA, cardB);
//     }
//
//     toString(): string {
//         return `OnePair(${this.pair.toString()})`;
//     }
// }
//
// class TwoPairPokerHand implements IPokerHand {
//     private readonly pairs: [Pair, Pair];
//
//     constructor(pairA: Pair, pairB: Pair) {
//         this.pairs = [pairA, pairB];
//     }
// }
//
// class ThreeCardPokerHand implements IPokerHand {
//     private readonly triple: Triple;
//
//     constructor(cardA: Card, cardB: Card, cardC: Card) {
//         this.triple = new Triple(cardA, cardB, cardC);
//     }
// }
//
// class FullHousePokerHand implements IPokerHand {
//     private readonly pair: Pair;
//     private readonly triple: Triple;
//
//     constructor(pair: [Card, Card], triple: [Card, Card, Card]) {
//         this.pair = new Pair(...pair);
//         this.triple = new Triple(...triple);
//
//         if (this.pair.rank.isEqual(this.triple.rank)) {
//             throw new Error(
//                 `Invalid pair and triple: ${this.pair}, ${this.triple}`
//             );
//         }
//     }
// }
//
// export { IPokerHand, OnePairPokerHand, ThreeCardPokerHand, FullHousePokerHand };

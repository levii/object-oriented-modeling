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
        return `Hand(${this.cards.toString()})`;
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

    isSameRank(other: Card): boolean {
        return this.rank.isEqual(other.rank);
    }

    /**
     * other よりも強いカードのときに true を返します
     *
     * @param other {Card}
     */
    isStrongerThan(other: Card): boolean {
        return this.compareByStrength(other) < 0;
    }

    /**
     * Cardの強い順に並び替える
     *
     *  - other のほうが強い時には、正の値を
     *  - other のほうが弱い時には、負の値を
     *  - other と this が同じランクのときには、 0 を返します。
     *
     *  sort() の compareFunction に渡すと、配列の先頭が最も強く、末尾が最も弱い順に並び替えます。
     *
     * @param other {Card}
     */
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
     *  sort() の compareFunction に渡すと、配列の先頭が最も強く、末尾が最も弱い順に並び替えます。
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

class Pair {
    private readonly cards: [Card, Card];

    constructor(cardA: Card, cardB: Card) {
        if (cardA.isSameRank(cardB)) {
            this.cards = cardA.isStrongerThan(cardB)
                ? [cardA, cardB]
                : [cardB, cardA];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}`);
        }
    }

    get rank(): Rank {
        return this.cards[0].rank;
    }

    get suits(): Suit[] {
        return this.cards.map((card) => card.suit);
    }

    toString(): string {
        return `Pair(${this.rank}, ${this.suits.join(', ')})`;
    }

    isSameRank(other: Pair): boolean {
        return this.rank.isEqual(other.rank);
    }

    isStrongerThan(other: Pair): boolean {
        return this.compareByStrength(other) < 0;
    }

    compareByStrength(other: Pair): number {
        // TODO: 相手のPairとランクが同じ場合には、スートで比較する
        return this.rank.compareByStrength(other.rank);
    }
}

class Triple {
    private readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.isSameRank(cardB) && cardB.isSameRank(cardC)) {
            const [c0, c1, c2] = [cardA, cardB, cardC].sort(
                Card.compareByStrength
            );
            this.cards = [c0, c1, c2];
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

    compareByStrength(other: Triple): number {
        // TODO: 相手のPairとランクが同じ場合には、スートで比較する
        return this.rank.compareByStrength(other.rank);
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPokerHand {}

class OnePairPokerHand implements IPokerHand {
    private readonly pair: Pair;

    constructor(pair: Pair) {
        this.pair = pair;
    }

    toString(): string {
        return `OnePair[${this.pair.toString()}]`;
    }
}

class OnePairPokerHand_ implements IPokerHand {
    private readonly cards: [Card, Card];

    constructor(cardA: Card, cardB: Card) {
        if (cardA.isSameRank(cardB)) {
            this.cards = cardA.isStrongerThan(cardB)
                ? [cardA, cardB]
                : [cardB, cardA];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}`);
        }
    }
    toString(): string {
        const cards = this.cards.map((card) => card.toString());
        return `OnePair[${cards.join(', ')}]`;
    }
}

class TwoPairPokerHand implements IPokerHand {
    private readonly pairs: [Pair, Pair];

    constructor(pairA: Pair, pairB: Pair) {
        if (pairA.isSameRank(pairB)) {
            throw new Error(`Invalid pairs: pairA=${pairA}, pairB=${pairB}`);
        }

        this.pairs = pairA.isStrongerThan(pairB)
            ? [pairA, pairB]
            : [pairB, pairA];
    }

    toString(): string {
        const pairs = this.pairs.map((pair) => pair.toString());
        return `TwoPair[${pairs.join(', ')}]`;
    }

    strongerPair(): Pair {
        return this.pairs[0];
    }

    weakPair(): Pair {
        return this.pairs[1];
    }
}

class ThreeCardPokerHand implements IPokerHand {
    private readonly triple: Triple;

    constructor(triple: Triple) {
        this.triple = triple;
    }

    toString(): string {
        return `ThreeCard[${this.triple.toString()}]`;
    }
}

class ThreeCardPokerHand_ implements IPokerHand {
    private readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.isSameRank(cardB) && cardA.isSameRank(cardC)) {
            const [c0, c1, c2] = [cardA, cardB, cardC].sort(
                Card.compareByStrength
            );
            this.cards = [c0, c1, c2];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}`);
        }
    }
    toString(): string {
        const cards = this.cards.map((card) => card.toString());
        return `OnePair[${cards.join(', ')}]`;
    }
}

class FullHousePokerHand implements IPokerHand {
    private readonly pair: Pair;
    private readonly triple: Triple;

    constructor(pair: Pair, triple: Triple) {
        if (pair.rank.isEqual(triple.rank)) {
            throw new Error(`Invalid pair and triple: ${pair}, ${triple}`);
        }

        this.pair = pair;
        this.triple = triple;
    }

    toString(): string {
        return `FullHouse[${this.pair.toString()}, ${this.triple.toString()}]`;
    }
}

export {
    Hand,
    IPokerHand,
    OnePairPokerHand,
    TwoPairPokerHand,
    ThreeCardPokerHand,
    FullHousePokerHand,
};

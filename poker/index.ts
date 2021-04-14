class Hand {
    public readonly cards: CardCollection;

    constructor(cards: Card[]) {
        if (cards.length != 5) {
            throw new Error(
                `Invalid the number of cards: expected 5 cards, but got ${cards.length} cards`
            );
        }
        this.cards = new CardCollection(cards);
    }

    toString(): string {
        return `Hand(${this.cards.toString()})`;
    }

    contain(other: Card): boolean {
        return this.cards.contain(other);
    }

    isEqual(other: Hand): boolean {
        return this.cards.isEqual(other.cards);
    }
}

class CardCollection {
    private readonly cards: Card[];

    constructor(cards: Card[] = []) {
        this.cards = Array.from(cards);
    }

    contain(other: Card): boolean {
        return !!this.cards.find((card) => card.isEqual(other));
    }

    isEqual(other: CardCollection): boolean {
        return this.cards.every((card) => {
            return other.contain(card);
        });
    }

    toString(): string {
        const cards = this.cards.map((card) => `${card}`);
        return `CardCollection(${cards.join(', ')})`;
    }

    combinationOfTwoCards(): [Card, Card][] {
        const combinations: [Card, Card][] = [];

        this.cards.forEach((cardA, i) => {
            this.cards.forEach((cardB, j) => {
                if (j > i) {
                    combinations.push([cardA, cardB]);
                }
            });
        });

        return combinations;
    }

    all(): Card[] {
        return Array.from(this.cards);
    }

    filterByRank(rank: Rank): CardCollection {
        return new CardCollection(
            this.cards.filter((card) => card.rank.isEqual(rank))
        );
    }

    count(): number {
        return this.cards.length;
    }

    present(): boolean {
        return this.cards.length > 0;
    }

    ranks(): Rank[] {
        return Rank.all().filter((rank) => this.filterByRank(rank).present());
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

    /**
     * other よりも強いランクのときに true を返します
     *
     * @param other {Rank}
     */
    isStrongerThan(other: Rank): boolean {
        return this.compareByStrength(other) < 0;
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

    static all(): Rank[] {
        return [
            new Rank(1),
            new Rank(2),
            new Rank(3),
            new Rank(4),
            new Rank(5),
            new Rank(6),
            new Rank(7),
            new Rank(8),
            new Rank(9),
            new Rank(10),
            new Rank(11),
            new Rank(12),
            new Rank(13),
        ];
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
        if (cardA.isSameRank(cardB)) {
            this.cards = [cardA, cardB].sort(Card.compareByStrength) as [
                Card,
                Card
            ];
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

    compareByStrength(other: Pair): number {
        // TODO: 相手のPairとランクが同じ場合には、スートで比較する
        return this.rank.compareByStrength(other.rank);
    }
}

class Triple {
    private readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.isSameRank(cardB) && cardB.isSameRank(cardC)) {
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

    compareByStrength(other: Triple): number {
        // TODO: 相手のPairとランクが同じ場合には、スートで比較する
        return this.rank.compareByStrength(other.rank);
    }
}

export { Pair, Triple };

class PokerHandName {
    private readonly value: string;
    private static readonly pokerHandOrder = [
        'FullHousePokerHand',
        'ThreeCardPokerHand',
        'TwoPairPokerHand',
        'OnePairPokerHand',
    ];

    private constructor(value: string) {
        this.value = value;
    }

    public static OnePairPokerHand = new PokerHandName('OnePairPokerHand');
    public static TwoPairPokerHand = new PokerHandName('TwoPairPokerHand');
    public static ThreeCardPokerHand = new PokerHandName('ThreeCardPokerHand');
    public static FullHousePokerHand = new PokerHandName('FullHousePokerHand');

    compareByStrength(other: PokerHandName): number {
        const myOrder = PokerHandName.pokerHandOrder.indexOf(this.value);
        const otherOrder = PokerHandName.pokerHandOrder.indexOf(other.value);
        return myOrder - otherOrder;
    }

    static compareByStrength(a: PokerHandName, b: PokerHandName): number {
        return a.compareByStrength(b);
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPokerHand {
    name: PokerHandName;
    compareByStrength(other: IPokerHand): number;
}

class OnePairPokerHand implements IPokerHand {
    public readonly name = PokerHandName.OnePairPokerHand;
    private readonly pair: Pair;

    constructor(pair: Pair) {
        this.pair = pair;
    }

    toString(): string {
        return `OnePair[${this.pair.toString()}]`;
    }

    compareByStrength(other: IPokerHand): number {
        if (other instanceof OnePairPokerHand) {
            return this.compareWithOnePair(other);
        }

        return this.name.compareByStrength(other.name);
    }

    compareWithOnePair(other: OnePairPokerHand): number {
        return this.pair.compareByStrength(other.pair);
    }
}

class TwoPairPokerHand implements IPokerHand {
    public readonly name = PokerHandName.TwoPairPokerHand;
    private readonly pairs: [Pair, Pair];

    constructor(pairA: Pair, pairB: Pair) {
        if (pairA.isSameRank(pairB)) {
            throw new Error(`Invalid pairs: pairA=${pairA}, pairB=${pairB}`);
        }

        this.pairs =
            pairA.compareByStrength(pairB) < 0
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

    compareByStrength(other: IPokerHand): number {
        if (other instanceof TwoPairPokerHand) {
            return this.compareWithTwoPair(other);
        }

        return this.name.compareByStrength(other.name);
    }

    compareWithTwoPair(other: TwoPairPokerHand): number {
        const strongerPairCompare = this.strongerPair().compareByStrength(
            other.strongerPair()
        );

        if (strongerPairCompare == 0) {
            return this.weakPair().compareByStrength(other.weakPair());
        } else {
            return strongerPairCompare;
        }
    }
}

class ThreeCardPokerHand implements IPokerHand {
    public readonly name = PokerHandName.ThreeCardPokerHand;
    private readonly triple: Triple;

    constructor(triple: Triple) {
        this.triple = triple;
    }

    toString(): string {
        return `ThreeCard[${this.triple.toString()}]`;
    }

    compareByStrength(other: IPokerHand): number {
        if (other instanceof ThreeCardPokerHand) {
            return this.compareWithThreeCard(other);
        }

        return this.name.compareByStrength(other.name);
    }

    compareWithThreeCard(other: ThreeCardPokerHand): number {
        return this.triple.compareByStrength(other.triple);
    }
}

class FullHousePokerHand implements IPokerHand {
    public readonly name = PokerHandName.FullHousePokerHand;
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

    compareByStrength(other: IPokerHand): number {
        if (other instanceof FullHousePokerHand) {
            return this.compareWithFullHouse(other);
        }

        return this.name.compareByStrength(other.name);
    }

    compareWithFullHouse(other: FullHousePokerHand): number {
        return this.triple.compareByStrength(other.triple);
    }
}

class PokerHandCollection {
    private readonly pokerHands: IPokerHand[];

    constructor(pokerHands: IPokerHand[]) {
        this.pokerHands = pokerHands.sort(
            PokerHandCollection.compareByStrength
        );
    }

    toString(): string {
        const pokerHands = this.pokerHands.map((pokerHand) =>
            pokerHand.toString()
        );
        return `PokerHandCollection(${pokerHands.join(', ')})`;
    }

    all(): IPokerHand[] {
        return Array.from(this.pokerHands);
    }

    strongestPokerHand(): IPokerHand {
        return this.pokerHands[0];
    }

    static compareByStrength(a: IPokerHand, b: IPokerHand): number {
        return a.compareByStrength(b);
    }
}

interface IPokerHandFactory {
    buildCandidates(hand: Hand): IPokerHand[];
}

class OnePairPokerHandFactory implements IPokerHandFactory {
    buildCandidates(hand: Hand): OnePairPokerHand[] {
        const pokerHands: OnePairPokerHand[] = [];

        hand.cards.combinationOfTwoCards().forEach(([cardA, cardB]) => {
            if (cardA.isSameRank(cardB)) {
                const pair = new Pair(cardA, cardB);
                pokerHands.push(new OnePairPokerHand(pair));
            }
        });

        return pokerHands;
    }
}

class TwoPairPokerHandFactory implements IPokerHandFactory {
    buildCandidates(hand: Hand): TwoPairPokerHand[] {
        // TODO: hand の持つ cards の任意の 4 枚を取り出して、その中に 2 つの2枚組(ペア) を取り出す
        return [];
    }
}

class ThreeCardPokerHandFactory implements IPokerHandFactory {
    buildCandidates(hand: Hand): ThreeCardPokerHand[] {
        // TODO: hand の持つ cards の任意の 3枚を取り出して、それらの順位(Rank)が全て同じであれば ThreeCardPokerHand を作成して返す
        return [];
    }
}

class FullHousePokerHandFactory implements IPokerHandFactory {
    buildCandidates(hand: Hand): FullHousePokerHand[] {
        const ranks = hand.cards.ranks();

        // FullHouse を構成するのは Rank の種類が 2種類の場合
        if (ranks.length != 2) {
            return [];
        }

        const [rankA, rankB] = ranks;
        const cardsA = hand.cards.filterByRank(rankA);
        const cardsB = hand.cards.filterByRank(rankB);

        if (cardsA.count() == 2) {
            return [this.buildFullHouse(cardsA.all(), cardsB.all())];
        } else {
            return [this.buildFullHouse(cardsB.all(), cardsA.all())];
        }
    }

    private buildFullHouse(
        pairCards: Card[],
        threeCards: Card[]
    ): FullHousePokerHand {
        const pair = new Pair(pairCards[0], pairCards[1]);
        const triple = new Triple(threeCards[0], threeCards[1], threeCards[2]);
        return new FullHousePokerHand(pair, triple);
    }
}

class PokerHandCollectionFactory {
    private readonly factories: IPokerHandFactory[] = [
        new OnePairPokerHandFactory(),
        new TwoPairPokerHandFactory(),
        new ThreeCardPokerHandFactory(),
        new FullHousePokerHandFactory(),
    ];

    buildCandidatePokerHands(hand: Hand): PokerHandCollection {
        const pokerHands: IPokerHand[] = [];

        this.factories.forEach((factory) => {
            const candidates = factory.buildCandidates(hand);
            pokerHands.push(...candidates);
        });

        return new PokerHandCollection(pokerHands);
    }
}

export {
    IPokerHand,
    OnePairPokerHand,
    TwoPairPokerHand,
    ThreeCardPokerHand,
    FullHousePokerHand,
    PokerHandCollection,
    PokerHandCollectionFactory,
};

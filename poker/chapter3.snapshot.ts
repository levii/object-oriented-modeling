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
}

class Suit {
    private readonly value: string;

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

class Pair {
    private readonly cards: [Card, Card];

    constructor(cardA: Card, cardB: Card) {
        if (cardA.rank.isEqual(cardB.rank)) {
            // TODO: 引数の順序が入れ替わっても問題ないように並び替える
            // 例) 「♧A と ♡A のペア」 と 「♡A と ♧A のペア」 は同じものとして扱いたい
            this.cards = [cardA, cardB];
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
}

class Triple {
    private readonly cards: [Card, Card, Card];

    constructor(cardA: Card, cardB: Card, cardC: Card) {
        if (cardA.rank.isEqual(cardB.rank) && cardB.rank.isEqual(cardC.rank)) {
            // TODO: (Pairと同様に) 引数の順序が入れ替わっても問題ないように一定のルールで並び替える
            const [c0, c1, c2] = [cardA, cardB, cardC];
            this.cards = [c0, c1, c2];
        } else {
            throw new Error(`Invalid cards: ${cardA}, ${cardB}, ${cardC}`);
        }
    }

    get rank(): Rank {
        return this.cards[0].rank;
    }

    get suits(): Suit[] {
        return this.cards.map((card) => card.suit);
    }

    toString(): string {
        return `Triple(${this.rank}, ${this.suits.join(', ')})`;
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
        if (cardA.rank.isEqual(cardB.rank)) {
            this.cards = [cardA, cardB];
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
        if (pairA.rank.isEqual(pairB.rank)) {
            throw new Error(`Invalid pairs: pairA=${pairA}, pairB=${pairB}`);
        }

        this.pairs = [pairA, pairB];
    }

    toString(): string {
        const pairs = this.pairs.map((pair) => pair.toString());
        return `TwoPair[${pairs.join(', ')}]`;
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
        if (cardA.rank.isEqual(cardB.rank) && cardA.rank.isEqual(cardC.rank)) {
            const [c0, c1, c2] = [cardA, cardB, cardC];
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

class FullHousePokerHand_ implements IPokerHand {
    private readonly pairCards: [Card, Card];
    private readonly tripleCards: [Card, Card, Card];

    constructor(
        cardA: Card,
        cardB: Card,
        cardX: Card,
        cardY: Card,
        cardZ: Card
    ) {
        // TODO: カードのランク組み合わせが妥当か確認する
        this.pairCards = [cardA, cardB];
        this.tripleCards = [cardX, cardY, cardZ];
    }

    toString(): string {
        const pair = this.pairCards.map((card) => `${card}`).join(', ');
        const triple = this.tripleCards.map((card) => `${card}`).join(', ');
        return `FullHouse[${pair}, ${triple}]`;
    }
}

class CandidatePokerHandCollection {
    private readonly pokerHands: IPokerHand[];

    constructor(pokerHands: IPokerHand[]) {
        this.pokerHands = pokerHands;
    }

    strongestPokerHand(): IPokerHand {
        // pokerHand (役) を強さ順に並び替えて
        const pokerHands = this.sortByStrength();
        // その一番最後の要素 (=一番強い役) を返す
        return pokerHands[pokerHands.length - 1];
    }

    private sortByStrength(): IPokerHand[] {
        // pokerHand の配列を強さ順で並び替える
        return this.pokerHands.sort(function (a, b) {
            // sort関数の引数に対して、 compare function を渡すことで並び替えが行える
            // compare function は数値を返す。代表値は、負の数(-1), ゼロ(0), 正の数(1) の３値。
            return 0;
        });
    }
}

const chapter3jiro = () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade11 = new Card(Suit.Club, new Rank(11));
    const heart11 = new Card(Suit.Heart, new Rank(11));
    const diamond11 = new Card(Suit.Diamond, new Rank(11));

    const hand = new Hand([diamond3, club3, spade11, heart11, diamond11]);

    const candidatePokerHands = new CandidatePokerHandCollection([
        new OnePairPokerHand(new Pair(diamond3, club3)),
        new OnePairPokerHand(new Pair(spade11, heart11)),
        new OnePairPokerHand(new Pair(spade11, diamond11)),
        new OnePairPokerHand(new Pair(heart11, diamond11)),
        new TwoPairPokerHand(
            new Pair(diamond3, club3),
            new Pair(spade11, heart11)
        ),
        new TwoPairPokerHand(
            new Pair(diamond3, club3),
            new Pair(spade11, diamond11)
        ),
        new TwoPairPokerHand(
            new Pair(diamond3, club3),
            new Pair(heart11, diamond11)
        ),
        new ThreeCardPokerHand(new Triple(spade11, heart11, diamond11)),
        new FullHousePokerHand(
            new Pair(diamond3, club3),
            new Triple(spade11, heart11, diamond11)
        ),
    ]);

    console.log(
        '次郎の手札から構成可能な役のうち、一番強い役は、',
        candidatePokerHands.strongestPokerHand()
    );
};

export {
    Hand,
    IPokerHand,
    OnePairPokerHand,
    TwoPairPokerHand,
    ThreeCardPokerHand,
    FullHousePokerHand,
};

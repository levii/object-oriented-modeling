import { Rank, Suit } from './index';

class Card {
    constructor(private readonly suit: Suit, private readonly rank: Rank) {}

    compareTo(other: Card): number {
        // TODO: this と other のカードの強さを比較する。（まずランクで強弱比較して、それが同じ場合にはスートで比較する)
        return 0;
    }
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

class PokerHandStrength {
    private static readonly strength = [
        PokerHandName.OnePair,
        PokerHandName.TwoPair,
        PokerHandName.FullHouse,
    ];

    static get(pokerHandName: PokerHandName): number {
        return this.strength.indexOf(pokerHandName);
    }

    static compare(a: PokerHandName, b: PokerHandName): number {
        return this.get(a) - this.get(b);
    }
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
        if (other instanceof OnePair) {
            return this.compareWithOnePair(other);
        } else {
            // 比較相手が OnePair と異なる種類なので、ポーカーハンドの種類間の強弱比較をすれば良い
            return PokerHandStrength.compare(this.getName(), other.getName());
        }
    }

    private compareWithOnePair(other: OnePair): number {
        // TODO: this.cards と other.cards で強さを比較する。
        //  具体的な比較は、 card.compareTo(card) や rank.compareTo(rank) に移譲する。
        //  ワンペアの場合には、ペア同士のランクで比較して、それが同じ場合にはスートで強さを決める。
        return 0;
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
        if (other instanceof TwoPair) {
            return this.compareWithTwoPair(other);
        } else {
            // 比較相手が TwoPair と異なる種類なので、ポーカーハンドの種類間の強弱比較をすれば良い
            return PokerHandStrength.compare(this.getName(), other.getName());
        }
    }

    private compareWithTwoPair(other: TwoPair): number {
        // TODO: this と other で強さを比較する。
        //  ツーペアの場合には、強い方のペア同士のランクで比較して、それが同じ場合には弱い方のペア同士で比較する流れになる。
        //  NOTE: 弱い方のペア同士のランクが同じ場合にどちらが強いと判断するかは要確認。
        return 0;
    }
}

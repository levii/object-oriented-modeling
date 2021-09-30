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

    /**
     * Handの持つカードのうち引数に指定された枚数を組み合わせたセットを順に返す
     *
     * 手札 [A, B, C, D, E] があったとき、 numberOfCard = 2 を指定すると、以下の10要素が返される
     * [A, B], [A, C], [A, D], [A, E], [B, C], [B, D], [B, E], [C, D], [C, E], [D, E]
     *
     * @param numberOfCard
     * @param callback
     */
    combinationForEach(
        numberOfCard: number,
        callback: (cards: Card[], index: number) => void
    ): void {
        // TODO
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

class OnePairCollectionFactory {
    static build(hand: Hand): OnePair[] {
        const onePairs: OnePair[] = [];

        // TODO: 手札のカード5枚の中から、同じランクのカード2枚のペアを全て列挙する
        hand.combinationForEach(2, (cards) => {
            // TODO: ここで cards の 2枚が同じランクかチェックして..
            const [a, b] = cards;
            onePairs.push(new OnePair([a, b]));
        });

        return onePairs;
    }
}

class TwoPairCollectionFactory {
    static build(hand: Hand): TwoPair[] {
        const twoPairs: TwoPair[] = [];

        hand.combinationForEach(4, (cards) => {
            // TODO: 4枚のカードのうち、同じランクのものが2枚・2組になっているかチェックして..
            // NOTE: 複雑になりそうなので別メソッドに処理を移譲しても良さそう
            const twoPair = this.buildOne(cards);
            if (twoPair) {
                twoPairs.push(twoPair);
            }
        });

        return twoPairs;
    }

    private static buildOne(cards: Card[]): TwoPair | null {
        return null; // 条件を満たしたときには TwoPair を返す /
    }
}

import { Card, Hand, Rank, Suit } from './index';

describe('Rank', () => {
    describe('constructor', () => {
        it('success', () => {
            expect(new Rank(1)).toBeInstanceOf(Rank);
            expect(new Rank(2.0)).toBeInstanceOf(Rank);
        });

        it('invalid', () => {
            expect(() => new Rank(0)).toThrow();
            expect(() => new Rank(1.1)).toThrow();
            expect(() => new Rank(14)).toThrow();
        });
    });

    describe('isEqual()', () => {
        it('同じランクのときに true が返る', () => {
            const one = new Rank(1);
            const otherOne = new Rank(1);
            expect(one.isEqual(otherOne)).toBeTruthy();
        });

        it('ランクが異なるときに false が返る', () => {
            const one = new Rank(1);
            const two = new Rank(2);
            expect(one.isEqual(two)).toBeFalsy();
        });
    });

    describe('compareByStrength()', () => {
        it('同じランクのとき', () => {
            const two = new Rank(2);
            expect(two.compareByStrength(two)).toEqual(0);
        });

        it('Rankの強い順に並び替えられること', () => {
            const ace = new Rank(1);
            const two = new Rank(2);
            const five = new Rank(5);
            const king = new Rank(13);

            expect(
                [ace, two, five, king].sort(Rank.compareByStrength)
            ).toEqual([ace, king, five, two]);
        });
    });
});

describe('Suit', () => {
    describe('compareByStrength()', () => {
        it('同じスートのとき', () => {
            expect(Suit.Diamond.compareByStrength(Suit.Diamond)).toEqual(0);
        });

        it('スートの強い順に並び替えられること', () => {
            expect(
                [Suit.Diamond, Suit.Heart, Suit.Club, Suit.Spade].sort(
                    Suit.compareByStrength
                )
            ).toEqual([Suit.Spade, Suit.Heart, Suit.Diamond, Suit.Club]);
        });
    });
});

describe('Card', () => {
    describe('isEqual()', () => {
        it('同じランク、スートのときに true が返る', () => {
            const two = new Rank(2);
            const cardA = new Card(Suit.Diamond, two);
            expect(cardA.isEqual(new Card(Suit.Diamond, two))).toBeTruthy();
        });

        it('ランクが異なるときに false が返る', () => {
            const two = new Rank(2);
            const three = new Rank(3);
            const cardA = new Card(Suit.Diamond, two);
            expect(cardA.isEqual(new Card(Suit.Diamond, three))).toBeFalsy();
        });

        it('スートが異なるときに false が返る', () => {
            const two = new Rank(2);
            const cardA = new Card(Suit.Diamond, two);
            expect(cardA.isEqual(new Card(Suit.Club, two))).toBeFalsy();
        });
    });

    describe('compareByStrength()', () => {
        it('ランクの強い順にカードが並ぶ', () => {
            const card3 = new Card(Suit.Diamond, new Rank(3));
            const card4 = new Card(Suit.Club, new Rank(4));
            const card11 = new Card(Suit.Spade, new Rank(11));
            const card1 = new Card(Suit.Heart, new Rank(1));

            expect(
                [card1, card3, card4, card11].sort(Card.compareByStrength)
            ).toEqual([card1, card11, card4, card3]);
        });

        it('同じランクのカードはスートの強い順に並ぶ', () => {
            const card3 = new Card(Suit.Diamond, new Rank(3));
            const card4club = new Card(Suit.Club, new Rank(4));
            const card4spade = new Card(Suit.Spade, new Rank(4));
            const card5 = new Card(Suit.Heart, new Rank(5));

            expect(
                [card3, card4club, card4spade, card5].sort(
                    Card.compareByStrength
                )
            ).toEqual([card5, card4spade, card4club, card3]);
        });
    });
});

describe('Hand', () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade11 = new Card(Suit.Spade, new Rank(11));
    const heart4 = new Card(Suit.Heart, new Rank(4));
    const diamond1 = new Card(Suit.Diamond, new Rank(1));

    const hand = new Hand([diamond3, club3, spade11, heart4, diamond1]);

    describe('constructor', () => {
        it('success', () => {
            expect(hand).toBeInstanceOf(Hand);
        });

        it('too many cards', () => {
            expect(() => {
                new Hand([
                    diamond3,
                    club3,
                    spade11,
                    heart4,
                    diamond1,
                    new Card(Suit.Diamond, new Rank(2)),
                ]);
            }).toThrow('Invalid the number of cards');
        });

        it('too few cards', () => {
            expect(() => {
                new Hand([diamond3]);
            }).toThrow('Invalid the number of cards');
        });
    });

    describe('contain()', () => {
        it('Handに含まれているカードの場合、 true が返る', () => {
            expect(hand.contain(diamond1)).toBeTruthy();
        });

        it('Handに含まれていないカードの場合、 false が返る', () => {
            expect(
                hand.contain(new Card(Suit.Diamond, new Rank(2)))
            ).toBeFalsy();
        });
    });

    describe('isEqual()', () => {
        it('カードの順番が違っていても、同じカードの組み合わせならば一致', () => {
            expect(
                hand.isEqual(
                    new Hand([diamond1, diamond3, club3, heart4, spade11])
                )
            ).toBeTruthy();
        });
    });
});

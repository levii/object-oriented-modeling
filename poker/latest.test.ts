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
});

describe('Hand', () => {
    describe('constructor', () => {
        it('success', () => {
            const hand = new Hand([
                new Card(Suit.Diamond, new Rank(3)),
                new Card(Suit.Club, new Rank(3)),
                new Card(Suit.Spade, new Rank(11)),
                new Card(Suit.Heart, new Rank(4)),
                new Card(Suit.Diamond, new Rank(1)),
            ]);
            expect(hand).toBeInstanceOf(Hand);
        });

        it('too many cards', () => {
            expect(() => {
                new Hand([
                    new Card(Suit.Diamond, new Rank(3)),
                    new Card(Suit.Club, new Rank(3)),
                    new Card(Suit.Spade, new Rank(11)),
                    new Card(Suit.Heart, new Rank(4)),
                    new Card(Suit.Diamond, new Rank(1)),
                    new Card(Suit.Diamond, new Rank(2)),
                ]);
            }).toThrow('Invalid the number of cards');
        });

        it('too few cards', () => {
            expect(() => {
                new Hand([new Card(Suit.Diamond, new Rank(3))]);
            }).toThrow('Invalid the number of cards');
        });
    });
});

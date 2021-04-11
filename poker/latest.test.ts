import {
    Card,
    FullHousePokerHand,
    Hand,
    OnePairPokerHand,
    Pair,
    PokerHandCollection,
    PokerHandCollectionFactory,
    Rank,
    Suit,
    ThreeCardPokerHand,
    Triple,
    TwoPairPokerHand,
} from './index';

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

describe('Pair', () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const diamond1 = new Card(Suit.Diamond, new Rank(1));

    const pair = new Pair(diamond3, club3);

    describe('constructor', () => {
        it('success', () => {
            expect(pair).toBeInstanceOf(Pair);
        });

        it('invalid pair', () => {
            expect(() => new Pair(diamond3, diamond1)).toThrow('Invalid cards');
        });
    });

    describe('rank', () => {
        it('Rankが返ること', () => {
            expect(pair.rank).toEqual(diamond3.rank);
        });
    });

    describe('suits', () => {
        it('スートが強い順に返ること', () => {
            expect(pair.suits).toEqual([diamond3.suit, club3.suit]);
            expect(new Pair(club3, diamond3).suits).toEqual([
                diamond3.suit,
                club3.suit,
            ]);
        });
    });
});

describe('Triple', () => {
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade11 = new Card(Suit.Spade, new Rank(11));
    const heart11 = new Card(Suit.Heart, new Rank(11));
    const diamond11 = new Card(Suit.Diamond, new Rank(11));

    const triple = new Triple(heart11, diamond11, spade11);

    describe('constructor', () => {
        it('success', () => {
            expect(triple).toBeInstanceOf(Triple);
        });

        it('invalid pair', () => {
            expect(() => new Triple(spade11, heart11, club3)).toThrow(
                'Invalid cards'
            );
        });
    });

    describe('rank', () => {
        it('Rankが返ること', () => {
            expect(triple.rank).toEqual(spade11.rank);
        });
    });

    describe('suits', () => {
        it('スートが強い順に返ること', () => {
            expect(triple.suits).toEqual([
                spade11.suit,
                heart11.suit,
                diamond11.suit,
            ]);
        });
    });
});

describe('PokerHand', () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade3 = new Card(Suit.Spade, new Rank(3));
    const diamond1 = new Card(Suit.Diamond, new Rank(1));
    const club1 = new Card(Suit.Club, new Rank(1));

    describe('OnePairPokerHand', () => {
        describe('constructor', () => {
            it('success', () => {
                const onePair = new OnePairPokerHand(new Pair(diamond3, club3));
                expect(onePair.toString()).toContain('OnePair');
            });
        });

        describe('compareWithOnePair()', () => {
            const onePairRank3 = new OnePairPokerHand(
                new Pair(diamond3, club3)
            );
            const onePairRank1 = new OnePairPokerHand(
                new Pair(diamond1, club1)
            );

            it('役の強い順に並ぶこと', () => {
                expect(
                    [onePairRank3, onePairRank1].sort((a, b) =>
                        a.compareWithOnePair(b)
                    )
                ).toEqual([onePairRank1, onePairRank3]);
            });
        });
    });

    describe('TwoPairPokerHand', () => {
        describe('constructor', () => {
            it('success', () => {
                const twoPair = new TwoPairPokerHand(
                    new Pair(diamond3, club3),
                    new Pair(diamond1, club1)
                );
                expect(twoPair.toString()).toContain('TwoPair');
            });

            it('failure', () => {
                expect(() => {
                    new TwoPairPokerHand(
                        new Pair(diamond3, club3),
                        new Pair(diamond3, club3)
                    );
                }).toThrow('Invalid pairs');
            });
        });

        describe('compareWithTwoPair()', () => {
            const diamond11 = new Card(Suit.Diamond, new Rank(11));
            const club11 = new Card(Suit.Club, new Rank(11));

            const twoPairA = new TwoPairPokerHand(
                new Pair(diamond3, club3),
                new Pair(diamond11, club11)
            );
            const twoPairB = new TwoPairPokerHand(
                new Pair(diamond3, club3),
                new Pair(diamond1, club1)
            );

            it('役の強い順に並ぶこと', () => {
                expect(
                    [twoPairA, twoPairB].sort((a, b) => a.compareWithTwoPair(b))
                ).toEqual([twoPairB, twoPairA]);
            });
        });
    });

    describe('ThreeCardPokerHand', () => {
        describe('constructor', () => {
            it('success', () => {
                const threeCard = new ThreeCardPokerHand(
                    new Triple(diamond3, club3, spade3)
                );
                expect(threeCard).toBeInstanceOf(ThreeCardPokerHand);
                expect(threeCard.toString()).toContain('ThreeCard');
            });
        });

        describe('compareWithThreeCard', () => {
            const spade1 = new Card(Suit.Spade, new Rank(1));
            const threeCardA = new ThreeCardPokerHand(
                new Triple(diamond3, club3, spade3)
            );
            const threeCardB = new ThreeCardPokerHand(
                new Triple(diamond1, club1, spade1)
            );

            it('役の強い順に並ぶこと', () => {
                expect(
                    [threeCardA, threeCardB].sort((a, b) =>
                        a.compareWithThreeCard(b)
                    )
                ).toEqual([threeCardB, threeCardA]);
            });
        });
    });

    describe('FullHousePokerHand', () => {
        describe('constructor', () => {
            it('success', () => {
                const fullHouse = new FullHousePokerHand(
                    new Pair(diamond1, club1),
                    new Triple(diamond3, club3, spade3)
                );
                expect(fullHouse).toBeInstanceOf(FullHousePokerHand);
                expect(fullHouse.toString()).toContain('FullHouse');
            });

            it('failure', () => {
                expect(() => {
                    new FullHousePokerHand(
                        new Pair(diamond3, club3),
                        new Triple(diamond3, club3, spade3)
                    );
                }).toThrow('Invalid pair and triple');
            });
        });

        describe('compareWithFullHouse', () => {
            const diamond5 = new Card(Suit.Diamond, new Rank(5));
            const club5 = new Card(Suit.Club, new Rank(5));
            const spade5 = new Card(Suit.Spade, new Rank(5));
            const diamond4 = new Card(Suit.Diamond, new Rank(4));
            const club4 = new Card(Suit.Club, new Rank(4));

            const fullHouseA = new FullHousePokerHand(
                new Pair(diamond1, club1),
                new Triple(diamond3, club3, spade3)
            );
            const fullHouseB = new FullHousePokerHand(
                new Pair(diamond4, club4),
                new Triple(diamond5, club5, spade5)
            );

            it('役の強い順に並ぶこと', () => {
                expect(
                    [fullHouseA, fullHouseB].sort((a, b) =>
                        a.compareWithFullHouse(b)
                    )
                ).toEqual([fullHouseB, fullHouseA]);
            });
        });
    });
});

describe('PokerHandCollection', () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade3 = new Card(Suit.Spade, new Rank(3));
    const diamond1 = new Card(Suit.Diamond, new Rank(1));
    const club1 = new Card(Suit.Club, new Rank(1));

    const onePairRank3 = new OnePairPokerHand(new Pair(diamond3, club3));
    const onePairRank1 = new OnePairPokerHand(new Pair(diamond1, club1));
    const twoPair = new TwoPairPokerHand(
        new Pair(diamond3, club3),
        new Pair(diamond1, club1)
    );
    const threeCard = new ThreeCardPokerHand(
        new Triple(diamond3, club3, spade3)
    );
    const fullHouse = new FullHousePokerHand(
        new Pair(diamond1, club1),
        new Triple(diamond3, club3, spade3)
    );

    const pokerHands = new PokerHandCollection([
        onePairRank1,
        onePairRank3,
        twoPair,
        threeCard,
        fullHouse,
    ]);

    it('strongestPokerHand()', () => {
        expect(pokerHands.strongestPokerHand()).toEqual(fullHouse);
    });
});

describe('PokerHandCollectionFactory', () => {
    const diamond3 = new Card(Suit.Diamond, new Rank(3));
    const club3 = new Card(Suit.Club, new Rank(3));
    const spade11 = new Card(Suit.Spade, new Rank(11));
    const heart4 = new Card(Suit.Heart, new Rank(4));
    const diamond1 = new Card(Suit.Diamond, new Rank(1));

    const diamond5 = new Card(Suit.Diamond, new Rank(5));
    const club5 = new Card(Suit.Club, new Rank(5));
    const club11 = new Card(Suit.Club, new Rank(11));
    const heart11 = new Card(Suit.Heart, new Rank(11));
    const diamond11 = new Card(Suit.Diamond, new Rank(11));

    const taroHand = new Hand([diamond3, club3, spade11, heart4, diamond1]);
    const jiroHand = new Hand([diamond5, club5, club11, heart11, diamond11]);

    describe('buildCandidatePokerHands()', () => {
        describe('太郎の手札に対して', function () {
            const candidatePokerHands = new PokerHandCollectionFactory().buildCandidatePokerHands(
                taroHand
            );

            it('候補となる役は1つだけであること', () => {
                expect(candidatePokerHands.all()).toHaveLength(1);
            });

            it('一番強い役はワンペアであること', () => {
                const pokerHand = candidatePokerHands.strongestPokerHand();
                expect(pokerHand).toEqual(
                    new OnePairPokerHand(new Pair(club3, diamond3))
                );
            });
        });

        describe('次郎の手札に対して', () => {
            const candidatePokerHands = new PokerHandCollectionFactory().buildCandidatePokerHands(
                jiroHand
            );

            it('候補となる役にワンペアが含まれること', () => {
                expect(candidatePokerHands.all()).toContainEqual(
                    new OnePairPokerHand(new Pair(diamond5, club5))
                );
            });

            it('一番強い役はフルハウスであること', () => {
                const pokerHand = candidatePokerHands.strongestPokerHand();
                expect(pokerHand).toEqual(
                    new FullHousePokerHand(
                        new Pair(club5, diamond5),
                        new Triple(club11, heart11, diamond11)
                    )
                );
            });
        });
    });
});

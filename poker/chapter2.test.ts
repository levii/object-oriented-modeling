import {
    Card,
    // FullHousePokerHand,
    Hand,
    // OnePairPokerHand,
    Rank,
    Suit,
    // ThreeCardPokerHand,
} from './index';

it('Chapter2: Poker', () => {
    const taroHand = new Hand([
        new Card(Suit.Diamond, new Rank(3)),
        new Card(Suit.Club, new Rank(3)),
        new Card(Suit.Spade, new Rank(11)),
        new Card(Suit.Heart, new Rank(4)),
        new Card(Suit.Diamond, new Rank(1)),
    ]);

    // const taroPokerHands = [
    //     new OnePairPokerHand(
    //         new Card(Suit.Diamond, new Rank(3)),
    //         new Card(Suit.Club, new Rank(3))
    //     ),
    // ];

    const jiroHand = new Hand([
        new Card(Suit.Diamond, new Rank(3)),
        new Card(Suit.Club, new Rank(3)),
        new Card(Suit.Spade, new Rank(11)),
        new Card(Suit.Heart, new Rank(11)),
        new Card(Suit.Diamond, new Rank(11)),
    ]);

    // const jiroCandidatePokerHands = [
    //     new OnePairPokerHand(
    //         new Card(Suit.Diamond, new Rank(3)),
    //         new Card(Suit.Club, new Rank(3))
    //     ),
    //     new OnePairPokerHand(
    //         new Card(Suit.Spade, new Rank(11)),
    //         new Card(Suit.Heart, new Rank(11))
    //     ),
    //     new OnePairPokerHand(
    //         new Card(Suit.Spade, new Rank(11)),
    //         new Card(Suit.Diamond, new Rank(11))
    //     ),
    //     new OnePairPokerHand(
    //         new Card(Suit.Spade, new Rank(11)),
    //         new Card(Suit.Diamond, new Rank(11))
    //     ),
    //     new ThreeCardPokerHand(
    //         new Card(Suit.Spade, new Rank(11)),
    //         new Card(Suit.Heart, new Rank(11)),
    //         new Card(Suit.Diamond, new Rank(11))
    //     ),
    //     new FullHousePokerHand(
    //         [
    //             new Card(Suit.Diamond, new Rank(3)),
    //             new Card(Suit.Club, new Rank(3)),
    //         ],
    //         [
    //             new Card(Suit.Spade, new Rank(11)),
    //             new Card(Suit.Heart, new Rank(11)),
    //             new Card(Suit.Diamond, new Rank(11)),
    //         ]
    //     ),
    // ];
});

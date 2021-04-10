import { Card, Hand, Rank, Suit } from './index';

describe('Chapter1: ポーカー', () => {
    it('Suit', () => {
        const spade = Suit.Spade;
        expect(`${spade}`).toEqual('♠');
    });

    it('Rank', () => {
        const one = new Rank(1);
        expect(`${one}`).toEqual('A');

        const two = new Rank(2);
        expect(`${two}`).toEqual('2');
    });

    it('Card', () => {
        const spade = Suit.Spade;
        const one = new Rank(1);
        const card = new Card(spade, one);

        expect(`${card}`).toEqual('[♠A]');
    });

    it('Hand', () => {
        const hand = new Hand([
            new Card(Suit.Diamond, new Rank(3)),
            new Card(Suit.Club, new Rank(3)),
            new Card(Suit.Spade, new Rank(11)),
            new Card(Suit.Heart, new Rank(4)),
            new Card(Suit.Diamond, new Rank(1)),
        ]);

        expect(`${hand}`).toEqual(
            'Hand(CardCollection([♦3], [♣3], [♠J], [♥4], [♦A]))'
        );
    });
});

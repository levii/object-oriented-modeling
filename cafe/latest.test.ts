import { Dish, Nutrition, Plate, Price } from './index';

describe('Plate', () => {
    describe('太郎のプレート', () => {
        const pasta = new Dish(
            'パスタ&ランチ',
            new Price(250),
            new Nutrition(1, 1, 3)
        );
        const bread = new Dish(
            'くるみパン',
            new Price(150),
            new Nutrition(0, 0, 3)
        );
        const dessert = new Dish(
            'フルーツ',
            new Price(150),
            new Nutrition(0, 1, 0)
        );
        const taroPlate = new Plate('太郎のプレート', [pasta, bread, dessert]);

        it('itemCount()', () => {
            expect(taroPlate.itemCount()).toEqual(3);
        });
    });
});

import {
    DiscountAmount,
    Dish,
    DishCollection,
    Nutrition,
    Plate,
    Price,
} from './index';

const pasta = new Dish('パスタ&ランチ', new Price(250), new Nutrition(1, 1, 3));
const bread = new Dish('くるみパン', new Price(150), new Nutrition(0, 0, 3));
const dessert = new Dish('フルーツ', new Price(150), new Nutrition(0, 1, 0));

describe('DishCollection', () => {
    const dishCollection = new DishCollection([pasta, bread, dessert]);
    describe('orderByPrice()', () => {
        it('値段の安い順に並ぶこと', () => {
            const sorted = new DishCollection([pasta, bread]).orderByPrice();
            expect(sorted).toBeInstanceOf(DishCollection);
            expect(sorted.all()).toEqual([bread, pasta]);
        });
    });

    describe('totalAmount()', () => {
        it('値段の合計金額', () => {
            expect(dishCollection.totalAmount()).toEqual(
                new Price(250 + 150 + 150)
            );
        });
    });
});

describe('Plate', () => {
    describe('太郎のプレート', () => {
        const taroPlate = new Plate('太郎のプレート', [pasta, bread, dessert]);

        it('itemCount()', () => {
            expect(taroPlate.itemCount()).toEqual(3);
        });
    });
});

describe('DiscountAmount', function () {
    it('add()', () => {
        expect(new DiscountAmount(150).add(new DiscountAmount(30))).toEqual(
            new DiscountAmount(180)
        );
    });
});

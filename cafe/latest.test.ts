import {
    DiscountAmount,
    AvailableDiscountCollectionFactory,
    Dish,
    DishCollection,
    Nutrition,
    Order,
    Plate,
    Price,
} from './index';

const pasta = new Dish('パスタ&ランチ', new Price(250), new Nutrition(1, 1, 3));
const bread = new Dish('くるみパン', new Price(150), new Nutrition(0, 0, 3));
const lowCarbonBread = new Dish(
    '低糖質パン',
    new Price(150),
    new Nutrition(0, 0, 1)
);
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

    it('totalNutrition()', () => {
        expect(dishCollection.totalNutrition()).toEqual(
            new Nutrition(1, 1 + 1, 3 + 3)
        );
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

describe('DiscountCollectionFactory', () => {
    describe('太郎のプレート', () => {
        const plate = new Plate('太郎のプレート', [pasta, bread, dessert]);
        const discounts = new AvailableDiscountCollectionFactory().build(plate);

        it('1つの割引が適用されていること', () => {
            expect(discounts.all()).toHaveLength(1);
        });

        it('割引額が30円であること', () => {
            expect(discounts.totalAmount()).toEqual(new DiscountAmount(30));
        });
    });

    describe('次郎のプレート', () => {
        const plate = new Plate('次郎のプレート', [
            pasta,
            lowCarbonBread,
            dessert,
        ]);
        const discounts = new AvailableDiscountCollectionFactory().build(plate);

        it('3つの割引が適用されていること', () => {
            expect(discounts.all()).toHaveLength(3);
        });

        it('割引額が100円であること', () => {
            expect(discounts.totalAmount()).toEqual(new DiscountAmount(100));
        });
    });
});

describe('Order', () => {
    describe('太郎のプレート', () => {
        const plate = new Plate('太郎のプレート', [pasta, bread, dessert]);
        const availableDiscounts = new AvailableDiscountCollectionFactory().build(
            plate
        );
        const order = new Order(
            plate.dishCollection(),
            availableDiscounts.findMaxDiscount()
        );

        it('小計、割引額、合計額が計算できること', () => {
            expect(order.subtotalAmount()).toEqual(new Price(550));
            expect(order.discountAmount()).toEqual(new DiscountAmount(30));
            expect(order.totalAmount()).toEqual(new Price(520));
        });
    });

    describe('次郎のプレート', () => {
        const plate = new Plate('次郎のプレート', [
            pasta,
            lowCarbonBread,
            dessert,
        ]);
        const availableDiscounts = new AvailableDiscountCollectionFactory().build(
            plate
        );
        const order = new Order(
            plate.dishCollection(),
            availableDiscounts.findMaxDiscount()
        );

        it('小計、割引額、合計額が計算できること', () => {
            expect(order.subtotalAmount()).toEqual(new Price(550));
            expect(order.discountAmount()).toEqual(new DiscountAmount(100));
            expect(order.totalAmount()).toEqual(new Price(450));
        });
    });
});

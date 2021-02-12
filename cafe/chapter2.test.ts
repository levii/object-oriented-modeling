import {
    Discount,
    DiscountName,
    Dish,
    LowCarbonDiscount,
    NiceCalorieDiscount,
    Nutrition,
    NutritionBalanceDiscount,
    Plate,
    Price,
} from './index';

it('Chapter2: カフェ (太郎のプレート)', () => {
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

    const taroDiscounts_1 = [
        new Discount(DiscountName.LowCarbon, taroPlate),
        new Discount(DiscountName.NiceCalorie, taroPlate),
        new Discount(DiscountName.NutritionGoodBalance, taroPlate),
    ];

    const taroDiscounts_2 = [
        new LowCarbonDiscount(taroPlate),
        new NiceCalorieDiscount(taroPlate),
        new NutritionBalanceDiscount(taroPlate),
    ];

    // 太郎のプレートに対する割引の候補の中から、有効なものだけを取り出す
    taroDiscounts_2.filter((discount) => discount.available());
});

it('Chapter2: カフェ (次郎のプレート)', () => {
    const pasta = new Dish(
        'パスタ&ランチ',
        new Price(250),
        new Nutrition(1, 1, 3)
    );
    // FIXME: パンの種類を変える
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
});

import { Dish, Nutrition, Plate, Price } from './index';

describe('チャプター１', () => {
    it('Price', () => {
        const price = new Price(150);
        expect(price.toString()).toEqual('Price(150円)');
    });

    it('Nutrition', () => {
        const nutrition = new Nutrition(1, 2, 3);
        expect(nutrition.toString()).toEqual('Nutrition(赤:1, 緑:2, 黄:3)');
    });

    it('Dish', () => {
        const pasta = new Dish(
            'パスタ&サラダ',
            new Price(250),
            new Nutrition(1, 1, 3)
        );
        expect(pasta.toString()).toEqual(
            'Dish(パスタ&サラダ, Nutrition(赤:1, 緑:1, 黄:3), Price(250円))'
        );
    });

    it('太郎のプレート', () => {
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

        expect(taroPlate).toBeInstanceOf(Plate);
        expect(taroPlate.dishItems()).toHaveLength(3);
        expect(taroPlate.toString()).toEqual(
            `Plate 太郎のプレート
DishCollection(
  Dish(パスタ&ランチ, Nutrition(赤:1, 緑:1, 黄:3), Price(250円)),
  Dish(くるみパン, Nutrition(赤:0, 緑:0, 黄:3), Price(150円)),
  Dish(フルーツ, Nutrition(赤:0, 緑:1, 黄:0), Price(150円))
)`
        );
        // expect(taroPlate.dishes[0]).toEqual('パスタ&サラダ');
    });
});

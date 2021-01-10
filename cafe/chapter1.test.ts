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
        const pasta = new Dish(new Price(250), new Nutrition(1, 1, 3));
        expect(pasta.toString()).toEqual('Dish(Nutrition(赤:1, 緑:1, 黄:3), Price(250円))');
    });

    it('太郎のプレート', () => {
        const pasta = new Dish(new Price(250), new Nutrition(1, 1, 3));
        const bread = new Dish(new Price(150), new Nutrition(0, 0, 3));
        const dessert = new Dish(new Price(150), new Nutrition(0, 1, 0));
        const taroPlate = new Plate([pasta, bread, dessert]);

        expect(taroPlate).toBeInstanceOf(Plate);
        expect(taroPlate.dishes).toHaveLength(3);
        // expect(taroPlate.dishes[0]).toEqual('パスタ&サラダ');
    });
});

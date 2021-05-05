class Plate {
    public readonly name: string;
    // 1つの Plate は、複数個の Dish を持つ
    private readonly dishes: DishCollection;

    constructor(name: string, dishes: Dish[]) {
        this.name = name;
        this.dishes = new DishCollection(dishes);
    }

    toString(): string {
        return `Plate ${this.name}\n${this.dishes.toString()}`;
    }

    totalAmount(): Price {
        return this.dishes.totalAmount();
    }

    totalNutrition(): Nutrition {
        return this.dishes.totalNutrition();
    }

    findLowestPriceGreenDish(): Dish | undefined {
        // 緑を含む一番安い料理を探す
        const greenDishes = this.dishes.greenDishes().orderByPrice();
        return greenDishes.first();
    }

    dishCollection(): DishCollection {
        return this.dishes;
    }

    dishItems(): Dish[] {
        return this.dishes.all();
    }

    itemCount(): number {
        return this.dishes.count();
    }
}

class Dish {
    public readonly name: string;
    public readonly price: Price;
    public readonly nutrition: Nutrition;

    constructor(name: string, price: Price, nutrition: Nutrition) {
        this.name = name;
        this.price = price;
        this.nutrition = nutrition;
    }

    toString(): string {
        return `Dish(${this.name}, ${this.nutrition}, ${this.price})`;
    }

    compareByPrice(other: Dish): number {
        return this.price.compare(other.price);
    }

    static compareByPrice(a: Dish, b: Dish): number {
        return a.compareByPrice(b);
    }
}

class Nutrition {
    public readonly red: number;
    public readonly green: number;
    public readonly yellow: number;

    constructor(red: number, green: number, yellow: number) {
        this.red = red;
        this.green = green;
        this.yellow = yellow;
    }

    toString(): string {
        return `Nutrition(赤:${this.red}, 緑:${this.green}, 黄:${this.yellow})`;
    }

    add(other: Nutrition): Nutrition {
        return new Nutrition(
            this.red + other.red,
            this.green + other.green,
            this.yellow + other.yellow
        );
    }

    total(): number {
        return this.red + this.green + this.yellow;
    }

    static ZERO = new Nutrition(0, 0, 0);
}

class Price {
    public readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    static ZERO = new Price(0);

    toString(): string {
        return `Price(${this.value}円)`;
    }

    compare(other: Price): number {
        return this.value - other.value;
    }

    add(other: Price): Price {
        return new Price(this.value + other.value);
    }
}

export { Plate, Dish, Nutrition, Price };

export class DishCollection {
    private readonly dishes: Dish[];
    constructor(dishes: Dish[]) {
        this.dishes = Array.from(dishes);
    }

    count(): number {
        return this.dishes.length;
    }

    toString(): string {
        const dishes = this.dishes.map((dish) => `  ${dish.toString()}`);
        return `DishCollection(\n${dishes.join(',\n')}\n)`;
    }

    all(): Dish[] {
        return Array.from(this.dishes);
    }

    first(): Dish | undefined {
        return this.dishes[0];
    }

    greenDishes(): DishCollection {
        return new DishCollection(
            this.dishes.filter((dish) => dish.nutrition.green > 0)
        );
    }

    orderByPrice(): DishCollection {
        return new DishCollection(
            Array.from(this.dishes).sort(Dish.compareByPrice)
        );
    }

    totalAmount(): Price {
        return this.dishes.reduce<Price>((price, dish) => {
            return price.add(dish.price);
        }, Price.ZERO);
    }

    totalNutrition(): Nutrition {
        return this.dishes.reduce<Nutrition>((nutrition, dish) => {
            return nutrition.add(dish.nutrition);
        }, Nutrition.ZERO);
    }
}

class DiscountAmount {
    readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    add(other: DiscountAmount): DiscountAmount {
        return new DiscountAmount(this.value + other.value);
    }

    compareTo(other: DiscountAmount): number {
        return this.value - other.value;
    }

    static ZERO = new DiscountAmount(0);

    static buildFromPrice(price: Price, rate: number): DiscountAmount {
        // TODO: 端数処理が必要
        return new DiscountAmount(price.value * rate);
    }

    toPrice(): Price {
        return new Price(-1 * this.value);
    }
}

/**
 * 割引を実装する
 *
 *  - 1つの割引クラスで実装する
 *  - 割引の種類に応じて実装する
 */

enum DiscountName {
    NutritionGoodBalance = 'NutritionGoodBalance',
    NiceCalorie = 'NiceCalorie',
    LowCarbon = 'LowCarbon',
}

// 1つの割引クラスで実装する

class Discount {
    private readonly name: DiscountName;
    private readonly plate: Plate;
    constructor(name: DiscountName, plate: Plate) {
        this.name = name;
        this.plate = plate;
    }

    calcDiscount(): DiscountAmount {
        switch (this.name) {
            case DiscountName.NutritionGoodBalance:
                return this.calcNutritionGoodBalanceDiscount();
            case DiscountName.LowCarbon:
                return this.calcLowCarbonDiscount();
            case DiscountName.NiceCalorie:
                return this.calcNiceCalorieDiscount();
        }
    }

    private calcNutritionGoodBalanceDiscount(): DiscountAmount {
        // バランス配慮セット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }

    private calcLowCarbonDiscount(): DiscountAmount {
        // 糖質配慮セット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }

    private calcNiceCalorieDiscount(): DiscountAmount {
        // ナイスカロリーセット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }
}

interface IDiscount {
    amount(): number;
    compareAmount(other: IDiscount): number;
}

interface IDiscountFactory {
    discountAvailable(plate: Plate): boolean;
    build(plate: Plate): IDiscount;
}

class NutritionBalanceDiscount implements IDiscount {
    private readonly targetDish: Dish;
    static DISCOUNT_RATE = 0.2;

    constructor(targetDish: Dish) {
        this.targetDish = targetDish;
    }

    amount(): number {
        return DiscountAmount.buildFromPrice(
            this.targetDish.price,
            NutritionBalanceDiscount.DISCOUNT_RATE
        ).value;
    }

    compareAmount(other: IDiscount): number {
        return this.amount() - other.amount();
    }
}

class NutritionBalanceDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 赤と緑の合計が 3点以上のときに割引適用
        const nutrition = plate.totalNutrition();
        return nutrition.red + nutrition.green >= 3;
    }

    build(plate: Plate): NutritionBalanceDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(
                `Cloud not build NutritionBalanceDiscount: ${plate}`
            );
        }

        // TODO: 割引対象となる料理(緑を含む一番安いもの)を取得する
        const targetDish = plate.findLowestPriceGreenDish();
        return new NutritionBalanceDiscount(targetDish);
    }
}

class NiceCalorieDiscount implements IDiscount {
    amount(): number {
        return 50;
    }
    compareAmount(other: IDiscount): number {
        return this.amount() - other.amount();
    }
}

class NiceCalorieDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 三色の合計点数が 6点〜8点の間のときに割引適用
        const score = plate.totalNutrition().total();
        return 6 <= score && score <= 8;
    }

    build(plate: Plate): NiceCalorieDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(`Cloud not build NiceCalorieDiscount: ${plate}`);
        }

        return new NiceCalorieDiscount();
    }
}

class LowCarbonDiscount implements IDiscount {
    amount(): number {
        return 20;
    }
    compareAmount(other: IDiscount): number {
        return this.amount() - other.amount();
    }
}

class LowCarbonDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 黄色の合計が5点以下のときに割引適用
        const nutrition = plate.totalNutrition();
        return nutrition.yellow <= 5;
    }

    build(plate: Plate): LowCarbonDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(`Cloud not build LowCarbonDiscount: ${plate}`);
        }

        return new LowCarbonDiscount();
    }
}

function calcPaymentAmount(plate: Plate): number {
    // プレートを下記のような形で作成して、この関数を呼び出す
    // const pasta = new Dish('パスタ&ランチ', new Price(250), new Nutrition(1, 1, 3));
    // const plate = new Plate('次郎のプレート', [pasta, bread, dessert]);
    const totalDishAmount = 550; // plate.totalDishAmount() のように取り出したい

    // プレートの持つ Dish の中から、バランス配慮セット割引の対象料理を選択する
    // (ここでは疑似的に フルーツの Dish を用意する)
    const dessert = new Dish(
        'フルーツ',
        new Price(150),
        new Nutrition(0, 1, 0)
    );

    // plate に対して適用可能な割引オブジェクトの集合を用意して
    const availableDiscounts: IDiscount[] = [
        new LowCarbonDiscount(),
        new NiceCalorieDiscount(),
        new NutritionBalanceDiscount(dessert),
    ];

    // それを割引金額順に並び替えて
    const sortedDiscounts = availableDiscounts.sort(
        (a, b) => a.amount() - b.amount()
    );
    // 一番最後 (=最大の割引額) の要素を取り出す
    const discount = sortedDiscounts[sortedDiscounts.length];

    // Dishの合計金額から割引金額を差し引く
    return totalDishAmount - (discount ? discount.amount() : 0);
}

class AvailableDiscountCollection {
    private readonly discounts: IDiscount[];

    constructor(discounts: IDiscount[]) {
        this.discounts = Array.from(discounts);
    }

    findMaxDiscount(): IDiscount | null {
        const sorted = this.discounts.sort((a, b) => a.compareAmount(b));
        return sorted[sorted.length] || null;
    }

    _findMaxDiscount(): IDiscount | null {
        const sorted = this.discounts.sort((a, b) => a.amount() - b.amount());
        return sorted[sorted.length] || null;
    }

    all(): IDiscount[] {
        return Array.from(this.discounts);
    }

    totalAmount(): DiscountAmount {
        return this.discounts.reduce<DiscountAmount>((amount, discount) => {
            return amount.add(new DiscountAmount(discount.amount()));
        }, DiscountAmount.ZERO);
    }
}

class DiscountCollectionFactory {
    private readonly factories: IDiscountFactory[] = [
        new NutritionBalanceDiscountFactory(),
        new NiceCalorieDiscountFactory(),
        new LowCarbonDiscountFactory(),
    ];

    build(plate: Plate): AvailableDiscountCollection {
        const discounts: IDiscount[] = [];

        this.factories.forEach((factory) => {
            if (factory.discountAvailable(plate)) {
                discounts.push(factory.build(plate));
            }
        });

        return new AvailableDiscountCollection(discounts);
    }
}

class Order {
    private readonly dishes: DishCollection;
    private readonly discounts: AvailableDiscountCollection;

    constructor(
        dishes: DishCollection,
        discounts: AvailableDiscountCollection
    ) {
        this.dishes = dishes;
        this.discounts = discounts;
    }

    subtotalAmount(): Price {
        return this.dishes.totalAmount();
    }

    discountAmount(): DiscountAmount {
        return this.discounts.totalAmount();
    }

    totalAmount(): Price {
        return this.subtotalAmount().add(this.discountAmount().toPrice());
    }
}

export {
    DiscountName,
    DiscountAmount,
    Discount,
    IDiscount,
    LowCarbonDiscount,
    NiceCalorieDiscount,
    NutritionBalanceDiscount,
    AvailableDiscountCollection,
    DiscountCollectionFactory,
    Order,
};

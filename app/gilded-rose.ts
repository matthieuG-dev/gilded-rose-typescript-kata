enum nonPerishableProductsEnum {
  AGED_BRIE = "Aged Brie",
  BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert",
  RAGNAROS_HAND = "Sulfuras, Hand of Ragnaros",
}

const legendaryProducts = ["Sulfuras, Hand of Ragnaros"]
const productsWithExpirationDate = ["Backstage passes to a TAFKAL80ETC concert"]
const maximumQuality = 50

const nonPerishableProducts = Object.entries(nonPerishableProductsEnum).map(
  ([_, value]) => {
    return value as string;
  }
)

export class Item {
  public name: string;
  public sellIn: number;
  public quality: number;


  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  public isOutDated() {
    return this.sellIn < 0;
  }

  public isLegendary() {
    return legendaryProducts.includes(this.name);
  }

  public isWorthless() {
    return this.quality < 0
  }

  public valueIncreasesWithTime() {
    return nonPerishableProducts.includes(this.name) && this.quality >= 0;
  }

  public productWithEnhancedExpirationDate() {
    return productsWithExpirationDate.includes(this.name)
  }

  public hasReachedMaximumQuality() {
    return this.quality >= maximumQuality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (!item.hasReachedMaximumQuality()) {
        if (item.valueIncreasesWithTime()) {
          this.increaseQuality(item)
        } else if (!item.isWorthless()) {
          this.discreaseQuality(item);
        }
      }

      this.updateQualityAfterExpirationDateDecrement(item);
    })
    return this.items;
  }

  private updateQualityAfterExpirationDateDecrement(item: Item) {
    if (!item.isLegendary()) {
      item.sellIn = item.sellIn - 1
    }

    if (item.isOutDated()) {
      if (item.productWithEnhancedExpirationDate()) {
        this.resetQuality(item);
      }

      if (item.name == nonPerishableProductsEnum.AGED_BRIE && !item.hasReachedMaximumQuality()) {
        this.increaseQuality(item);
      }

      if (
        item.name != nonPerishableProductsEnum.AGED_BRIE &&
        item.name != nonPerishableProductsEnum.RAGNAROS_HAND &&
        item.quality > 0
      ) {
        item.quality = item.quality - 1;
      }
    }
  }

  private resetQuality(item: Item) {
    item.quality = 0
  }

  private discreaseQuality(item: Item) {
    item.quality = item.quality - 1;
  }

  private increaseQuality(item: Item): void {
    item.quality += 1
    if (item.productWithEnhancedExpirationDate()) {
      if (item.sellIn < 11 && !item.hasReachedMaximumQuality()) {
        item.quality += 1;
      }
      if (item.sellIn < 6 && !item.hasReachedMaximumQuality()) {
        item.quality += 1;
      }
    }
  }
}

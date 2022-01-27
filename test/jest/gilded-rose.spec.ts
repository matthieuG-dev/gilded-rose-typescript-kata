import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('golden test', () => {
    // Given
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("+5 Dexterity Vest", -1, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Aged Brie", -1, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", 3, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 40),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 40),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ]
    const gildedRose = new GildedRose(items);

    var days: number = 2;
    let result
    for (let i = 0; i < days; i++) {
      console.log("-------- day " + i + " --------");
      console.log("name, sellIn, quality");
      items.forEach((element) => {
        console.log(
          element.name + " " + element.sellIn + " " + element.quality
        );
      });
      result = gildedRose.updateQuality();
    }

    const expected = [
      { name: "+5 Dexterity Vest", sellIn: 8, quality: 18 },
      { name: "+5 Dexterity Vest", sellIn: -3, quality: 16 },
      { name: "Aged Brie", sellIn: 0, quality: 2 },
      { name: 'Aged Brie', sellIn: -3, quality: 4 },
      { name: "Elixir of the Mongoose", sellIn: 3, quality: 5 },
      { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
      { name: "Sulfuras, Hand of Ragnaros", sellIn: 3, quality: 80 },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 13,
        quality: 22,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 4,
        quality: 45,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 3,
        quality: 50,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 3,
        quality: 46,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: -1,
        quality: 0,
      },
      { name: "Conjured Mana Cake", sellIn: 1, quality: 4 },
    ];

    expect(result).toEqual(expected)
  })
});

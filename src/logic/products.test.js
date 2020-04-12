import { changeProductsOrder } from './products';


describe('products', () => {
  describe('changeProductsOrder', () => {

    let products;

    beforeEach(() => {
      products = [
        {
          id: 1,
          nome: 'Playstation 4',
          quantidade: 10,
          valorUnitario: 2000
        },
        {
          id: 2,
          nome: 'Xbox One',
          quantidade: 10,
          valorUnitario: 1500
        },
        {
          id: 3,
          nome: 'Nintendo Switch',
          quantidade: 5,
          valorUnitario: 1800
        },
        {
          id: 4,
          nome: 'Playstation 5',
          quantidade: 5,
          valorUnitario: 5000
        }
      ];
    });

    test("should move product forward", () => {
      let productAtFirstPosition = products[0];
      let productAtThirdPosition = products[2];

      let productsWithNewOrder = changeProductsOrder(productAtFirstPosition, productAtThirdPosition, products);
      expect(productsWithNewOrder.map((product) => product.id)).toEqual([2, 3, 1, 4]);
    });

    test("should move product backward", () => {
      let productAtSecondPosition = products[1];
      let productAtThirdPosition = products[2];

      let productsWithNewOrder = changeProductsOrder(productAtThirdPosition, productAtSecondPosition, products);
      expect(productsWithNewOrder.map((product) => product.id)).toEqual([1, 3, 2, 4]);
    });

    test("should not move product to same place", () => {
      let productAtThirdPosition = products[2];

      let productsWithNewOrder = changeProductsOrder(productAtThirdPosition, productAtThirdPosition, products);
      expect(productsWithNewOrder.map((product) => product.id)).toEqual([1, 2, 3, 4]);
    });

    test("should move first product to last position", () => {
      let productAtFirstPosition = products[0];
      let productAtLastPosition = products[3];

      let productsWithNewOrder = changeProductsOrder(productAtFirstPosition, productAtLastPosition, products);
      expect(productsWithNewOrder.map((product) => product.id)).toEqual([2, 3, 4, 1]);
    });

    test("should move last product to first position", () => {
      let productAtFirstPosition = products[0];
      let productAtLastPosition = products[3];

      let productsWithNewOrder = changeProductsOrder(productAtLastPosition, productAtFirstPosition, products);
      expect(productsWithNewOrder.map((product) => product.id)).toEqual([4, 1, 2, 3]);
    });
  });
});

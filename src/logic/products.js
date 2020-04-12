export const changeProductsOrder = (productOne, productTwo, products) => {
  let productsWithoutProductOne = products.filter((product) => product.id != productOne.id);
  let productOnePosition = products.findIndex((product) => product.id == productOne.id);
  let productTwoPosition = productsWithoutProductOne.findIndex((product) => product.id == productTwo.id);

  if (productOnePosition < productTwoPosition) {
    productsWithoutProductOne.splice(productTwoPosition + 1, 0, productOne);
  } else {
    productsWithoutProductOne.splice(productTwoPosition, 0, productOne);
  }

  return productsWithoutProductOne;
};

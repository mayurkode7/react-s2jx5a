export const currencyFormatter = (currencyType) => {
  return new Intl.NumberFormat(undefined, {
    currency: currencyType,
    style: 'currency',
    minimumFractionDigits: 0,
  });
};

// export const currencyFormatter = new Intl.NumberFormat(undefined, {
//   currency: 'inr',
//   style: 'currency',
//   minimumFractionDigits: 0,
// });

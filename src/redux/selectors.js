export const canExchange = (state) => {
  const { baseAmount, baseCcy } = state.currencies;
  const pocketAmounts = state.pockets.amounts;
  return pocketAmounts[baseCcy] >= parseFloat(baseAmount) && baseAmount > 0;
};

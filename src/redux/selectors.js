export const canExchange = (state) => {
  const { notionalAmount, baseCcy, termsCcy, rate } = state.currencies;
  const pocketAmounts = state.pockets.amounts;
  return pocketAmounts[baseCcy] >= notionalAmount;
};

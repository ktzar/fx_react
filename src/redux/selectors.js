export const canExchange = (state) => {
  const { notionalAmount, baseCcy } = state.currencies;
  const pocketAmounts = state.pockets.amounts;
  return pocketAmounts[baseCcy] >= notionalAmount;
};

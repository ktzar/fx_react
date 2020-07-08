import numeral from "numeral";

export const inputToAmount = (value) => {
  if (value === "") {
    return "0";
  }
  const dotPosition = value.indexOf(".");
  if (value.split(".").length > 2) {
    return value.substr(0, dotPosition + 1);
  }
  if (value.charAt(value.length - 1) === ".") {
    return value;
  }
  const precision = Math.min(
    2,
    dotPosition !== -1 ? value.length - dotPosition - 1 : 0
  );
  return Math.min(9999999, parseFloat(value)).toFixed(precision);
};

export const formatAmount = (amount) => numeral(amount).format("0,0.00");
export const formatRate = (amount) => numeral(amount).format("0.0000");

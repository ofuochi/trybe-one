import moment from "moment";

export const pastelColour = (str: string) => {
  //TODO: adjust base colour values below based on theme
  const baseRed = 128;
  const baseGreen = 128;
  const baseBlue = 128;

  //lazy seeded random hack to get values from 0 - 256
  //for seed just take bitwise XOR of first two chars
  let seed = str.charCodeAt(0) ^ str.charCodeAt(1);
  const rand_1 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_2 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_3 = Math.abs(Math.sin(seed++) * 10000) % 256;

  //build colour
  const r = Math.round((rand_1 + baseRed) / 2);
  const g = Math.round((rand_2 + baseGreen) / 2);
  const b = Math.round((rand_3 + baseBlue) / 2);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
export const percentageCompletion = ({
  txndate,
  targetPeriod,
  savingsFrequencyID,
}: API.GetTargetSavingsResponseDto) => {
  const start = moment(txndate);
  // const end = moment(maturitydate);
  const current = moment(new Date());

  let totalDuration = Number(targetPeriod),
    currentDuration = current.diff(start, "days");

  if (savingsFrequencyID === 1) {
    // Daily
    // totalDuration = end.diff(start, "days");
    // currentDuration = current.diff(start, "days");
  } else if (savingsFrequencyID === 2) {
    // Weekly
    // totalDuration = end.diff(start, "weeks");
    // currentDuration = current.diff(start, "weeks");
  } else {
    // Monthly
    // totalDuration = end.diff(start, "months");
    // currentDuration = current.diff(start, "months");
    // console.log(startdate, maturitydate, savingsFrequencyID);
  }
  const result = currentDuration / totalDuration;
  // console.log(currentDuration, totalDuration);
  return result;
};

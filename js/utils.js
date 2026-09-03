// js/utils.js — shared helpers for R Nets
export function eqnformat(id) {
  if (window.MathJax && MathJax.Hub) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
}

export function rndgen(lower, upper, dp, step, fix) {
  step = step * Math.pow(10, dp);
  if (fix === -1) {
    let tmp;
    do {
      tmp =
        Math.floor(
          Math.random() *
            ((upper * Math.pow(10, dp)) / step - (lower * Math.pow(10, dp)) / step + 1) +
            (lower * Math.pow(10, dp)) / step
        ) /
        Math.pow(10, dp);
      tmp = tmp * step;
    } while (countDecimals(tmp) > dp);
    return tmp;
  }
  let temp;
  do {
    temp =
      Math.floor(
        Math.random() *
          ((upper * Math.pow(10, dp)) / step - (lower * Math.pow(10, dp)) / step + 1) +
          (lower * Math.pow(10, dp)) / step
      ) / Math.pow(10, dp);
    temp = temp * step;
    temp = (Math.round(temp * Math.pow(10, dp)) / Math.pow(10, dp)).toFixed(fix);
  } while (countDecimals(temp) > dp);
  return temp;
}

export function countDecimals(value) {
  if (Math.floor(value) === value) return 0;
  const s = value.toString();
  if (s.indexOf('.') !== -1 && s.indexOf('e-') === -1) {
    return s.split('.')[1].length;
  }
  if (s.indexOf('e-') !== -1) {
    const parts = s.split('e-');
    return parseInt(parts[1], 10) + (parts[0].split('.')[1] || '').length;
  }
  return 0;
}

export function dp(value, places, fix) {
  if (fix === -1) {
    return Math.round(value * Math.pow(10, places)) / Math.pow(10, places);
  }
  return (Math.round(value * Math.pow(10, places)) / Math.pow(10, places)).toFixed(fix);
}

/** Gen R: 5–95 step 5, or 100–990 step 10, or 1000–9900 step 100 */
export function rgen() {
  const sel1 = rndgen(1, 3, 0, 1, -1);
  if (sel1 === 1) return rndgen(5, 95, 0, 5, -1);
  if (sel1 === 2) return rndgen(100, 990, 0, 10, -1);
  return rndgen(1000, 9900, 0, 100, -1);
}

/**
 * Format resistance / current / voltage / power for display and MathJax.
 * Returns [value2dp, valueFixed2dp, engNotMathJax, unitStr, calcValue]
 */
export function irvformat(value, unit) {
  let valuefix, engnot, calc;
  if (value < 1) {
    valuefix = dp(value * 1000, 4, 2);
    value = dp(value * 1000, 2, -1);
    engnot = '\\times10^{-3}';
    if (unit === 'r') unit = 'm\u03A9';
    else if (unit === 'i') unit = 'mA';
    else if (unit === 'v') unit = 'mV';
    else if (unit === 'p') unit = 'mW';
    calc = value / 1000;
  } else if (value >= 1000) {
    valuefix = dp(value / 1000, 4, 2);
    value = dp(value / 1000, 2, -1);
    engnot = '\\times10^3';
    if (unit === 'r') unit = 'k\u03A9';
    else if (unit === 'i') unit = 'kA';
    else if (unit === 'v') unit = 'kV';
    else if (unit === 'p') unit = 'kW';
    calc = value * 1000;
  } else {
    valuefix = dp(value, 4, 2);
    value = dp(value, 2, -1);
    engnot = '';
    if (unit === 'r') unit = '\u03A9';
    else if (unit === 'i') unit = 'A';
    else if (unit === 'v') unit = 'V';
    else if (unit === 'p') unit = 'W';
    calc = value;
  }
  return [value, valuefix, engnot, unit, calc];
}

export function QLimitRepeats(arr, x) {
  let sum;
  do {
    sum = rndgen(1, x, 0, 1, -1);
  } while (arr.includes(sum));
  arr.push(sum);
  if (arr.length > Math.ceil(x / 2)) arr.shift();
  return arr;
}

export function removeLeadbr(txt) {
  if (!txt) return '';
  while (txt.indexOf('<br>') === 0) txt = txt.slice(4);
  while (txt.indexOf('<BR>') === 0) txt = txt.slice(4);
  return txt;
}

/** Preloaded Image objects keyed by logical id */
export const images = {};

const imageSources = {
  '3rseries': 'images/3R Series.png',
  '3rparallel': 'images/3R Parallel.png',
  '3rseriescalc': 'images/3R Seriescalc.png',
  '3rparallelcalc': 'images/3R Parallelcalc.png',
  '3rcombo1': 'images/3R Combo.png',
  '4rcomboa': 'images/4R ComboI.png',
  '4rcombob': 'images/4R ComboII.png',
  '5rcomboa': 'images/5R ComboI.png',
  '6rcomboa': 'images/6R ComboI.png',
  '6rcombob': 'images/6R ComboII.png'
};

export function loadImages() {
  const entries = Object.entries(imageSources);
  return Promise.all(
    entries.map(
      ([key, src]) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            images[key] = img;
            resolve();
          };
          img.onerror = () => reject(new Error('Failed to load ' + src));
          img.src = encodeURI(src);
        })
    )
  );
}

export function isCanvasBlank(canvas) {
  return !canvas
    .getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height)
    .data.some((channel) => channel !== 0);
}

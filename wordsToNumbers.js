/***
 * Takes in input as a word e.g "three hundred thousand six hundred"
 * And converts it to a number e.g 300600
 * If input is not string will throw error
 * If input is not a correct string will output -1 */
const convertToNumber = (word, { b, c, z, df, sp } = {
    b: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thir!', '4!', 'fif!', '6!', '7!', 'eigh!', '9!']
        .map((_, __, $) => _.replace(/!|[4679]/g, r => $[r] ?? 'teen')),
    c: { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 },
    z: { sept$: 24, sext$: 21, quint$: 18, quadr$: 15, tr$: 12, b$: 9, m$: 6, thousand: 3, hundred: 2, o: 0 },
    df: (x, y, i) => i !== 0 && (Math.abs(`${x}`.length - `${y}`.length) > 1 || x === 1000),
    sp: word.toLowerCase().split(/-|\s+and\s+|\s+/gi)
}) => Object.keys(z).reduce((acc, k) => acc + sp
    .splice(0, !z[k] ? sp.length : sp.indexOf(k.replace(/\$/, 'illion')) + 1)
    .map(w => !b.includes(w) ? c[w] || 10 ** z[w.replace(/illion$/, '$')] : b.indexOf(w))
    .reduce((ac, n, i, arr) => df(n, arr[i - 1], i) ? ac * n : ac + n, 0), 0, '') || -1;

const examples = [
    ["twenty two", 22],
    ["twenty", 20],
    ["one hundred and forty two", 142],
    ["one hundred and eleven", 111],
    ["three thousand five hundred", 3_500],
    ["three thousand five hundred and seventy two", 3_572],
    ["three thousand five hundred and fourteen", 3_514],
    ["three hundred thousand six hundred", 300_600],
    ["three hundred thousand six hundred and eleven", 300_611],
    ["three hundred eleven thousand six hundred and twenty-two", 311_622],
    ["five hundred million three hundred thousand and twenty", 500_300_020],
    ["five hundred forty two million three hundred thousand and twenty", 542_300_020],
    ["five hundred million three hundred thirty two thousand one hundred twenty", 500_332_120],
    ["ninety-four trillion eight hundred thirty billion three hundred eighty-four million thirty-two thousand nine hundred eighty-two", 94_830_384_032_982],
    ["ninety-four quintillion eight hundred thirty quadrillion three hundred eighty-four trillion thirty-two billion nine hundred eighty-two million two hundred thirty-five thousand two hundred thirty-four", 94_830_384_032_982_235_234],
    ["five hundred ninety-seven sextillion four hundred thirty-eight quintillion forty-five quadrillion eight hundred forty trillion three hundred eighty-three billion two hundred forty-five million one hundred twenty-three thousand four hundred forty-three", 597_438_045_840_383_245_123_443]
]

examples.forEach(ex => {
    console.assert(convertToNumber(ex[0]) === ex[1]);
});
const examples = [
    "twenty two", // 22
    "twenty", // 20
    "one hundred and forty two", // 142
    "one hundred and eleven", // 111
    "three thousand five hundred", // 3,500
    "three thousand five hundred and seventy two", // 3,572
    "three thousand five hundred and ten", // 3,510
    "three hundred thousand six hundred", // 300,600
    "three hundred thousand six hundred and eleven", // 300,611
    "three hundred eleven thousand six hundred and twenty-two", // 311,622
    "five hundred million three hundred thousand and twenty", // 500,300,020
    "five hundred forty two million three hundred thousand and twenty", // 542,300,020
    "five hundred million three hundred thirty two thousand one hundred twenty", // 500,332,120
]

const convertToNumber = word => {
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const b = a.concat(['ten', 'eleven', 'twelve', 'thir$', 'four$', 'fif$', 'six$', 'seven$', 'eigh$', 'nine$']
        .map(x => x.replace("$", "teen")));
    const c = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
    const z = { billion: 9, million: 6, thousand: 3, hundred: 2, o: 1 };

    const split = word.toLowerCase().split(/[ -]/g).filter(w => w != 'and');
    return Object.keys(z).reduce((a, k) => a + split
        .splice(0, k === 'o' ? split.length : split.indexOf(k) + 1)
        .map(w => b.indexOf(w) === -1 ? c[w] ?? 10 ** z[w] : b.indexOf(w))
        .reduce((ac, n, i, arr) => i === 0
            ? n : Math.abs(`${n}`.length - `${arr[i - 1]}`.length) > 1 || n === 1000
                ? ac * n : ac + n, 0), 0)
}

examples.forEach(n => console.log(convertToNumber(n)))
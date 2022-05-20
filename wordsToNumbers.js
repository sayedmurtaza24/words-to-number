const convertToNumber = word => {
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const b = a.concat(['ten', 'eleven', 'twelve', 'thir$', 'four$', 'fif$', 'six$', 'seven$', 'eigh$', 'nine$']
        .map(x => x.replace("$", "teen")));
    const c = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
    const z = { quintillion: 18, quadrillion: 15, trillion: 12, billion: 9, million: 6, thousand: 3, hundred: 2, o: 1 };

    const split = word.toLowerCase().split(/[ -]/g).filter(w => w != 'and');
    return Object.keys(z).reduce((a, k) => a + split
        .splice(0, k === 'o' ? split.length : split.indexOf(k) + 1)
        .map(w => b.indexOf(w) === -1 ? c[w] ?? 10 ** z[w] : b.indexOf(w))
        .reduce((ac, n, i, arr) => i === 0
            ? n : Math.abs(`${n}`.length - `${arr[i - 1]}`.length) > 1 || n === 1000
                ? ac * n : ac + n, 0), 0)
}

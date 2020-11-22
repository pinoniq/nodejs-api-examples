const cache = [];
const makeItSlow = true;

const doStuff = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fibonacci = async (num) => {
    if (makeItSlow) {
        await doStuff(50);
    }
    if (num <= 1) return 1;

    if (!cache[num]) {
        cache[num] = await fibonacci(num - 1) + await fibonacci(num - 2);
    }

    return cache[num];
}

let start = Date.now();

fibonacci(20).then((r) => console.log(`Time elapsed: ${Date.now() - start} ms`));

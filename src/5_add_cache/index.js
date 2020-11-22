const makeItSlow = true;

const doStuff = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fibonacci = async (num) => {
    if (makeItSlow) {
        await doStuff(50);
    }
    if (num <= 1) return 1;

    return await fibonacci(num - 1) + await fibonacci(num - 2);
}

let start = Date.now();
fibonacci(20)
    .then((r) => console.log(`Time elapsed: ${Date.now() - start} ms`))
    .then(() => {
        start = Date.now();
        fibonacci(20).then((r) => console.log(`Time elapsed: ${Date.now() - start} ms`))
    })
;


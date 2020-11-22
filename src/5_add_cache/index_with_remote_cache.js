const redis = require("redis");
const client = redis.createClient(8888);

client.on("error", function(error) {
    console.error(error);
});

const makeItSlow = true;

const doStuff = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getAsync = (key) => new Promise((resolve, reject) => {
    client.get(key, (error, data) => error ? reject(data) : resolve(data));
});

const fibonacci = async (num) => {
    if (makeItSlow) {
        await doStuff(50);
    }
    if (num <= 1) return 1;

    let cachedValue = await getAsync(`fib_${num}`);

    if (!cachedValue) {
        cachedValue = await fibonacci(num - 1) + await fibonacci(num - 2);
        client.setex(`fib_${num}`, 3600, cachedValue);
    }

    return cachedValue;
}

let start = Date.now();
fibonacci(20)
    .then((r) => console.log(`Time elapsed: ${Date.now() - start} ms`))
    .then(() => {
        start = Date.now();
        fibonacci(20)
            .then((r) => console.log(`Time elapsed: ${Date.now() - start} ms`))
            .then(() => client.end())
            .then(() => process.exit())
    })
;
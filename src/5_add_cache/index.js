const fibonacci = (num) => {
    if (num <= 1) return 1;

    return fibonacci(num - 1) + fibonacci(num - 2);
}

let start = Date.now();
console.log(fibonacci(5));
console.log(`Time elapsed: ${Date.now() - start} ms`);

console.log(fibonacci(50));
console.log(`Time elapsed: ${Date.now() - start} ms`);

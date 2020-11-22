/**
 * A small example on how I/O is handled in the eventloop
 *
 * Stolen from:
 * @see https://medium.com/better-programming/is-node-js-really-single-threaded-7ea59bcc8d64
 */
const crypto = require("crypto");
const start = Date.now();

function logHashTime(i) {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        console.log(`Time elapsed (${i}): ${Date.now() - start} ms`);
    });
}

logHashTime(1);
logHashTime(2);
logHashTime(3);
logHashTime(4);
console.log(`Time elapsed: ${Date.now() - start} ms`);
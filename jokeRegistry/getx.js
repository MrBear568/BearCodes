// getx.js
const fetch = require('node-fetch');
let registryUrl = 'https://krdo-joke-registry.herokuapp.com/api/services';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function main(url) {
    try {
        let respons = await get(url);
        console.log(respons);
        console.log(respons.length);
    } catch (fejl) {
        console.log(fejl);
    }
}
main(registryUrl);
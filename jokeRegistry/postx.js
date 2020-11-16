// postx.js
const fetch = require('node-fetch');
let registryUrl = 'https://krdo-joke-registry.herokuapp.com/api/services';

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 200) // OK
    // if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.json();
}

async function main(url) {
    try {
        let respons = await post(url,
            {
                "name": "Test",
                "address": "http://test.dk",
                "secret": "secret password",
            }
        );
        console.log(respons);
    } catch (fejl) {
        console.log(fejl);
    }
    process.exit();
}
main(registryUrl);
const fs = require('fs');
const docx = require("@nativedocuments/docx-wasm");

// init docx engine
docx.init({
    // ND_DEV_ID: "XXXXXXXXXXXXXXXXXXXXXXXXXX",    // goto https://developers.nativedocuments.com/ to get a dev-id/dev-secret
    // ND_DEV_SECRET: "YYYYYYYYYYYYYYYYYYYYYYYYYY", // you can also set the credentials in the enviroment variables
    ENVIRONMENT: "NODE", // required
    LAZY_INIT: true      // if set to false the WASM engine will be initialized right now, usefull pre-caching (like e.g. for AWS lambda)
}).catch( function(e) {
    console.error(e);
});

async function convertHelper(document, exportFct) {
    const api = await docx.engine();
    await api.load(document);
    const arrayBuffer = await api[exportFct]();
    await api.close();
    return arrayBuffer;
}

convertHelper("sample.docx", "exportPDF").then((arrayBuffer) => {
    fs.writeFileSync("sample.pdf", new Uint8Array(arrayBuffer));
}).catch((e) => {
    console.error(e);
});
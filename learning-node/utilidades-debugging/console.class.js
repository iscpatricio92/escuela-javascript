const consoleFile = new console.Console(out, err);

consoleFile.meliodas = (msg = '') => {
    console.log('\x1b[31m', `🐉 Full Counter! ${msg}`)
};

consoleFile.escanor = (msg = '') => {
    console.log('\x1b[33m', `🦁 Sunshine! ${msg}`)
};

consoleFile.ban = (msg = '') => {
    console.log('\x1b[37m', `🦊 Physical Hunt! ${msg}`)
};

consoleFile.king = (msg = '') => {
    console.log('\x1b[34m', `🐻 Status Promotion! ${msg}`)
};

consoleFile.diane = (msg = '') => {
    console.log('\x1b[33m', `🐍 Mother Catastrophe! ${msg}`)
};

consoleFile.gowther = (msg = '') => {
    console.log('\x1b[35m', `🐏 Lost World! ${msg}`)
};

consoleFile.merlin = (msg = '') => {
    console.log('\x1b[35m', `🐗 Enchant Infinity! ${msg}`)
};

consoleFile.meliodas();
consoleFile.escanor();
consoleFile.ban();
consoleFile.king();
consoleFile.diane();
consoleFile.gowther();
consoleFile.merlin();
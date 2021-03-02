const os = require("os");

// Informacion sobre cada nucleo logico de la CPU
console.log("CPU Info:", os.cpus());

// Dirrecion IP que se encuantra trabajando nuestra maquina
console.log(
  "IP address",
  os.networkInterfaces().wifi0.map((i) => i.address)
);

// Memoria libre de nuestro sistema
console.log("Free memory", os.freemem());

// Tipo de sistema operativo tenemos
console.log("Type", os.type());

// Version del sistema operativo
console.log("50 version", os.release());

// Informacion del usuario
console.log("User info", os.userInfo());
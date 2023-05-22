"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importa el Emailmanager
var Emailmanager_1 = require("../class/Emailmanager");
//creame el emailmanager y crea dos usuarios
var emailManager = new Emailmanager_1.EmailManager([]);
fetch(".../api2.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    console.log(data);
    console.log(data.nombre);
    console.log(data.edad);
});
//console.log(Getjson(emailManager))
//crear usuario
/*emailManager.enviarCorreo("pepe@gmail.com", ["usuario2@gmail.com","usuario1@gmail.com"],"hola","chau");

console.log(emailManager.usuarios);*/ 

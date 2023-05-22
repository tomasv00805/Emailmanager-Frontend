"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crearjson = exports.Getjson = void 0;
var fs = require("fs");
//creame un get json
function Getjson(EmailManager) {
    var rawdata = fs.readFileSync('api2.json');
    console.log(JSON.parse(rawdata.toString()));
    // modificame el emailmanager
    EmailManager.setUsuarios(JSON.parse(rawdata.toString()));
    return EmailManager;
}
exports.Getjson = Getjson;
function Crearjson(EmailManager) {
    var jsonArray = JSON.stringify(EmailManager.getUsuarios());
    fs.writeFile('api2.json', jsonArray, function (error) {
        if (error) {
            console.error('Error al guardar el archivo:', error);
            return;
        }
        console.log('El archivo se ha guardado correctamente.');
    });
}
exports.Crearjson = Crearjson;

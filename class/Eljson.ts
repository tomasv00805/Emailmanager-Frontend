import * as fs from 'fs';
import { EmailManager } from "../class/Emailmanager";

//creame un get json


export function Getjson(EmailManager: EmailManager) {
    const rawdata = fs.readFileSync('api2.json');
    console.log(JSON.parse(rawdata.toString()));
    // modificame el emailmanager
    EmailManager.setUsuarios(JSON.parse(rawdata.toString()));
    return EmailManager;
}

export function Crearjson(EmailManager : EmailManager) {
    const jsonArray = JSON.stringify(EmailManager.getUsuarios());

    fs.writeFile('api2.json', jsonArray, (error) => {
        if (error) {
        console.error('Error al guardar el archivo:', error);
        return;
    }
    console.log('El archivo se ha guardado correctamente.');
    });
}

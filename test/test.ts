//importa el Emailmanager
import { EmailManager } from "../class/Emailmanager";
import {Getjson} from "../class/Eljson";
//creame el emailmanager y crea dos usuarios

let emailManager = new EmailManager([]);

fetch("../api2.json")
  .then(response => response.json())
  .then(data => {

    console.log(data);


    console.log(data.nombre);
    console.log(data.edad);
  
})


//console.log(Getjson(emailManager))


//crear usuario
/*emailManager.enviarCorreo("pepe@gmail.com", ["usuario2@gmail.com","usuario1@gmail.com"],"hola","chau");

console.log(emailManager.usuarios);*/
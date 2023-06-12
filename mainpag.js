const correo = document.getElementById('correos');
const fragment = document.createDocumentFragment();
const correoseleccionado = document.getElementById('correo_seleccionado');
const nombredeusuario = document.getElementById('nombreusermain');
const templateCorreoseleccionado = document.getElementById('template_correoseleccionado');
const loginForm = document.getElementById('login-form');
const botonsalir = document.getElementById('botonsalir');
const botonfiltrar = document.getElementById('botonfiltrar');
let username = document.getElementById('username')
let password = document.getElementById('password')
const principiolink = ("https://emailmanager-backend.vercel.app/")
const principiolinkfront=("https://emailmanager-frontend-phi.vercel.app/")
//const principiolinkfront=("https://emailmanager-frontend.vercel.app/")
import { Singleton } from './class/singleton.js';
let singleton = new Singleton();
let coleccion = singleton.getCollection();
let iterador = coleccion.getIterator();

function guardarenfavoritos(id){
  console.log("MAMA ACA ESTOY");
  const savedUsername = localStorage.getItem('username');
  //constante que guarda el id del correo que sea de tipo int y no string
  const idint = parseInt(id);
  fetch(principiolink+"favorite/"+savedUsername, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailId: idint
    })
  })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error);
      }else{
        alert('Correo agregado a favoritos');
      }
    })
}
function eliminardefavoritos(id){
  console.log("MAMA ACA ESTOY");
  const savedUsername = localStorage.getItem('username');
  const idint = parseInt(id);
  fetch(principiolink+"favorite/"+savedUsername, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailId: idint
    })
  })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error);
      }else{
        alert('Correo eliminado de favoritos');
      }
    })
}

//funcion que pinte los correos en la pagina de favoritos
const pintarCorreosfavoritos = data => { 
  console.log(data);
  const templateCorreo = document.getElementById('template-correo').content;
  data.forEach(correo => {
    //se cargan los datos del correo en el template
    templateCorreo.querySelector(".remitente").textContent = correo.from + correo.to;
    templateCorreo.querySelector(".Asunto").textContent = correo.subject;
    //que solo se muestren 15 palabras
    templateCorreo.querySelector(".cuerpo").textContent = correo.body.split(" ").slice(0, 20).join(" ");
    //se guarda el id del correo en el boton de clase botonfavoritos
    templateCorreo.querySelector(".botoneliminar").dataset.id = correo.id;
    //se clona el template para unir todas sus partes
    const clone = templateCorreo.cloneNode(true);
    //se agrega el clone al fragment
    fragment.appendChild(clone);
  });
  //cargo el fragment en el div donde van a estar los correos
  correo.appendChild(fragment);
}
//verceeeeel
const pintarCorreosrecividos = data => {
  const templateCorreo = document.getElementById('template-correo').content;
  coleccion.setitems(data);
  iterador.rewind();
  while(iterador.valid()){
    const correo = iterador.next();
    //se cargan los datos del correo en el template
    templateCorreo.querySelector(".remitente").textContent = correo.from;
    templateCorreo.querySelector(".Asunto").textContent = correo.subject;
    //que solo se muestren 15 palabras
    templateCorreo.querySelector(".cuerpo").textContent = correo.body.split(" ").slice(0, 20).join(" ");
    //se guarda el id del correo en el boton de clase botonfavoritos
    templateCorreo.querySelector(".BotondeFavoritos").dataset.id = correo.id;
    //se clona el template para unir todas sus partes
    const clone = templateCorreo.cloneNode(true);
    //se agrega el clone al fragment
    fragment.appendChild(clone);
  }
  //antes de usar patron de diseño
  /*data.forEach(correo => {
    //se cargan los datos del correo en el template
    templateCorreo.querySelector(".remitente").textContent = correo.from;
    templateCorreo.querySelector(".Asunto").textContent = correo.subject;
    //que solo se muestren 15 palabras
    templateCorreo.querySelector(".cuerpo").textContent = correo.body.split(" ").slice(0, 20).join(" ");
    //se guarda el id del correo en el boton de clase botonfavoritos
    templateCorreo.querySelector(".botonfavoritos").dataset.id = correo.id;//aca te quedaste boludo
    //se clona el template para unir todas sus partes
    const clone = templateCorreo.cloneNode(true);
    //se agrega el clone al fragment
    fragment.appendChild(clone);
  });*/
  //cargo el fragment en el div donde van a estar los correos
  correo.appendChild(fragment);
};
const pintarCorreosenviados = data => {
  const templateCorreo = document.getElementById('template-correo').content;
  data.forEach(correo => {
    //se cargan los datos del correo en el template
    templateCorreo.querySelector(".remitente").textContent = correo.to;
    templateCorreo.querySelector(".Asunto").textContent = correo.subject;
    //que solo se muestren 15 palabras
    templateCorreo.querySelector(".cuerpo").textContent = correo.body.split(" ").slice(0, 20).join(" ");
    //se guarda el id del correo en el boton de clase botonfavoritos
    templateCorreo.querySelector(".BotondeFavoritos").dataset.id = correo.id;
    //se clona el template para unir todas sus partes
    const clone = templateCorreo.cloneNode(true);
    //se agrega el clone al fragment
    fragment.appendChild(clone);
  });
  //cargo el fragment en el div donde van a estar los correos
  correo.appendChild(fragment);
};
//funcion que redirecciona para obtener los correos dependiendo del usuario
function handleRoutes(){
  const savedUsername = localStorage.getItem('username');
  const path = window.location.pathname;
  if(path === '/webs/main.html'){
    fetch(principiolink+"inbox/" + savedUsername)
      .then(res => res.json())
      .then(data => {
         pintarCorreosrecividos(data);
      });
      //funcion para mostrar el correo seleccionado al hacer click en un correo
      correo.addEventListener('click', (e) => {
        if(e.target.classList.contains('remitente')){
        e.preventDefault();
        const savedUsername = localStorage.getItem('username');
        const id = e.target.parentElement.querySelector(".BotondeFavoritos").dataset.id;
        fetch(principiolink +"inbox/" + savedUsername)
          .then(res => res.json())
          .then(data => {
            data.forEach(correo => {
              if(id == correo.id){
                templateCorreoseleccionado.querySelector(".nombrecorreo").textContent = correo.from;
                templateCorreoseleccionado.querySelector(".asuntocorreo").textContent = correo.subject;
                templateCorreoseleccionado.querySelector(".cuerpocorreo").textContent = correo.body;
                templateCorreoseleccionado.classList.remove("hidden");
                formulario_correo.classList.add("hidden");
              }
            });
          });
        }
        if(e.target.classList.contains('BotondeFavoritos')){
          e.preventDefault();
          const savedUsername = localStorage.getItem('username');
          const id = e.target.parentElement.querySelector(".BotondeFavoritos").dataset.id;
          console.log(id);
          guardarenfavoritos(id);
          }
    }
      );
      //Aca lo que hacemos es filtrar los correos que se muestran en pantalla dependiendo del filtro y el campo que se elija 
      
      botonfiltrar.addEventListener('click', (e) => {
        e.preventDefault();
        const filtro = document.getElementById('filtro').value;
        const campo = document.getElementById('campo').value;
        const savedUsername = localStorage.getItem('username');
        fetch(principiolink+"inbox/" + savedUsername)
          .then(res => res.json())
          .then(data => {
            let listafiltrada = filtrar(campo, filtro, data);
            //transfomrame el listafiltrada en un json
            listafiltrada = JSON.stringify(listafiltrada);
            listafiltrada = JSON.parse(listafiltrada);
            correo.innerHTML = `
            <template id="template-correo">
                    <div class="correo p-4 bg-[#303030] hover:bg-[#404040]">
                        <div class="font-bold text-gray-300 remitente">Remitente</div>
                        <div class="text-lg text-gray-300 font-bold mt-1 Asunto">Título del correo</div>
                        <div class="text-gray-400 mt-2 pb-2 cuerpo">Texto del correo</div>
                        <button class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 mt-2 BotondeFavoritos">fav</button>
                    </div>   
                </template>
            `;
            console.log(listafiltrada);
            pintarCorreosrecividos(listafiltrada);
          });
      }
      );
    //funcion para agregar un correo a favoritos cuando se hace click en el boton con la clase botonfavoritos   

  }
  if(path === '/webs/sent.html'){
    fetch(principiolink+"sent/" + savedUsername)
      .then(res => res.json())
      .then(data => {
        pintarCorreosenviados(data);
      }
      );
      correo.addEventListener('click', (e) => {
        if(e.target.classList.contains('remitente')){
        e.preventDefault();
        const savedUsername = localStorage.getItem('username');
        const id = e.target.parentElement.querySelector(".BotondeFavoritos").dataset.id;
        console.log(id);
        fetch(principiolink+"sent/" + savedUsername)
          .then(res => res.json())
          .then(data => {
            data.forEach(correo => {
              if(correo.id == id){
                templateCorreoseleccionado.querySelector(".nombrecorreo").textContent = correo.to;
                templateCorreoseleccionado.querySelector(".asuntocorreo").textContent = correo.subject;
                templateCorreoseleccionado.querySelector(".cuerpocorreo").textContent = correo.body;
                templateCorreoseleccionado.classList.remove("hidden");
                formulario_correo.classList.add("hidden");
              }

            });
          });
       }
       if(e.target.classList.contains('BotondeFavoritos')){
        e.preventDefault();
        const savedUsername = localStorage.getItem('username');
        const id = e.target.parentElement.querySelector(".BotondeFavoritos").dataset.id;
        console.log(id);
        guardarenfavoritos(id);
        }
      }
      );
      botonfiltrar.addEventListener('click', (e) => {
        e.preventDefault();
        const filtro = document.getElementById('filtro').value;
        const campo = document.getElementById('campo').value;
        const savedUsername = localStorage.getItem('username');
        fetch(principiolink+"sent/" + savedUsername)
        .then(res => res.json())
          .then(data => {
            let listafiltrada = filtrar(campo, filtro, data);
            //transfomrame el listafiltrada en un json
            listafiltrada = JSON.stringify(listafiltrada);
            listafiltrada = JSON.parse(listafiltrada);
            correo.innerHTML = `
            <template id="template-correo">
                    <div class="correo p-4 bg-[#303030] hover:bg-[#404040]">
                        <div class="font-bold text-gray-300 remitente">Remitente</div>
                        <div class="text-lg text-gray-300 font-bold mt-1 Asunto">Título del correo</div>
                        <div class="text-gray-400 mt-2 pb-2 cuerpo">Texto del correo</div>
                        <button class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 mt-2 BotondeFavoritos">fav</button>
                    </div>   
                </template>
            `;
            console.log(listafiltrada);
            pintarCorreosenviados(listafiltrada);
          });
      }
      );
      
  }
  if(path === '/webs/favoritos.html'){
    //aca se pintan los correos favoritos
    fetch(principiolink+"favorite/" + savedUsername)
      .then(res => res.json())
      .then(data => {
        pintarCorreosfavoritos(data);
      }
      );
  }
}
//Cosas que solo se ejecutan en la pagina de main y send y favoritos
if (window.location.pathname === '/webs/main.html' || window.location.pathname === '/webs/sent.html' || window.location.pathname === '/webs/favoritos.html') {
  const savedUsername = localStorage.getItem('username');
  nombredeusuario.textContent = savedUsername;
  botonsalir.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront;
  });

  const botonenviarcorreo = document.getElementById('botonenviarcorreo');
  const formulario_correo = document.getElementById('formulario_correo');
  botonenviarcorreo.addEventListener('click', (e) => {
    e.preventDefault();
    templateCorreoseleccionado.classList.add("hidden");
    formulario_correo.classList.remove("hidden");
  });

  const botonenviar = document.getElementById('botonenviar');
  botonenviar.addEventListener('click', (e) => {
    e.preventDefault();
    const destinatario = document.getElementById('correopara').value;
    const asunto = document.getElementById('correoasunto').value;
    const cuerpo = document.getElementById('correocuerpo').value;
    const savedUsername = localStorage.getItem('username');
    fetch(principiolink+'send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: savedUsername,
        to: destinatario,
        subject: asunto,
        body: cuerpo
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Correo enviado');
          formulario_correo.classList.add("hidden");
        }
      });
  });

  const botonbandejaentrada = document.getElementById('botonbandejaentrada');
  botonbandejaentrada.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront + 'webs/main.html';
  });

  const botonbandejaenviados = document.getElementById('botonbandejaenviados');
  botonbandejaenviados.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront + 'webs/sent.html';
  });

  const botonbandejafavoritos = document.getElementById('botonbandejafavoritos');
  botonbandejafavoritos.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront + 'webs/favoritos.html';
  });

  const botonmenu = document.getElementById('botonmenu');
  const menuopciones = document.getElementById('menuopciones');
  botonmenu.addEventListener('click', (e) => {
    e.preventDefault();
    menuopciones.classList.toggle("hidden");
  });
}


//Cosas que solo se ejecutan en la pagina index.html(login)
if(window.location.pathname === '/'){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(username.value === '' || password.value === ''){
      alert('Por favor, rellene todos los campos');
    }else{
      fetch(principiolink+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.error){
            alert(data.error);
          }else{
            localStorage.setItem('username', username.value);
            window.location.href = principiolinkfront+"webs/main.html";
          }
        })
    }
  })
}


window.addEventListener('DOMContentLoaded', handleRoutes);

//funcion para filtrar los correos dependiendo del campo y el filtro
function filtrar(campo, filtro, data){
  coleccion.setitems(data)
  if(campo === "from"){
    const filterByFrom = singleton.getFilterByFromStrategy();
    filterByFrom.setfilter(filtro);
    const filter = singleton.getEmailFilter();
    filter.setStrategy(filterByFrom);
    coleccion.setitems(filter.filter(coleccion.getItems()))
    iterador.rewind();
    return coleccion.getItems();
  }
  if(campo === "to"){
    const filterByTo = singleton.getFilterByToStrategy();
    filterByTo.setfilter(filtro);
    const filter = singleton.getEmailFilter();
    filter.setStrategy(filterByTo);
    coleccion.setitems(filter.filter(coleccion.getItems()))
    iterador.rewind();
    return coleccion.getItems();
  }
  if(campo === "subject"){
    const filterBySubject = singleton.getFilterBySubjectStrategy();
    filterBySubject.setfilter(filtro);
    const filter = singleton.getEmailFilter();
    filter.setStrategy(filterBySubject);
    coleccion.setitems(filter.filter(coleccion.getItems()))
    iterador.rewind();
    return coleccion.getItems();
  }
  if(campo === "body"){
    const filterByBody = singleton.getFilterByBodyStrategy();
    filterByBody.setfilter(filtro);
    const filter = singleton.getEmailFilter();
    filter.setStrategy(filterByBody);
    coleccion.setitems(filter.filter(coleccion.getItems()))
    iterador.rewind();
    return coleccion.getItems();
  }
}


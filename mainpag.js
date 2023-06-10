const correo = document.getElementById('correos');
const fragment = document.createDocumentFragment();
const correoseleccionado = document.getElementById('correo_seleccionado');
const nombredeusuario = document.getElementById('nombreusermain');
const templateCorreoseleccionado = document.getElementById('template_correoseleccionado');
const loginForm = document.getElementById('login-form');
const botonsalir = document.getElementById('botonsalir');
let username = document.getElementById('username')
let password = document.getElementById('password')
const principiolink = ("https://emailmanager-backend.vercel.app/")
const principiolinkfront=("https://emailmanager-frontend.vercel.app/")


function cambiarColor(botonPresionado) {
  var botones = document.querySelectorAll('.boton-cambio');
  botones.forEach(function(boton) {
    if (boton !== botonPresionado) {
      boton.classList.remove('bg-red-500');
    }
  });
  botonPresionado.classList.toggle('bg-red-500');
}



const pintarCorreosrecividos = data => {
  const templateCorreo = document.getElementById('template-correo').content;
  data.forEach(correo => {
    //se cargan los datos del correo en el template
    templateCorreo.querySelector(".remitente").textContent = correo.from;
    templateCorreo.querySelector(".Asunto").textContent = correo.subject;
    //que solo se muestren 15 palabras
    templateCorreo.querySelector(".cuerpo").textContent = correo.body.split(" ").slice(0, 20).join(" ");
    //se clona el template para unir todas sus partes
    const clone = templateCorreo.cloneNode(true);
    //se agrega el clone al fragment
    fragment.appendChild(clone);
  });
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
        var colection = new Collection();
        colection.setitems(data);
        colection.setfiltro("hola");
        const iterador = colection.getIterator();
        while (iterador.valid()) {
          const correo = iterador.next();
          console.log(correo);
        }
         //pintarCorreosrecividos(data);
      });
      //funcion para mostrar el correo seleccionado al hacer click en un correo
      correo.addEventListener('click', (e) => {
        e.preventDefault();
        const savedUsername = localStorage.getItem('username');
        const destinatario = e.target.parentElement.querySelector(".remitente").textContent;
        const asunto = e.target.parentElement.querySelector(".Asunto").textContent;
        fetch(principiolink +"inbox/" + savedUsername)
          .then(res => res.json())
          .then(data => {
            data.forEach(correo => {
              if(correo.from === destinatario && correo.subject === asunto){
                templateCorreoseleccionado.querySelector(".nombrecorreo").textContent = correo.from;
                templateCorreoseleccionado.querySelector(".asuntocorreo").textContent = correo.subject;
                templateCorreoseleccionado.querySelector(".cuerpocorreo").textContent = correo.body;
                templateCorreoseleccionado.classList.remove("hidden");
                formulario_correo.classList.add("hidden");
              }
            });
          });
      }
      );
  }
  if(path === '/webs/sent.html'){
    fetch(principiolink+"sent/" + savedUsername)
      .then(res => res.json())
      .then(data => {
        pintarCorreosenviados(data);
      }
      );
      correo.addEventListener('click', (e) => {
        e.preventDefault();
        const savedUsername = localStorage.getItem('username');
        const destinatario = e.target.parentElement.querySelector(".remitente").textContent;
        const destinatarioArray = destinatario.split(',');

        console.log(destinatarioArray);
        const asunto = e.target.parentElement.querySelector(".Asunto").textContent;
        fetch(principiolink+"sent/" + savedUsername)
          .then(res => res.json())
          .then(data => {
            data.forEach(correo => {
              console.log(correo.to);
             
              if(destinatarioArray === correo.to && correo.subject === asunto){
                templateCorreoseleccionado.querySelector(".nombrecorreo").textContent = correo.to;
                templateCorreoseleccionado.querySelector(".asuntocorreo").textContent = correo.subject;
                templateCorreoseleccionado.querySelector(".cuerpocorreo").textContent = correo.body;
                templateCorreoseleccionado.classList.remove("hidden");
                formulario_correo.classList.add("hidden");
              }
              
            });
          });
      }
      );
  }
}
//Cosas que solo se ejecutan en la pagina de main y send

if(window.location.pathname === '/webs/main.html' || window.location.pathname === '/webs/sent.html'){
  const savedUsername = localStorage.getItem('username');
  nombredeusuario.textContent = savedUsername;
  botonsalir.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront;
  }
  )
  //funcion para mostrar el formulario_correo cuadno haga clic en el boton con id botonenviarcorreo
  const botonenviarcorreo = document.getElementById('botonenviarcorreo');
  const formulario_correo = document.getElementById('formulario_correo');
  botonenviarcorreo.addEventListener('click', (e) => {
    e.preventDefault();
    templateCorreoseleccionado.classList.add("hidden");
    formulario_correo.classList.remove("hidden");
  }
  )
  //funcion para enviar el correo
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
        if(data.error){
          alert(data.error);
        }else{
          alert('Correo enviado');
          formulario_correo.classList.add("hidden");
        }
      })
  }
  )
  
  
  //al oprimir el boton con la id botonbandejaentrada la pagina se direcciona a la bandeja de entrada
  const botonbandejaentrada = document.getElementById('botonbandejaentrada');
  botonbandejaentrada.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront+'webs/main.html';
  }
  )
  //al oprimir el boton con la id botonbandejaenviados la pagina se direcciona a la bandeja de entrada
  const botonbandejaenviados = document.getElementById('botonbandejaenviados');
  botonbandejaenviados.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = principiolinkfront+'webs/sent.html';
  }
  )
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
            window.location.href = "https://emailmanager-frontend.vercel.app/webs/main.html";
          }
        })
    }
  })
}


window.addEventListener('DOMContentLoaded', handleRoutes);


// Patrones de diceño utilizados ----------------------------------------------------------------------------------------------------------------------------
var Collection = /** @class */ (function () {
    function Collection() {
        this.items = [];
        this.filtro = "";
    }
    Collection.prototype.setItems = function (lista) {
        this.items = lista;
    };
    Collection.prototype.setFiltro = function (filtro) {
        this.filtro = filtro;
    };
    Collection.prototype.getItems = function () {
        return this.items;
    };
    Collection.prototype.getCount = function () {
        return this.items.length;
    };
    Collection.prototype.getIterator = function () {
        return new iterator_1.Iterator(this);
    };
    return Collection;
}());

var Iterator = /** @class */ (function () {
  function Iterator(coleccion) {
      // Guarda la posicion actual
      this.position = 0;
      this.coleccion = coleccion;
      if (this.coleccion.filtro != "") {
          this.filtrar(this.coleccion.getItems(), this.coleccion.filtro);
      }
  }
  Iterator.prototype.rewind = function () {
      this.position = 0;
  };
  Iterator.prototype.current = function () {
      return this.coleccion.getItems()[this.position];
  };
  Iterator.prototype.key = function () {
      return this.position;
  };
  Iterator.prototype.next = function () {
      var item = this.current();
      this.position += 1;
      return item;
  };
  Iterator.prototype.valid = function () {
      return this.position < this.coleccion.getcount();
  };
  Iterator.prototype.filtrar = function (lista, filtro) {
      var nuevalista = [];
      var i = 0;
      while (i <= lista.length) {
          if (lista[i].body.includes(filtro)) {
              nuevalista.push(lista[i]);
          }
          console.log(i);
          i += 1;
      }
      this.coleccion.setitems(nuevalista);
  };
  return Iterator;
}());
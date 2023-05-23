document.addEventListener("DOMContentLoaded", function () {
  const bienvenida = document.getElementById("bienvenida");
  const botonEnviar = document.getElementById("enviar");

  botonEnviar.addEventListener("click", (event) => {
    event.preventDefault();
    nombre = document.getElementById("nombre").value;
    bienvenida.innerHTML = `<h2>¡Bienvenid@, ${nombre}!</h2>`;
    localStorage.setItem("nombre", nombre);
  });
});
//////////////////

function borrar(borraropcion) {
  if (borraropcion === 1) {
    let parrafoPublicar = document.getElementById("publicar");
    parrafoPublicar.parentNode.removeChild(parrafoPublicar);

    let linkpublicar = document.getElementById("enlasePublicar");
    linkpublicar.parentNode.removeChild(linkpublicar);

    let linkcomprar = document.getElementById("enlaceComprar");
    linkcomprar.parentNode.removeChild(linkcomprar);

    let linkAlquilar = document.getElementById("enlaseAlquilar");
    linkAlquilar.parentNode.removeChild(linkAlquilar);
  } else {
    let parrafoComprar = document.getElementById("comprar");
    parrafoComprar.parentNode.removeChild(parrafoComprar);

    let linkpublicar = document.getElementById("enlasePublicar");
    linkpublicar.parentNode.removeChild(linkpublicar);

    let linkcomprar = document.getElementById("enlaceComprar");
    linkcomprar.parentNode.removeChild(linkcomprar);

    let linkAlquilar = document.getElementById("enlaseAlquilar");
    linkAlquilar.parentNode.removeChild(linkAlquilar);
  }
}

////////////////////////////////////////////////////// crear productos

class Inmueble {
  constructor(direccion, barrio, tipo, metrosCuadrados, valor, img) {
    this.direccion = direccion;
    this.barrio = barrio;
    this.tipo = tipo;
    this.metrosCuadrados = parseFloat(metrosCuadrados);
    this.valor = parseFloat(valor);
    this.img = img;
  }
}

const inmuebles = JSON.parse(localStorage.getItem("inmuebles")) || [];

const formularioo = () => {
  const PublicarInmueble = document.querySelector("#formularioo");
  PublicarInmueble.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = evento.target.elements;

    const img = datos["img"].files[0];
    const imgURL = URL.createObjectURL(img); // Obtener la URL de la imagen seleccionada

    const inmueble = new Inmueble(
      datos["direccion"].value,
      datos["barrio"].value,
      datos["tipo"].value,
      datos["metrosCuadrados"].value,
      datos["valorPropiedad"].value,
      imgURL
    );
    inmuebles.push(inmueble);
    localStorage.setItem("inmuebles", JSON.stringify(inmuebles));

    Toastify({
      text: "Inmueble publicado. Actualiza para visualizar.",
      duration: 4500,
      destination: "index.html", // Recargar la página actual
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #013574, #0073FF)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  });
};

formularioo();

const editarinmuebles = (data) => {
  data.forEach((inmueble) => {
    const cardInmueble = document.createElement(`div`);
    cardInmueble.setAttribute(`id`, ` tarjeta-inmueble-editar`);
    cardInmueble.innerHTML = `
    <div class="card"  >
  <img class="card-img-top" src="${inmueble?.img}" alt="${inmueble?.direccion}">
  <div class="card-body ">
    <h4 class = "direccion">  ${inmueble?.direccion}</h4>
    <h5 class = "Mapa"> ${inmueble?.mapa}</h5>
    <h5 class = "tipo">tipo: ${inmueble?.tipo}</h5>
    <h5 class = "barrio">barrio: ${inmueble?.barrio}</h5>
    <h5 class = "Mcuadrados">m2 : ${inmueble?.metrosCuadrados}</h5>
        <h4 class = "valor">valor : USD${inmueble?.valor}</h4>
    <button type="button" id="${inmueble?.id}" class="btn btn-primary Comprar">COMPRAR</button>
  </div>
</div>`;

    stockInmuebles.append(cardInmueble);
  });
};

//////////////////////////////////// comprar

const stockInmuebles = document.querySelector(`#contenedor-inmuebles`);

const mostrarInmuebles = (data) => {
  data.forEach((inmueble) => {
    const cardInmueble = document.createElement(`div`);
    cardInmueble.setAttribute(`id`, ` tarjeta-inmueble`);
    cardInmueble.innerHTML = `
    <div class="card"  >
  <img class="card-img-top" src="${inmueble?.img}" alt="${inmueble?.direccion}">
  <div class="card-body ">
    <h4 class = "direccion">  ${inmueble?.direccion}</h4>
    <h5 class = "Mapa"> ${inmueble?.mapa}</h5>
    <h5 class = "tipo">tipo: ${inmueble?.tipo}</h5>
    <h5 class = "barrio">barrio: ${inmueble?.barrio}</h5>
    <h5 class = "Mcuadrados">m2 : ${inmueble?.metrosCuadrados}</h5>
        <h4 class = "valor">valor : USD${inmueble?.valor}</h4>
    <button type="button" id="${inmueble?.id}" class="btn btn-primary Comprar">COMPRAR</button>
  </div>
</div>`;

    stockInmuebles.append(cardInmueble);
  });
  const btnComprar = document.querySelectorAll(`.Comprar`);
  btnComprar.forEach((Elem) => {
    Elem.addEventListener(`click`, (e) => {
      agregar(e.target.id);
    });
  });
};
mostrarInmuebles(inmueble); /// divido los inmuebles creados de antemano
mostrarInmuebles(inmuebles); ///// con los productos que el cliente quiere publicar

const carrito = [];

function agregar(id) {
  const existe = carrito.some((inmue) => inmue.id === parseInt(id));

  if (existe) {
    Swal.fire({
      icon: "info",
      title: "Inmueble ya adquirido",
    });
  } else {
    let InmuebleEncontrado = inmueble.find(
      (inmue) => inmue.id === parseInt(id)
    );
    carrito.push(InmuebleEncontrado);
    console.log(carrito);

    Swal.fire({
      icon: "success",
      title: "felicidades",
      text: "Inmueble comprado ",
    });
  }
}

//////////////////////////// Modo oscuro
const botonColorMode = document.querySelector("#modo");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
  body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "activado");
}

function desactivarDarkMode() {
  body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", "desactivado");
}

if (darkMode === "activado") {
  activarDarkMode();
} else {
  desactivarDarkMode();
}
botonColorMode.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "activado") {
    desactivarDarkMode();
  } else {
    activarDarkMode();
  }
});

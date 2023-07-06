let inmuebles = [];

fetch("./js/inmuebles.json")
  .then((response) => response.json())
  .then((data) => {
    inmuebles = data;
    mostrarInmuebles(inmuebles);
  });

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

class Inmueblee {
  constructor(id, direccion, barrio, tipo, metrosCuadrados, valor, img) {
    this.id = id;
    this.direccion = direccion;
    this.barrio = barrio;
    this.tipo = tipo;
    this.metrosCuadrados = parseFloat(metrosCuadrados);
    this.valor = parseFloat(valor);
    this.img = img;
  }
}

const formularioo = () => {
  const PublicarInmueble = document.querySelector("#formularioo");
  PublicarInmueble.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const datos = evento.target.elements;

    const img = datos["img"].files[0];
    const imgURL = URL.createObjectURL(img);

    const nuevoId = inmuebles.length + 1;

    const inmueble = new Inmueblee(
      nuevoId,
      datos["direccion"].value,
      datos["barrio"].value,
      datos["tipo"].value,
      datos["metrosCuadrados"].value,
      datos["valorPropiedad"].value,
      imgURL
    );
    inmuebles.push(inmueble);
    localStorage.setItem("inmuebles", JSON.stringify(inmuebles));
    mostrarInmuebles(inmuebles);
    Toastify({
      text: "Inmueble publicado. Actualiza para visualizar.",
      duration: 4500,
      destination: "index.html",
      newWindow: true,
      close: false,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #013574, #0073FF)",
      },
      onClick: function () {},
    }).showToast();
  });
};

formularioo();

const editarinmuebles = (data) => {
  data.forEach((inmuebles) => {
    const cardInmueble = document.createElement(`div`);
    cardInmueble.setAttribute(`id`, ` tarjeta-inmueble-editar`);
    cardInmueble.innerHTML = `
    <div class="card"  >
  <img class="card-img-top" src="${inmuebles?.img}" alt="${inmuebles?.direccion}">
  <div class="card-body ">
    <h4 class = "direccion">  ${inmuebles?.direccion}</h4>
        <h5 class = "tipo">tipo: ${inmuebles?.tipo}</h5>
    <h5 class = "barrio">barrio: ${inmuebles?.barrio}</h5>
    <h5 class = "Mcuadrados">m2 : ${inmuebles?.metrosCuadrados}</h5>
        <h4 class = "valor">valor : USD${inmuebles?.valor}</h4>
    <button type="button" id="${inmuebles?.id}" class="btn btn-primary Comprar">COMPRAR</button>
  </div>
</div>`;

    stockInmuebles.append(cardInmueble);
  });
};

//////////////////////////////////// comprar

const stockInmuebles = document.querySelector(`#contenedor-inmuebles`);

const mostrarInmuebles = (data) => {
  data.forEach((inmuebles) => {
    const cardInmueble = document.createElement(`div`);
    cardInmueble.setAttribute(`id`, ` tarjeta-inmueble`);
    cardInmueble.innerHTML = `
    <div class="card"  >
  <img class="card-img-top" id="foto" src="${inmuebles?.img}" alt="${inmuebles?.direccion}">
  <div class="card-body ">
    <h4 class = "direccion">  ${inmuebles?.direccion}</h4>
        <h5 class = "tipo">tipo: ${inmuebles?.tipo}</h5>
    <h5 class = "barrio">barrio: ${inmuebles?.barrio}</h5>
    <h5 class = "Mcuadrados">m2 : ${inmuebles?.metrosCuadrados}</h5>
        <h4 class = "valor">valor : USD${inmuebles?.valor}</h4>
    <button type="button" id="${inmuebles?.id}" class="btn btn-primary Comprar">COMPRAR</button>
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

mostrarInmuebles(inmuebles);

const carrito = [];

function agregar(id) {
  let InmuebleEncontrado = inmuebles.find((inmue) => inmue.id === parseInt(id));

  const existe = carrito.some((inmue) => inmue.id === parseInt(id));

  if (existe) {
    Swal.fire({
      icon: "info",
      title: `El inmueble de ${
        InmuebleEncontrado && InmuebleEncontrado.direccion
          ? InmuebleEncontrado.direccion
          : ""
      } ya lo adquiriste`,
    });
  } else {
    if (InmuebleEncontrado) {
      carrito.push(InmuebleEncontrado);
      console.log(carrito);

      Swal.fire({
        icon: "success",
        title: "¡Felicidades!",
        text: "Inmueble comprado",
      });
    }
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

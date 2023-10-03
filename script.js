// Función para obtener los datos almacenados en localStorage
function obtenerDatosDesdeLocalStorage() {
  const datos = localStorage.getItem('inventario');
  return datos ? JSON.parse(datos) : [];
}

// Función para guardar los datos en localStorage
function guardarDatosEnLocalStorage(datos) {
  localStorage.setItem('inventario', JSON.stringify(datos));
}

// Array para almacenar los productos
let inventario = obtenerDatosDesdeLocalStorage();

const tablaBody = document.getElementById('tabla-body');

// Funciones para las acciones de los botones
function agregarProducto() {
  const nuevoProducto = {
      nombre: '',
      disponibilidad: 'Disponible',
      cantidad: 0,
      imagen: 'imagen1.jpg',
      editando: true,
  };
  inventario.push(nuevoProducto);
  actualizarTabla();
}

function guardarProductos() {
  // Aquí puedes implementar la lógica para guardar los productos
  console.log('Productos guardados:', inventario);
  alert('Productos guardados.');
  // Al guardar, marcamos todos los productos como no editables
  inventario.forEach((producto) => (producto.editando = false));
  guardarDatosEnLocalStorage(inventario); // Guardar en localStorage
  actualizarTabla();
}

function eliminarProducto(index) {
  inventario.splice(index, 1); // Elimina el producto del array
  guardarDatosEnLocalStorage(inventario); // Guardar en localStorage
  actualizarTabla();
}

function modificarProducto(index) {
  inventario[index].editando = true;
  actualizarTabla();
}

function actualizarTabla() {
  // Limpiar la tabla
  tablaBody.innerHTML = '';

  // Agregar filas de productos
  inventario.forEach((producto, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td style="width: auto;">
              ${producto.editando ? `<input type="text" value="${producto.nombre}" oninput="actualizarNombre(${index}, this.value)">` : producto.nombre}
          </td>
          <td style="width: auto;">
              ${producto.editando ?
                  `<select onchange="actualizarDisponibilidad(${index}, this.value)">
                  <option value="Reservado" ${producto.disponibilidad === 'Reservado' ? 'selected' : ''}>Reservado</option>
                  <option value="En proceso" ${producto.disponibilidad === 'En proceso' ? 'selected' : ''}>En proceso</option>
                  <option value="Disponible" ${producto.disponibilidad === 'Disponible' ? 'selected' : ''}>Disponible</option>
                  </select>` : producto.disponibilidad}
          </td>
          <td style="width: auto;">
              ${producto.editando ? `<input type="number" min="0" value="${producto.cantidad}" oninput="actualizarCantidad(${index}, this.value)">` : producto.cantidad}
          </td>
          <td style="width: auto;" class="imagen-cell"><img src="${producto.imagen}" alt="${producto.nombre}"></td>
          <td style="width: auto;">
              ${producto.editando ?
                  `<button class="agregar-imagen-btn" onclick="agregarImagen(${index})">Agregar Imagen</button>
                  <input type="file" class="imagen-input" id="imagen-input-${index}" accept="image/*" onchange="cargarImagen(event, ${index})">` :
                  `<button onclick="modificarProducto(${index})">Modificar</button>
                  <button onclick="eliminarProducto(${index})">Eliminar</button>`
              }
          </td>
      `;
      tablaBody.appendChild(row);
  });
}

function agregarImagen(index) {
  // Simulamos hacer clic en el campo de entrada de archivo correspondiente a la fila
  const imagenInput = document.getElementById(`imagen-input-${index}`);
  imagenInput.click();
}

function cargarImagen(event, index) {
  // Esta función se ejecutará cuando el usuario seleccione una imagen
  const input = event.target;
  const file = input.files[0]; // Obtener el archivo seleccionado

  if (file) {
      const reader = new FileReader();
      reader.onload = function () {
          // Obtener la URL de la imagen cargada
          const imageUrl = reader.result;

          // Actualizar la imagen en la fila correspondiente
          const imagenCell = tablaBody.querySelector(`tr:nth-child(${index + 1}) td:nth-child(4) img`);
          imagenCell.src = imageUrl;
      };
      reader.readAsDataURL(file);
  }
}

function actualizarNombre(index, valor) {
  inventario[index].nombre = valor;
}

function actualizarDisponibilidad(index, valor) {
  inventario[index].disponibilidad = valor;
}

function actualizarCantidad(index, valor) {
  inventario[index].cantidad = parseInt(valor);
}

// Llenar la tabla con datos del inventario al cargar la página
actualizarTabla();


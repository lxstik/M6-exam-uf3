import React, { useState } from 'react';
import { bd } from '../functions/bd';

//inicio el contador de ids en 1, si no existe en localStorage
let idCounter = parseInt(localStorage.getItem('idCounter'), 10) || 1;

//creo el componente NuevoPedido, que recibe por props la función seleccionarBirra
const NuevoPedido = ({ seleccionarBirra }) => {
  //defino los estados para mi formulario
  const [grupo, setGrupo] = useState('');
  const [mesa, setMesa] = useState('');
  //por defecto la birra seleccionada es null, porque al principio no hay ninguna seleccionada
  const [birraSeleccionada, setBirraSeleccionada] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  //creo una función para manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evito el comportamiento por defecto del formulario
    const form = e.target;

    // Si el formulario no es válido, muestro los mensajes de error
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    if (grupo && mesa && birraSeleccionada && cantidad > 0) {
      // crear nuevo pedido con id que se actualizará al agregar un nuevo pedido
      const nuevoPedido = {
        //asignar e insertar id, igual que los datos demás del pedido
        id: idCounter++, 
        grupo,
        mesa,
        cerveza: birraSeleccionada.nombre,
        cantidad,
        estado: 'Pendiente',
      };

      // guardar el nuevo id en localStorage para que al recargar la página no se reinicie y no se corrumpan los ids
      localStorage.setItem('idCounter', idCounter);

      // guardar los datos del pedido en localStorage, así no se pierden al recargar la página
      const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
      //agrego el nuevo pedido al array de pedidos
      pedidosGuardados.push(nuevoPedido);
      //lo meto en localStorage
      localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados));

      //comprobación de que se ha guardado correctamente
      alert('Pedido agregado correctamente!');
      //reiniciar los campos del formulario, poniendolos en vacío
      setGrupo('');
      setMesa('');
      setBirraSeleccionada(null);
      setCantidad(0);
      form.classList.remove('was-validated'); // Limpio las clases de validación
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  //creo una funcion para la seleccion la birra que me servirá para mostrar la información de la birra seleccionada en la ficha
  const handleSeleccionarBirra = (e) => {
    //busco en el array bd la birra cuya id coincide con el valor del select y la guardo en birraSeleccionada
    const birra = bd.find((birra) => birra.id === parseInt(e.target.value, 10));
    setBirraSeleccionada(birra);
    //llamo a la función que llego por props para que se muestre la información de la birra seleccionada
    seleccionarBirra(birra);
  };

  return (
    <div className="container">
      <form
        className="row needs-validation mb-5"
        noValidate
        onSubmit={handleSubmit}
      >
        <h3>Grupo</h3>
        <label htmlFor="nombreGrupo" className="label-control">Nombre del grupo:</label>
        {/*el minimo son 4 caracteres, maximo 10*/}
        <input
          type="text"
          className="form-control mt-2"
          id="nombreGrupo"
          placeholder="Borrachos de DAW2"
          minLength="4"
          maxLength="10"
          required
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
        />
        <div className="invalid-feedback">El nombre tiene que ser entre 4 y 10 letras</div>

        <label htmlFor="numeroMesa" className="label-control">Mesa número:</label>
        {/*la minima es la mesa 1, la maxima es 15*/}
        <input
          type="number"
          className="form-control mt-2"
          id="numeroMesa"
          placeholder="0"
          min="1"
          max="15"
          required
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />
        <div className="invalid-feedback">Tiene que ser entre 1 y 15</div>

        <h3 className="mt-5">Haz tu pedido</h3>
        <div className="d-flex gap-3">
          <select
            name="cervezas"
            id="cervezas"
            className="form-control"
            onChange={handleSeleccionarBirra}
            required
          >
            {/*saco todas las birras que hay en la bd*/}
            <option value="">Selecciona qué birra quieres</option>
            {bd.map((birra) => (
              <option key={birra.id} value={birra.id}>
                {birra.nombre}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Selecciona una birra.</div>

            {/*no pueden haber menos de 1 birra en el pedido*/}
          <input
            type="number"
            className="form-control"
            id="cantidadBirras"
            min="1"
            required
            value={cantidad || ''}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 0)}
          />
          <div className="invalid-feedback">No pueden ser 0 birras</div>
        </div>
        <button type="submit" className="btn btn-success mt-4 w-100">¡Enviar pedido!</button>
      </form>
    </div>
  );
};

export default NuevoPedido;
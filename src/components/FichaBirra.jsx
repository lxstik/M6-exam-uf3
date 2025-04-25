import React from 'react';

//en la constante fichaBirra guardo la función que va a mostrar la información de la birra seleccionada
const FichaBirra = ({ birra }) => {
    //si no hay birra seleccionada, muestro un mensaje de que hay que seleccionar una
  if (!birra) {
    return (
      <div className="p-3">
        <p>Selecciona una birra para ver su información.</p>
      </div>
    );
  }

  //si hay birra seleccionada, muestro su información
  return (
    <div className="p-3 d-flex">
      <div className="w-50">
        <img src={birra.imagen} alt={birra.nombre} className="w-100" />
      </div>
      <div className="ms-3">
        <h4>{birra.nombre}</h4>
        <p>{birra.descripcion}</p>
      </div>
    </div>
  );
};

export default FichaBirra;
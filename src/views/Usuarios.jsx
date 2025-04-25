import React, { useState } from 'react';
import NuevoPedido from '../components/NuevoPedido';
import FichaBirra from '../components/FichaBirra';

const Usuarios = () => {
  //creo un estado para guardar la birra seleccionada
  const [birraSeleccionada, setBirraSeleccionada] = useState(null);

  //creo una funcion que se va a encargar de recibir la birra seleccionada desde el componente NuevoPedido
  const handleSeleccionarBirra = (birra) => {
    //guardo el objeto birra en el estado birraSeleccionada
    setBirraSeleccionada(birra);
  };

  return (
    <div className="container mt-3 p-5 border shadow-lg">
      <h1 className="text-center mb-5">----- Vista usuario -----</h1>
      <div className="row">
        <div className="col-6">
          {/*renderizo el componente NuevoPedido y le paso la funcion handleSeleccionarBirra como prop, lo mismo hago con FichaBirra*/}
          <NuevoPedido seleccionarBirra={handleSeleccionarBirra} />
        </div>
        <div className="col-6">
          <FichaBirra birra={birraSeleccionada} />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
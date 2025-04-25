import React, { useState, useEffect } from 'react';

const TablaPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        //al cargar el componente, saco los pedidos del localStorage
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
        setPedidos(pedidosGuardados);
    }, []);

    //creo una función para borrar un pedido
    const borrarPedido = (id) => {
        const pedidosActualizados = pedidos.filter((pedido) => pedido.id !== id);
        setPedidos(pedidosActualizados);
        localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
    };

    //creo una función para cambiar el estado del pedido (pendiente/servido), usa la id como referencia a que pedido cambiar
    const cambiarEstadoPedido = (id) => {
        //busco el pedido que quiero cambiar de estado con el .map
        const pedidosActualizados = pedidos.map((pedido) => {
            //si coinciden las ids, cambio el estado del pedido, en otro caso lo dejo en su estado
            if (pedido.id == id) {
                if (pedido.estado == 'Pendiente') {
                    return { ...pedido, estado: 'Servido' };
                } else {
                    return { ...pedido, estado: 'Pendiente' };
                }
            } else {
                return pedido;
            }
        });
        //actualizo el estado de los pedidos en el localStorage
        setPedidos(pedidosActualizados);
        localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
    };

    return (
        <div className="container mt-5 mb-5 p-5 border shadow-lg">
            <div className="row">
                <h1 className="text-center mb-5">----- Vista camareros -----</h1>
                <h3>Pedidos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Grupo</th>
                            <th>Mesa</th>
                            <th>Cerveza</th>
                            <th>Cantidad</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.grupo}</td>
                                <td>{pedido.mesa}</td>
                                <td>{pedido.cerveza}</td>
                                <td>{pedido.cantidad}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className={`btn w-100 btn-sm ${pedido.estado === 'Pendiente' ? 'btn-outline-warning' : 'btn-outline-success'
                                                }`}
                                            onClick={() => {
                                                if (pedido.estado === 'Pendiente') {
                                                    cambiarEstadoPedido(pedido.id);
                                                } else {
                                                    cambiarEstadoPedido(pedido.id);
                                                }
                                            }}
                                        >
                                            {pedido.estado === 'Pendiente' ? 'Pedido pendiente...' : '¡Pedido servido!'}
                                        </button>
                                        <button
                                            className="btn btn-outline-danger w-100 btn-sm"
                                            onClick={() => {
                                                borrarPedido(pedido.id);
                                            }}
                                        >
                                            🗑 Borrar pedido
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaPedidos;
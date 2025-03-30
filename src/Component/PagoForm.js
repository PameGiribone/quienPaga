import React, { useState } from 'react';

const PagoForm = ({ agregarPago, resetPagos }) => {
  const [nombre, setNombre] = useState('');
  const [pago, setPago] = useState('');
  const [participantes, setParticipantes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && pago) {
      const nuevoParticipante = { nombre, pago: parseFloat(pago) };

      // Agregar participante
      setParticipantes([...participantes, nuevoParticipante]);

      // Pasar el pago al padre
      agregarPago(nuevoParticipante);

      // Limpiar inputs
      setNombre('');
      setPago('');
    }
  };

  const handleReset = () => {
    setParticipantes([]); // Borrar la lista de participantes
    setNombre('');
    setPago('');
    resetPagos(); // Llamar a la función para resetear los pagos y resultados en el padre
  };

  return (
    <div>
      <h3>Agregar nombre y gasto.</h3>
      <form onSubmit={handleSubmit} className='formulario'>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="number"
          value={pago}
          onChange={(e) => setPago(e.target.value)}
          placeholder="Gasto"
          required
        />
        <button type="submit">Agregar Pago</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          Resetear
        </button>
      </form>

      <h4>Participantes:</h4>
      <ul>
        {participantes.map((persona, index) => (
          <li key={index}>{persona.nombre}: ${persona.pago.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default PagoForm;


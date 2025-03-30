import React, { useState } from 'react';
import PagoForm from '../src/Component/PagoForm';
import Resultado from '../src/Component/Resultado';
import './style.css'

const App = () => {
  const [pagos, setPagos] = useState([]);

  const agregarPago = (pago) => {
    setPagos([...pagos, pago]);
  };

  const resetPagos = () => {
    setPagos([]); // Borra todos los pagos y resultados
  };

  return (
    <div>
      <h1>¿Quién Paga?</h1>
      <PagoForm agregarPago={agregarPago} resetPagos={resetPagos} />
      {pagos.length > 0 && <Resultado pagos={pagos} />}
    </div>
  );
};

export default App;

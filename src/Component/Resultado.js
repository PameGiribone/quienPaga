import React, { useEffect, useState } from "react";

const Resultado = ({ pagos }) => {
  const [totalPagado, setTotalPagado] = useState(0);
  const [pagoPromedio, setPagoPromedio] = useState(0);
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    // Calcular el total pagado y el pago promedio
    const total = pagos.reduce((acc, pago) => acc + pago.pago, 0);
    setTotalPagado(total);
    const promedio = total / pagos.length;
    setPagoPromedio(promedio);

    // Crear una lista de pagos con saldo (debe o recibe)
    const pagosConCero = pagos.map((pago) => ({
      ...pago,
      saldo: pago.pago - promedio,
    }));

    // Filtrar deudores y acreedores
    const deudores = pagosConCero.filter((pago) => pago.saldo < 0);
    const acreedores = pagosConCero.filter((pago) => pago.saldo > 0);

    // Asignar deudas entre deudores y acreedores
    const asignacionesResult = asignarDeudas(deudores, acreedores);
    setAsignaciones(asignacionesResult);
  }, [pagos]); // Solo depende de pagos, no de pagoPromedio, porque se recalcula dentro del efecto

  // Función para asignar pagos entre deudores y acreedores
  const asignarDeudas = (deudores, acreedores) => {
    const resultado = [];
    let i = 0;
    let j = 0;

    // Mientras haya deudores y acreedores
    while (i < deudores.length && j < acreedores.length) {
      const deudor = deudores[i];
      const acreedor = acreedores[j];

      // Calcular la cantidad que se transfiere
      const transferencia = Math.min(Math.abs(deudor.saldo), acreedor.saldo);

      resultado.push({
        deudor: deudor.nombre,
        acreedor: acreedor.nombre,
        cantidad: transferencia,
      });

      // Actualizar el saldo de deudor y acreedor
      deudores[i].saldo += transferencia;
      acreedores[j].saldo -= transferencia;

      // Mover al siguiente deudor o acreedor si su saldo se salda
      if (deudores[i].saldo === 0) i++;
      if (acreedores[j].saldo === 0) j++;
    }

    return resultado;
  };

  return (
    <div className="resultados">
      <h4>Resultado</h4>
      <p>Total Pagado: ${totalPagado.toFixed(2)}</p>
      <p>Pago Promedio por persona: ${pagoPromedio.toFixed(2)}</p>

      <h2>Quien le paga a quien</h2>
      {asignaciones.length > 0 ? (
        <ul>
          {asignaciones.map((asignacion, index) => (
            <li key={index}>
              {asignacion.deudor} paga a {asignacion.acreedor} ${asignacion.cantidad.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay deudas que asignar.</p>
      )}
    </div>
  );
};

export default Resultado;


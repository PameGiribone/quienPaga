import React from "react";

const Resultado = ({ pagos }) => {
    
        const totalPagado = pagos.reduce((acc, pago) => acc + pago.pago, 0);
        const numPersonas = pagos.length; // Número total de participantes
        const pagoPromedio = totalPagado / numPersonas;
      
        // Crear una lista de pagos, considerando que si no pagaron nada, su pago es 0.
        const pagosConCero = pagos.map((pago) => ({
          ...pago,
          saldo: pago.pago - pagoPromedio, // Calcular el saldo de cada persona (debe o recibe)
        }));
      
        // Filtrar los que deben dinero y los que tienen saldo a favor
        const deudores = pagosConCero.filter(pago => pago.saldo < 0); // Los que deben dinero
        const acreedores = pagosConCero.filter(pago => pago.saldo > 0); // Los que tienen dinero a favor
        console.log(deudores);
        console.log(acreedores);
        
        
        // Función para asignar pagos entre deudores y acreedores
        const asignarDeudas = () => {
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
      
        const asignaciones = asignarDeudas();
      
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
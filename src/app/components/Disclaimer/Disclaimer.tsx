import React from 'react';

function Disclaimer() {
  return (
    <section className="background-1 text-[#1e002b] px-6 py-14 flex justify-center items-center font-rubik min-h-[100vh]">
      <div className="max-w-4xl mx-auto space-y-6 text-start">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Esto es una simulación con datos ficticios 🧪
        </h2>

        <p className="text-base sm:text-lg leading-relaxed">
          Esta demo no está conectada a ninguna cuenta real. Los movimientos que
          ves (ingresos, gastos, transferencias) fueron generados para imitar la
          vida financiera de una persona común.
        </p>

        <p className="text-base sm:text-lg leading-relaxed">
          Recargas, salidas con amigos, suscripciones, mercado y otras
          transacciones típicas... todo fue creado para poner a prueba el
          comportamiento del asistente conversacional.
        </p>

        <p className="bg-white text-[#1e002b] rounded-xl px-5 py-4 font-medium shadow-md inline-block leading-relaxed text-center">
          👇 Te invitamos a probar este prototipo funcional y a contarnos qué
          tal te va usando el hashtag{' '}
          <span className="text-[#a100ff] font-semibold">#LaPlataATuRitmo</span>
        </p>
      </div>
    </section>
  );
}

export default Disclaimer;

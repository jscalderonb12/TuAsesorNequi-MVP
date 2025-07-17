'use client';

import React from 'react';
import { CalendarDays, ListOrdered, BarChart2, Wallet } from 'lucide-react';
import './styles.css';

export default function InfoPanel() {
  const prompts = [
    '¿Cuánto gasté en junio?',
    'Muéstrame mis gastos por categoría esta semana',
    '¿Cuáles son las 3 cosas donde más gasto?',
    'Dame un resumen financiero de este mes',
    '¿Cuántas transacciones hice en julio?',
    '¿En qué gasté más el mes pasado?',
  ];

  return (
    <section className="shadow-info w-[90%] h-[600px] second-background from-purple-950 via-purple-900 to-fuchsia-900 py-[20px] text-white rounded-[20px] shadow-lg flex items-centers">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">
          ¿Qué puedes hacer con TuAsesorNequi?
        </h2>
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-center mb-4 text-fuchsia-200">
            Ejemplos que puedes escribir
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {prompts.map((p, i) => (
              <button
                key={i}
                className="bg-white text-fuchsia-900 text-sm px-4 py-2 rounded-full hover:bg-fuchsia-100 transition"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4 max-w-md mx-auto">
          <FeatureItem
            icon={<CalendarDays className="text-fuchsia-400 w-6 h-6" />}
            title="Consultar transacciones"
            desc="Ve todos tus ingresos, gastos y transferencias entre dos fechas."
          />
          <FeatureItem
            icon={<ListOrdered className="text-fuchsia-400 w-6 h-6" />}
            title="Agrupar gastos por categoría"
            desc="Descubre cuánto gastaste en cada tipo de gasto."
          />
          <FeatureItem
            icon={<BarChart2 className="text-fuchsia-400 w-6 h-6" />}
            title="Ver top 3 de gastos"
            desc="Conoce tus 3 categorías con más gastos."
          />
          <FeatureItem
            icon={<Wallet className="text-fuchsia-400 w-6 h-6" />}
            title="Resumen financiero"
            desc="Obtén ingresos, gastos y saldo neto del periodo."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 bg-purple-800/30 p-4 rounded-lg shadow-sm">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="font-bold text-white">{title}</p>
        <p className="text-sm text-fuchsia-200">{desc}</p>
      </div>
    </div>
  );
}

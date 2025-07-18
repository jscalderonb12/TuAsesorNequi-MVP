import React from 'react';

export default function Header() {
  return (
    <header className="nequi-header global-shadow px-4 py-6">
      <div className="header-content flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div className="header-logo flex items-center gap-2">
          <span className="nequi-dot" />
          <h1 className="text-xl md:text-2xl font-bold">TuAsesorNequi</h1>
        </div>

        <div className="header-tagline text-base md:text-lg text-left md:text-center">
          Tu asistente financiero al estilo Nequi 💜
        </div>

        <div className="header-badge bg-purple-100 text-purple-800 px-3 py-1 rounded text-lg md:text-xl animate__animated animate__pulse animate__infinite">
          Demo interactiva
        </div>
      </div>
    </header>
  );
}

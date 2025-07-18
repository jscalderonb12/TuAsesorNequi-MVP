import React from 'react';

export default function Footer() {
  return (
    <footer className="nequi-footer global-shadow px-4 py-6">
      <div className="nequi-footer-content flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="footer-logo flex items-center gap-2">
          <span className="nequi-dot" />
          <h1 className="text-xl md:text-2xl font-bold">TuAsesorNequi</h1>
        </div>
        <nav className="footer-links flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-center">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Soporte</a>
        </nav>
      </div>
      <div className="footer-bottom mt-4 text-center text-xs text-gray-300">
        <span>
          © {new Date().getFullYear()} Nequi. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

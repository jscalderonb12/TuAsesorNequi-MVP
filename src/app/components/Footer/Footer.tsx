import React from 'react';

export default function Footer() {
  return (
    <footer className="nequi-footer global-shadow ">
      <div className="nequi-footer-content">
        <div className="footer-logo">
          <span className="footer-nequi-dot" />
          <b>TuAsesorNequi</b>
        </div>
        <nav className="footer-links">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Soporte</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Nequi. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className=" py-3  w-screen">
      <ul className="flex justify-center space-x-8">
        <li><a href="\" className="hover:text-zinc-400">Inicio</a></li>
        <li><a href="/registrar" className="hover:text-zinc-400">Registrar</a></li>
        <li><a href="#services" className="hover:text-zinc-400">Services</a></li>
        <li><a href="#contact" className="hover:text-zinc-400">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

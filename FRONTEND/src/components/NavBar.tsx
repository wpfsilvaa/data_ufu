import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className='p-4'>
      <ul className="flex flex-col md:flex-row md:space-x-2 items-center justify-center">
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3'><a href="\" className="">Inicio</a></li>
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3 '><a href="\criar" className="">Criar Mensagem</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

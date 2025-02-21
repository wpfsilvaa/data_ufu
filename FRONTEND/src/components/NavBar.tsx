import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className='p-2 mg-4'>
      <ul className="flex justify-center space-x-8 border-b-2">
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3'><a href="\" className="">Inicio</a></li>
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3'><a href="#" className="">Sobre</a></li>
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3'><a href="#" className="">Área do Aluno</a></li>
      <li className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-3'><a href="#" className="">Contato</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

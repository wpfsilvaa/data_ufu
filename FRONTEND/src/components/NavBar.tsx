import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className='bg-slate-400 roubded-lg p-2'>
      <ul className="flex justify-center space-x-8">
        <li><a href="\" className=" hover:bg-sky-600  p-3 rounded">Inicio</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

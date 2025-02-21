"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Mensagem {
  id: number;
  titulo: string;
  conteudo: string;
  publicada: boolean;
}

const App = () => {
  const [Mensagens, setMensagens] = useState<Mensagem[]>([]);
  
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    publicada: true
  });

  const fetchMensagens = async () => {
    try {
      const response = await api.get('/criar');
      
      if (response.data && Array.isArray(response.data)) {
        setMensagens(response.data);
      } else {
        setMensagens([]);
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      setMensagens([]);
    }
  };

  useEffect(() => {
    fetchMensagens();
  }, []); 

  const handleInputChange = (event: { target: { type: string; checked: any; value: any; name: any; }; }) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await api.post('/criar', formData);
    fetchMensagens(); 
    setFormData({
      titulo: '',
      conteudo: '',
      publicada: true
    });
  };

  return (
    <div>
      <div className="container mx-auto p-6">
      <p className="mb-2 text-white text-lg font-semibold">
            Mensagens APP
          </p>
        <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor='titulo' className='block text-gray-700 text-sm font-bold mb-2'>
              Título
            </label>
            <input type='text' className='appearance-none border-b-4 hover:border-b-sky-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='titulo' name='titulo' onChange={handleInputChange} value={formData.titulo} />
          </div>
          <div className="mb-4">
            <label htmlFor='conteudo' className='block text-gray-700 text-sm font-bold mb-2'>
              Conteúdo
            </label>
            <input type='text' className='appearance-none border-b-4 rounded hover:border-b-sky-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='conteudo' name='conteudo' onChange={handleInputChange} value={formData.conteudo} />
          </div>
          <div className="mb-4">
            <label htmlFor='publicada' className='inline-flex items-center'>
              <input type='checkbox' id='publicada' name='publicada' onChange={handleInputChange} checked={formData.publicada} className='form-checkbox h-5 w-5 text-blue-600' />
              <span className='ml-2 text-gray-700'>Publicada?</span>
            </label>
          </div>
          <button type='submit' className='transition delay-150 duration-300 ease-in-out   hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Submit
          </button>
        </form>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Título</th>
              <th className='py-3 px-6 text-left'>Conteúdo</th>
              <th className='py-3 px-6 text-left'>Publicada?</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {Mensagens.map((Mensagem) => (
              <tr key={Mensagem.id} className='border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-6'>{Mensagem.titulo}</td>
                <td className='py-3 px-6'>{Mensagem.conteudo}</td>
                <td className='py-3 px-6'>{Mensagem.publicada ? 'sim' : 'não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

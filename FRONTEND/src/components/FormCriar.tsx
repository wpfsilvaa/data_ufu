"use client"
import React, { useState } from 'react';
import api from '@/lib/api';

const MensagensForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    publicada: true
  });

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      await api.post('/criar', formData);
      setMensagem('Mensagem enviada com sucesso!');
      setErro(null);
      setFormData({
        titulo: '',
        conteudo: '',
        publicada: true
      });
    } catch (error: any) {
      console.error('Erro completo:', error);
      setErro(error?.response?.data?.message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente!');
      setMensagem(null);
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {mensagem && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="bg-red-500 p-2  mb-4">
          {erro}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input
          type="text"
          className="appearance-none border-b-4 hover:border-b-sky-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="titulo"
          name="titulo"
          onChange={handleInputChange}
          value={formData.titulo}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="conteudo" className="block text-gray-700 text-sm font-bold mb-2">Conteúdo</label>
        <input
          type="text"
          className="appearance-none border-b-4 rounded hover:border-b-sky-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="conteudo"
          name="conteudo"
          onChange={handleInputChange}
          value={formData.conteudo}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="publicada" className="inline-flex items-center">
          <input
            type="checkbox"
            id="publicada"
            name="publicada"
            onChange={handleInputChange}
            checked={formData.publicada}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Publicada?</span>
        </label>
      </div>
      <button
        type="submit"
        className="transition delay-150 duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default MensagensForm;
"use client";
import api from "@/lib/api";
import { useState, useEffect, ReactNode, Key } from "react";

interface Edital {
  id: number;
  orgao_responsavel: string;
  link_edital: string;
  data_publicacao: string;
  numero_edital: string;
  titulo_edital: string;
  tipo: string;
}

interface EditaisListProps {
  id: Key | null | undefined;
  orgao_responsavel: ReactNode;
  data_publicacao: ReactNode;
  tipo: ReactNode;
  link_edital: string | undefined;
  titulo_edital: ReactNode;
  numero_edital: ReactNode;
  editais: Edital[];
}

export default function EditaisList() {

  const [editais, setEditais] = useState<EditaisListProps[]>([]);
  const fetchEditais = async () => {
    try {
      const response = await api.get('/webscraping');
      
      if (response.data && Array.isArray(response.data)) {
        setEditais(response.data);
      } else {
        setEditais([]);
      }
    } catch (error) {
      console.error("Erro ao buscar Editais:", error);
      setEditais([]);
    }
  };

  useEffect(() => {
    fetchEditais();
  }, []); 
  return (
    <div className="p-3 m-2 overflow-hidden mx-auto max-h-80 overflow-y-auto border-indigo-500 bg-neutral-800 rounded">
      <ul>
        {editais.map((edital) => (
          <li key={edital.id} className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-32  hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen py-2 pl-2 pb-2 last:border-none hover:bg-sky-700">
            <strong className="block text-sm">
              {edital.numero_edital} - {edital.titulo_edital}
            </strong>
            <span className="block text-xs">
              {edital.orgao_responsavel} • {edital.data_publicacao} • {edital.tipo}
            </span>
            <a
              className="text-xs "
              href={edital.link_edital}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver edital
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
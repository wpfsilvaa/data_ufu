"use client";

import api from "@/lib/api";
import { useState, useEffect, ReactNode, Key } from "react";

interface Link {
    id: number;
    menuNav:string;
    link:string;
  }
  
  interface LinkListProps {
    id: Key | null | undefined;
    link: string | undefined;
    menuNav: ReactNode;
    links: Link[];
  }
  
function LinksImportantsList() {
  const [links, setlinks] = useState<LinkListProps[]>([]);
  const fetchlinks = async () => {
    try {
      const response = await api.get('/desafio');
      
      if (response.data && Array.isArray(response.data)) {
        setlinks(response.data);
      } else {
        setlinks([]);
      }
    } catch (error) {
      console.error("Erro ao buscar links:", error);
      setlinks([]);
    }
  };

  useEffect(() => {
    fetchlinks();
  }, []); 

    return (
      <div className="overflow-x-hidden max-h-80 overflow-y-auto p-1 border-indigo-500 bg-neutral-800 rounded-lx">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id} className="ml-2 mr-2 transition delay-150 duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen p-2 last:border-none">
              <a
              className="text-xs hover:underline"
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.menuNav}
            </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }


export default LinksImportantsList;


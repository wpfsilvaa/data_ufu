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
  editais: Edital[];
}

export default function EditaisList({ editais }: EditaisListProps) {
  return (
    <div className="p-3 overflow-hidden mx-auto max-h-80 overflow-y-auto border-indigo-500 bg-neutral-800 rounded">
      <ul>
        {editais.map((edital) => (
          <li key={edital.id} className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-10  hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-sky-600 bg-blend-screen overflow-y py-2 pl-2 pb-2 last:border-none hover:bg-sky-700">
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
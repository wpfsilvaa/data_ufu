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
    <div className="mx-auto max-w-2000 max-h-80 overflow-y-auto rounded-lg  p-4 shadow-md dark:bg-stone-800">
      <ul className="space-y-4">
        {editais.map((edital) => (
          <li key={edital.id} className="border-b pb-2 last:border-none">
            <strong className="block text-sm text-gray-900 dark:text-white">
              {edital.numero_edital} - {edital.titulo_edital}
            </strong>
            <span className="block text-xs text-gray-600 dark:text-gray-400">
              {edital.orgao_responsavel} • {edital.data_publicacao} • {edital.tipo}
            </span>
            <a
              className="text-xs hover:underline  hover:text-zinc-400"
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
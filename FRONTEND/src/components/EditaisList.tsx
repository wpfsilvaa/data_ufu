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
    <div className="mx-auto max-w-2000 max-h-80 overflow-y-auto rounded-lg  p-4 shadow-md">
      <ul className="space-y-4">
        {editais.map((edital) => (
          <li key={edital.id} className="py-2 rounded pl-2 shadow-lg border-b pb-2 last:border-none hover:bg-sky-700">
            <strong className="block text-sm">
              {edital.numero_edital} - {edital.titulo_edital}
            </strong>
            <span className="block text-xs">
              {edital.orgao_responsavel} • {edital.data_publicacao} • {edital.tipo}
            </span>
            <a
              className="text-xs hover:underline "
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
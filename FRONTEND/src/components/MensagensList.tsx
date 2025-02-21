interface Mensagem {
    id: number;
    titulo: string;
    conteudo: string;
    publicada: boolean;
  }
  
  interface MensagensListProps {
    mensagens: Mensagem[];
  }
  
  const MensagensList = ({ mensagens }: MensagensListProps) => {
    return (
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Título</th>
            <th className="py-3 px-6 text-left">Conteúdo</th>
            <th className="py-3 px-6 text-left">Publicada?</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {mensagens.map((mensagem) => (
            <tr key={mensagem.id} className="border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{mensagem.titulo}</td>
              <td className="py-3 px-6">{mensagem.conteudo}</td>
              <td className="py-3 px-6">{mensagem.publicada ? 'sim' : 'não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default MensagensList;
  
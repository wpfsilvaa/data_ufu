import api from '@/lib/api';
import MensagensList from '@/components/MensagensList';
import FormCriar from '@/components/FormCriar';

export default async function Page() {
  try {
    const response = await api.get('/criar');
    const mensagens = Array.isArray(response.data) ? response.data : [];

    return (
      <div className="container mx-auto p-6">
        <FormCriar />
        <p className="mb-2 text-white text-lg font-semibold">
          Mensagens APP
        </p>
        <MensagensList mensagens={mensagens} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return <div>Erro ao carregar as mensagens.</div>;
  }
}

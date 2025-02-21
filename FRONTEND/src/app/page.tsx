// app/page.tsx
import EditaisList from '@/components/EditaisList';
import LinksImportantsList from "@/components/LinksImportantsList";
import api from '@/lib/api';


export default async function Home() {
  try {
    const [linksResponse, editaisResponse] = await Promise.all([
      api.get("/desafio"),
      api.get("/webscraping"),
    ]);
    const links = Array.isArray(linksResponse.data) ? linksResponse.data : [];
    const editais = Array.isArray(editaisResponse.data) ? editaisResponse.data : [];

    return (
      <div className="flex basis-full flex-col justify-center align-center pt-10 ">
        <main className="items-center p-3">
          <div className="flex flex-col md:flex-row md:space-x-8 justify-between">
            
            {/* Editais List */}
            <div className="flex-1 ">
              <h1 className="text-xl font-semibold ">Editais Disponíveis:</h1>
              <div className="w-full mt-2 mb-3">
                <EditaisList editais={editais} />
              </div>
            </div>

            {/* Links Importantes List */}
            <div className="flex-3 w-25">
              <h1 className="text-xl font-semibold mb-2">Links Importantes:</h1>
              <div>
                <LinksImportantsList links={links} />
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <div>Erro ao carregar os dados.</div>;
  }
}

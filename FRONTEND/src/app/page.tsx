
import { getEditais } from "@/lib/getEditais";
import EditaisList from "@/components/EditaisList";
import LinksImportantsList from "@/components/LinksImportantsList";
import NavBar from "@/components/NavBar";
import { getLinks } from "@/lib/getLinks";

export default async function Home() {
  const editais = await getEditais();
  const getlinks = await getLinks();
  return (
    <div className="flex flex-col justify-center align-center pt-10">
    <header>
      <NavBar />
    </header>
  <main className="items-center p-6 rounded-lg">
    <div className="flex flex-col md:flex-row md:space-x-8">
      
      {/* Editais List */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold ">Editais Disponíveis:</h1>
        <div className="w-full mt-2 mb-3">
          <EditaisList editais={editais} />
        </div>
      </div>

      {/* Links Importantes List */}
      <div className="flex-3">
        <h1 className="text-xl font-semibold ">Links Importantes:</h1>
        <div className="w-full mt-2">
          <LinksImportantsList links={getlinks} />
        </div>
      </div>

    </div>
  </main>
</div>

  );
}

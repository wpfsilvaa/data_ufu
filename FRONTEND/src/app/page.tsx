
import { getEditais } from "@/lib/getEditais";
import EditaisList from "@/components/EditaisList";
import LinksImportantsList from "@/components/LinksImportantsList";
import NavBar from "@/components/NavBar";
import { getLinks } from "@/lib/getLinks";

export default async function Home() {
  const editais = await getEditais();
  const getlinks = await getLinks();
  return (
    <div className="">
    <header>
      <NavBar />
    </header>
  <main className="flex flex-col items-center w-full max-w-7xl p-6 dark:bg-zinc-950 rounded-lg shadow-lg ">
    <div className="w-full flex flex-col md:flex-row md:space-x-8">
      
      {/* Editais List */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold ">Editais Disponíveis:</h1>
        <div className="w-full mt-2">
          <EditaisList editais={editais} />
        </div>
      </div>

      {/* Links Importantes List */}
      <div className="flex-1 mt-5 md:mt-0">
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

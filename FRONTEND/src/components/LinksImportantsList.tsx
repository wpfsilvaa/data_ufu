interface Link {
    id: number;
    menuNav:string;
    link:string;
  }
  
  interface LinkListProps {
    links: Link[];
  }
  
function LinksImportantsList({ links }: LinkListProps) {
    return (
      <div className="mx-auto max-w-2000  max-h-80 overflow-y-auto rounded-lg  p-4 shadow-md dark:bg-stone-800">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.id} className="border-b pb-2 last:border-none">
              <a
              className="text-xs  hover:underline dark:text-white-600 hover:text-zinc-400"
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

export function LinksImportantsListAlternative({links} : LinkListProps)
{
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
  <div className="px-4 py-6">
    <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
      Logo
    </span>

    <ul className="mt-6 space-y-1">
    {links.map((link) => (
            <li key={link.id} className="border-b pb-2 last:border-none">
              <a
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
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
      </div>
  );
}

export default LinksImportantsList;


export async function getEditais() {
    const res = await fetch("http://127.0.0.1:8000/webscraping"); // Substitua pela URL real
    if (!res.ok) throw new Error("Erro ao buscar os editais");
    return res.json();
  }
  
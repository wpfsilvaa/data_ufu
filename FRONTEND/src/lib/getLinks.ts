export async function getLinks() {
    const res = await fetch("http://127.0.0.1:8000/desafio"); // Substitua pela URL real
    if (!res.ok) throw new Error("Erro ao buscar os links");
    return res.json();
  }
  
export async function getMensagens() {
    const res = await fetch("http://127.0.0.1:8000/criar"); // Substitua pela URL real
    if (!res.ok) throw new Error("Erro ao buscar os links");
    return res.json();
  }
  
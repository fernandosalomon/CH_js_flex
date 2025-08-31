async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error("No se pudo obtener los datos.");
    }
    return res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
}



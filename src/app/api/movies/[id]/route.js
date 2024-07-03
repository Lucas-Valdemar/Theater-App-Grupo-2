import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

// Função de handler da API
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("JD-TheaterApp");

    // Extrair o ID dos parâmetros da URL
    const { id } = params;

    // Verificar se o ID é válido
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Buscar o documento com o ID fornecido
    const movie = await db
      .collection("JD-TheaterApp-movies")
      .findOne({ _id: new ObjectId(id) });

    // Verificar se o filme foi encontrado
    if (!movie) {
      return new Response(JSON.stringify({ error: "Filme não encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Retornar o filme encontrado
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

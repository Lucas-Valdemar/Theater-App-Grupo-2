import clientPromise from "../../../../lib/mongodb";

export const GET = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("JD-TheaterApp");
    const movies = await db
      .collection("JD-TheaterApp-movies")
      .find({})
      .toArray();
    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

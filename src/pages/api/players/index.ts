import { connectToDatabase } from "../../../lib/mongo"

export default async (req, res) => {
  const { db } = await connectToDatabase()
  const players = await db.collection("players").find({}).toArray()
  res.json(players)
}

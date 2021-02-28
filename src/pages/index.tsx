import { InferGetStaticPropsType } from "next"
import Head from "next/head"

import { connectToDatabase } from "../lib/mongo"
import { Player, Season } from "../lib/types"

function IndexPage({ players, season }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Tisdagsgolfen {season.year}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-black">
            <th className="px-16 py-2 text-gray-200"></th>
            <th className="px-16 py-2 text-gray-200">Spelare</th>
            <th className="px-16 py-2 text-gray-200">Poäng</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {players &&
            players.map((player) => (
              <tr key={player.id} className="bg-gray-800">
                <td className="px-16 py-2"></td>
                <td className="px-16 py-2">
                  {player.first_name} {player.last_name[0]}
                  <span className={`ml2 ${player.status}`} />
                </td>
                <td className="px-16 py-2"></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export const getStaticProps = async () => {
  const { db } = await connectToDatabase()

  const players: Player[] = await db.collection("players").find({}).toArray()
  const season: Season = { id: 1, year: 2021, status: "ACTIVE" }

  return {
    props: {
      players,
      season,
    },
    revalidate: 86400,
  }
}

export default IndexPage

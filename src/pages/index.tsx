import { InferGetStaticPropsType } from "next"
import Head from "next/head"

import supabaseClient from "../../lib/client"
import { Player, Season } from "../../lib/types"

function IndexPage({ players, season }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Tisdagsgolfen {season.year}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Spelare</th>
            <th>Poäng</th>
          </tr>
        </thead>
        <tbody>
          {players &&
            players.map((player) => (
              <tr key={player.id}>
                <td></td>
                <td>
                  {player.first_name} {player.last_name[0]}
                  <span className={`ml2 ${player.status}`} />
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await supabaseClient.from("players").select("*")
  const { data: sData } = await supabaseClient.from("seasons").select("*").limit(1).single()
  return {
    props: {
      players: data as Player[],
      season: sData as Season,
    },
    revalidate: 3600,
  }
}

export default IndexPage

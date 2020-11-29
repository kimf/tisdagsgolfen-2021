import Head from "next/head"
import Link from "next/link"
import { request } from "graphql-request"
import { InferGetStaticPropsType } from "next"

type Player = {
  id: string
  name: string
  photo: {
    url: string
    width: number
    height: number
  }
}

export const getStaticProps = async () => {
  const { players }: { players: Player[] } = await request(
    process.env.NEXT_PUBLIC_GRAPHCMS_URL,
    `
      {
        players {
          id
          name
          photo {
            url
            width
            height
          }
        }
      }
    `,
  )

  return {
    props: {
      players,
    },
    revalidate: 3600,
  }
}
function IndexPage({ players }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/play">SPELA GOLF</Link>
        <hr />

        <h3>Spelare</h3>

        {players &&
          players.map((player) => (
            <div className="avatar" key={player.id}>
              <img src={player.photo.url} width={player.photo.width} height={player.photo.height} />
              {player.name}
            </div>
          ))}
      </main>
    </>
  )
}

export default IndexPage

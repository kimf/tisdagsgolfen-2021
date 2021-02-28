import "../assets/main.css"

// import { PusherProvider } from "@harelpls/use-pusher"
import type { AppProps } from "next/app"

import Layout from "../components/Layout"

// const config = {
//   clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
//   useTLS: true,
//   authEndpoint: "/api/pusher/auth",
// }
// <PusherProvider {...config}>

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-5xl p-6 mx-auto">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp

import { PusherProvider } from "@harelpls/use-pusher"
import "../styles/globals.css"

const config = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  encrypted: true,
  authEndpoint: "/api/pusher/auth",
}

const MyApp = ({ Component, pageProps }) => (
  <div className="container">
    <PusherProvider {...config}>
      <Component {...pageProps} />
    </PusherProvider>
  </div>
)

export default MyApp

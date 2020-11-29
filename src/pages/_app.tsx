import { PusherProvider } from "@harelpls/use-pusher"
import "../styles/tailwind.scss"

const config = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  useTLS: true,
  authEndpoint: "/api/pusher/auth",
}

const MyApp = ({ Component, pageProps }) => (
  <div className="max-w-5xl mx-auto p-6">
    <PusherProvider {...config}>
      <Component {...pageProps} />
    </PusherProvider>
  </div>
)

export default MyApp

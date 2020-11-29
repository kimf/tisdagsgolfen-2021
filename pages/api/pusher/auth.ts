import Pusher from "pusher"

const {
  NEXT_PUBLIC_PUSHER_APP_ID: appId,
  NEXT_PUBLIC_PUSHER_APP_KEY: key,
  NEXT_PUBLIC_PUSHER_APP_SECRET: secret,
  NEXT_PUBLIC_PUSHER_APP_CLUSTER: cluster,
} = process.env

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  encrypted: true,
})

export default async (req, res) => {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const user_id = req.cookies.user_id

  const presenceData = { user_id, user_info: { name: user_id } }
  const auth = pusher.authenticate(socketId, channel, presenceData)
  res.send(auth)
}

import supabaseClient from "../../../lib/client"

// Example of how to verify and get user data server-side.
const getUser = async (req, res) => {
  const { data: user, error } = await supabaseClient.auth.api.getUser(req.cookies["sb:token"])

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(user)
}

export default getUser

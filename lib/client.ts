import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_TOKEN,
)

// export const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_API_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
// )

export default supabaseClient

import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_TOKEN,
)

// export const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_API_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
// )

export const createEvent = async (starts_at: Date, season_id: number, course_id: number) => {
  try {
    const { data, error } = await supabaseClient
      .from("events")
      .insert([{ starts_at, season_id, course_id }])
    if (error) {
      throw new Error(error.toString())
    }
    return data
  } catch (error) {
    console.log("error", error)
  }
}

export default supabaseClient

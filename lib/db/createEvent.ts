import supabaseClient from "../client"
import { NewEvent } from "../types"

export type CreateEventParams = Omit<NewEvent, "id" | "courses"> & {
  season_id: number
  course_id: number
}

export const createEvent = async (eventParams: CreateEventParams) => {
  try {
    const starts_at = new Date()
    const season_id = 1
    const { course_id, special, scoring_type, team } = eventParams
    const { data, error } = await supabaseClient
      .from("events")
      .insert([{ starts_at, season_id, course_id, special, scoring_type, team }])
    if (error) {
      throw new Error(error.message)
    }
    return data
  } catch (error: unknown) {
    console.log("error", error)
  }
}

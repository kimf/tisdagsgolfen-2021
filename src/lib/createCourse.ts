import { Course } from "./types"

export type CreateCourseParams = Omit<Course, "id">

export const createCourse = async (courseParams: CreateCourseParams) => {
  try {
    const { name, club, holes } = courseParams
    const response = await fetch("/api/courses", {
      method: "post",
      body: JSON.stringify({
        name,
        club,
        holes,
      }),
    })
    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.log("error", error)
  }
}

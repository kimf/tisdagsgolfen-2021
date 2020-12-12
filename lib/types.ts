export type Course = {
  id: string
  name: string
}

export type NewEvent = {
  id: string
  course: Course
}

export type Player = {
  id: string
  first_name: string
  last_name: string
  status: string
}

export type Season = {
  id: number
  year: number
  status: string
}

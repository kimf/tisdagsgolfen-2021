export type EventType = "points" | "strokes"

export type Hole = {
  id: number
  number: number
  par: number
  index: number
}

export type Course = {
  id: number
  name: string
  club: string
  holes: Hole[]
}

export type NewEvent = {
  id: number
  courses: Course
  scoring_type: EventType
  team: boolean
  special: boolean
}

export type Player = {
  id: number
  first_name: string
  last_name: string
  status: string
}

export type Season = {
  id: number
  year: number
  status: string
}

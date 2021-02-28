import { useRouter } from "next/router"
import { useState } from "react"

import { createEvent, CreateEventParams } from "../../lib/createEvent"
import { Course } from "../../lib/types"
import Button from "../ui/Button"
import NewCourseForm from "./NewCourseForm"

const NewEventForm = ({ courses }: { courses: Course[] }) => {
  const router = useRouter()
  const [eventParams, setEventParams] = useState<CreateEventParams>({
    season_id: 1,
    special: false,
    team: false,
    scoring_type: "points",
    course_id: courses.length > 0 ? courses[0].id : null,
  })
  const [saving, setSaving] = useState(false)
  const [showingModal, setShowingModal] = useState(false)

  const toggleModal = () => setShowingModal(!showingModal)

  const setEventKey = (key: string, value: any) => {
    setEventParams({ ...eventParams, [key]: value })
  }

  const saveEvent = async () => {
    setSaving(true)
    if (eventParams.course_id) {
      const newEvent = await createEvent(eventParams)
      router.push(`/play/${newEvent[0].id}`)
    } else {
      alert("Du måste välja bana")
    }
    setSaving(false)
  }

  if (courses === null) {
    return null
  }

  const strokes = eventParams?.scoring_type === "strokes"

  if (showingModal) {
    return (
      <NewCourseForm
        onDone={(courseId) => {
          setEventKey("courseId", courseId)
          toggleModal()
        }}
      />
    )
  }

  return (
    <div className="flex flex-col p-6 mt-8 rounded shadow bg-accents-1">
      <h2 className="text-2xl font-bold">Skapa ny runda</h2>
      <div className="p-4 my-8 font-bold bg-black bg-opacity-25 shadow text-red">
        <span role="img" aria-label="warning">
          🚨
        </span>{" "}
        <span role="img" aria-label="raised-hand">
          ✋
        </span>{" "}
        Kom överens om vem som ska skapa rundan
      </div>

      <form onSubmit={saveEvent} className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <label>
            <span>Special?</span>
            <input
              className="ml-2"
              type="checkbox"
              checked={eventParams?.special}
              onChange={(e) => setEventKey("special", !eventParams?.special)}
            />
          </label>
          <label>
            <span>Lag?</span>
            <input
              className="ml-2"
              type="checkbox"
              checked={eventParams?.team}
              onChange={(e) => setEventKey("team", !eventParams?.team)}
            />
          </label>
          <label>
            <span>Slag?</span>
            <input
              className="ml-2"
              type="checkbox"
              checked={strokes}
              onChange={(e) => setEventKey("scoring_type", strokes ? "points" : "strokes")}
            />
          </label>
        </div>
        <label>
          <span>Bana</span>
          <div className="flex gap-4">
            <select
              value={eventParams.course_id || ""}
              name="courseId"
              className="w-full text-black"
              onChange={(e) => setEventKey("courseId", e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.club} - {course.name}
                </option>
              ))}
            </select>
            <Button variant="slim" type="button" onClick={toggleModal}>
              NY BANA
            </Button>
          </div>
        </label>

        <Button
          variant="slim"
          type="button"
          onClick={saveEvent}
          disabled={!eventParams?.course_id}
          loading={saving}
        >
          SKAPA NY RUNDA
        </Button>
      </form>
    </div>
  )
}

export default NewEventForm

import { useState } from "react"

import { createCourse, CreateCourseParams } from "../../lib/createCourse"
import { Course } from "../../lib/types"
import Button from "../ui/Button"

const NewCourseForm = ({ onDone }: { onDone: (newCourse: Course) => void }) => {
  const [courseParams, setCourseParams] = useState<CreateCourseParams>({
    name: "",
    club: "",
    holes: [],
  })
  const [saving, setSaving] = useState(false)

  const setCourseKey = (key: string, value: any) => {
    setCourseParams({ ...courseParams, [key]: value })
  }

  const saveCourse = async () => {
    setSaving(true)

    const newCourse = await createCourse(courseParams)
    onDone(newCourse)
  }

  return (
    <div className="flex flex-col p-6 mt-8 rounded shadow bg-accents-1">
      <h2 className="text-2xl font-bold">Skapa ny bana</h2>

      <form onSubmit={saveCourse} className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <label>
            <span>Namn</span>
            <input
              className="ml-2 text-gray-800"
              type="text"
              value={courseParams.name}
              onChange={(e) => setCourseKey("name", e.target.value)}
            />
          </label>
          <label>
            <span>Klubb</span>
            <input
              className="ml-2 text-gray-800"
              type="text"
              value={courseParams.club}
              onChange={(e) => setCourseKey("club", e.target.value)}
            />
          </label>
        </div>

        <Button
          variant="slim"
          type="button"
          onClick={saveCourse}
          disabled={!courseParams?.name}
          loading={saving}
        >
          SPARA BANA
        </Button>
      </form>
    </div>
  )
}

export default NewCourseForm

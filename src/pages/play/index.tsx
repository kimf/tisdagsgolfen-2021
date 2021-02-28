import EventCard from "../../components/events/EventCard"
import NewEventForm from "../../components/events/NewEventForm"
import { connectToDatabase } from "../../lib/mongo"
import { Course, NewEvent } from "../../lib/types"

interface Iprops {
  events: NewEvent[]
  courses: Course[]
}

function Play({ events, courses }: Iprops) {
  return (
    <main className="play-golf">
      {events && events.length > 0 && events.map((e) => <EventCard event={e} key={e.id} />)}
      <NewEventForm courses={courses} />
    </main>
  )
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase()

  const events: NewEvent[] = await db.collection("events").find({}).toArray()
  const courses: Course[] = await db.collection("courses").find({}).toArray()

  return {
    props: {
      events,
      courses,
    },
  }
}

export default Play

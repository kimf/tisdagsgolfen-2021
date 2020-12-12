import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import supabaseClient from "../../../lib/client"
import { Course, NewEvent } from "../../../lib/types"
import { useUser } from "../../../lib/UserContext"
import EventCard from "../../components/events/EventCard"
import NewEventForm from "../../components/events/NewEventForm"

interface Iprops {
  savedEvents: NewEvent[]
  courses: Course[]
}

function Play({ savedEvents, courses }: Iprops) {
  const [events, setEvents] = useState<NewEvent[]>(savedEvents)
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) router.replace("/signin")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    const handleNewEvent = async (payload: NewEvent) => {
      const { data } = await supabaseClient
        .from("events")
        .select("*, courses ( * )")
        .eq("id", payload.id)
        .single()
      setEvents((evs) => [...evs, data])
    }

    // Listen for new events
    const eventListener = supabaseClient
      .from("events")
      .on("INSERT", (payload) => handleNewEvent(payload.new))
      .subscribe()
    // Cleanup on unmount
    return () => {
      eventListener.unsubscribe()
    }
  }, [])

  return (
    <main className="play-golf">
      {events && events.length > 0 && events.map((e) => <EventCard event={e} key={e.id} />)}
      <NewEventForm courses={courses} />
    </main>
  )
}

export const getServerSideProps = async () => {
  const { data } = await supabaseClient
    .from("events")
    .select("*, courses ( * )")
    .eq("status", "default")

  const { data: courses } = await supabaseClient.from("courses").select("*")

  return {
    props: {
      savedEvents: data as NewEvent[],
      courses: courses as Course[],
    },
  }
}

export default Play

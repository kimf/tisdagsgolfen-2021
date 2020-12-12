import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"

import supabaseClient, { createEvent } from "../../lib/client"
import { NewEvent, Player } from "../../lib/types"
import { useUser } from "../../lib/UserContext"

const myId = "f710e050-3edc-4641-842b-3f28aff5efaa"

function Play() {
  const { user } = useUser()
  const router = useRouter()
  const [users, setUsers] = useState<Player[]>([])
  const [events, setEvents] = useState<NewEvent[]>([])

  useEffect(() => {
    if (!user) router.replace("/signin")
  }, [user, router])

  const handleUpdatedUser = (payload: any) => {
    console.log(payload)
    // TODO: Change to Immer or something like https://github.com/SawyerHood/auger-state
    if (payload.status === "OFFLINE") {
      const newUsers = users.filter((u) => u.id !== payload.id)
      setUsers(newUsers)
    } else {
      setUsers([...users, ...[payload]])
    }
  }

  const handleNewEvent = (payload: any) => {
    console.log(payload)
    setEvents([...events, payload])
  }

  // Load initial data and set up listeners
  useEffect(() => {
    if (user) {
      const doAsync = async () => {
        const { data: eData } = await supabaseClient
          .from("events")
          .select("*")
          .eq("status", "default")
        setEvents(eData)
        const { data: uData } = await supabaseClient
          .from("players")
          .select("*")
          .eq("status", "ONLINE")
        setUsers(uData)
      }

      doAsync()
      // Listen for changes to our users
      const userListener = supabaseClient
        .from("players")
        .on("*", (payload) => handleUpdatedUser(payload.new))
        .subscribe()
      // Listen for new events
      const eventListener = supabaseClient
        .from("events")
        .on("INSERT", (payload) => handleNewEvent(payload.new))
        .subscribe()
      // Cleanup on unmount
      return () => {
        userListener.unsubscribe()
        eventListener.unsubscribe()
      }
    }
  }, [user, handleNewEvent, handleUpdatedUser])

  const saveEvent = () => {
    createEvent(new Date(), 1, 1)
  }

  // Object.entries(members).filter(([id]) => id !== myID)

  const otherUsers = users.filter((u) => u.id !== myId)

  return (
    <main className="play-golf">
      <h2 className="mb-4 text-2xl font-bold">Spela Golf</h2>
      <div className="p-4 my-8 text-gray-900 bg-gray-100 bg-opacity-25 rounded shadow">
        <h3 className="font-bold">Andra spelare som är online just nu</h3>
        {otherUsers && otherUsers.length > 0 ? (
          <>
            <ul>
              {otherUsers.map((user) => (
                <li key={user.id}>{user.first_name}</li>
              ))}
            </ul>
            <small>Kom överens om vem som skapar rundan!</small>
          </>
        ) : (
          <small>Inga andra spelare är online just nu</small>
        )}
      </div>

      {events && events.length > 0 && (
        <div>
          {events.map((e) => (
            <Fragment key={e.id}>
              {e.id} - <button onClick={null}>GÅ MED</button>
            </Fragment>
          ))}
        </div>
      )}
      <div className="mt-12">
        <button onClick={saveEvent}>SKAPA NY RUNDA</button>
      </div>
    </main>
  )
}

export default Play

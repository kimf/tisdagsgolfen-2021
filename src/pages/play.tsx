import { useEvent, usePresenceChannel, useClientTrigger } from "@harelpls/use-pusher"
import { useEffect, useState } from "react"

const Play = () => {
  useEffect(() => {
    if (!document.cookie.match("(^|;) ?user_id=([^;]*)(;|$)")) {
      document.cookie = "user_id=" + prompt("Your initials:")
    }
  })

  const { members, myID, channel } = usePresenceChannel("presence-create-event")

  const [events, setEvents] = useState([])
  const trigger = useClientTrigger(channel)
  useEvent(channel, "client-created-event", (data: { name: String }) => {
    setEvents((events) => [...events, { ...data }])
  })

  const createEvent = () => {
    const newEvent = { name: "Test" }
    setEvents((events) => [...events, newEvent])
    trigger("client-created-event", newEvent)
  }

  const users = Object.entries(members).filter(([id]) => id !== myID)

  return (
    <main className="play-golf">
      <h2 className="font-bold text-2xl mb-4">Spela Golf</h2>
      <p className="text-gray-200">Kom överens om vem som skapar eventet!</p>

      <div className="p-4 my-4 bg-gray-100 bg-opacity-25 text-gray-900">
        <svg className="spinner mr-4" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
        {users.length > 0 ? (
          <>
            <h3>Andra spelare som är här just nu</h3>
            <ul>
              {users.map(([id, info]) => (
                <li key={id}>{info.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <h3>Inga andra spelare här just nu</h3>
        )}
      </div>

      <hr />

      {events.length > 0 ? (
        <ul>
          {events.map((ev) => (
            <li key={ev.name}>{ev.name}</li>
          ))}
        </ul>
      ) : (
        <div>
          <h4>Skapa ny runda</h4>
          <button onClick={createEvent}>SKAPA</button>
        </div>
      )}
    </main>
  )
}

export default Play

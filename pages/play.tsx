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
      <h2>Spela Golf</h2>

      <h3>Andra spelare som är här just nu</h3>
      <p>Kom överens om vem som skapar eventet!</p>
      <ul>
        {users.map(([id, info]) => (
          <li key={id}>{info.name}</li>
        ))}
      </ul>

      <hr />

      {events.length > 0 ? (
        <ul>
          {events.map((ev) => (
            <li>{ev.name}</li>
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

import Link from "next/link"

import { NewEvent } from "../../lib/types"
import Button from "../ui/Button"

const EventCard = ({ event }: { event: NewEvent }) => {
  return (
    <div className="p-4 mt-6 rounded shadow bg-violet">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">
          {event.courses.club}-{event.courses.name}
        </h3>
        <div className="flex">
          <span className="px-2 py-1 mr-2 text-sm font-medium align-middle bg-black rounded text-accents-9">
            {event.team ? "LAG" : "INDIVIDUELL"}
          </span>
          <span className="px-2 py-1 text-sm font-medium align-middle bg-black rounded text-accents-9">
            {event.scoring_type === "points" ? "POÄNG" : "SLAG"}
          </span>
          {event.special && (
            <span className="px-2 py-1 ml-2 text-sm font-medium align-middle bg-black rounded text-accents-9">
              SPECIAL
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Link href={`/play/${event.id}`} passHref>
          <a>
            <Button variant="slim" className="w-full">
              STARTA SCORING SESSION
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}
export default EventCard

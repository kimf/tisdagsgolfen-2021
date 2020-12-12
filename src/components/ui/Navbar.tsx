import Link from "next/link"

import { useUser } from "../../../lib/UserContext"

const Navbar = () => {
  const { user, signOut } = useUser()

  return (
    <nav className="mb-12 bg-black">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <Link href="/">
            <a aria-label="Logo">TISDAGSGOLFEN</a>
          </Link>

          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <>
                <Link href="/play">
                  <a>Spela golf</a>
                </Link>
                <button onClick={() => signOut()}>Logga ut</button>
              </>
            ) : (
              <Link href="/signin">
                <a>Logga in</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="mb-12 -m-6 bg-primary">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <Link href="/">
            <a aria-label="Logo" className="font-bold text-green">
              TISDAGSGOLFEN
            </a>
          </Link>

          <div className="flex justify-end flex-1 space-x-8">
            <Link href="/play">
              <a>Spela golf</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

//{user && <button onClick={signOut}>Logga ut</button>}

export default Navbar

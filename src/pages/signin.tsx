import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { useUser } from "../../lib/UserContext"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import LoadingDots from "../components/ui/LoadingDots"

interface AuthMessage {
  type: string
  content: string
}

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<null | AuthMessage>(null)
  const router = useRouter()
  const { user, signIn } = useUser()

  const handleSignin = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)

    const { error } = await signIn({ email, password })
    if (error) {
      setMessage({ type: "error", content: error.message })
    }
    if (!password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link.",
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      router.replace("/account")
    }
  }, [router, user])

  if (!user)
    return (
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto my-64 w-80">
        <div className="flex justify-center pb-12 ">
          <h2 className="text-2xl font-bold">Logga in</h2>
        </div>
        <div className="flex flex-col space-y-4">
          {message && message.content && (
            <div
              className={`${message.type === "error" ? "text-pink" : "text-green"} border ${
                message.type === "error" ? "border-pink" : "border-green"
              } p-3`}
            >
              {message.content}
            </div>
          )}

          {!showPasswordInput && (
            <form onSubmit={handleSignin} className="flex flex-col space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={setEmail} required />
              <Button variant="slim" type="submit" loading={loading} disabled={!email.length}>
                Send magic link
              </Button>
            </form>
          )}

          {showPasswordInput && (
            <form onSubmit={handleSignin} className="flex flex-col space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={setEmail} required />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                required
              />
              <Button
                className="mt-1"
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!password.length}
              >
                Sign in
              </Button>
            </form>
          )}

          <span className="pt-1 text-sm text-center">
            <button
              className="cursor-pointer text-accents-7 text-accent-9 hover:underline"
              onClick={() => {
                if (showPasswordInput) setPassword("")
                setShowPasswordInput(!showPasswordInput)
                setMessage(null)
              }}
            >
              {`Or sign in with ${showPasswordInput ? "magic link" : "password"}.`}
            </button>
          </span>
        </div>
      </div>
    )

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  )
}

export default SignIn

{
  /* <div className="flex items-center my-6">
  <div className="flex-grow mr-3 border-t border-accents-2" aria-hidden="true"></div>
  <div className="italic text-accents-4">Or</div>
  <div className="flex-grow ml-3 border-t border-accents-2" aria-hidden="true"></div>
</div>

<Button
  variant="slim"
  type="submit"
  disabled={loading}
  onClick={() => handleOAuthSignIn("github")}
>
  <span className="ml-2">Continue with GitHub</span>
</Button> */
}

// const handleOAuthSignIn = async (provider) => {
//   setLoading(true)
//   const { error } = await signIn({ provider })
//   if (error) {
//     setMessage({ type: "error", content: error.message })
//   }
//   setLoading(false)
// }

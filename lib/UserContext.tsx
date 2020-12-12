import { createContext, useContext, useEffect, useState } from "react"

import supabaseClient from "./client"

export const UserContext = createContext(null)

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const session = supabaseClient.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      },
    )

    return () => {
      authListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserDetails = (userUuid) =>
    supabaseClient.from("players").select("*").eq("id", userUuid).single()

  useEffect(() => {
    if (user) {
      getUserDetails(user.id).then((res) => {
        setUserDetails(res.data)
        setUserLoaded(true)
      })
    }
  }, [user])

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    signIn: (options) => supabaseClient.auth.signIn(options),
    signUp: (options) => supabaseClient.auth.signUp(options),
    signOut: () => {
      setUserDetails(null)
      return supabaseClient.auth.signOut()
    },
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

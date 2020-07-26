import React, { createContext } from "react"

// createContext is a function and we're not passing anything in
const CurrentUserContext = createContext<any>(null)

export default CurrentUserContext
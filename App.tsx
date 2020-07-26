import React from "react"

import router from "./utils/router"
import { createAppContainer } from "react-navigation"
const AppContainer = createAppContainer(router)

const App = () => {
  return (
      <AppContainer />
  )
}

export default App

import React from "react"

import router from "./utils/router"
import { createAppContainer } from "react-navigation"
import CurrentUserProvider from "./providers/CurrentUserProvider"
const AppContainer = createAppContainer(router)

// to get access to the context (global state) first you need to wrap up what you want to have access to
// that context up in a provider. In this instance, we are wrapping up all of AppContainer in our provider
// so the entire application has access
// Then when you actually want to use the context, import it in the component and pull out the pieces of state

const App = () => {
	return (
		<CurrentUserProvider>
			<AppContainer />
		</CurrentUserProvider>
	)
}

export default App

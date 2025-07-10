import { Provider } from "react-redux"

import { store } from "./app/store"

function App() {
  return (
    <Provider store={store}>
    </Provider>
  )
}

export default App

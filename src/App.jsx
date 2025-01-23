import UserProvider from "./context/UserContext"
import AppRoutes from "./Router/AppRoutes"


function App() {

  return (
    <UserProvider>
    <AppRoutes/>
    </UserProvider>
  )
}

export default App

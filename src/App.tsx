import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./app/store"

import { AuthLayout } from "./layouts/AuthLayout/AuthLayout"
import { PublicRouteLayout } from "./layouts/PublicRouteLayout/PublicRouteLayout"
import { ProtectedRouteLayout } from "./layouts/ProtectedRouteLayout/ProtectedRouteLayout"

import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { ForgotPassword } from "./pages/PasswordReset/ForgotPassword"
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/helpdesk-system">
        <Routes>

          <Route element={<PublicRouteLayout />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Route>

          <Route element={<ProtectedRouteLayout />}>
            <Route element={<Outlet />}> { /* TODO: DashboardLayout */}
              <Route path="/dashboard" element={<h1>TODO!</h1>} />
              <Route path='/new-ticket' element={<h1>TODO!</h1>} />
              <Route path='/my-ticket' element={<h1>TODO!</h1>} />
              <Route path='/ticket-approval' element={<h1>TODO!</h1>} />
              <Route path='/performance' element={<h1>TODO!</h1>} />
              <Route path='/database' element={<h1>TODO!</h1>} />
              <Route path='/setting' element={<h1>TODO!</h1>} />
              <Route path='/user-log-history' element={<h1>TODO!</h1>} />

              <Route path='/profile' element={<h1>TODO!</h1>} />
              <Route path='/profile/edit' element={<h1>TODO!</h1>} />

            </Route>
          </Route>

          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

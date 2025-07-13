import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./app/store"

import { AuthLayout } from "./layouts/AuthLayout/AuthLayout"
import { DashboardLayout } from "./layouts/DashboardLayout/DashboardLayout"
import { PublicRouteLayout } from "./layouts/PublicRouteLayout/PublicRouteLayout"
import { ProtectedRouteLayout } from "./layouts/ProtectedRouteLayout/ProtectedRouteLayout"
import { RoleProtectedRouteLayout } from "./layouts/RoleProtectedRouteLayout/RoleProtectedRouteLayout"

import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { ForgotPassword } from "./pages/PasswordReset/ForgotPassword"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { NewTicket } from "./pages/NewTicket/NewTicket"
import { MyTicket } from "./pages/MyTicket/MyTicket"
import { TicketApproval } from "./pages/TicketApproval/TicketApproval"
import { Performance } from "./pages/Performance/Performance"
import { Database } from "./pages/Database/Database"
import { Setting } from "./pages/Setting/Setting"
import { UserLogHistory } from "./pages/UserLogHistory/UserLogHistory"
import { Profile } from "./pages/Profile/Profile"
import { EditProfile } from "./pages/EditProfile/EditProfile"

import { Forbidden } from "./pages/Forbidden/Forbidden"
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
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/new-ticket' element={<NewTicket />} />
              <Route path='/my-ticket' element={<MyTicket />} />

              <Route element={<RoleProtectedRouteLayout roles={['operations']} element={<Forbidden />} />}>
                <Route path='/ticket-approval' element={<TicketApproval />} />
              </Route>

              <Route element={<RoleProtectedRouteLayout roles={['operations', 'techsupport']} element={<Forbidden />} />}>
                <Route path='/performance' element={<Performance />} />
              </Route>

              <Route element={<RoleProtectedRouteLayout roles={['admin']} element={<Forbidden />} />}>
                <Route path='/database' element={<Database />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/user-log-history' element={<UserLogHistory />} />
              </Route>

              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />

            </Route>
          </Route>

          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

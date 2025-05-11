import {Route, Routes} from "react-router";
import Landing from "./pages/landing.jsx";
import AuthCallback from "./pages/authCallback.jsx";
import SsoCallback from "./pages/ssoCallback.jsx";
import Admin from "./pages/admin.jsx";
import Checkout from "./pages/checkout.jsx";
import Success from "./pages/success.jsx";
import Failure from "./pages/failure.jsx";


function App() {

    return (
        <Routes>
            <Route element={<Landing />} path={'/'}/>
            <Route element={<AuthCallback />} path={'/auth-callback'}/>
            <Route element={<SsoCallback />} path={'/sso-callback'}/>
            <Route element={<Admin />} path={'/admin'}/>
            <Route element={<Checkout />} path={'/checkout'} />
            <Route element={<Success />} path={'/success'} />
            <Route element={<Failure />} path={'/fail'} />
        </Routes>
  )
}

export default App

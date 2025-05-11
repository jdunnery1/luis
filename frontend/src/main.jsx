import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {ClerkProvider} from "@clerk/clerk-react";
import AuthProvider from "../Providers/AuthProvider.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={'/'}>
              <AuthProvider>
                <App />
              </AuthProvider>
      </ClerkProvider>
  </BrowserRouter>,
)

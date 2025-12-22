import Router from './routes/index';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFetchProfile } from "./lib/hooks/useFetchProfile";

export default function App() {
  useFetchProfile();
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router />
    </GoogleOAuthProvider>
  )
}
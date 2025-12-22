import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const Home = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/LoginPage'));
const Register = lazy(() => import('../pages/RegisterPage'));
const UserProfile = lazy(() => import('../pages/UserProfilePage'));
const Booking = lazy(() => import('../pages/BookingPage'))

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/booking" element={<Booking />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}
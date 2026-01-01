import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequiredAuth } from "../components/auth/RequiredAuth"
import { AuthLayout } from "../components/layout/AuthLayout"
import { AdminOnlyAuth } from "../components/auth/AdminOnlyAuth"
import { AdminLayout } from "../components/layout/AdminLayout"


const Home = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/LoginPage'));
const Register = lazy(() => import('../pages/RegisterPage'));
const UserProfile = lazy(() => import('../pages/UserProfilePage'));
const Booking = lazy(() => import('../pages/BookingPage'))
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminStaffPage = lazy(() => import('../pages/admin/AdminStaffPage'));
const AdminServicePage = lazy(() => import('../pages/admin/AdminServicePage'));
const AdminBokingPage = lazy(() => import('../pages/admin/AdminBokingPage'));
const AdminPaymentPage = lazy(() => import('../pages/admin/AdminPaymentPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            element={
                                <RequiredAuth>
                                    <AuthLayout />
                                </RequiredAuth>
                            }
                        >
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/profile" element={<UserProfile />} />
                            <Route path="/payment-success" element={<PaymentSuccess />} />
                        </Route>

                        <Route
                            element={
                                <AdminOnlyAuth>
                                    <AdminLayout />
                                </AdminOnlyAuth>
                            }
                        >
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<AdminUsersPage />} />
                            <Route path="/admin/staffs" element={<AdminStaffPage />} />
                            <Route path="/admin/services" element={<AdminServicePage />} />
                            <Route path="/admin/bookings" element={<AdminBokingPage />} />
                            <Route path="/admin/payments" element={<AdminPaymentPage />} />
                            <Route path="/admin/settings" element={<AdminSettingsPage />} />
                        </Route>

                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}
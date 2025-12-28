import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom"
import bg from "../assets/loginimage.jpg"
import { GridPattern } from "../components/ui/Gridpattern";
import { cn } from "../lib/util";
import logo from "../assets/lumiere.png";
import { login, googleLogin, fetchUserProfile } from "../services/auth"
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setProfile } from "../lib/features/user-slice";

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res: any = await login(email, password);

      console.log("LOGIN RESPONSE:", res);

      if (!res) {
        console.error("No response:", res);
        alert("Login failed: No server response");
        return;
      }

      if (!res.accessToken) {
        console.error("Missing accessToken:", res);
        alert("Login failed: Invalid server response");
        return;
      }

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      const role = res.user?.roles?.[0];

      if (role) {
        localStorage.setItem("role", role);
      }

      const profileData = await fetchUserProfile();
      dispatch(setProfile({
        ...profileData,
        avatarColor: "#d4af37",
        joinDate: new Date().toISOString(),
        loyaltyPoints: 0,
      }));


      alert(`Login Successful!`);
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
      // navigate("/profile");

    } catch (error: any) {
      console.error("Login error:", error.response?.data || error);
      alert("Login Failed!");
    }
  };



  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const res = await googleLogin(codeResponse.code);

        console.log("Google Login Success:", res.data);

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        const role = res.data.user?.roles?.[0];
        if (role) {
          localStorage.setItem("role", role);
        }

        alert("Google Login Success!");
        if (role === "ADMIN") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/profile", { replace: true });
        }
        // navigate("/profile");

      } catch (err: any) {
        console.error("Google login error:", err.response?.data || err);
        alert("Google Login Failed");
      }
    },
    onError: (error) => {
      console.log("Google Login Error:", error);
    },
  });

  return (
    <main
      className="min-h-screen bg-contain bg-center bg-no-repeat bg-fixed flex items-center justify-center px-4 bg-black/80"
    >
      <div
        className="w-[900px] h-[600px] bg-contain bg-center bg-no-repeat bg-fixed rounded-4xl flex items-center flex-row-reverse"
        style={{ backgroundImage: `url(${bg})` }}
      >

        <div className="w-1/2 flex flex-col items-center text-center">
          <div className="relative w-[200px] h-[100px] logo-shine border border-white rounded-xl">
            <img
              src={logo}
              alt="Lumière Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-white mt-4 font-bold text-xl luxury-font text-center">
            Welcome back <br />
            to your beauty sanctuary
          </p>
        </div>

        <div className="w-1/2 flex justify-center">
          <div className="backdrop-blur-sm bg-white rounded-4xl w-[450px] h-[600px] shadow-lg">
            <GridPattern
              width={35}
              height={35}
              className={cn(
                "absolute inset-0 -z-20 opacity-25 pointer-events-none",
                "[mask-image:linear-gradient(to bottom left, rgba(255,255,255,1) 70%, rgba(0, 0, 0, 0) 100%)]"
              )}
            />
            <div className="p-10 h-full flex flex-col justify-center">

              <form onSubmit={handleLogin} className="space-y-4">


                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mt-2
                  bg-gray-800 text-white border border-gray-600
                  hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>


                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-muted-foreground text-sm">OR</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </label>

                  <div className="relative rounded-2xl">
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        padding: "2px",
                        background: "linear-gradient(135deg, #d4af37, #f7d774, #d4af37)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 rounded-2xl border-none bg-card relative z-10 focus:outline-none focus:ring-0"
                    />

                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </label>

                  <div className="relative rounded-3xl">
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        padding: "2px",
                        background: "linear-gradient(135deg, #d4af37, #f7d774, #d4af37)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 rounded-2xl border-none bg-card relative z-10 focus:outline-none focus:ring-0"
                    />

                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <button type="submit" className="rounded-2xl w-full btn-gold">
                  Sign In
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-muted-foreground text-sm">New to Lumière?</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <Link to="/register">
                <button className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mt-2
                bg-gray-800 text-white border border-gray-600
                hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
                  Create an Account
                </button>
              </Link>

              <p className="text-center text-xs text-muted-foreground mt-8">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

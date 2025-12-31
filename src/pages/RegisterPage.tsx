import bg from "../assets/loginimage.jpg"
import logo from "../assets/lumiere.png";
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { GridPattern } from "../components/ui/Gridpattern";
import { cn } from "../lib/util";
import { register ,googleRegisterApi } from "../services/auth"
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      alert("all input are reuired")
      return
    }

    if (password !== confirmPassword) {
      alert("password do not match")
      return
    }

    try {
  const obj = { email, password , confirmPassword};
  const res = await register(obj);

  console.log("Register API response:", res.data);

  alert(`Registration Successful: ${res.data.data.email}`);
  navigate("/login");

} catch (error: any) {
  console.log("Backend error:", error?.response?.data);
  alert(error?.response?.data?.message || "Registration failed");
}
  }

   const googleRegister = useGoogleLogin({
  flow: "auth-code",
  onSuccess: async (codeResponse) => {
    try {
      const res = await googleRegisterApi(codeResponse.code);
      alert(`Google Registration Successful: ${res.data.data.email}`);
      navigate("/login");
    } catch (err: any) {
      console.log("Google register error:", err?.response?.data);
      alert(err?.response?.data?.message || "Google registration failed");
    }
  },
  onError: () => {
    alert("Google registration failed!");
  },
  scope: "openid email profile",
});


  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12 bg-black/80">
      <div
        className="w-[900px] h-[800px] bg-contain bg-center bg-no-repeat bg-fixed rounded-4xl flex flex-row-reverse items-center"
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
            Join our <br />
            beauty community
          </p>
        </div>

        <div className="w-1/2 flex justify-center">
          <div className="backdrop-blur-sm bg-white rounded-4xl w-[450px] h-[800px] shadow-lg">
            <GridPattern
              width={35}
              height={35}
              className={cn(
                "absolute inset-0 -z-20 opacity-25 pointer-events-none",
                "[mask-image:linear-gradient(to bottom left, rgba(255,255,255,1) 70%, rgba(0, 0, 0, 0) 100%)]"
              )}
            />
            <div className="p-10 h-full flex flex-col justify-center">
              <form onSubmit={handleRegister} className="space-y-5">

                <button
                  type="button"
                  onClick={() => googleRegister()}
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
                      name="email"
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
                      id="password"
                      name="password"
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

                <div className="space-y-2 group">
                  <label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirm Password
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
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="mt-1" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <button type="submit" className="rounded-2xl w-full btn-gold">
                  Create Account
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-muted-foreground text-sm">Already have an account?</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <Link to="/register">
                <button className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mt-2
                           bg-gray-800 text-white border border-gray-600
                           hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
                  Sign In
                </button>
              </Link>

              <p className="text-center text-xs text-muted-foreground mt-8">
                We'll never share your information with third parties.{" "}
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

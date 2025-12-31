import type React from "react"

import { Link } from "react-router-dom"
import logo from "../assets/lumiere.png";
import { Menu, X, Scissors, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export function Navbar() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const targetPosition = el.getBoundingClientRect().top + window.scrollY;

    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition

    const duration = 1200
    let start: number | null = null

    const easeInOutCubic = (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime

      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)

      window.scrollTo(
        0,
        startPosition + distance * easeInOutCubic(progress)
      )

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  };

  const goToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  const goToPage = (path: string) => {
    navigate(path);
  };


  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-80 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lumière Logo" className="h-16 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => goToSection("services")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 gap-2">
              <Scissors size={15} />
              <span>Services</span>
            </div>
          </button>
          <button onClick={() => goToSection("hero")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>Home</span>
            </div>
          </button>
          <button onClick={() => goToSection("about")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>About</span>
            </div>
          </button>
          <button onClick={() => goToSection("contact")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>Contact</span>
            </div>
          </button>
          <button onClick={() => goToPage("/booking")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>Booking</span>
            </div>
          </button>
          <button onClick={() => goToPage("/register")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>SignUp</span>
            </div>
          </button>
          <button onClick={() => goToPage("/login")}
            className="relative text-sm font-medium text-foreground/80 group">
            <div className="flex items-center space-x-1 text-primary gap-2">
              <Scissors size={15} />
              <span>Login</span>
            </div>
          </button>
          {token && (
            <NavLink href="/profile">
              <div className="flex items-center text-primary gap-2">
                <User size={22} strokeWidth={1.8} />
              </div>
            </NavLink>
          )}
        </div>

        <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t border-border p-4 md:hidden shadow-lg flex flex-col gap-4">
          <MobileNavLink href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium">
            Services
          </MobileNavLink>
          <MobileNavLink href="#stylists" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium">
            Home
          </MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium">
            About
          </MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium">
            Contact
          </MobileNavLink>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="relative text-sm font-medium text-foreground/80 group"
    >
      {children}

      <span
        className="
          absolute -bottom-1 left-0 h-[2px] w-0 
          nav-gold-line
          transition-all duration-500 ease-out 
          group-hover:w-full
        "
      ></span>
    </Link>
  );
}



function MobileNavLink({ href, onClick, children, className = "" }: { href: string; onClick: () => void; children: React.ReactNode, className?: string }) {
  return (
    <Link to={href} onClick={onClick} className={`block py-2 text-lg font-serif text-foreground/80 hover:text-primary ${className}`}>
      {children}
    </Link>
  )
}
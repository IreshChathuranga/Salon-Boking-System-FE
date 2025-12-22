import type React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/lumiere.png";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 z-60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-7">
          <div className="space-y-6">
            <img src={logo} alt="Lumière Logo" className="h-10 object-contain" />
            <p className="text-primary-foreground/80 max-w-xs leading-relaxed">
              Elevating beauty through sustainable practices and expert artistry since 2024.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Instagram size={20} />} />
              <SocialLink icon={<Facebook size={20} />} />
              <SocialLink icon={<Twitter size={20} />} />
            </div>
          </div>

          <div>
            <h5 className="font-serif text-lg font-medium mb-6">Quick Links</h5>
            <ul className="space-y-4">
              <li>
                <FooterLink href="#home">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="#about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="#services">Services</FooterLink>
              </li>
              <li>
                <FooterLink href="#careers">Careers</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-lg font-medium mb-6">Services</h5>
            <ul className="space-y-4">
              <li>
                <FooterLink href="#">Hair Cutting</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Coloring</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Styling</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Treatments</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-lg font-medium mb-6">Contact</h5>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>
                  123 Beauty Lane, <br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0" />
                <span>hello@lumieresalon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© 2025 Lumière Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              Design by Iresh Chathuranga
            </Link>
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-primary-foreground"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover:pl-1">
      {children}
    </Link>
  )
}

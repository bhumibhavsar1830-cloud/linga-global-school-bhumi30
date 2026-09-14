import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Academics', to: '/academics' },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Transport', to: '/transport' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Mandatory Disclosure', to: '/mandatory-disclosure' },
  { label: 'Enquiry', to: '/enquiry' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`
        sticky
        top-0
        z-50
        border-b
        transition-all
        duration-300
        ${
          scrolled
            ? `
              bg-[#FAF7F3]/95
              border-[#292629]/10
              backdrop-blur-md
            `
            : `
              bg-[#FAF7F3]/95
              border-transparent
            `
        }
      `}
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          md:px-8
          flex
          items-center
          justify-between
          h-16
          md:h-20
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Linga Global School"
            className="
              h-9
              md:h-10
              w-auto
              object-contain
            "
          />
        </Link>


        {/* DESKTOP NAV */}

        <nav
          className="
            hidden
            lg:flex
            items-center
            gap-6
            xl:gap-7
          "
        >
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="
                text-[13px]
                xl:text-[13.5px]
                text-[#292629]/85
                hover:text-[#C98F9A]
                transition-colors
                duration-300
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>


        {/* MOBILE MENU */}

        <button
          type="button"
          className="
            lg:hidden
            p-2
            rounded-lg
            text-[#292629]
            hover:bg-[#F1E9E3]
            transition-colors
          "
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-[2px] bg-current mb-1.5" />
          <span className="block w-6 h-[2px] bg-current mb-1.5" />
          <span className="block w-4 h-[2px] bg-current" />
        </button>

      </div>


      {/* MOBILE NAV */}

      {open && (
        <nav
          className="
            lg:hidden
            px-5
            pb-5
            pt-2
            flex
            flex-col
            gap-1
            border-t
            bg-[#F1E9E3]
            border-[#292629]/10
          "
        >
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="
                py-3
                text-sm
                border-b
                text-[#292629]/85
                border-[#292629]/10
                hover:text-[#C98F9A]
                transition-colors
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
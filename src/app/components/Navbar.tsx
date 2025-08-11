"use client"
import { motion, AnimatePresence } from "framer-motion"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [showHomeIcon, setShowHomeIcon] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const listRef = useRef<HTMLUListElement | null>(null);

  const refs = useRef<{ [key: string]: HTMLLIElement | null }>({})

  const navItems = [
    { href: "/", label: "ACCUEIL" },
    { href: "/societe", label: "SOCIÉTÉ" },
    { href: "/services", label: "SERVICES" },
    { href: "/parteneriats", label: "PARTENARIATS" },
    { href: "/projets", label: "RÉALISATIONS" },
    { href: "/contact", label: "CONTACT" },
  ]

  const greenBgRoutes = ["/services", "/realisations", "/contact", "/parteneriats", "/societe", "/mentions-legales" ]
  const hasGreenBg = greenBgRoutes.includes(pathname)

  const toggleMenu = () => setIsOpen(!isOpen)

    // Masquer la navbar sur la page d’un projet
  if (pathname.startsWith("/projets/") && pathname.split("/").length === 3) {
    return null
  }
useEffect(() => {
  const GUTTER = 1; // petit espace visuel pour que les parenthèses ne touchent pas les lettres

  const recalc = () => {
    const li = refs.current[pathname];
    const ul = listRef.current;
    if (!li || !ul) return;

    const liRect = li.getBoundingClientRect();
    const ulRect = ul.getBoundingClientRect();

    // positions relatives au <ul>, et largeur du <li> (inclut padding horizontal)
    const left = Math.max(0, liRect.left - ulRect.left - GUTTER);
    const width = liRect.width + GUTTER * 2;

    setIndicatorStyle({ left, width });
    setShowHomeIcon(pathname !== "/");
  };

  recalc();

  // attendre le chargement des polices (évite les écarts Win/Mac)
  (document as any).fonts?.ready?.then(recalc);

  // recalculer au resize
  window.addEventListener("resize", recalc);

  // si l'élément actif change de taille (police, zoom, etc.)
  const li = refs.current[pathname];
  const ro = li ? new ResizeObserver(recalc) : null;
  if (li && ro) {
    ro.observe(li);
  }

  return () => {
    window.removeEventListener("resize", recalc);
    ro?.disconnect();
  };
}, [pathname]);


  return (
    <header className={`absolute top-0 z-50 w-full text-white ${hasGreenBg ? "bg-[#01794D]" : ""}`}>
     <nav
  className={`relative px-4 py-4 w-full flex items-center justify-between lg:justify-start ${
    isOpen ? "bg-[#01794D]" : ""
  }`}
>
        {/* Mobile button */}
       <div className="flex items-center justify-between w-full lg:hidden">
  {/* Logo à gauche */}
  <Link href="/" className="text-xl font-bold font-azoSans">
    <img
      src="/icons/LogoSimplePanoramaBlanc.svg"
      alt="PANORAMA"
      className="w-8 h-auto"
    />
  </Link>

  {/* Burger à droite */}
  <motion.button
    onClick={toggleMenu}
    aria-label="Toggle navigation"
    className="w-8 h-8 relative z-[110]"
    initial={false}
    animate={isOpen ? "open" : "closed"}
  >
    <motion.span
      className="absolute top-1/2 left-0 w-full h-[2px] bg-white rounded origin-center"
      variants={{
        closed: { rotate: 0, y: "-8px" },
        open: { rotate: 45, y: "0px" },
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="absolute top-1/2 left-0 w-full h-[2px] bg-white rounded origin-center"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute top-1/2 left-0 w-full h-[2px] bg-white rounded origin-center"
      variants={{
        closed: { rotate: 0, y: "8px" },
        open: { rotate: -45, y: "0px" },
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
</div>


        {/* Desktop nav */}
       <ul
  ref={listRef}
  className="hidden lg:flex relative font-azoSansMedium justify-between w-full"
>

          {/* Parentheses */}
          {pathname !== null && (
            <div
  className="absolute flex items-center pointer-events-none transition-all duration-500 ease-in-out"
  style={{
    left: indicatorStyle.left,
    width: indicatorStyle.width,
    top: "50%",
    transform: "translateY(-50%)",
    justifyContent: "space-between",
  }}
>

              <img
                src="/icons/parenthesesBlanc.svg"
                alt="("
                className="w-3 h-auto"
              />
              <img
                src="/icons/parenthesesBlanc.svg"
                alt=")"
                className="w-3 h-auto rotate-180"
              />
            </div>
          )}

          {navItems.map(({ href, label }) => (
            <li
              key={href}
              ref={(el) => {
  refs.current[href] = el
}}

              className="relative px-3 text-center flex items-center"
            >
              <Link href={href} className="inline-flex items-center justify-center h-full relative leading-none">
              {label === "ACCUEIL" ? (
  <span className="inline-flex items-center justify-center w-5 h-5">
    <motion.span
      className="w-3 h-3 bg-white rounded-full absolute"
      animate={showHomeIcon ? { scale: 3 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformOrigin: "center" }}
    />
    {showHomeIcon && (
      <img src="/icons/Home.svg" alt="home" className="w-[20px] h-[20px] relative block select-none pointer-events-none" />
    )}
  </span>
) : ( label )}

              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      key="mobileMenu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-full left-0 w-full bg-[#01794D] px-4 pb-4 text-white z-40 lg:hidden"
    >
      <ul className="flex flex-col gap-4 font-azoSansMedium">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} onClick={() => setIsOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  )
}

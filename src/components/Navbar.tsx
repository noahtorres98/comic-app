"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY); // down → hide, up → show
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav className={`navbar ${hidden ? "hidden" : ""}`}>
      <div className="brand">My Comics</div>

      <div className="nav-items">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/library" className="nav-link">
          Library
        </Link>
      </div>
    </nav>
  );
}

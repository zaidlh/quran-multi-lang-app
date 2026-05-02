"use client";

import { useState } from "react";

export function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebarOpen) {
      sidebar?.classList.add("open");
      overlay?.classList.add("visible");
    } else {
      sidebar?.classList.remove("open");
      overlay?.classList.remove("visible");
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.getElementById("sidebar")?.classList.remove("open");
    document.getElementById("sidebar-overlay")?.classList.remove("visible");
  };

  return (
    <>
      {/* Mobile header */}
      <header id="mobile-header" className="mobile-header lg:hidden">
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-stone-500">
            menu
          </span>
        </button>
        <span
          className="text-lg font-bold text-[--primary-container]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Sakinah
        </span>
        <a
          href="/search"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100"
        >
          <span className="material-symbols-outlined text-stone-500">
            search
          </span>
        </a>
      </header>

      {/* Mobile sidebar overlay */}
      <div
        id="sidebar-overlay"
        className="lg:hidden fixed inset-0 bg-black/30 z-[99] backdrop-blur-sm hidden"
        onClick={closeSidebar}
        style={{ display: sidebarOpen ? "block" : "none" }}
      />
    </>
  );
}
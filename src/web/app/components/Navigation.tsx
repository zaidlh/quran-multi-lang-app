"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const sections = [
  { id: "quran", name: "Quran", nameArabic: "القرآن", path: "/", icon: "📖" },
  { id: "adhkar", name: "Adhkar", nameArabic: "الأذكار", path: "/adhkar", icon: "🤲" },
  { id: "hadith", name: "Hadith", nameArabic: "الحديث", path: "/hadith", icon: "📚" },
  { id: "dua", name: "Dua", nameArabic: "الدعاء", path: "/dua", icon: "🤝" },
  { id: "prayer", name: "Prayer", nameArabic: "الصلاة", path: "/prayer", icon: "🕐" },
  { id: "calendar", name: "Calendar", nameArabic: "التقويم", path: "/calendar", icon: "📅" },
  { id: "learning", name: "Learning", nameArabic: "التعلم", path: "/learning", icon: "🎓" },
];

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container border-t border-outline-variant/20">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
        {sections.map((section) => {
          const isActive = pathname === section.path || 
            (section.path !== "/" && pathname.startsWith(section.path));
          
          return (
            <Link
              key={section.id}
              href={section.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? "text-primary-container" 
                  : "text-outline hover:text-on-surface"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -top-px w-8 h-0.5 bg-primary-container rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="text-xl">{section.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">
                {section.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1 px-4">
      {sections.map((section) => {
        const isActive = pathname === section.path || 
          (section.path !== "/" && pathname.startsWith(section.path));
        
        return (
          <Link
            key={section.id}
            href={section.path}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive 
                ? "bg-primary-container text-white" 
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {section.name}
          </Link>
        );
      })}
    </nav>
  );
}

export { sections };
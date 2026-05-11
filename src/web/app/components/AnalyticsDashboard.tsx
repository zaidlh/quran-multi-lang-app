"use client";

import { useState, useEffect } from "react";
import { usePersonalizationStore, useReadingStats, useDailyGoal } from "../lib/personalization";
import { useUILanguage } from "./UILanguageProvider";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-outline uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
          {subtitle && (
            <p className="text-xs text-outline mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const stats = useReadingStats();
  const dailyGoal = useDailyGoal();
  const { t, uiLang } = useUILanguage();
  
  // Calculate progress
  const goalProgress = Math.min(100, Math.round((dailyGoal.currentProgress / dailyGoal.ayahsToRead) * 100));
  
  // Weekly stats (simplified)
  const thisWeek = {
    daysRead: stats.sessionsCount || 0,
    avgMinutes: stats.averageSessionMinutes || 0,
  };
  
  // Readable surahs
  const readableSurahs = [...new Set(stats.favoriteSurahs)].slice(0, 5);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 lg:bottom-4 lg:right-20 z-40 w-12 h-12 rounded-full bg-primary-container text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label={uiLang === "ar" ? "الإحصائيات" : "Analytics"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/20 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {uiLang === "ar" ? "إحصائيات القراءة" : "Reading Analytics"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface-container rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Daily Goal Progress */}
            <div className="p-4 border-b border-outline-variant/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {uiLang === "ar" ? "الهدف اليومي" : "Daily Goal"}
                </span>
                <span className="text-sm text-outline">
                  {dailyGoal.currentProgress} / {dailyGoal.ayahsToRead} ayahs
                </span>
              </div>
              <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalProgress}%` }}
                  className="h-full bg-gradient-to-r from-primary-container to-primary-fixed rounded-full"
                />
              </div>
              <p className="text-xs text-outline mt-2 text-center">
                {goalProgress}% {uiLang === "ar" ? "مكتمل" : "complete"}
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title={uiLang === "ar" ? "آيات مقروءة" : "Ayahs Read"}
                  value={stats.totalReadAyahs?.toLocaleString() || "0"}
                  icon="📖"
                  color="#0f3d2e"
                />
                <StatCard
                  title={uiLang === "ar" ? "أيام متتالية" : "Day Streak"}
                  value={stats.streakCount || 0}
                  subtitle={uiLang === "ar" ? "أيام" : "days"}
                  icon="🔥"
                  color="#e4c368"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title={uiLang === "ar" ? "جلسات" : "Sessions"}
                  value={stats.sessionsCount || 0}
                  icon="⏱️"
                  color="#745b04"
                />
                <StatCard
                  title={uiLang === "ar" ? "المتوسط" : "Average"}
                  value={`${stats.averageSessionMinutes || 0}`}
                  subtitle={uiLang === "ar" ? "دقيقة/جلسة" : "min/session"}
                  icon="📊"
                  color="#8a918c"
                />
              </div>
            </div>
            
            {/* Favorite Surahs */}
            {readableSurahs.length > 0 && (
              <div className="p-4 border-t border-outline-variant/20">
                <h3 className="text-sm font-medium mb-3">
                  {uiLang === "ar" ? "السور المفضلة" : "Favorite Surahs"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {readableSurahs.map((num) => (
                    <span
                      key={num}
                      className="px-3 py-1.5 text-sm bg-surface-container rounded-full"
                    >
                      {uiLang === "ar" ? "سورة" : "Surah"} {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quick Stats */}
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container">
              <h3 className="text-sm font-medium mb-3">
                {uiLang === "ar" ? "إحصائيات سريعة" : "Quick Stats"}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-outline">
                    {uiLang === "ar" ? "النطق" : "Last Read"}
                  </span>
                  <span>{stats.lastReadDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">
                    {uiLang === "ar" ? "أقصى تن连胜" : "Best Streak"}
                  </span>
                  <span>{stats.streakCount || 0} {uiLang === "ar" ? "أيام" : "days"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// Progress ring component
export function ProgressRing({ 
  progress, 
  size = 60, 
  strokeWidth = 6,
  color = "#0f3d2e",
}: { 
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-surface-container-high"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
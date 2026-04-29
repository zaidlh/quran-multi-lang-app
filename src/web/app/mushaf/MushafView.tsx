"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface PageData {
  pageNumber: number;
  verses: { surah: number; surahName: string; ayah: number; text: string }[];
}

export function MushafView({ pages }: { pages: PageData[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [jumpInput, setJumpInput] = useState("");

  const goTo = useCallback(
    (page: number) => {
      if (page >= 0 && page < pages.length) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pages.length]
  );

  const page = pages[currentPage];
  if (!page) return null;

  const surahsOnPage = [...new Set(page.verses.map((v) => ({ name: v.surahName, num: v.surah })))].filter(
    (v, i, arr) => arr.findIndex((x) => x.num === v.num) === i
  );

  const progress = Math.round(((currentPage + 1) / pages.length) * 100);

  return (
    <div className="space-y-5">

      {/* ── Progress bar ── */}
      <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "var(--primary)" }}
        />
      </div>

      {/* ── Top nav bar ── */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
          className="btn btn-ghost h-10 px-4 rounded-xl text-sm disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        {/* Page info */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-extrabold text-sm tabular-nums">
            Page {page.pageNumber}
            <span className="text-muted font-normal"> / {pages.length}</span>
          </span>
          <span className="text-[11px] text-muted">{progress}% complete</span>
        </div>

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
          className="btn btn-ghost h-10 px-4 rounded-xl text-sm disabled:opacity-30"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Surah breadcrumb ── */}
      <div className="flex flex-wrap items-center gap-1.5 justify-center">
        {surahsOnPage.map((s) => (
          <Link
            key={s.num}
            href={`/surah/${s.num}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all hover:shadow-sm"
            style={{ background: "var(--primary-light)", color: "var(--primary)", border: "1px solid rgba(13,125,110,0.2)" }}
          >
            {s.name}
            <svg className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        ))}
      </div>

      {/* ── Mushaf page ── */}
      <div
        className="rounded-2xl border overflow-hidden shadow-md"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(135deg, #fdf8ed 0%, #fef9f0 100%)",
        }}
      >
        {/* Top ornament */}
        <div
          className="h-2"
          style={{ background: "linear-gradient(90deg, var(--primary), var(--gold), var(--primary))" }}
        />

        <div className="px-6 py-10 sm:px-12 sm:py-14 min-h-[65vh]" dir="rtl">
          <p className="arabic-text leading-[3.2] text-zinc-800" style={{ fontSize: "1.6rem" }}>
            {page.verses.map((v) => (
              <span key={`${v.surah}-${v.ayah}`}>
                {v.text}{" "}
                <span
                  className="inline-flex items-center justify-center font-sans text-xs font-bold rounded-full mx-1"
                  style={{
                    width: "1.7rem",
                    height: "1.7rem",
                    background: "rgba(13,125,110,0.10)",
                    color: "var(--primary)",
                    border: "1px solid rgba(13,125,110,0.2)",
                    verticalAlign: "middle",
                  }}
                >
                  {v.ayah}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Bottom ornament */}
        <div
          className="h-1"
          style={{ background: "linear-gradient(90deg, var(--primary), var(--gold), var(--primary))" }}
        />
      </div>

      {/* ── Jump to page ── */}
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="mushaf-jump" className="text-sm text-muted font-medium whitespace-nowrap">
          Go to page:
        </label>
        <div className="flex gap-2">
          <input
            id="mushaf-jump"
            type="number"
            min={1}
            max={pages.length}
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                goTo(Number(jumpInput) - 1);
                setJumpInput("");
              }
            }}
            placeholder={String(currentPage + 1)}
            className="input w-20 text-center h-9 text-sm"
          />
          <button
            onClick={() => { goTo(Number(jumpInput) - 1); setJumpInput(""); }}
            className="btn btn-primary h-9 px-4 rounded-xl text-xs"
          >
            Go
          </button>
        </div>
      </div>

      {/* ── Quick jump dots ── */}
      <div className="flex items-center justify-center gap-1 flex-wrap pb-2">
        {Array.from({ length: Math.min(30, pages.length) }, (_, i) => {
          const targetPage = Math.floor((i / 30) * pages.length);
          const active = Math.floor((currentPage / pages.length) * 30) === i;
          return (
            <button
              key={i}
              onClick={() => goTo(targetPage)}
              title={`Juz ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: active ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                background: active ? "var(--primary)" : "var(--border-strong)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

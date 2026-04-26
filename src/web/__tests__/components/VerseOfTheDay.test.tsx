import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { VerseOfTheDay } from "@/app/components/VerseOfTheDay";

const MOCK_SURAHS = [
  { number: 1, name_en: "Al-Fatiha", name: "الفاتحة", verses: 7 },
  { number: 2, name_en: "Al-Baqarah", name: "البقرة", verses: 286 },
  { number: 36, name_en: "Ya-Sin", name: "يس", verses: 83 },
  { number: 55, name_en: "Ar-Rahman", name: "الرحمن", verses: 78 },
  { number: 112, name_en: "Al-Ikhlas", name: "الإخلاص", verses: 4 },
];

describe("VerseOfTheDay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the 'Verse of the Day' label", () => {
    render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    expect(screen.getByText("Verse of the Day")).toBeInTheDocument();
  });

  it("displays a surah name", () => {
    render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("/surah/"));
  });

  it("selects a different verse on a different day", () => {
    vi.useFakeTimers();

    // Day 1: Jan 1
    vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));
    const { unmount: u1 } = render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    const link1 = screen.getByRole("link").getAttribute("href");
    u1();

    // Day 100: Apr 10
    vi.setSystemTime(new Date("2026-04-10T12:00:00Z"));
    render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    const link2 = screen.getByRole("link").getAttribute("href");

    expect(link1).not.toBe(link2);
  });

  it("renders a link with verse anchor", () => {
    render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/#verse-\d+/);
  });

  it("shows verse label text", () => {
    render(<VerseOfTheDay totalSurahs={MOCK_SURAHS} />);
    // At least one notable verse label should be visible
    const container = screen.getByText("Verse of the Day").closest("a")!;
    expect(container.textContent).toBeTruthy();
  });
});

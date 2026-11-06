import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookmarkButton } from "@/app/components/BookmarkButton";

describe("BookmarkButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders with 'Add bookmark' label by default", () => {
    render(<BookmarkButton surahNumber={1} />);
    expect(screen.getByLabelText("Add bookmark")).toBeInTheDocument();
  });

  it("toggles to bookmarked state on click", async () => {
    const user = userEvent.setup();
    render(<BookmarkButton surahNumber={1} />);

    await user.click(screen.getByLabelText("Add bookmark"));
    expect(screen.getByLabelText("Remove bookmark")).toBeInTheDocument();
  });

  it("persists bookmark to localStorage", async () => {
    const user = userEvent.setup();
    render(<BookmarkButton surahNumber={2} ayahNumber={255} />);

    await user.click(screen.getByLabelText("Add bookmark"));

    const bookmarks = JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].surah).toBe(2);
    expect(bookmarks[0].ayah).toBe(255);
    expect(bookmarks[0].timestamp).toBeGreaterThan(0);
  });

  it("removes bookmark on second click", async () => {
    const user = userEvent.setup();
    render(<BookmarkButton surahNumber={1} />);

    await user.click(screen.getByLabelText("Add bookmark"));
    expect(screen.getByLabelText("Remove bookmark")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Remove bookmark"));
    expect(screen.getByLabelText("Add bookmark")).toBeInTheDocument();

    const bookmarks = JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    expect(bookmarks).toHaveLength(0);
  });

  it("handles pre-existing bookmarks", () => {
    localStorage.setItem(
      "quran-bookmarks",
      JSON.stringify([{ surah: 36, ayah: 1, timestamp: 1000 }])
    );

    render(<BookmarkButton surahNumber={36} ayahNumber={1} />);
    expect(screen.getByLabelText("Remove bookmark")).toBeInTheDocument();
  });

  it("handles surah-level bookmarks (no ayah)", async () => {
    const user = userEvent.setup();
    render(<BookmarkButton surahNumber={18} />);

    await user.click(screen.getByLabelText("Add bookmark"));

    const bookmarks = JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    expect(bookmarks[0].surah).toBe(18);
    expect(bookmarks[0].ayah).toBeUndefined();
  });
});

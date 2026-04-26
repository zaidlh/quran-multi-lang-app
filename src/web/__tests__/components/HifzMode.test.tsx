import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HifzMode } from "@/app/components/HifzMode";

const MOCK_VERSES = [
  { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
  { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
  { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ" },
];

describe("HifzMode", () => {
  it("renders the Hifz Mode button when inactive", () => {
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);
    expect(screen.getByText("Hifz Mode")).toBeInTheDocument();
  });

  it("shows difficulty levels when activated", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));

    expect(screen.getByText("Off")).toBeInTheDocument();
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 2")).toBeInTheDocument();
    expect(screen.getByText("Level 3")).toBeInTheDocument();
  });

  it("shows instruction text for level 1", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));
    expect(
      screen.getByText("Every 3rd word is shown. Tap a verse to reveal it.")
    ).toBeInTheDocument();
  });

  it("shows instruction text for level 2", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));
    await user.click(screen.getByText("Level 2"));

    expect(screen.getByText("Only the first word of each verse is shown.")).toBeInTheDocument();
  });

  it("hides all words at level 3", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));
    await user.click(screen.getByText("Level 3"));

    expect(screen.getByText("All words are hidden. Recite from memory!")).toBeInTheDocument();
  });

  it("exits hifz mode", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));
    expect(screen.getByText("Exit")).toBeInTheDocument();

    await user.click(screen.getByText("Exit"));
    expect(screen.getByText("Hifz Mode")).toBeInTheDocument();
  });

  it("renders verse numbers", async () => {
    const user = userEvent.setup();
    render(<HifzMode verses={MOCK_VERSES} surahNumber={1} />);

    await user.click(screen.getByText("Hifz Mode"));

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

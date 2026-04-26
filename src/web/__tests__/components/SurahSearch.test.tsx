import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SurahSearch } from "@/app/components/SurahSearch";

const MOCK_SURAHS = [
  {
    number: 1,
    name: "الفاتحة",
    name_en: "Al-Fatiha",
    name_translation: "The Opening",
    verses: 7,
    revelation_type: "Meccan",
  },
  {
    number: 2,
    name: "البقرة",
    name_en: "Al-Baqarah",
    name_translation: "The Cow",
    verses: 286,
    revelation_type: "Medinan",
  },
  {
    number: 114,
    name: "الناس",
    name_en: "An-Nas",
    name_translation: "Mankind",
    verses: 6,
    revelation_type: "Meccan",
  },
];

// Default UI language is Arabic; labels come from UI_LABELS.ar
// Numbers are formatted with Intl.NumberFormat("ar-SA") → Eastern Arabic numerals
const AR = {
  placeholder: "ابحث عن سورة...",
  results: "نتيجة",
  meccan: "مكية",
  medinan: "مدنية",
  verses: "آيات",
  num: (n: number) => new Intl.NumberFormat("ar-SA").format(n),
};

describe("SurahSearch", () => {
  it("renders all surahs by default", () => {
    render(<SurahSearch surahs={MOCK_SURAHS} />);
    expect(screen.getByText(`${AR.num(3)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.getByText("Al-Baqarah")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("filters surahs by search query (name)", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText(AR.placeholder);
    await user.type(input, "Fatiha");

    expect(screen.getByText(`${AR.num(1)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.queryByText("Al-Baqarah")).not.toBeInTheDocument();
  });

  it("filters surahs by number", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText(AR.placeholder);
    await user.type(input, "114");

    expect(screen.getByText(`${AR.num(1)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("filters by revelation type — Meccan", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: AR.meccan }));
    expect(screen.getByText(`${AR.num(2)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
    expect(screen.queryByText("Al-Baqarah")).not.toBeInTheDocument();
  });

  it("filters by revelation type — Medinan", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: AR.medinan }));
    expect(screen.getByText(`${AR.num(1)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("Al-Baqarah")).toBeInTheDocument();
  });

  it("combines search and filter", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: AR.meccan }));
    const input = screen.getByPlaceholderText(AR.placeholder);
    await user.type(input, "Nas");

    expect(screen.getByText(`${AR.num(1)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("shows 0 surahs when no match", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText(AR.placeholder);
    await user.type(input, "nonexistent");

    expect(screen.getByText(`${AR.num(0)} ${AR.results}`)).toBeInTheDocument();
  });

  it("searches by Arabic name", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText(AR.placeholder);
    await user.type(input, "الفاتحة");

    expect(screen.getByText(`${AR.num(1)} ${AR.results}`)).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
  });

  it("displays verse count and revelation type", () => {
    render(<SurahSearch surahs={MOCK_SURAHS} />);
    expect(screen.getByText(`${AR.num(7)} ${AR.verses}`)).toBeInTheDocument();
    expect(screen.getByText(`${AR.num(286)} ${AR.verses}`)).toBeInTheDocument();
  });
});

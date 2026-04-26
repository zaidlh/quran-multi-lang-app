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

describe("SurahSearch", () => {
  it("renders all surahs by default", () => {
    render(<SurahSearch surahs={MOCK_SURAHS} />);
    expect(screen.getByText("3 surahs")).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.getByText("Al-Baqarah")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("filters surahs by search query (name)", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText("Search surahs by name or number...");
    await user.type(input, "Fatiha");

    expect(screen.getByText("1 surahs")).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.queryByText("Al-Baqarah")).not.toBeInTheDocument();
  });

  it("filters surahs by number", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText("Search surahs by name or number...");
    await user.type(input, "114");

    expect(screen.getByText("1 surahs")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("filters by revelation type — Meccan", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: "Meccan" }));
    expect(screen.getByText("2 surahs")).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
    expect(screen.queryByText("Al-Baqarah")).not.toBeInTheDocument();
  });

  it("filters by revelation type — Medinan", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: "Medinan" }));
    expect(screen.getByText("1 surahs")).toBeInTheDocument();
    expect(screen.getByText("Al-Baqarah")).toBeInTheDocument();
  });

  it("combines search and filter", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    await user.click(screen.getByRole("button", { name: "Meccan" }));
    const input = screen.getByPlaceholderText("Search surahs by name or number...");
    await user.type(input, "Nas");

    expect(screen.getByText("1 surahs")).toBeInTheDocument();
    expect(screen.getByText("An-Nas")).toBeInTheDocument();
  });

  it("shows 0 surahs when no match", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText("Search surahs by name or number...");
    await user.type(input, "nonexistent");

    expect(screen.getByText("0 surahs")).toBeInTheDocument();
  });

  it("searches by Arabic name", async () => {
    const user = userEvent.setup();
    render(<SurahSearch surahs={MOCK_SURAHS} />);

    const input = screen.getByPlaceholderText("Search surahs by name or number...");
    await user.type(input, "الفاتحة");

    expect(screen.getByText("1 surahs")).toBeInTheDocument();
    expect(screen.getByText("Al-Fatiha")).toBeInTheDocument();
  });

  it("displays verse count and revelation type", () => {
    render(<SurahSearch surahs={MOCK_SURAHS} />);
    expect(screen.getByText("7 verses")).toBeInTheDocument();
    expect(screen.getByText("286 verses")).toBeInTheDocument();
  });
});

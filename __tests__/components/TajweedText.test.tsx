import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TajweedText } from "@/app/components/TajweedText";

describe("TajweedText", () => {
  it("renders the toggle button", () => {
    render(<TajweedText text="بِسْمِ اللَّهِ" />);
    expect(screen.getByText("Show Tajweed")).toBeInTheDocument();
  });

  it("does not show colored text by default", () => {
    render(<TajweedText text="بِسْمِ اللَّهِ" />);
    expect(screen.queryByText("● Shaddah")).not.toBeInTheDocument();
  });

  it("shows legend when tajweed is enabled", async () => {
    const user = userEvent.setup();
    render(<TajweedText text="بِسْمِ اللَّهِ" />);

    await user.click(screen.getByText("Show Tajweed"));

    expect(screen.getByText("Hide Tajweed")).toBeInTheDocument();
    expect(screen.getByText("● Shaddah")).toBeInTheDocument();
    expect(screen.getByText("● Ikhfa")).toBeInTheDocument();
    expect(screen.getByText("● Idgham")).toBeInTheDocument();
    expect(screen.getByText("● Izhar")).toBeInTheDocument();
    expect(screen.getByText("● Iqlab")).toBeInTheDocument();
    expect(screen.getByText("● Tanween")).toBeInTheDocument();
    expect(screen.getByText("● Madd")).toBeInTheDocument();
  });

  it("toggles tajweed off", async () => {
    const user = userEvent.setup();
    render(<TajweedText text="بِسْمِ اللَّهِ" />);

    await user.click(screen.getByText("Show Tajweed"));
    expect(screen.getByText("Hide Tajweed")).toBeInTheDocument();

    await user.click(screen.getByText("Hide Tajweed"));
    expect(screen.getByText("Show Tajweed")).toBeInTheDocument();
    expect(screen.queryByText("● Shaddah")).not.toBeInTheDocument();
  });

  it("applies color classes to Shaddah characters", async () => {
    const user = userEvent.setup();
    // اللَّهِ contains a shaddah (ّ) followed by a fatha (َ)
    render(<TajweedText text="اللَّهِ" />);
    await user.click(screen.getByText("Show Tajweed"));

    const container = screen.getByText("Hide Tajweed").closest("div")!;
    const coloredSpans = container.querySelectorAll("span.text-red-600");
    expect(coloredSpans.length).toBeGreaterThan(0);
  });
});

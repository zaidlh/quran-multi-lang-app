import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShareButton } from "../app/components/ShareButton";

const meta: Meta<typeof ShareButton> = {
  title: "Components/ShareButton",
  component: ShareButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Share or copy a verse with its translation. Uses the Web Share API on supported browsers, falls back to clipboard copy.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    surahNumber: 2,
    ayahNumber: 255,
    surahName: "Al-Baqarah",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    translationText:
      "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookmarkButton } from "../app/components/BookmarkButton";

const meta: Meta<typeof BookmarkButton> = {
  title: "Components/BookmarkButton",
  component: BookmarkButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle button for bookmarking surahs or individual verses. State is persisted in localStorage.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SurahLevel: Story = {
  args: {
    surahNumber: 1,
  },
};

export const VerseLevel: Story = {
  args: {
    surahNumber: 2,
    ayahNumber: 255,
  },
};

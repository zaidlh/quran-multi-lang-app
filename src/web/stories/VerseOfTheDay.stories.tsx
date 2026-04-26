import type { Meta, StoryObj } from "@storybook/react-vite";
import { VerseOfTheDay } from "../app/components/VerseOfTheDay";

const MOCK_SURAHS = [
  { number: 1, name_en: "Al-Fatihah", name: "الفاتحة", verses: 7 },
  { number: 2, name_en: "Al-Baqarah", name: "البقرة", verses: 286 },
  { number: 3, name_en: "Aal-e-Imran", name: "آل عمران", verses: 200 },
  { number: 13, name_en: "Ar-Ra'd", name: "الرعد", verses: 43 },
  { number: 18, name_en: "Al-Kahf", name: "الكهف", verses: 110 },
  { number: 24, name_en: "An-Nur", name: "النور", verses: 64 },
  { number: 36, name_en: "Ya-Sin", name: "يس", verses: 83 },
  { number: 39, name_en: "Az-Zumar", name: "الزمر", verses: 75 },
  { number: 40, name_en: "Ghafir", name: "غافر", verses: 85 },
  { number: 49, name_en: "Al-Hujurat", name: "الحجرات", verses: 18 },
  { number: 50, name_en: "Qaf", name: "ق", verses: 45 },
  { number: 55, name_en: "Ar-Rahman", name: "الرحمن", verses: 78 },
  { number: 57, name_en: "Al-Hadid", name: "الحديد", verses: 29 },
  { number: 59, name_en: "Al-Hashr", name: "الحشر", verses: 24 },
  { number: 65, name_en: "At-Talaq", name: "الطلاق", verses: 12 },
  { number: 67, name_en: "Al-Mulk", name: "الملك", verses: 30 },
  { number: 73, name_en: "Al-Muzzammil", name: "المزمل", verses: 20 },
  { number: 93, name_en: "Ad-Duha", name: "الضحى", verses: 11 },
  { number: 94, name_en: "Ash-Sharh", name: "الشرح", verses: 8 },
  { number: 112, name_en: "Al-Ikhlas", name: "الإخلاص", verses: 4 },
];

const meta: Meta<typeof VerseOfTheDay> = {
  title: "Components/VerseOfTheDay",
  component: VerseOfTheDay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays a daily rotating notable verse from a curated list of 30 verses. The selection is based on the day of the year.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalSurahs: MOCK_SURAHS,
  },
};

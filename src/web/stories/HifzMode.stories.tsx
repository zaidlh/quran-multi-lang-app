import type { Meta, StoryObj } from "@storybook/react-vite";
import { HifzMode } from "../app/components/HifzMode";

const FATIHA_VERSES = [
  { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
  { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
  { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ" },
  { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ" },
  { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
  { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
  {
    number: 7,
    text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
  },
];

const meta: Meta<typeof HifzMode> = {
  title: "Components/HifzMode",
  component: HifzMode,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Memorization (Hifz) mode with 4 difficulty levels. Words are progressively hidden to help users memorize verses. Tap a verse to reveal it.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AlFatiha: Story = {
  args: {
    verses: FATIHA_VERSES,
    surahNumber: 1,
  },
};

export const ShortSurah: Story = {
  args: {
    verses: [
      { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ" },
      { number: 2, text: "اللَّهُ الصَّمَدُ" },
      { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
      { number: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" },
    ],
    surahNumber: 112,
  },
};

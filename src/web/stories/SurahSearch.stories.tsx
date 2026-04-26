import type { Meta, StoryObj } from "@storybook/react-vite";
import { SurahSearch } from "../app/components/SurahSearch";

const SAMPLE_SURAHS = [
  {
    number: 1,
    name: "الفاتحة",
    name_en: "Al-Fatihah",
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
    number: 3,
    name: "آل عمران",
    name_en: "Aal-e-Imran",
    name_translation: "The Family of Imran",
    verses: 200,
    revelation_type: "Medinan",
  },
  {
    number: 36,
    name: "يس",
    name_en: "Ya-Sin",
    name_translation: "Ya-Sin",
    verses: 83,
    revelation_type: "Meccan",
  },
  {
    number: 55,
    name: "الرحمن",
    name_en: "Ar-Rahman",
    name_translation: "The Most Gracious",
    verses: 78,
    revelation_type: "Medinan",
  },
  {
    number: 67,
    name: "الملك",
    name_en: "Al-Mulk",
    name_translation: "The Dominion",
    verses: 30,
    revelation_type: "Meccan",
  },
  {
    number: 112,
    name: "الإخلاص",
    name_en: "Al-Ikhlas",
    name_translation: "Sincerity",
    verses: 4,
    revelation_type: "Meccan",
  },
  {
    number: 113,
    name: "الفلق",
    name_en: "Al-Falaq",
    name_translation: "The Daybreak",
    verses: 5,
    revelation_type: "Meccan",
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

const meta: Meta<typeof SurahSearch> = {
  title: "Components/SurahSearch",
  component: SurahSearch,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A searchable, filterable grid of surahs with support for text search and Meccan/Medinan filtering.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    surahs: SAMPLE_SURAHS,
  },
};

export const FewSurahs: Story = {
  args: {
    surahs: SAMPLE_SURAHS.slice(0, 3),
  },
};

export const Empty: Story = {
  args: {
    surahs: [],
  },
};

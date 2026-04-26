import type { Meta, StoryObj } from "@storybook/react-vite";
import { TajweedText } from "../app/components/TajweedText";

const meta: Meta<typeof TajweedText> = {
  title: "Components/TajweedText",
  component: TajweedText,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays Arabic text with optional tajweed color-coding. Toggle to highlight 7 tajweed rules: Shaddah, Ikhfa, Idgham, Izhar, Iqlab, Tanween, and Madd.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Bismillah: Story = {
  args: {
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  },
};

export const AyatAlKursi: Story = {
  args: {
    text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
  },
};

export const AlFatiha: Story = {
  args: {
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ",
  },
};

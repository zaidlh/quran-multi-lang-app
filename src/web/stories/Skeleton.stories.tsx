import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../app/components/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Animated skeleton loader for content placeholders. Uses a pulse animation and accepts custom className for sizing.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-4 w-48",
  },
};

export const Large: Story = {
  args: {
    className: "h-8 w-64",
  },
};

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full",
  },
};

export const Card: Story = {
  args: {
    className: "h-32 w-full rounded-lg",
  },
};

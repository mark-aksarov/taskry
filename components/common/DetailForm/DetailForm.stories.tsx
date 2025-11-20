import { Item } from "react-stately";
import { DetailForm } from "./DetailForm";
import { DetailFormLabel } from "./DetailFormLabel";
import { DetailFormSelect } from "./DetailFormSelect";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Apple, Banana, Calendar, Citrus, Heart } from "lucide-react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DetailFormDatePicker } from "./DetailFormDatePicker";
import { DetailFormFieldSkeleton } from "./DetailFormFieldSkeleton";

const meta = {
  title: "Components/common/DetailForm",
  component: DetailForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[350px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof DetailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <DetailFormSelect
          label={
            <DetailFormLabel>
              <Heart size={16} /> Label
            </DetailFormLabel>
          }
          placeholder="Select an option"
        >
          <Item textValue="Apple" key="apple">
            <Apple size={16} /> Apple
          </Item>
          <Item textValue="Banana" key="banana">
            <Banana size={16} /> Banana
          </Item>
          <Item textValue="Orange" key="orange">
            <Citrus size={16} />
            Orange
          </Item>
        </DetailFormSelect>
        <DetailFormDatePicker
          label={
            <DetailFormLabel>
              <Calendar size={16} /> Label
            </DetailFormLabel>
          }
        />
      </>
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    children: (
      <>
        <DetailFormFieldSkeleton />
        <DetailFormFieldSkeleton />
      </>
    ),
  },
};

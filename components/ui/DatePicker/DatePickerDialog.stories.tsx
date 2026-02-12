import { DatePicker } from "../DatePicker";
import { fn } from "storybook/test";
import { DateValue, I18nProvider } from "react-aria";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Form } from "react-aria-components";
import { Button } from "../Button";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

type DatePickerPropsWithLocaleArgs = React.ComponentProps<typeof DatePicker> & {
  locale: string;
};

const meta = {
  title: "Components/ui/DatePicker",
  component: DatePicker,
  argTypes: {
    locale: {
      control: "select",
      options: [
        "en-US",
        "en-GB",
        "es-ES",
        "fr-FR",
        "de-DE",
        "pt-BR",
        "ru-RU",
        "zh-CN",
        "zh-TW",
        "ja-JP",
        "ko-KR",
        "ar-AE",
      ],
    },
  },
  args: {
    onChange: fn(),
    locale: "en-US",
    errorMessage: "Error message",
    label: "Label",
    overlayClassName: "w-[var(--trigger-width)]",
    isDisabled: false,
  },
  render: ({ locale, ...args }) => (
    <I18nProvider locale={locale}>
      <DatePicker {...args} />
    </I18nProvider>
  ),
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<DatePickerPropsWithLocaleArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSheet = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  args: {
    overlayType: "bottomsheet",
  },
} satisfies Story;

export const WithMinMaxValue = {
  args: {
    minValue: today(getLocalTimeZone()),
  },
} satisfies Story;

export const WithUnavailableDates = {
  args: {
    isDateUnavailable: (date: DateValue) => date < today(getLocalTimeZone()),
  },
} satisfies Story;

export const Invalid = {
  args: {
    isInvalid: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    isDisabled: true,
  },
} satisfies Story;

export const Validation = {
  args: {
    isRequired: true,
    className: "w-full",
    name: "text-field",
  },
  decorators: [
    (Story) => (
      <Form className="flex flex-col items-start gap-4">
        <Story />
        <Button
          type="submit"
          label="Submit"
          className="w-full justify-center"
        />
      </Form>
    ),
  ],
} satisfies Story;

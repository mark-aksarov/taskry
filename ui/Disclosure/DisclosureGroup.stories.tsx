import { Disclosure } from "./Disclosure";
import { DisclosurePanel } from "./DisclosurePanel";
import { DisclosureGroup } from "./DisclosureGroup";
import { DisclosureHeader } from "./DisclosureHeader";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "UI/DisclosureGroup",
  component: DisclosureGroup,
  args: {
    children: "DisclosureGroup",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof DisclosureGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    className: "w-[250px] max-w-full",
    children: (
      <>
        <Disclosure>
          <DisclosureHeader>Personal Information</DisclosureHeader>
          <DisclosurePanel>
            <div className="space-y-2 pl-4 text-black dark:text-white">
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <p>Phone: +1 234 567 890</p>
              <p>Date of Birth: 1990-01-01</p>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <Disclosure>
          <DisclosureHeader>Billing Address</DisclosureHeader>
          <DisclosurePanel>
            <div className="space-y-2 pl-4 text-black dark:text-white">
              <p>Street: 123 Main St</p>
              <p>City: New York</p>
              <p>State: NY</p>
              <p>ZIP Code: 10001</p>
              <p>Country: USA</p>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </>
    ),
  },
} satisfies Story;

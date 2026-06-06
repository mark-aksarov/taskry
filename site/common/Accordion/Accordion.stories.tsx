import { Accordion } from "./Accordion";
import { AccordionItem } from "./AccordionItem";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionContent } from "./AccordionContent";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AccordionPanel } from "./AccordionPanel";

const meta = {
  title: "site/common/Accordion",
  component: Accordion,
  decorators: [withThemedBackground],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionHeader>Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>Accordion Header 2</AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>Accordion Header 3</AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>Accordion Header 4</AccordionHeader>
          <AccordionPanel>
            <AccordionContent>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </AccordionContent>
          </AccordionPanel>
        </AccordionItem>
      </>
    ),
  },
} satisfies Story;

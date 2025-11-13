import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGrid } from "./CustomerGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItem } from "../CustomerGridItem";

const meta = {
  title: "Components/customers/CustomerGrid",
  component: CustomerGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <CustomerGridItem
          id={1}
          fullName="Sophia Turner"
          imageUrl="/woman.jpg"
          email="sophia.turner@example.com"
          phoneNumber="+1-202-555-0101"
          publicLink="https://company.com/customers/sophia"
          company={{ id: 1, name: "TechCorp" }}
        />
        <CustomerGridItem
          id={2}
          fullName="Liam Parker"
          imageUrl="/man.jpg"
          email="liam.parker@example.com"
          phoneNumber="+1-202-555-0123"
          publicLink="https://company.com/customers/liam"
          company={{ id: 1, name: "TechCorp" }}
        />
        <CustomerGridItem
          id={3}
          fullName="Olivia Hughes"
          imageUrl="/woman.jpg"
          email="olivia.hughes@example.com"
          phoneNumber={undefined}
          publicLink={undefined}
          company={{ id: 2, name: "DesignStudio" }}
        />
        <CustomerGridItem
          id={4}
          fullName="Ethan Collins"
          imageUrl={undefined}
          email="ethan.collins@example.com"
          phoneNumber="+44-7700-900101"
          publicLink="https://company.com/customers/ethan"
          company={{ id: 2, name: "DesignStudio" }}
        />
        <CustomerGridItem
          id={5}
          fullName="Mia Foster"
          imageUrl="/woman.jpg"
          email="mia.foster@example.com"
          phoneNumber="+1-202-555-0145"
          publicLink="https://company.com/customers/mia"
          company={{ id: 3, name: "EcomWorld" }}
        />
      </>
    ),
  },
} satisfies Story;

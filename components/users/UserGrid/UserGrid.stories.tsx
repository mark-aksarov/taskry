import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserGrid } from "./UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItem } from "../UserGridItem";

const meta = {
  title: "Components/users/UserGrid",
  component: UserGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <UserGridItem
          id="user1"
          fullName="Liam Anderson"
          email="liam.anderson@example.com"
          imageUrl="/man.jpg"
          phoneNumber="+380990001001"
          publicLink="https://example.com/liam"
          position={{ name: "Developer" }}
        />
        <UserGridItem
          id="user2"
          fullName="Emma Thompson"
          email="emma.thompson@example.com"
          imageUrl="/woman.jpg"
          phoneNumber="+380990001002"
          publicLink="https://example.com/emma"
          position={{ name: "Designer" }}
        />
        <UserGridItem
          id="user3"
          fullName="Noah Robinson"
          email="noah.robinson@example.com"
          imageUrl={undefined}
          phoneNumber="+380990001003"
          publicLink="https://example.com/noah"
          position={{ name: "Product Manager" }}
        />
        <UserGridItem
          id="user4"
          fullName="Isabella Clark"
          email="isabella.clark@example.com"
          imageUrl={undefined}
          phoneNumber="+380990001004"
          publicLink="https://example.com/isabella"
          position={{ name: "Product Manager" }}
        />
        <UserGridItem
          id="user5"
          fullName="Ethan Lewis"
          email="ethan.lewis@example.com"
          imageUrl={undefined}
          phoneNumber="+380990001005"
          publicLink="https://example.com/ethan"
          position={{ name: "Developer" }}
        />
        <UserGridItem
          id="user6"
          fullName="Mia Walker"
          email="mia.walker@example.com"
          imageUrl="/woman.jpg"
          phoneNumber="+380990001006"
          publicLink="https://example.com/mia"
          position={{ name: "Designer" }}
        />
        <UserGridItem
          id="user7"
          fullName="Alexander Hall"
          email="alexander.hall@example.com"
          imageUrl="/man.jpg"
          phoneNumber="+380990001007"
          publicLink="https://example.com/alexander"
          position={{ name: "Designer" }}
        />
        <UserGridItem
          id="user8"
          fullName="Sophia Allen"
          email="sophia.allen@example.com"
          imageUrl="/woman.jpg"
          phoneNumber="+380990001008"
          publicLink="https://example.com/sophia"
          position={{ name: "Developer" }}
        />
        <UserGridItem
          id="user9"
          fullName="James Young"
          email="james.young@example.com"
          imageUrl="/man.jpg"
          phoneNumber="+380990001009"
          publicLink="https://example.com/james"
          position={{ name: "Developer" }}
        />
        <UserGridItem
          id="user10"
          fullName="Olivia King"
          email="olivia.king@example.com"
          imageUrl="/woman.jpg"
          phoneNumber="+380990001010"
          publicLink="https://example.com/olivia"
          position={{ name: "Developer" }}
        />
      </>
    ),
  },
} satisfies Story;

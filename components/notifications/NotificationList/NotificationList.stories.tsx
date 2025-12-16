import { Link } from "@/components/ui";
import { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationListItem } from "../NotificationListItem";

const meta = {
  title: "Components/notifications/NotificationList",
  component: NotificationList,
  parameters: {
    backgroundVariant: "alt",
    layout: "fullscreen",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <NotificationListItem
          isRead={false}
          date={new Date()}
          actor={{
            id: "user-1",
            fullName: "Alice Johnson",
            imageUrl: "/woman.jpg",
          }}
          type="taskAdded"
          target={<Link href="#">Create Landing Page</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-2",
            fullName: "Bob Smith",
            imageUrl: "/man.jpg",
          }}
          comment={{
            content:
              "I totally agree with Alice. The performance improvements are noticeable, especially in larger datasets. One suggestion though: it might be helpful to include a loading indicator when switching between tabs, since the delay can confuse first-time users.",
            attachments: [],
          }}
          type="projectUpdated"
          target={<Link href="#">Website Redesign</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-3",
            fullName: "Emma Brown",
            imageUrl: "/woman.jpg",
          }}
          type="commentAdded"
          target={<Link href="#">Optimize SEO</Link>}
        />

        <NotificationListItem
          isRead={false}
          date={new Date()}
          actor={{
            id: "user-4",
            fullName: "John Doe",
            imageUrl: "/man.jpg",
          }}
          type="userAdded"
          target={<Link href="#">Michael Scott</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-5",
            fullName: "Pam Beesly",
            imageUrl: "/woman.jpg",
          }}
          type="customerAdded"
          target={<Link href="#">Dunder Mifflin Inc.</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-6",
            fullName: "Kevin Malone",
            imageUrl: "/man.jpg",
          }}
          type="taskDeleted"
          target="Weekly Report"
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-7",
            fullName: "Dwight Schrute",
            imageUrl: "/man.jpg",
          }}
          type="projectDeleted"
          target="Sales Dashboard"
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-8",
            fullName: "Angela Martin",
            imageUrl: "/woman.jpg",
          }}
          type="taskUpdated"
          target={<Link href="#">Budget Review</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-9",
            fullName: "Stanley Hudson",
            imageUrl: "/man.jpg",
          }}
          type="commentReplied"
          target={<Link href="#">Mobile App Launch</Link>}
        />

        <NotificationListItem
          isRead={true}
          date={new Date()}
          actor={{
            id: "user-10",
            fullName: "Jim Halpert",
            imageUrl: "/man.jpg",
          }}
          type="userUpdated"
          target={<Link href="#">Alice Johnson</Link>}
        />
      </>
    ),
  },
} satisfies Story;

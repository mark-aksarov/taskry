import { Link } from "@/components/ui";
import { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { withBackgroundVariant } from "@/.storybook/decorators";
import { NotificationListItem } from "../NotificationListItem";

const meta = {
  title: "Components/notifications/NotificationList",
  component: NotificationList,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackgroundVariant({ variant: "alt" })],
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
          actionText="added a new task"
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
            likes: 15,
            likedByMe: true,
            attachments: [],
          }}
          actionText="updated a project"
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
          actionText="added a comment to"
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
          actionText="added a new user"
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
          actionText="updated a customer"
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
          actionText="deleted a task"
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
          actionText="deleted a project"
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
          actionText="updated a task"
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
          actionText="replied to a comment in"
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
          actionText="updated a user"
          target={<Link href="#">Alice Johnson</Link>}
        />
      </>
    ),
  },
} satisfies Story;

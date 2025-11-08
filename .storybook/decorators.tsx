import { Layout } from "../app/layout";
import React, { useEffect } from "react";
import { type Decorator } from "@storybook/react";
import { Notifications } from "@/components/notifications/Notifications";

export const PageDecorator: Decorator = (Story) => {
  return (
    <Layout
      NotificationsContainer={() => (
        <Notifications
          notifications={[
            {
              notificationId: 1,
              isRead: false,
              notification: {
                type: "TASK_ADDED",
                targetName: "Create Landing Page",
                createdAt: new Date("2025-09-23T08:00:00Z"),
                actor: {
                  id: "user-2",
                  fullName: "Alice Johnson",
                  imageUrl: "/woman.jpg",
                },
                target: {
                  task: { id: 10, title: "Website Redesign" },
                },
              },
            },
            {
              notificationId: 2,
              isRead: true,
              notification: {
                type: "PROJECT_UPDATED",
                targetName: "Website Redesign",
                createdAt: new Date("2025-09-22T09:30:00Z"),
                actor: {
                  id: "user-2",
                  fullName: "Alice Johnson",
                  imageUrl: null,
                },
                target: {
                  project: { id: 10, title: "Website Redesign" },
                },
              },
            },
            {
              notificationId: 3,
              isRead: false,
              notification: {
                type: "MESSAGE_SENT",
                targetName: "Hello!",
                createdAt: new Date("2025-09-21T08:30:00Z"),
              },
            },
            {
              notificationId: 4,
              isRead: false,
              notification: {
                type: "COMMENT_ADDED",
                targetName: "Landing Page Task",
                createdAt: new Date("2025-09-20T09:00:00Z"),
                actor: {
                  id: "user-4",
                  fullName: "Carol White",
                  imageUrl: "/woman.jpg",
                },
                target: {
                  comment: {
                    id: 1,
                    content: "Great job! Keep up the good work.",
                    project: {
                      title: "Website Redesign",
                    },
                    attachments: [],
                    likes: [],
                    _count: {
                      likes: 13,
                    },
                  },
                },
              },
            },
            {
              notificationId: 5,
              isRead: true,
              notification: {
                type: "COMMENT_ADDED",
                targetName: "Website Redesign",
                createdAt: new Date("2025-09-19T11:00:00Z"),
                actor: {
                  id: "user-3",
                  fullName: "Bob Smith",
                  imageUrl: "/man.jpg",
                },
                target: {
                  comment: {
                    id: 2,
                    content:
                      "I totally agree with Alice. The performance improvements are noticeable, especially in larger datasets. One suggestion though: it might be helpful to include a loading indicator when switching between tabs, since the delay can confuse first-time users.",
                    task: {
                      title: "Design landing page",
                    },
                    attachments: [
                      {
                        id: 1,
                        fileUrl: "/placeholder.jpg",
                      },
                      {
                        id: 2,
                        fileUrl: "/placeholder.jpg",
                      },
                    ],
                    likes: [
                      {
                        userId: "user_1",
                      },
                    ],
                    _count: {
                      likes: 25,
                    },
                  },
                },
              },
            },
            {
              notificationId: 6,
              isRead: false,
              notification: {
                type: "USER_ADDED",
                targetName: "David King",
                createdAt: new Date("2025-09-18T10:00:00Z"),
                actor: {
                  id: "user-5",
                  fullName: "Eve Black",
                  imageUrl: "/woman.jpg",
                },
                target: {
                  user: { id: "user-6", fullName: "David King" },
                },
              },
            },
            {
              notificationId: 7,
              isRead: false,
              notification: {
                type: "CUSTOMER_ADDED",
                targetName: "Acme Corp",
                createdAt: new Date("2025-09-17T10:30:00Z"),
                actor: {
                  id: "user-2",
                  fullName: "Alice Johnson",
                  imageUrl: "/woman.jpg",
                },
                target: {
                  customer: { id: 300, fullName: "Acme Corp" },
                },
              },
            },
            {
              notificationId: 8,
              isRead: true,
              notification: {
                type: "TASK_DELETED",
                targetName: "Old Task",
                createdAt: new Date("2025-09-16T13:00:00Z"),
                actor: {
                  id: "user-3",
                  fullName: "Bob Smith",
                  imageUrl: "/man.jpg",
                },
                target: {
                  task: { id: 101, title: "Old Task" },
                },
              },
            },
            {
              notificationId: 9,
              isRead: false,
              notification: {
                type: "USER_UPDATED",
                targetName: "Alice Johnson",
                createdAt: new Date("2025-09-15T11:00:00Z"),
                actor: {
                  id: "user-5",
                  fullName: "Eve Black",
                  imageUrl: "/woman.jpg",
                },
                target: {
                  user: { id: "user-2", fullName: "Alice Johnson" },
                },
              },
            },
            {
              notificationId: 10,
              isRead: true,
              notification: {
                type: "MESSAGE_SENT",
                targetName: "Weekly Update",
                createdAt: new Date("2025-09-14T15:30:00Z"),
                actor: {
                  id: "user-4",
                  fullName: "Carol White",
                  imageUrl: "/woman.jpg",
                },
              },
            },
            {
              notificationId: 11,
              isRead: true,
              notification: {
                type: "COMMENT_REPLIED",
                targetName: "Implement login system",
                createdAt: new Date("2025-09-19T11:00:00Z"),
                actor: {
                  id: "user-3",
                  fullName: "Bob Smith",
                  imageUrl: "/man.jpg",
                },
                target: {
                  comment: {
                    id: 2,
                    content:
                      "I totally agree with Alice. The performance improvements are noticeable, especially in larger datasets. One suggestion though: it might be helpful to include a loading indicator when switching between tabs, since the delay can confuse first-time users.",
                    task: {
                      title: "Design landing page",
                    },
                    attachments: [
                      {
                        id: 1,
                        fileUrl: "/placeholder.jpg",
                      },
                      {
                        id: 2,
                        fileUrl: "/placeholder.jpg",
                      },
                    ],
                    likes: [
                      {
                        userId: "user_1",
                      },
                    ],
                    _count: {
                      likes: 13,
                    },
                  },
                },
              },
            },
          ]}
        />
      )}
    >
      <Story />
    </Layout>
  );
};

export const withContainerWidth =
  (width: string = "500px"): Decorator =>
  (Story) => (
    <div style={{ maxWidth: width }}>
      <Story />
    </div>
  );

type BackgroundVariant = "default" | "alt";

interface WithBackgroundVariantOptions {
  variant?: BackgroundVariant;
}

export const withBackgroundVariant = (
  options: WithBackgroundVariantOptions = {},
): Decorator => {
  const { variant: defaultVariant = "default" } = options;

  return (Story, context) => {
    const variant: BackgroundVariant =
      context.parameters.variant || defaultVariant;

    const theme = context.globals.theme || "light";
    const bgClass =
      variant === "default"
        ? theme === "light"
          ? "bg-gray-100"
          : "bg-gray-900"
        : theme === "light"
          ? "bg-white"
          : "bg-gray-800";

    useEffect(() => {
      document.body.classList.add(bgClass);

      return () => {
        document.body.classList.remove(bgClass);
      };
    }, [bgClass]);

    return (
      <div className={bgClass}>
        <Story />
      </div>
    );
  };
};

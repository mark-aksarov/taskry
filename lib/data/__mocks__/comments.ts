import { Comment } from "@/lib/queries/types";

export const commentsMock: Comment[] = [
  {
    id: 1,
    content:
      "I’ve been following this project for a while now, and I must say the recent updates are quite impressive. The new user interface feels smoother and much more intuitive compared to the earlier versions. However, I did notice a few small glitches when resizing the window on mobile devices. Would love to see this fixed in the next patch!",
    createdAt: new Date("2025-10-10T14:23:00Z"),
    updatedAt: new Date("2025-10-10T14:23:00Z"),
    senderId: "user_1",
    projectId: 1,
    taskId: null,
    parentId: null,
    sender: {
      id: "user_1",
      fullName: "Alice Johnson",
      imageUrl: "/woman.jpg",
    },
  },
  {
    id: 2,
    content:
      "I totally agree with Alice. The performance improvements are noticeable, especially in larger datasets. One suggestion though: it might be helpful to include a loading indicator when switching between tabs, since the delay can confuse first-time users.",
    createdAt: new Date("2025-10-11T08:47:00Z"),
    updatedAt: new Date("2025-10-11T08:47:00Z"),
    senderId: "user_2",
    projectId: 1,
    taskId: null,
    parentId: null,
    sender: {
      id: "user_2",
      fullName: "Michael Lee",
      imageUrl: "/man.jpg",
    },
  },
  {
    id: 3,
    content:
      "From a developer’s perspective, I’m curious about how you’re managing state now. Are you using Immer or a custom reducer pattern? I noticed that undo/redo functionality seems faster, so I assume there’s some kind of optimization under the hood. Would love to see a short write-up or a blog post about that!",
    createdAt: new Date("2025-10-11T15:05:00Z"),
    updatedAt: new Date("2025-10-11T15:05:00Z"),
    senderId: "user_3",
    projectId: 1,
    taskId: null,
    parentId: null,
    sender: {
      id: "user_3",
      fullName: "Sophia Carter",
      imageUrl: "/woman.jpg",
    },
  },
  {
    id: 4,
    content:
      "Just wanted to share my experience using the latest build on macOS. Everything runs great except when exporting large models — it sometimes freezes at around 80%. Logs show a memory spike during that time. Maybe implementing streaming exports or chunk-based saving could help?",
    createdAt: new Date("2025-10-12T09:30:00Z"),
    updatedAt: new Date("2025-10-12T09:30:00Z"),
    senderId: "user_4",
    projectId: 1,
    taskId: null,
    parentId: null,
    sender: {
      id: "user_4",
      fullName: "Daniel Kim",
      imageUrl: "/man.jpg",
    },
  },
  {
    id: 5,
    content:
      "This update really changes the workflow for our design team. The collaboration tools make it so much easier to review and comment directly on assets. The only feature still missing for us is per-user activity logs — it would be great to track who made which changes, especially when several people work on the same file at once.",
    createdAt: new Date("2025-10-12T12:12:00Z"),
    updatedAt: new Date("2025-10-12T12:12:00Z"),
    senderId: "user_5",
    projectId: 1,
    taskId: null,
    parentId: null,
    sender: {
      id: "user_5",
      fullName: "Emma Brown",
      imageUrl: "/woman.jpg",
    },
  },
];

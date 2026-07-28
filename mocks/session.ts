export const mockedSession = {
  session: {
    id: "session-1",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user-1",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    token: "token-1",
    ipAddress: "127.0.0.1",
    userAgent: "test-agent-1",
    activeOrganizationId: "organization-1",
  },
  user: {
    id: "user-1",
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "user1@example.com",
    emailVerified: true,
    name: "User 1",
    image: null,
    address: "Address 1",
    positionId: 1,
    bio: "Bio 1",
    birthdate: new Date("2000-01-01"),
    phoneNumber: "+10000000001",
    publicLink: "user-1",
    imageUrl: "https://example.com/user-1.png",
  },
};

export const mockedClientSummaries = [
  {
    id: 1,
    fullName: "Client 1",
  },
  {
    id: 2,
    fullName: "Client 2",
  },
  {
    id: 3,
    fullName: "Client 3",
  },
  {
    id: 4,
    fullName: "Client 4",
  },
  {
    id: 5,
    fullName: "Client 5",
  },
];

export const mockedClientList = [
  {
    id: 1,
    fullName: "Client 1",
    imageUrl: "/woman.jpg",
    email: "client1@example.com",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/client1",
    company: { id: 1, name: "Company 1" },
  },
  {
    id: 2,
    fullName: "Client 2",
    imageUrl: "/man.jpg",
    email: "client2@example.com",
    phoneNumber: "+10000000002",
    publicLink: "https://example.com/client2",
    company: { id: 1, name: "Company 1" },
  },
  {
    id: 3,
    fullName: "Client 3",
    imageUrl: "/woman.jpg",
    email: "client3@example.com",
    phoneNumber: undefined,
    publicLink: undefined,
    company: { id: 2, name: "Company 2" },
  },
  {
    id: 4,
    fullName: "Client 4",
    imageUrl: undefined,
    email: "client4@example.com",
    phoneNumber: "+10000000004",
    publicLink: "https://example.com/client4",
    company: { id: 2, name: "Company 2" },
  },
  {
    id: 5,
    fullName: "Client 5",
    imageUrl: "/woman.jpg",
    email: "client5@example.com",
    phoneNumber: "+10000000005",
    publicLink: "https://example.com/client5",
    company: { id: 3, name: "Company 3" },
  },
];

export const mockedClientDetail = {
  id: 1,
  fullName: "Fake client",
  bio: "Sample bio text. Placeholder content only. No specific details provided.",
  email: "fake-client@example.com",
  phoneNumber: "+10000000001",
  address: "Fake address line",
  imageUrl: "/man.jpg",
  publicLink: "https://example.com/fake-client",
  company: {
    id: 1,
    name: "Fake company",
  },
};

import { Prisma } from "@/generated/prisma";

export type ProjectItem = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    title: true;
    deadline: true;

    creator: {
      select: {
        id: true;
        fullName: true;
        imageUrl: true;
      };
    };
    status: {
      select: {
        id: true;
        nameEn: true;
        nameRu: true;
      };
    };
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    customer: {
      select: {
        id: true;
        fullName: true;
        company: {
          select: {
            name: true;
          };
        };
      };
    };

    tasks: {
      select: {
        statusId: true;
      };
    };
  };
}>;

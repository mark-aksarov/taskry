import prisma from "@/lib/prisma";

async function main() {
  const now = new Date();

  // ----------------- Guest workspace -----------------

  await prisma.workspace.create({
    data: {
      id: 1,
    },
  });

  // ----------------- Companies -----------------

  await prisma.company.createMany({
    data: [
      { id: 1, name: "Elevare", workspaceId: 1 },
      { id: 2, name: "Verdeo", workspaceId: 1 },
      { id: 3, name: "CodeLoom", workspaceId: 1 },
      { id: 4, name: "TerraNova", workspaceId: 1 },
    ],
  });

  // ----------------- Customers -----------------

  await prisma.customer.createMany({
    data: [
      {
        id: 1,
        fullName: "Lisa Simpson",
        bio: "Project manager passionate about sustainability and innovation.",
        companyId: 1,
        imageUrl: "/woman.jpg",
        email: "lisa_simpson@example.com",
      },
      {
        id: 2,
        fullName: "Mark Johnson",
        bio: "Lead developer focused on scalable web applications.",
        companyId: 2,
        imageUrl: "/man.jpg",
        email: "mark_johnson@example.com",
      },
      {
        id: 3,
        fullName: "Emily Chen",
        bio: "UX designer with a love for intuitive interfaces and user research.",
        companyId: 3,
        imageUrl: "/woman.jpg",
        email: "emily_chen@example.com",
      },
      {
        id: 4,
        fullName: "Carlos Rivera",
        bio: "Data scientist turning numbers into actionable insights.",
        companyId: 4,
        imageUrl: "/man.jpg",
        email: "carlos_rivera@example.com",
      },
    ],
  });

  // ----------------- Users -----------------

  await prisma.position.createMany({
    data: [
      { id: 1, name: "Founder", workspaceId: 1 },
      { id: 2, name: "Manager", workspaceId: 1 },
      { id: 3, name: "Designer", workspaceId: 1 },
      { id: 4, name: "Developer", workspaceId: 1 },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        id: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        name: "John Doe",
        role: "admin",
        email: "john_doe@example.com",
        emailVerified: true,
        imageUrl: "/man.jpg",
        positionId: 1,
      },
      {
        id: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        name: "Alice Smith",
        role: "user",
        email: "alice_smith@example.com",
        emailVerified: true,
        imageUrl: "/woman.jpg",
        positionId: 2,
      },
      {
        id: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        name: "Fred Green",
        role: "user",
        email: "fred_green@example.com",
        emailVerified: true,
        imageUrl: "/man.jpg",
        positionId: 3,
      },
      {
        id: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        name: "Kate Brown",
        role: "user",
        email: "kate_brown@example.com",
        emailVerified: true,
        imageUrl: "/woman.jpg",
        positionId: 4,
      },
    ],
  });

  // ----------------- Projects -----------------

  await prisma.projectStatus.createMany({
    data: [
      { id: 1, nameEn: "Pending", nameRu: "Ожидает" },
      { id: 2, nameEn: "Active", nameRu: "Активно" },
      { id: 3, nameEn: "Completed", nameRu: "Завершено" },
    ],
  });

  await prisma.projectCategory.createMany({
    data: [
      { id: 1, name: "Design & UX", workspaceId: 1 },
      { id: 2, name: "Development & Engineering", workspaceId: 1 },
      { id: 3, name: "Marketing & Strategy", workspaceId: 1 },
      { id: 4, name: "Data & Analytics", workspaceId: 1 },
      { id: 5, name: "SEO Optimization", workspaceId: 1 },
      { id: 6, name: "CRM & Integrations", workspaceId: 1 },
      { id: 7, name: "Advertising & Campaigns", workspaceId: 1 },
      { id: 8, name: "Business Intelligence", workspaceId: 1 },
    ],
  });

  await prisma.project.createMany({
    data: [
      { id: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "E-commerce Platform", description: "Build online store", deadline: new Date(now.getFullYear(), now.getMonth(), 20), statusId: 1, categoryId: 2, customerId: 1, createdAt: new Date(2025, 7, 1) },
      { id: 2, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "Blog Redesign", description: "Update blog UI/UX", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 1, categoryId: 1, customerId: 2, createdAt: new Date(2025, 7, 2) },
      { id: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "SEO Optimization", description: "Optimize website for search engines", deadline: new Date(now.getFullYear(), now.getMonth(), 5), statusId: 1, categoryId: 7, customerId: 3, createdAt: new Date(2025, 7, 3) },
      { id: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "Analytics Dashboard", description: "Dashboard to monitor sales", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 15), statusId: 1, categoryId: 8, customerId: 4, createdAt: new Date(2025, 7, 4) },

      { id: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "CRM Integration", description: "Integrate CRM system", deadline: new Date(now.getFullYear(), now.getMonth(), 21), statusId: 1, categoryId: 2, customerId: 1, createdAt: new Date(2025, 7, 5) },
      { id: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Landing Page", description: "Build marketing landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 2, categoryId: 1, customerId: 2, createdAt: new Date(2025, 7, 6) },
      { id: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Social Media Plan", description: "Plan social media content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 2, categoryId: 3, customerId: 3, createdAt: new Date(2025, 7, 7) },
      { id: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Data Cleanup", description: "Clean internal datasets", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 16), statusId: 2, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 1) },

      { id: 9, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Mobile App", description: "Develop company app", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: 2, categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 2) },
      { id: 10, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Website SEO", description: "Improve website SEO", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 2, categoryId: 7, customerId: 2, createdAt: new Date(2025, 8, 3) },
      { id: 11, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Marketing Campaign", description: "Launch ad campaigns", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 3, categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 4) },
      { id: 12, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Dashboard Enhancements", description: "Improve dashboard features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 17), statusId: 3, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 5) },

      { id: 13, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Inventory System", description: "Build inventory management system", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 3, categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 6) },
      { id: 14, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Marketing Website", description: "Create marketing website", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 3, categoryId: 1, customerId: 2, createdAt: new Date(2025, 8, 7) },
      { id: 15, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Content Strategy", description: "Plan content schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 3, categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 8) },
      { id: 16, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Data Reports", description: "Generate business reports", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 18), statusId: 3, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 9) },
    ],
  });

  // ----------------- Project comments -----------------

  await prisma.projectComment.createMany({
    data: [
      // --- Project 1 ---
      { id: 1, content: "Initial planning looks solid.", projectId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 2, content: "We should add more resources.", projectId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 3, content: "Timeline seems tight.", projectId: 1, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 4, content: "Need approval from management.", projectId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 5, content: "Let's schedule a review meeting.", projectId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 2 ---
      { id: 6, content: "Design mockups are ready.", projectId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, content: "Feedback from client received.", projectId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 8, content: "Adjusting scope based on feedback.", projectId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 9, content: "Testing environment set up.", projectId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 10, content: "Final draft submitted.", projectId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 11, content: "Waiting for approval.", projectId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 3 ---
      { id: 12, content: "Kickoff meeting completed.", projectId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 13, content: "Task assignments shared.", projectId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 14, content: "Dependencies identified.", projectId: 3, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 15, content: "Risk assessment done.", projectId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 16, content: "Timeline adjusted.", projectId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 4 ---
      { id: 17, content: "Initial draft ready for review.", projectId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 18, content: "Client requested changes.", projectId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 19, content: "Update design documents.", projectId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 20, content: "QA testing scheduled.", projectId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 21, content: "Final approval pending.", projectId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 22, content: "Deployment plan reviewed.", projectId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 5 ---
      { id: 23, content: "Feature list finalized.", projectId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 24, content: "Backend integration started.", projectId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 25, content: "Frontend components in progress.", projectId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 26, content: "API documentation updated.", projectId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 27, content: "Bug triage meeting held.", projectId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 6 ---
      { id: 28, content: "Database schema approved.", projectId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 29, content: "Performance benchmarks set.", projectId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 30, content: "Load testing scheduled.", projectId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 31, content: "Security review completed.", projectId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 32, content: "Logging and monitoring configured.", projectId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 7 ---
      { id: 33, content: "User stories defined.", projectId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 34, content: "Sprint planning done.", projectId: 7, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 35, content: "Tasks assigned to team.", projectId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 36, content: "Dependencies checked.", projectId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 37, content: "Documentation started.", projectId: 7, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 8 ---
      { id: 38, content: "Prototype demo completed.", projectId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 39, content: "Client feedback incorporated.", projectId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 40, content: "Testing phase started.", projectId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 41, content: "Final report prepared.", projectId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 42, content: "Deployment scheduled.", projectId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 43, content: "Post-deployment review planned.", projectId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
    ],
  });

  // ----------------- Tasks -----------------

  await prisma.taskStatus.createMany({
    data: [
      { id: 1, nameEn: "Pending", nameRu: "Ожидает" },
      { id: 2, nameEn: "Active", nameRu: "Активно" },
      { id: 3, nameEn: "Done", nameRu: "Выполнено" },
    ],
  });

  await prisma.taskCategory.createMany({
    data: [
      { id: 1, name: "UI Design", workspaceId: 1 },
      { id: 2, name: "Wireframing", workspaceId: 1 },
      { id: 3, name: "Frontend Development", workspaceId: 1 },
      { id: 4, name: "Backend Development", workspaceId: 1 },
      { id: 5, name: "Testing & QA", workspaceId: 1 },
      { id: 6, name: "Content Creation", workspaceId: 1 },
      { id: 7, name: "SEO & Marketing", workspaceId: 1 },
      { id: 8, name: "Data Analysis", workspaceId: 1 },
    ],
  });

  await prisma.task.createMany({
    data: [
      // --- Project 1 ---
      { id: 1, projectId: 1, title: "Setup Database", description: "Create DB schema", deadline: new Date(now.getFullYear(), now.getMonth(), 5), statusId: 1, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 2, projectId: 1, title: "Frontend Layout", description: "Build product pages", deadline: new Date(now.getFullYear(), now.getMonth(), 7), statusId: 1, categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 3, projectId: 1, title: "Product Images", description: "Upload and optimize images", deadline: new Date(now.getFullYear(), now.getMonth(), 9), statusId: 1, categoryId: 6, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 4, projectId: 1, title: "Shopping Cart API", description: "Develop cart backend", deadline: new Date(now.getFullYear(), now.getMonth(), 11), statusId: 1, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 5, projectId: 1, title: "QA & Testing", description: "Test checkout flow", deadline: new Date(now.getFullYear(), now.getMonth(), 13), statusId: 1, categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 2 ---
      { id: 6, projectId: 2, title: "Wireframes", description: "Redesign blog pages", deadline: new Date(now.getFullYear(), now.getMonth(), 6), statusId: 1, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, projectId: 2, title: "UI Mockups", description: "Create visual designs", deadline: new Date(now.getFullYear(), now.getMonth(), 8), statusId: 1, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 8, projectId: 2, title: "Content Layout", description: "Organize blog posts", deadline: new Date(now.getFullYear(), now.getMonth(), 10), statusId: 1, categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 9, projectId: 2, title: "Frontend Dev", description: "Implement blog pages", deadline: new Date(now.getFullYear(), now.getMonth(), 12), statusId: 1, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 10, projectId: 2, title: "Testing & QA", description: "Check responsiveness", deadline: new Date(now.getFullYear(), now.getMonth(), 14), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 3 ---
      { id: 11, projectId: 3, title: "Keyword Research", description: "Find target keywords", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 1, categoryId: 7, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 12, projectId: 3, title: "Content Optimization", description: "Optimize pages", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 1, categoryId: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 13, projectId: 3, title: "Technical SEO", description: "Improve site speed", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 1, categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 14, projectId: 3, title: "Backlinks", description: "Acquire backlinks", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 1, categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 15, projectId: 3, title: "SEO Report", description: "Analyze results", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 1, categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 4 ---
      { id: 16, projectId: 4, title: "Data Collection", description: "Gather sales data", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 1, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 17, projectId: 4, title: "Dashboard Wireframes", description: "Plan layout", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 1, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 18, projectId: 4, title: "UI Design", description: "Design dashboard", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 1, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 19, projectId: 4, title: "Frontend Dev", description: "Implement dashboard", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 1, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 20, projectId: 4, title: "Backend Dev & Testing", description: "APIs + QA", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 1, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 5 ---
      { id: 21, projectId: 5, title: "CRM Data Import", description: "Import client data", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: 1, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 22, projectId: 5, title: "CRM Workflow Setup", description: "Configure workflows", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: 1, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 23, projectId: 5, title: "User Training", description: "Train staff on CRM", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 24, projectId: 5, title: "CRM API Integration", description: "Connect external APIs", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 1, categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 25, projectId: 5, title: "QA & Feedback", description: "Test CRM and collect feedback", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: 1, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 6 ---
      { id: 26, projectId: 6, title: "Landing Page Wireframes", description: "Plan landing page layout", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 1, categoryId: 2, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 27, projectId: 6, title: "UI Mockups", description: "Design visuals for landing", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 2, categoryId: 1, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 28, projectId: 6, title: "Frontend Dev", description: "Implement landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 2, categoryId: 3, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 29, projectId: 6, title: "Content Upload", description: "Add marketing content", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 2, categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 30, projectId: 6, title: "QA & Launch", description: "Test and deploy landing page", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 2, categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 7 ---
      { id: 31, projectId: 7, title: "Content Calendar", description: "Plan social media posts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 2, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 32, projectId: 7, title: "Graphics Design", description: "Create post visuals", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 2, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 33, projectId: 7, title: "Schedule Posts", description: "Use scheduler tool", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 2, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 34, projectId: 7, title: "Engagement Analysis", description: "Track metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 2, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 35, projectId: 7, title: "Campaign Optimization", description: "Improve strategy", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 2, categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 8 ---
      { id: 36, projectId: 8, title: "Data Audit", description: "Check dataset integrity", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 2, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 37, projectId: 8, title: "Data Transformation", description: "Format datasets", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 2, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 38, projectId: 8, title: "Import Scripts", description: "Write import scripts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 2, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 39, projectId: 8, title: "Validation & QA", description: "Validate data accuracy", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 2, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 40, projectId: 8, title: "Reporting", description: "Generate data reports", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: 2, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 9 ---
      { id: 41, projectId: 9, title: "App Architecture", description: "Define app structure", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 2, categoryId: 2, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 42, projectId: 9, title: "UI Components", description: "Build reusable components", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 2, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 43, projectId: 9, title: "API Integration", description: "Connect to backend APIs", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 2, categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 44, projectId: 9, title: "Push Notifications", description: "Implement notifications", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 2, categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 45, projectId: 9, title: "QA & Beta Testing", description: "Test on devices", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 2, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 10 ---
      { id: 46, projectId: 10, title: "SEO Audit", description: "Analyze website SEO", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: 2, categoryId: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 47, projectId: 10, title: "Content Updates", description: "Improve page content", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 2, categoryId: 6, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 48, projectId: 10, title: "Backlink Strategy", description: "Acquire quality backlinks", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 2, categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 49, projectId: 10, title: "Performance Monitoring", description: "Track SEO metrics", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: 2, categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 50, projectId: 10, title: "Reporting", description: "Generate SEO report", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 2, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 11 ---
      { id: 51, projectId: 11, title: "Ad Campaign Setup", description: "Configure ads", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 2, categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 52, projectId: 11, title: "Target Audience Research", description: "Identify audience segments", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 2, categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 53, projectId: 11, title: "Creative Design", description: "Design ad creatives", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 2, categoryId: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 54, projectId: 11, title: "Launch Campaign", description: "Go live with ads", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 2, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 55, projectId: 11, title: "Performance Analysis", description: "Track KPIs", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: 3, categoryId: 8, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 12 ---
      { id: 56, projectId: 12, title: "Dashboard Layout", description: "Plan feature placement", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 3, categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 57, projectId: 12, title: "UI Components", description: "Build reusable dashboard components", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 3, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 58, projectId: 12, title: "Backend API", description: "Develop APIs for data", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 3, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 59, projectId: 12, title: "Testing & QA", description: "Test all dashboard features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 3, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 60, projectId: 12, title: "Launch Dashboard", description: "Deploy to production", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 12), statusId: 3, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 13 ---
      { id: 61, projectId: 13, title: "Inventory DB Setup", description: "Design inventory database", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 3, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 62, projectId: 13, title: "Product Entry Forms", description: "Build forms for inventory", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 3, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 63, projectId: 13, title: "Stock Management Logic", description: "Implement inventory rules", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 3, categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 64, projectId: 13, title: "Reporting Module", description: "Generate stock reports", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 3, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 65, projectId: 13, title: "QA & Testing", description: "Test inventory system", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 3, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 14 ---
      { id: 66, projectId: 14, title: "Website Wireframes", description: "Plan marketing site", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 3, categoryId: 2, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 67, projectId: 14, title: "UI Mockups", description: "Design visuals", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 3, categoryId: 1, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 68, projectId: 14, title: "Frontend Dev", description: "Implement website", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: 3, categoryId: 3, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 69, projectId: 14, title: "Content Upload", description: "Add marketing content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 3, categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 70, projectId: 14, title: "QA & Launch", description: "Test and deploy website", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 3, categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 15 ---
      { id: 71, projectId: 15, title: "Content Strategy Plan", description: "Outline content schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 3, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 72, projectId: 15, title: "Content Creation", description: "Write articles and posts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 3, categoryId: 6, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 73, projectId: 15, title: "Graphic Assets", description: "Design visuals for posts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 3, categoryId: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 74, projectId: 15, title: "Scheduling", description: "Plan post timing", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: 3, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 75, projectId: 15, title: "Performance Review", description: "Analyze engagement metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 13), statusId: 3, categoryId: 8, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 16 ---
      { id: 76, projectId: 16, title: "Data Extraction", description: "Extract reports from systems", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 3, categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 77, projectId: 16, title: "Data Cleaning", description: "Remove duplicates and errors", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 3, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 78, projectId: 16, title: "Validation Scripts", description: "Ensure data accuracy", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 3, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 79, projectId: 16, title: "Data Analysis", description: "Generate insights", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 12), statusId: 3, categoryId: 8, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 80, projectId: 16, title: "Reporting & QA", description: "Finalize reports and check quality", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 14), statusId: 3, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
    ],
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: [
      // --- Task 1 ---
      { name: "Setup project structure", isDone: true, taskId: 1 },
      { name: "Install dependencies", isDone: true, taskId: 1 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 1 },
      { name: "Setup database schema", isDone: true, taskId: 1 },
      { name: "Implement authentication", isDone: true, taskId: 1 },
      { name: "Build user dashboard", isDone: true, taskId: 1 },
      { name: "Add project CRUD", isDone: true, taskId: 1 },
      { name: "Implement task management", isDone: false, taskId: 1 },
      { name: "Write unit tests", isDone: false, taskId: 1 },
      { name: "Deploy to production", isDone: false, taskId: 1 },

      // --- Task 2 ---
      { name: "Research requirements", isDone: true, taskId: 2 },
      { name: "Draft technical specification", isDone: true, taskId: 2 },
      { name: "Create wireframes", isDone: true, taskId: 2 },
      { name: "Prepare API endpoints list", isDone: true, taskId: 2 },
      { name: "Design database relations", isDone: true, taskId: 2 },
      { name: "Review with team", isDone: false, taskId: 2 },
      { name: "Update documentation", isDone: false, taskId: 2 },
      { name: "Set up CI/CD pipeline", isDone: false, taskId: 2 },
      { name: "Add logging & monitoring", isDone: false, taskId: 2 },
      { name: "Final approval from manager", isDone: false, taskId: 2 },

      // --- Task 3 ---
      { name: "Draft requirements", isDone: true, taskId: 3 },
      { name: "Review requirements", isDone: false, taskId: 3 },
      { name: "Create wireframes", isDone: true, taskId: 3 },
      { name: "Discuss wireframes with team", isDone: false, taskId: 3 },
      { name: "Prepare database design", isDone: true, taskId: 3 },
      { name: "Define API endpoints", isDone: false, taskId: 3 },
      { name: "Implement login flow", isDone: true, taskId: 3 },
      { name: "Setup CI/CD pipeline", isDone: false, taskId: 3 },
      { name: "Add error handling", isDone: true, taskId: 3 },
      { name: "Optimize queries", isDone: false, taskId: 3 },
      { name: "Write integration tests", isDone: true, taskId: 3 },
      { name: "Run performance tests", isDone: false, taskId: 3 },
      { name: "Fix reported bugs", isDone: true, taskId: 3 },
      { name: "Prepare documentation", isDone: false, taskId: 3 },
      { name: "Final project review", isDone: true, taskId: 3 },

      // --- Task 4 ---
      { name: "Collect requirements", isDone: true, taskId: 4 },
      { name: "Design wireframes", isDone: false, taskId: 4 },
      { name: "Create database schema", isDone: true, taskId: 4 },
      { name: "Implement API endpoints", isDone: false, taskId: 4 },
      { name: "Setup authentication", isDone: true, taskId: 4 },
      { name: "Develop UI components", isDone: false, taskId: 4 },
      { name: "Integrate frontend with backend", isDone: false, taskId: 4 },
      { name: "Configure logging", isDone: true, taskId: 4 },
      { name: "Setup CI/CD pipeline", isDone: false, taskId: 4 },
      { name: "Write unit tests", isDone: true, taskId: 4 },
      { name: "Write integration tests", isDone: false, taskId: 4 },
      { name: "Prepare documentation", isDone: false, taskId: 4 },
      { name: "Perform code review", isDone: true, taskId: 4 },
      { name: "Fix reported bugs", isDone: false, taskId: 4 },
      { name: "Deploy staging version", isDone: true, taskId: 4 },

      // --- Task 5 ---
      { name: "Gather requirements", isDone: true, taskId: 5 },
      { name: "Create wireframes", isDone: false, taskId: 5 },
      { name: "Design UI mockups", isDone: true, taskId: 5 },
      { name: "Setup project repository", isDone: false, taskId: 5 },
      { name: "Configure CI/CD pipeline", isDone: true, taskId: 5 },
      { name: "Implement user login", isDone: false, taskId: 5 },
      { name: "Implement user registration", isDone: true, taskId: 5 },
      { name: "Setup database migrations", isDone: false, taskId: 5 },
      { name: "Add API documentation", isDone: true, taskId: 5 },

      // --- Task 6 ---
      { name: "Setup project structure", isDone: true, taskId: 6 },
      { name: "Install dependencies", isDone: false, taskId: 6 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 6 },
      { name: "Setup database schema", isDone: false, taskId: 6 },
      { name: "Implement authentication", isDone: false, taskId: 6 },
      { name: "Build user dashboard", isDone: true, taskId: 6 },
      { name: "Add project CRUD", isDone: false, taskId: 6 },
      { name: "Implement task management", isDone: true, taskId: 6 },
      { name: "Write unit tests", isDone: false, taskId: 6 },
      { name: "Deploy to staging", isDone: true, taskId: 6 },
      { name: "Setup CI/CD", isDone: false, taskId: 6 },
      { name: "Integrate analytics", isDone: false, taskId: 6 },
      { name: "Optimize performance", isDone: true, taskId: 6 },
      { name: "Write documentation", isDone: false, taskId: 6 },
      { name: "Final review and cleanup", isDone: true, taskId: 6 },

      // --- Task 7 ---
      { name: "Setup project structure", isDone: true, taskId: 7 },
      { name: "Install dependencies", isDone: false, taskId: 7 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 7 },
      { name: "Setup database schema", isDone: false, taskId: 7 },
      { name: "Implement authentication", isDone: false, taskId: 7 },
      { name: "Build user dashboard", isDone: true, taskId: 7 },
      { name: "Add project CRUD", isDone: false, taskId: 7 },

      // --- Task 8 ---
      { name: "Setup project structure", isDone: true, taskId: 8 },
      { name: "Install dependencies", isDone: false, taskId: 8 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 8 },
      { name: "Setup database schema", isDone: false, taskId: 8 },
      { name: "Implement authentication", isDone: false, taskId: 8 },
      { name: "Build user dashboard", isDone: true, taskId: 8 },
      { name: "Add project CRUD", isDone: false, taskId: 8 },
      { name: "Write unit tests", isDone: true, taskId: 8 },

      // --- Task 9 ---
      { name: "Setup project structure", isDone: true, taskId: 9 },
      { name: "Install dependencies", isDone: false, taskId: 9 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 9 },
      { name: "Setup database schema", isDone: false, taskId: 9 },
      { name: "Implement authentication", isDone: false, taskId: 9 },
      { name: "Build user dashboard", isDone: true, taskId: 9 },
      { name: "Add project CRUD", isDone: false, taskId: 9 },

      // --- Task 10 ---
      { name: "Setup project structure", isDone: true, taskId: 10 },
      { name: "Install dependencies", isDone: false, taskId: 10 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 10 },
      { name: "Setup database schema", isDone: false, taskId: 10 },
      { name: "Implement authentication", isDone: false, taskId: 10 },
      { name: "Build user dashboard", isDone: true, taskId: 10 },
      { name: "Add project CRUD", isDone: false, taskId: 10 },
      { name: "Implement task management", isDone: true, taskId: 10 },
      { name: "Write unit tests", isDone: false, taskId: 10 },
      { name: "Deploy to production", isDone: false, taskId: 10 },
      { name: "Setup CI/CD pipeline", isDone: true, taskId: 10 },

      // --- Task 11 ---
      { name: "Design UI mockups", isDone: false, taskId: 11 },
      { name: "Get stakeholder approval", isDone: true, taskId: 11 },
      { name: "Setup frontend framework", isDone: false, taskId: 11 },
      { name: "Integrate backend API", isDone: true, taskId: 11 },
      { name: "Write integration tests", isDone: false, taskId: 11 },
      { name: "Deploy staging version", isDone: true, taskId: 11 },
      { name: "Collect user feedback", isDone: false, taskId: 11 },
      { name: "Fix reported bugs", isDone: true, taskId: 11 },

      // --- Task 12 ---
      { name: "Plan project roadmap", isDone: true, taskId: 12 },
      { name: "Define milestones", isDone: false, taskId: 12 },
      { name: "Assign team roles", isDone: true, taskId: 12 },
      { name: "Set up project repo", isDone: false, taskId: 12 },
      { name: "Prepare initial documentation", isDone: true, taskId: 12 },
      { name: "Kick-off meeting", isDone: false, taskId: 12 },

      // --- Task 13 ---
      { name: "Research competitors", isDone: true, taskId: 13 },
      { name: "Collect requirements", isDone: false, taskId: 13 },
      { name: "Define MVP features", isDone: true, taskId: 13 },
      { name: "Create wireframes", isDone: false, taskId: 13 },
      { name: "Prototype approval", isDone: true, taskId: 13 },
      { name: "Begin development", isDone: false, taskId: 13 },
      { name: "Internal testing", isDone: false, taskId: 13 },

      // --- Task 14 ---
      { name: "Analyze current system", isDone: true, taskId: 14 },
      { name: "Identify bottlenecks", isDone: false, taskId: 14 },
      { name: "Propose improvements", isDone: true, taskId: 14 },
      { name: "Implement fixes", isDone: false, taskId: 14 },
      { name: "Run performance tests", isDone: true, taskId: 14 },
      { name: "Document changes", isDone: false, taskId: 14 },

      // --- Task 15 ---
      { name: "Gather marketing data", isDone: false, taskId: 15 },
      { name: "Analyze audience", isDone: true, taskId: 15 },
      { name: "Create campaign plan", isDone: false, taskId: 15 },
      { name: "Design creatives", isDone: true, taskId: 15 },
      { name: "Launch campaign", isDone: false, taskId: 15 },
      { name: "Monitor KPIs", isDone: true, taskId: 15 },

      // --- Task 16 ---
      { name: "Prepare training materials", isDone: false, taskId: 16 },
      { name: "Schedule sessions", isDone: true, taskId: 16 },
      { name: "Conduct training", isDone: false, taskId: 16 },
      { name: "Collect feedback", isDone: true, taskId: 16 },
      { name: "Update training docs", isDone: false, taskId: 16 },

      // --- Task 17 ---
      { name: "Audit security policies", isDone: true, taskId: 17 },
      { name: "Identify vulnerabilities", isDone: false, taskId: 17 },
      { name: "Patch critical issues", isDone: true, taskId: 17 },
      { name: "Review access controls", isDone: false, taskId: 17 },
      { name: "Schedule follow-up audit", isDone: true, taskId: 17 },

      // --- Task 18 ---
      { name: "Set up analytics", isDone: true, taskId: 18 },
      { name: "Define metrics", isDone: false, taskId: 18 },
      { name: "Integrate dashboards", isDone: true, taskId: 18 },
      { name: "Monitor trends", isDone: false, taskId: 18 },
      { name: "Report findings", isDone: true, taskId: 18 },

      // --- Task 19 ---
      { name: "Conduct user interviews", isDone: false, taskId: 19 },
      { name: "Collect survey data", isDone: true, taskId: 19 },
      { name: "Analyze results", isDone: false, taskId: 19 },
      { name: "Prepare insights report", isDone: true, taskId: 19 },
      { name: "Present to stakeholders", isDone: false, taskId: 19 },

      // --- Task 20 ---
      { name: "Research new tools", isDone: true, taskId: 20 },
      { name: "Evaluate vendors", isDone: false, taskId: 20 },
      { name: "Select preferred tool", isDone: true, taskId: 20 },
      { name: "Plan integration", isDone: false, taskId: 20 },
      { name: "Execute migration", isDone: true, taskId: 20 },
      { name: "Post-migration testing", isDone: false, taskId: 20 },

      // --- Task 21 ---
      { name: "Setup project structure", isDone: true, taskId: 21 },
      { name: "Install dependencies", isDone: false, taskId: 21 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 21 },
      { name: "Setup database schema", isDone: false, taskId: 21 },
      { name: "Implement authentication", isDone: false, taskId: 21 },
      { name: "Build user dashboard", isDone: true, taskId: 21 },
      { name: "Add project CRUD", isDone: false, taskId: 21 },
      { name: "Implement task management", isDone: true, taskId: 21 },
      { name: "Write unit tests", isDone: false, taskId: 21 },
      { name: "Deploy to production", isDone: false, taskId: 21 },

      // --- Task 22 ---
      { name: "Setup project structure", isDone: false, taskId: 22 },
      { name: "Install dependencies", isDone: true, taskId: 22 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 22 },
      { name: "Setup database schema", isDone: true, taskId: 22 },
      { name: "Implement authentication", isDone: false, taskId: 22 },
      { name: "Build user dashboard", isDone: true, taskId: 22 },
      { name: "Add project CRUD", isDone: false, taskId: 22 },
      { name: "Implement task management", isDone: false, taskId: 22 },
      { name: "Write unit tests", isDone: true, taskId: 22 },
      { name: "Deploy to production", isDone: false, taskId: 22 },

      // --- Task 23 ---
      { name: "Setup project structure", isDone: true, taskId: 23 },
      { name: "Install dependencies", isDone: true, taskId: 23 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 23 },
      { name: "Setup database schema", isDone: false, taskId: 23 },
      { name: "Implement authentication", isDone: true, taskId: 23 },
      { name: "Build user dashboard", isDone: false, taskId: 23 },
      { name: "Add project CRUD", isDone: true, taskId: 23 },
      { name: "Implement task management", isDone: false, taskId: 23 },
      { name: "Write unit tests", isDone: true, taskId: 23 },
      { name: "Deploy to production", isDone: false, taskId: 23 },

      // --- Task 24 ---
      { name: "Setup project structure", isDone: false, taskId: 24 },
      { name: "Install dependencies", isDone: false, taskId: 24 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 24 },
      { name: "Setup database schema", isDone: false, taskId: 24 },
      { name: "Implement authentication", isDone: true, taskId: 24 },
      { name: "Build user dashboard", isDone: false, taskId: 24 },
      { name: "Add project CRUD", isDone: true, taskId: 24 },
      { name: "Implement task management", isDone: false, taskId: 24 },
      { name: "Write unit tests", isDone: false, taskId: 24 },
      { name: "Deploy to production", isDone: true, taskId: 24 },

      // --- Task 25 ---
      { name: "Setup project structure", isDone: true, taskId: 25 },
      { name: "Install dependencies", isDone: false, taskId: 25 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 25 },
      { name: "Setup database schema", isDone: true, taskId: 25 },
      { name: "Implement authentication", isDone: false, taskId: 25 },
      { name: "Build user dashboard", isDone: false, taskId: 25 },
      { name: "Add project CRUD", isDone: true, taskId: 25 },
      { name: "Implement task management", isDone: false, taskId: 25 },
      { name: "Write unit tests", isDone: true, taskId: 25 },
      { name: "Deploy to production", isDone: false, taskId: 25 },

      // --- Task 26 ---
      { name: "Setup project structure", isDone: false, taskId: 26 },
      { name: "Install dependencies", isDone: true, taskId: 26 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 26 },
      { name: "Setup database schema", isDone: true, taskId: 26 },
      { name: "Implement authentication", isDone: false, taskId: 26 },
      { name: "Build user dashboard", isDone: true, taskId: 26 },
      { name: "Add project CRUD", isDone: false, taskId: 26 },
      { name: "Implement task management", isDone: true, taskId: 26 },
      { name: "Write unit tests", isDone: false, taskId: 26 },
      { name: "Deploy to production", isDone: true, taskId: 26 },

      // --- Task 27 ---
      { name: "Setup project structure", isDone: true, taskId: 27 },
      { name: "Install dependencies", isDone: false, taskId: 27 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 27 },
      { name: "Setup database schema", isDone: false, taskId: 27 },
      { name: "Implement authentication", isDone: true, taskId: 27 },
      { name: "Build user dashboard", isDone: false, taskId: 27 },
      { name: "Add project CRUD", isDone: true, taskId: 27 },
      { name: "Implement task management", isDone: false, taskId: 27 },
      { name: "Write unit tests", isDone: true, taskId: 27 },
      { name: "Deploy to production", isDone: false, taskId: 27 },

      // --- Task 28 ---
      { name: "Setup project structure", isDone: false, taskId: 28 },
      { name: "Install dependencies", isDone: true, taskId: 28 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 28 },
      { name: "Setup database schema", isDone: true, taskId: 28 },
      { name: "Implement authentication", isDone: false, taskId: 28 },
      { name: "Build user dashboard", isDone: true, taskId: 28 },
      { name: "Add project CRUD", isDone: false, taskId: 28 },
      { name: "Implement task management", isDone: true, taskId: 28 },
      { name: "Write unit tests", isDone: false, taskId: 28 },
      { name: "Deploy to production", isDone: true, taskId: 28 },

      // --- Task 29 ---
      { name: "Setup project structure", isDone: true, taskId: 29 },
      { name: "Install dependencies", isDone: false, taskId: 29 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 29 },
      { name: "Setup database schema", isDone: false, taskId: 29 },
      { name: "Implement authentication", isDone: true, taskId: 29 },
      { name: "Build user dashboard", isDone: false, taskId: 29 },
      { name: "Add project CRUD", isDone: true, taskId: 29 },
      { name: "Implement task management", isDone: false, taskId: 29 },
      { name: "Write unit tests", isDone: true, taskId: 29 },
      { name: "Deploy to production", isDone: false, taskId: 29 },

      // --- Task 30 ---
      { name: "Setup project structure", isDone: false, taskId: 30 },
      { name: "Install dependencies", isDone: true, taskId: 30 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 30 },
      { name: "Setup database schema", isDone: true, taskId: 30 },
      { name: "Implement authentication", isDone: false, taskId: 30 },
      { name: "Build user dashboard", isDone: true, taskId: 30 },
      { name: "Add project CRUD", isDone: false, taskId: 30 },
      { name: "Implement task management", isDone: true, taskId: 30 },
      { name: "Write unit tests", isDone: false, taskId: 30 },
      { name: "Deploy to production", isDone: true, taskId: 30 },

      // --- Task 31 ---
      { name: "Setup project structure", isDone: true, taskId: 31 },
      { name: "Install dependencies", isDone: false, taskId: 31 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 31 },
      { name: "Setup database schema", isDone: true, taskId: 31 },
      { name: "Implement authentication", isDone: false, taskId: 31 },
      { name: "Build user dashboard", isDone: true, taskId: 31 },
      { name: "Add project CRUD", isDone: false, taskId: 31 },
      { name: "Implement task management", isDone: true, taskId: 31 },
      { name: "Write unit tests", isDone: false, taskId: 31 },
      { name: "Deploy to production", isDone: true, taskId: 31 },

      // --- Task 32 ---
      { name: "Setup project structure", isDone: false, taskId: 32 },
      { name: "Install dependencies", isDone: true, taskId: 32 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 32 },
      { name: "Setup database schema", isDone: false, taskId: 32 },
      { name: "Implement authentication", isDone: true, taskId: 32 },
      { name: "Build user dashboard", isDone: false, taskId: 32 },
      { name: "Add project CRUD", isDone: true, taskId: 32 },
      { name: "Implement task management", isDone: false, taskId: 32 },
      { name: "Write unit tests", isDone: true, taskId: 32 },
      { name: "Deploy to production", isDone: false, taskId: 32 },

      // --- Task 33 ---
      { name: "Setup project structure", isDone: true, taskId: 33 },
      { name: "Install dependencies", isDone: false, taskId: 33 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 33 },
      { name: "Setup database schema", isDone: false, taskId: 33 },
      { name: "Implement authentication", isDone: true, taskId: 33 },
      { name: "Build user dashboard", isDone: false, taskId: 33 },
      { name: "Add project CRUD", isDone: true, taskId: 33 },
      { name: "Implement task management", isDone: false, taskId: 33 },
      { name: "Write unit tests", isDone: true, taskId: 33 },
      { name: "Deploy to production", isDone: false, taskId: 33 },

      // --- Task 34 ---
      { name: "Setup project structure", isDone: false, taskId: 34 },
      { name: "Install dependencies", isDone: true, taskId: 34 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 34 },
      { name: "Setup database schema", isDone: true, taskId: 34 },
      { name: "Implement authentication", isDone: false, taskId: 34 },
      { name: "Build user dashboard", isDone: true, taskId: 34 },
      { name: "Add project CRUD", isDone: false, taskId: 34 },
      { name: "Implement task management", isDone: true, taskId: 34 },
      { name: "Write unit tests", isDone: false, taskId: 34 },
      { name: "Deploy to production", isDone: true, taskId: 34 },

      // --- Task 35 ---
      { name: "Setup project structure", isDone: true, taskId: 35 },
      { name: "Install dependencies", isDone: false, taskId: 35 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 35 },
      { name: "Setup database schema", isDone: true, taskId: 35 },
      { name: "Implement authentication", isDone: false, taskId: 35 },
      { name: "Build user dashboard", isDone: true, taskId: 35 },
      { name: "Add project CRUD", isDone: false, taskId: 35 },
      { name: "Implement task management", isDone: true, taskId: 35 },
      { name: "Write unit tests", isDone: false, taskId: 35 },
      { name: "Deploy to production", isDone: true, taskId: 35 },

      // --- Task 36 ---
      { name: "Setup project structure", isDone: false, taskId: 36 },
      { name: "Install dependencies", isDone: true, taskId: 36 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 36 },
      { name: "Setup database schema", isDone: true, taskId: 36 },
      { name: "Implement authentication", isDone: false, taskId: 36 },
      { name: "Build user dashboard", isDone: true, taskId: 36 },
      { name: "Add project CRUD", isDone: false, taskId: 36 },
      { name: "Implement task management", isDone: true, taskId: 36 },
      { name: "Write unit tests", isDone: false, taskId: 36 },
      { name: "Deploy to production", isDone: true, taskId: 36 },

      // --- Task 37 ---
      { name: "Setup project structure", isDone: true, taskId: 37 },
      { name: "Install dependencies", isDone: false, taskId: 37 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 37 },
      { name: "Setup database schema", isDone: false, taskId: 37 },
      { name: "Implement authentication", isDone: true, taskId: 37 },
      { name: "Build user dashboard", isDone: false, taskId: 37 },
      { name: "Add project CRUD", isDone: true, taskId: 37 },
      { name: "Implement task management", isDone: false, taskId: 37 },
      { name: "Write unit tests", isDone: true, taskId: 37 },
      { name: "Deploy to production", isDone: false, taskId: 37 },

      // --- Task 38 ---
      { name: "Setup project structure", isDone: false, taskId: 38 },
      { name: "Install dependencies", isDone: true, taskId: 38 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 38 },
      { name: "Setup database schema", isDone: true, taskId: 38 },
      { name: "Implement authentication", isDone: false, taskId: 38 },
      { name: "Build user dashboard", isDone: true, taskId: 38 },
      { name: "Add project CRUD", isDone: false, taskId: 38 },
      { name: "Implement task management", isDone: true, taskId: 38 },
      { name: "Write unit tests", isDone: false, taskId: 38 },
      { name: "Deploy to production", isDone: true, taskId: 38 },

      // --- Task 39 ---
      { name: "Setup project structure", isDone: true, taskId: 39 },
      { name: "Install dependencies", isDone: false, taskId: 39 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 39 },
      { name: "Setup database schema", isDone: false, taskId: 39 },
      { name: "Implement authentication", isDone: true, taskId: 39 },
      { name: "Build user dashboard", isDone: false, taskId: 39 },
      { name: "Add project CRUD", isDone: true, taskId: 39 },
      { name: "Implement task management", isDone: false, taskId: 39 },
      { name: "Write unit tests", isDone: true, taskId: 39 },
      { name: "Deploy to production", isDone: false, taskId: 39 },

      // --- Task 40 ---
      { name: "Setup project structure", isDone: false, taskId: 40 },
      { name: "Install dependencies", isDone: true, taskId: 40 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 40 },
      { name: "Setup database schema", isDone: true, taskId: 40 },
      { name: "Implement authentication", isDone: false, taskId: 40 },
      { name: "Build user dashboard", isDone: true, taskId: 40 },
      { name: "Add project CRUD", isDone: false, taskId: 40 },
      { name: "Implement task management", isDone: true, taskId: 40 },
      { name: "Write unit tests", isDone: false, taskId: 40 },
      { name: "Deploy to production", isDone: true, taskId: 40 },

      // --- Task 41 ---
      { name: "Setup project structure", isDone: true, taskId: 41 },
      { name: "Install dependencies", isDone: false, taskId: 41 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 41 },
      { name: "Setup database schema", isDone: true, taskId: 41 },
      { name: "Implement authentication", isDone: false, taskId: 41 },
      { name: "Build user dashboard", isDone: true, taskId: 41 },
      { name: "Add project CRUD", isDone: false, taskId: 41 },
      { name: "Implement task management", isDone: true, taskId: 41 },
      { name: "Write unit tests", isDone: false, taskId: 41 },
      { name: "Deploy to production", isDone: true, taskId: 41 },

      // --- Task 42 ---
      { name: "Setup project structure", isDone: false, taskId: 42 },
      { name: "Install dependencies", isDone: true, taskId: 42 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 42 },
      { name: "Setup database schema", isDone: false, taskId: 42 },
      { name: "Implement authentication", isDone: true, taskId: 42 },
      { name: "Build user dashboard", isDone: false, taskId: 42 },
      { name: "Add project CRUD", isDone: true, taskId: 42 },
      { name: "Implement task management", isDone: false, taskId: 42 },
      { name: "Write unit tests", isDone: true, taskId: 42 },
      { name: "Deploy to production", isDone: false, taskId: 42 },

      // --- Task 43 ---
      { name: "Setup project structure", isDone: true, taskId: 43 },
      { name: "Install dependencies", isDone: false, taskId: 43 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 43 },
      { name: "Setup database schema", isDone: false, taskId: 43 },
      { name: "Implement authentication", isDone: true, taskId: 43 },
      { name: "Build user dashboard", isDone: false, taskId: 43 },
      { name: "Add project CRUD", isDone: true, taskId: 43 },
      { name: "Implement task management", isDone: false, taskId: 43 },
      { name: "Write unit tests", isDone: true, taskId: 43 },
      { name: "Deploy to production", isDone: false, taskId: 43 },

      // --- Task 44 ---
      { name: "Setup project structure", isDone: false, taskId: 44 },
      { name: "Install dependencies", isDone: true, taskId: 44 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 44 },
      { name: "Setup database schema", isDone: true, taskId: 44 },
      { name: "Implement authentication", isDone: false, taskId: 44 },
      { name: "Build user dashboard", isDone: true, taskId: 44 },
      { name: "Add project CRUD", isDone: false, taskId: 44 },
      { name: "Implement task management", isDone: true, taskId: 44 },
      { name: "Write unit tests", isDone: false, taskId: 44 },
      { name: "Deploy to production", isDone: true, taskId: 44 },

      // --- Task 45 ---
      { name: "Setup project structure", isDone: true, taskId: 45 },
      { name: "Install dependencies", isDone: false, taskId: 45 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 45 },
      { name: "Setup database schema", isDone: true, taskId: 45 },
      { name: "Implement authentication", isDone: false, taskId: 45 },
      { name: "Build user dashboard", isDone: true, taskId: 45 },
      { name: "Add project CRUD", isDone: false, taskId: 45 },
      { name: "Implement task management", isDone: true, taskId: 45 },
      { name: "Write unit tests", isDone: false, taskId: 45 },
      { name: "Deploy to production", isDone: true, taskId: 45 },

      // --- Task 46 ---
      { name: "Setup project structure", isDone: false, taskId: 46 },
      { name: "Install dependencies", isDone: true, taskId: 46 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 46 },
      { name: "Setup database schema", isDone: true, taskId: 46 },
      { name: "Implement authentication", isDone: false, taskId: 46 },
      { name: "Build user dashboard", isDone: true, taskId: 46 },
      { name: "Add project CRUD", isDone: false, taskId: 46 },
      { name: "Implement task management", isDone: true, taskId: 46 },
      { name: "Write unit tests", isDone: false, taskId: 46 },
      { name: "Deploy to production", isDone: true, taskId: 46 },

      // --- Task 47 ---
      { name: "Setup project structure", isDone: true, taskId: 47 },
      { name: "Install dependencies", isDone: false, taskId: 47 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 47 },
      { name: "Setup database schema", isDone: false, taskId: 47 },
      { name: "Implement authentication", isDone: true, taskId: 47 },
      { name: "Build user dashboard", isDone: false, taskId: 47 },
      { name: "Add project CRUD", isDone: true, taskId: 47 },
      { name: "Implement task management", isDone: false, taskId: 47 },
      { name: "Write unit tests", isDone: true, taskId: 47 },
      { name: "Deploy to production", isDone: false, taskId: 47 },

      // --- Task 48 ---
      { name: "Setup project structure", isDone: false, taskId: 48 },
      { name: "Install dependencies", isDone: true, taskId: 48 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 48 },
      { name: "Setup database schema", isDone: true, taskId: 48 },
      { name: "Implement authentication", isDone: false, taskId: 48 },
      { name: "Build user dashboard", isDone: true, taskId: 48 },
      { name: "Add project CRUD", isDone: false, taskId: 48 },
      { name: "Implement task management", isDone: true, taskId: 48 },
      { name: "Write unit tests", isDone: false, taskId: 48 },
      { name: "Deploy to production", isDone: true, taskId: 48 },

      // --- Task 49 ---
      { name: "Setup project structure", isDone: true, taskId: 49 },
      { name: "Install dependencies", isDone: false, taskId: 49 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 49 },
      { name: "Setup database schema", isDone: false, taskId: 49 },
      { name: "Implement authentication", isDone: true, taskId: 49 },
      { name: "Build user dashboard", isDone: false, taskId: 49 },
      { name: "Add project CRUD", isDone: true, taskId: 49 },
      { name: "Implement task management", isDone: false, taskId: 49 },
      { name: "Write unit tests", isDone: true, taskId: 49 },
      { name: "Deploy to production", isDone: false, taskId: 49 },

      // --- Task 50 ---
      { name: "Setup project structure", isDone: false, taskId: 50 },
      { name: "Install dependencies", isDone: true, taskId: 50 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 50 },
      { name: "Setup database schema", isDone: true, taskId: 50 },
      { name: "Implement authentication", isDone: false, taskId: 50 },
      { name: "Build user dashboard", isDone: true, taskId: 50 },
      { name: "Add project CRUD", isDone: false, taskId: 50 },
      { name: "Implement task management", isDone: true, taskId: 50 },
      { name: "Write unit tests", isDone: false, taskId: 50 },
      { name: "Deploy to production", isDone: true, taskId: 50 },

      // --- Task 51 ---
      { name: "Setup project structure", isDone: true, taskId: 51 },
      { name: "Install dependencies", isDone: false, taskId: 51 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 51 },
      { name: "Setup database schema", isDone: false, taskId: 51 },
      { name: "Implement authentication", isDone: true, taskId: 51 },
      { name: "Build user dashboard", isDone: false, taskId: 51 },
      { name: "Add project CRUD", isDone: true, taskId: 51 },
      { name: "Implement task management", isDone: false, taskId: 51 },
      { name: "Write unit tests", isDone: true, taskId: 51 },
      { name: "Deploy to production", isDone: false, taskId: 51 },

      // --- Task 52 ---
      { name: "Setup project structure", isDone: false, taskId: 52 },
      { name: "Install dependencies", isDone: true, taskId: 52 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 52 },
      { name: "Setup database schema", isDone: true, taskId: 52 },
      { name: "Implement authentication", isDone: false, taskId: 52 },
      { name: "Build user dashboard", isDone: true, taskId: 52 },
      { name: "Add project CRUD", isDone: false, taskId: 52 },
      { name: "Implement task management", isDone: true, taskId: 52 },
      { name: "Write unit tests", isDone: false, taskId: 52 },
      { name: "Deploy to production", isDone: true, taskId: 52 },

      // --- Task 53 ---
      { name: "Setup project structure", isDone: true, taskId: 53 },
      { name: "Install dependencies", isDone: false, taskId: 53 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 53 },
      { name: "Setup database schema", isDone: false, taskId: 53 },
      { name: "Implement authentication", isDone: true, taskId: 53 },
      { name: "Build user dashboard", isDone: false, taskId: 53 },
      { name: "Add project CRUD", isDone: true, taskId: 53 },
      { name: "Implement task management", isDone: false, taskId: 53 },
      { name: "Write unit tests", isDone: true, taskId: 53 },
      { name: "Deploy to production", isDone: false, taskId: 53 },

      // --- Task 54 ---
      { name: "Setup project structure", isDone: false, taskId: 54 },
      { name: "Install dependencies", isDone: true, taskId: 54 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 54 },
      { name: "Setup database schema", isDone: true, taskId: 54 },
      { name: "Implement authentication", isDone: false, taskId: 54 },
      { name: "Build user dashboard", isDone: true, taskId: 54 },
      { name: "Add project CRUD", isDone: false, taskId: 54 },
      { name: "Implement task management", isDone: true, taskId: 54 },
      { name: "Write unit tests", isDone: false, taskId: 54 },
      { name: "Deploy to production", isDone: true, taskId: 54 },

      // --- Task 55 ---
      { name: "Setup project structure", isDone: true, taskId: 55 },
      { name: "Install dependencies", isDone: false, taskId: 55 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 55 },
      { name: "Setup database schema", isDone: true, taskId: 55 },
      { name: "Implement authentication", isDone: false, taskId: 55 },
      { name: "Build user dashboard", isDone: true, taskId: 55 },
      { name: "Add project CRUD", isDone: false, taskId: 55 },
      { name: "Implement task management", isDone: true, taskId: 55 },
      { name: "Write unit tests", isDone: false, taskId: 55 },
      { name: "Deploy to production", isDone: true, taskId: 55 },

      // --- Task 56 ---
      { name: "Setup project structure", isDone: false, taskId: 56 },
      { name: "Install dependencies", isDone: true, taskId: 56 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 56 },
      { name: "Setup database schema", isDone: true, taskId: 56 },
      { name: "Implement authentication", isDone: false, taskId: 56 },
      { name: "Build user dashboard", isDone: true, taskId: 56 },
      { name: "Add project CRUD", isDone: false, taskId: 56 },
      { name: "Implement task management", isDone: true, taskId: 56 },
      { name: "Write unit tests", isDone: false, taskId: 56 },
      { name: "Deploy to production", isDone: true, taskId: 56 },

      // --- Task 57 ---
      { name: "Setup project structure", isDone: true, taskId: 57 },
      { name: "Install dependencies", isDone: false, taskId: 57 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 57 },
      { name: "Setup database schema", isDone: false, taskId: 57 },
      { name: "Implement authentication", isDone: true, taskId: 57 },
      { name: "Build user dashboard", isDone: false, taskId: 57 },
      { name: "Add project CRUD", isDone: true, taskId: 57 },
      { name: "Implement task management", isDone: false, taskId: 57 },
      { name: "Write unit tests", isDone: true, taskId: 57 },
      { name: "Deploy to production", isDone: false, taskId: 57 },

      // --- Task 58 ---
      { name: "Setup project structure", isDone: false, taskId: 58 },
      { name: "Install dependencies", isDone: true, taskId: 58 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 58 },
      { name: "Setup database schema", isDone: true, taskId: 58 },
      { name: "Implement authentication", isDone: false, taskId: 58 },
      { name: "Build user dashboard", isDone: true, taskId: 58 },
      { name: "Add project CRUD", isDone: false, taskId: 58 },
      { name: "Implement task management", isDone: true, taskId: 58 },
      { name: "Write unit tests", isDone: false, taskId: 58 },
      { name: "Deploy to production", isDone: true, taskId: 58 },

      // --- Task 59 ---
      { name: "Setup project structure", isDone: true, taskId: 59 },
      { name: "Install dependencies", isDone: false, taskId: 59 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 59 },
      { name: "Setup database schema", isDone: false, taskId: 59 },
      { name: "Implement authentication", isDone: true, taskId: 59 },
      { name: "Build user dashboard", isDone: false, taskId: 59 },
      { name: "Add project CRUD", isDone: true, taskId: 59 },
      { name: "Implement task management", isDone: false, taskId: 59 },
      { name: "Write unit tests", isDone: true, taskId: 59 },
      { name: "Deploy to production", isDone: false, taskId: 59 },

      // --- Task 60 ---
      { name: "Setup project structure", isDone: false, taskId: 60 },
      { name: "Install dependencies", isDone: true, taskId: 60 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 60 },
      { name: "Setup database schema", isDone: true, taskId: 60 },
      { name: "Implement authentication", isDone: false, taskId: 60 },
      { name: "Build user dashboard", isDone: true, taskId: 60 },
      { name: "Add project CRUD", isDone: false, taskId: 60 },
      { name: "Implement task management", isDone: true, taskId: 60 },
      { name: "Write unit tests", isDone: false, taskId: 60 },
      { name: "Deploy to production", isDone: true, taskId: 60 },

      // --- Task 61 ---
      { name: "Setup project structure", isDone: true, taskId: 61 },
      { name: "Install dependencies", isDone: false, taskId: 61 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 61 },
      { name: "Setup database schema", isDone: false, taskId: 61 },
      { name: "Implement authentication", isDone: true, taskId: 61 },
      { name: "Build user dashboard", isDone: false, taskId: 61 },
      { name: "Add project CRUD", isDone: true, taskId: 61 },
      { name: "Implement task management", isDone: false, taskId: 61 },
      { name: "Write unit tests", isDone: true, taskId: 61 },
      { name: "Deploy to production", isDone: false, taskId: 61 },

      // --- Task 62 ---
      { name: "Setup project structure", isDone: false, taskId: 62 },
      { name: "Install dependencies", isDone: true, taskId: 62 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 62 },
      { name: "Setup database schema", isDone: true, taskId: 62 },
      { name: "Implement authentication", isDone: false, taskId: 62 },
      { name: "Build user dashboard", isDone: true, taskId: 62 },
      { name: "Add project CRUD", isDone: false, taskId: 62 },
      { name: "Implement task management", isDone: true, taskId: 62 },
      { name: "Write unit tests", isDone: false, taskId: 62 },
      { name: "Deploy to production", isDone: true, taskId: 62 },

      // --- Task 63 ---
      { name: "Setup project structure", isDone: true, taskId: 63 },
      { name: "Install dependencies", isDone: false, taskId: 63 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 63 },
      { name: "Setup database schema", isDone: false, taskId: 63 },
      { name: "Implement authentication", isDone: true, taskId: 63 },
      { name: "Build user dashboard", isDone: false, taskId: 63 },
      { name: "Add project CRUD", isDone: true, taskId: 63 },
      { name: "Implement task management", isDone: false, taskId: 63 },
      { name: "Write unit tests", isDone: true, taskId: 63 },
      { name: "Deploy to production", isDone: false, taskId: 63 },

      // --- Task 64 ---
      { name: "Setup project structure", isDone: false, taskId: 64 },
      { name: "Install dependencies", isDone: true, taskId: 64 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 64 },
      { name: "Setup database schema", isDone: true, taskId: 64 },
      { name: "Implement authentication", isDone: false, taskId: 64 },
      { name: "Build user dashboard", isDone: true, taskId: 64 },
      { name: "Add project CRUD", isDone: false, taskId: 64 },
      { name: "Implement task management", isDone: true, taskId: 64 },
      { name: "Write unit tests", isDone: false, taskId: 64 },
      { name: "Deploy to production", isDone: true, taskId: 64 },

      // --- Task 65 ---
      { name: "Setup project structure", isDone: true, taskId: 65 },
      { name: "Install dependencies", isDone: false, taskId: 65 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 65 },
      { name: "Setup database schema", isDone: false, taskId: 65 },
      { name: "Implement authentication", isDone: true, taskId: 65 },
      { name: "Build user dashboard", isDone: false, taskId: 65 },
      { name: "Add project CRUD", isDone: true, taskId: 65 },
      { name: "Implement task management", isDone: false, taskId: 65 },
      { name: "Write unit tests", isDone: true, taskId: 65 },
      { name: "Deploy to production", isDone: false, taskId: 65 },

      // --- Task 66 ---
      { name: "Setup project structure", isDone: false, taskId: 66 },
      { name: "Install dependencies", isDone: true, taskId: 66 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 66 },
      { name: "Setup database schema", isDone: true, taskId: 66 },
      { name: "Implement authentication", isDone: false, taskId: 66 },
      { name: "Build user dashboard", isDone: true, taskId: 66 },
      { name: "Add project CRUD", isDone: false, taskId: 66 },
      { name: "Implement task management", isDone: true, taskId: 66 },
      { name: "Write unit tests", isDone: false, taskId: 66 },
      { name: "Deploy to production", isDone: true, taskId: 66 },

      // --- Task 67 ---
      { name: "Setup project structure", isDone: true, taskId: 67 },
      { name: "Install dependencies", isDone: false, taskId: 67 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 67 },
      { name: "Setup database schema", isDone: false, taskId: 67 },
      { name: "Implement authentication", isDone: true, taskId: 67 },
      { name: "Build user dashboard", isDone: false, taskId: 67 },
      { name: "Add project CRUD", isDone: true, taskId: 67 },
      { name: "Implement task management", isDone: false, taskId: 67 },
      { name: "Write unit tests", isDone: true, taskId: 67 },
      { name: "Deploy to production", isDone: false, taskId: 67 },

      // --- Task 68 ---
      { name: "Setup project structure", isDone: false, taskId: 68 },
      { name: "Install dependencies", isDone: true, taskId: 68 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 68 },
      { name: "Setup database schema", isDone: true, taskId: 68 },
      { name: "Implement authentication", isDone: false, taskId: 68 },
      { name: "Build user dashboard", isDone: true, taskId: 68 },
      { name: "Add project CRUD", isDone: false, taskId: 68 },
      { name: "Implement task management", isDone: true, taskId: 68 },
      { name: "Write unit tests", isDone: false, taskId: 68 },
      { name: "Deploy to production", isDone: true, taskId: 68 },

      // --- Task 69 ---
      { name: "Setup project structure", isDone: true, taskId: 69 },
      { name: "Install dependencies", isDone: false, taskId: 69 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 69 },
      { name: "Setup database schema", isDone: false, taskId: 69 },
      { name: "Implement authentication", isDone: true, taskId: 69 },
      { name: "Build user dashboard", isDone: false, taskId: 69 },
      { name: "Add project CRUD", isDone: true, taskId: 69 },
      { name: "Implement task management", isDone: false, taskId: 69 },
      { name: "Write unit tests", isDone: true, taskId: 69 },
      { name: "Deploy to production", isDone: false, taskId: 69 },

      // --- Task 70 ---
      { name: "Setup project structure", isDone: false, taskId: 70 },
      { name: "Install dependencies", isDone: true, taskId: 70 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 70 },
      { name: "Setup database schema", isDone: true, taskId: 70 },
      { name: "Implement authentication", isDone: false, taskId: 70 },
      { name: "Build user dashboard", isDone: true, taskId: 70 },
      { name: "Add project CRUD", isDone: false, taskId: 70 },
      { name: "Implement task management", isDone: true, taskId: 70 },
      { name: "Write unit tests", isDone: false, taskId: 70 },
      { name: "Deploy to production", isDone: true, taskId: 70 },

      // --- Task 71 ---
      { name: "Setup project structure", isDone: true, taskId: 71 },
      { name: "Install dependencies", isDone: false, taskId: 71 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 71 },
      { name: "Setup database schema", isDone: false, taskId: 71 },
      { name: "Implement authentication", isDone: true, taskId: 71 },
      { name: "Build user dashboard", isDone: false, taskId: 71 },
      { name: "Add project CRUD", isDone: true, taskId: 71 },
      { name: "Implement task management", isDone: false, taskId: 71 },
      { name: "Write unit tests", isDone: true, taskId: 71 },
      { name: "Deploy to production", isDone: false, taskId: 71 },

      // --- Task 72 ---
      { name: "Setup project structure", isDone: false, taskId: 72 },
      { name: "Install dependencies", isDone: true, taskId: 72 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 72 },
      { name: "Setup database schema", isDone: true, taskId: 72 },
      { name: "Implement authentication", isDone: false, taskId: 72 },
      { name: "Build user dashboard", isDone: true, taskId: 72 },
      { name: "Add project CRUD", isDone: false, taskId: 72 },
      { name: "Implement task management", isDone: true, taskId: 72 },
      { name: "Write unit tests", isDone: false, taskId: 72 },
      { name: "Deploy to production", isDone: true, taskId: 72 },

      // --- Task 73 ---
      { name: "Setup project structure", isDone: true, taskId: 73 },
      { name: "Install dependencies", isDone: false, taskId: 73 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 73 },
      { name: "Setup database schema", isDone: false, taskId: 73 },
      { name: "Implement authentication", isDone: true, taskId: 73 },
      { name: "Build user dashboard", isDone: false, taskId: 73 },
      { name: "Add project CRUD", isDone: true, taskId: 73 },
      { name: "Implement task management", isDone: false, taskId: 73 },
      { name: "Write unit tests", isDone: true, taskId: 73 },
      { name: "Deploy to production", isDone: false, taskId: 73 },

      // --- Task 74 ---
      { name: "Setup project structure", isDone: false, taskId: 74 },
      { name: "Install dependencies", isDone: true, taskId: 74 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 74 },
      { name: "Setup database schema", isDone: true, taskId: 74 },
      { name: "Implement authentication", isDone: false, taskId: 74 },
      { name: "Build user dashboard", isDone: true, taskId: 74 },
      { name: "Add project CRUD", isDone: false, taskId: 74 },
      { name: "Implement task management", isDone: true, taskId: 74 },
      { name: "Write unit tests", isDone: false, taskId: 74 },
      { name: "Deploy to production", isDone: true, taskId: 74 },

      // --- Task 75 ---
      { name: "Setup project structure", isDone: true, taskId: 75 },
      { name: "Install dependencies", isDone: false, taskId: 75 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 75 },
      { name: "Setup database schema", isDone: false, taskId: 75 },
      { name: "Implement authentication", isDone: true, taskId: 75 },
      { name: "Build user dashboard", isDone: false, taskId: 75 },
      { name: "Add project CRUD", isDone: true, taskId: 75 },
      { name: "Implement task management", isDone: false, taskId: 75 },
      { name: "Write unit tests", isDone: true, taskId: 75 },
      { name: "Deploy to production", isDone: false, taskId: 75 },

      // --- Task 76 ---
      { name: "Setup project structure", isDone: false, taskId: 76 },
      { name: "Install dependencies", isDone: true, taskId: 76 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 76 },
      { name: "Setup database schema", isDone: true, taskId: 76 },
      { name: "Implement authentication", isDone: false, taskId: 76 },
      { name: "Build user dashboard", isDone: true, taskId: 76 },
      { name: "Add project CRUD", isDone: false, taskId: 76 },
      { name: "Implement task management", isDone: true, taskId: 76 },
      { name: "Write unit tests", isDone: false, taskId: 76 },
      { name: "Deploy to production", isDone: true, taskId: 76 },

      // --- Task 77 ---
      { name: "Setup project structure", isDone: true, taskId: 77 },
      { name: "Install dependencies", isDone: false, taskId: 77 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 77 },
      { name: "Setup database schema", isDone: false, taskId: 77 },
      { name: "Implement authentication", isDone: true, taskId: 77 },
      { name: "Build user dashboard", isDone: false, taskId: 77 },
      { name: "Add project CRUD", isDone: true, taskId: 77 },
      { name: "Implement task management", isDone: false, taskId: 77 },
      { name: "Write unit tests", isDone: true, taskId: 77 },
      { name: "Deploy to production", isDone: false, taskId: 77 },

      // --- Task 78 ---
      { name: "Setup project structure", isDone: false, taskId: 78 },
      { name: "Install dependencies", isDone: true, taskId: 78 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 78 },
      { name: "Setup database schema", isDone: true, taskId: 78 },
      { name: "Implement authentication", isDone: false, taskId: 78 },
      { name: "Build user dashboard", isDone: true, taskId: 78 },
      { name: "Add project CRUD", isDone: false, taskId: 78 },
      { name: "Implement task management", isDone: true, taskId: 78 },
      { name: "Write unit tests", isDone: false, taskId: 78 },
      { name: "Deploy to production", isDone: true, taskId: 78 },

      // --- Task 79 ---
      { name: "Setup project structure", isDone: true, taskId: 79 },
      { name: "Install dependencies", isDone: false, taskId: 79 },
      { name: "Configure ESLint & Prettier", isDone: true, taskId: 79 },
      { name: "Setup database schema", isDone: false, taskId: 79 },
      { name: "Implement authentication", isDone: true, taskId: 79 },
      { name: "Build user dashboard", isDone: false, taskId: 79 },
      { name: "Add project CRUD", isDone: true, taskId: 79 },
      { name: "Implement task management", isDone: false, taskId: 79 },
      { name: "Write unit tests", isDone: true, taskId: 79 },
      { name: "Deploy to production", isDone: false, taskId: 79 },

      // --- Task 80 ---
      { name: "Setup project structure", isDone: false, taskId: 80 },
      { name: "Install dependencies", isDone: true, taskId: 80 },
      { name: "Configure ESLint & Prettier", isDone: false, taskId: 80 },
      { name: "Setup database schema", isDone: true, taskId: 80 },
      { name: "Implement authentication", isDone: false, taskId: 80 },
      { name: "Build user dashboard", isDone: true, taskId: 80 },
      { name: "Add project CRUD", isDone: false, taskId: 80 },
      { name: "Implement task management", isDone: true, taskId: 80 },
      { name: "Write unit tests", isDone: false, taskId: 80 },
      { name: "Deploy to production", isDone: true, taskId: 80 },
    ],
  });

  // ----------------- Task comments -----------------

  await prisma.taskComment.createMany({
    data: [
      // --- Task 1 ---
      { id: 1, content: "Task assigned to developer.", taskId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 2, content: "Initial analysis done.", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 3, content: "Requirements clarified.", taskId: 1, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 4, content: "Pending review from team lead.", taskId: 1, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 5, content: "Ready for implementation.", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 2 ---
      { id: 6, content: "Started development.", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, content: "Found minor bug.", taskId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 8, content: "Bug fixed, needs testing.", taskId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 9, content: "Testing completed.", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 10, content: "Approved and merged.", taskId: 2, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 3 ---
      { id: 11, content: "UI design uploaded.", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 12, content: "Feedback received.", taskId: 3, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 13, content: "Changes implemented.", taskId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 14, content: "Ready for QA.", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 15, content: "QA completed.", taskId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 4 ---
      { id: 16, content: "Database migration planned.", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 17, content: "Migration executed.", taskId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 18, content: "Backup verified.", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 19, content: "Issue found and fixed.", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 20, content: "Migration successful.", taskId: 4, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 5 ---
      { id: 21, content: "API endpoints designed.", taskId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 22, content: "Endpoints tested.", taskId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 23, content: "Documentation updated.", taskId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 24, content: "Code review done.", taskId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 25, content: "Task closed.", taskId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 6 ---
      { id: 26, content: "Dependencies installed.", taskId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 27, content: "Initial setup completed.", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 28, content: "Configuration verified.", taskId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 29, content: "Task in progress.", taskId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 30, content: "Progress reviewed.", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 7 ---
      { id: 31, content: "Task brief shared.", taskId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 32, content: "Requirements finalized.", taskId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 33, content: "Started implementation.", taskId: 7, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 34, content: "Progress meeting done.", taskId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 35, content: "Task halfway completed.", taskId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 8 ---
      { id: 36, content: "Dependencies checked.", taskId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 37, content: "Initial testing done.", taskId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 38, content: "Bug found and fixed.", taskId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 39, content: "Code review done.", taskId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 40, content: "Ready for deployment.", taskId: 8, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 9 ---
      { id: 41, content: "UI components created.", taskId: 9, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 42, content: "Integrated with backend.", taskId: 9, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 43, content: "Testing in progress.", taskId: 9, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 44, content: "Minor fixes applied.", taskId: 9, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 45, content: "QA approved.", taskId: 9, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 10 ---
      { id: 46, content: "Database queries optimized.", taskId: 10, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 47, content: "Performance testing done.", taskId: 10, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 48, content: "Indexing improved.", taskId: 10, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 49, content: "Code merged to main.", taskId: 10, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 50, content: "Task closed.", taskId: 10, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 11 ---
      { id: 51, content: "API endpoints created.", taskId: 11, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 52, content: "Endpoints tested successfully.", taskId: 11, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 53, content: "Bug in API fixed.", taskId: 11, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 54, content: "Documentation updated.", taskId: 11, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 55, content: "Ready for QA.", taskId: 11, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 12 ---
      { id: 56, content: "Design updated.", taskId: 12, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 57, content: "Client feedback applied.", taskId: 12, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 58, content: "Testing started.", taskId: 12, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 59, content: "Minor fixes done.", taskId: 12, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 60, content: "QA approved.", taskId: 12, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 13 ---
      { id: 61, content: "Initial task setup.", taskId: 13, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 62, content: "Dependencies installed.", taskId: 13, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 63, content: "Progress update shared.", taskId: 13, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 64, content: "Halfway done.", taskId: 13, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 65, content: "Ready for review.", taskId: 13, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 14 ---
      { id: 66, content: "Task brief reviewed.", taskId: 14, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 67, content: "Implementation started.", taskId: 14, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 68, content: "Progress update shared.", taskId: 14, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 69, content: "Code review requested.", taskId: 14, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 70, content: "Task completed.", taskId: 14, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 15 ---
      { id: 71, content: "Test cases written.", taskId: 15, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 72, content: "Testing in progress.", taskId: 15, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 73, content: "Bug fixed.", taskId: 15, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 74, content: "QA approved.", taskId: 15, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 75, content: "Task closed.", taskId: 15, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 16 ---
      { id: 76, content: "Requirements gathered.", taskId: 16, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 77, content: "Initial setup done.", taskId: 16, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 78, content: "Implementation in progress.", taskId: 16, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 79, content: "Halfway completed.", taskId: 16, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 80, content: "Code review done.", taskId: 16, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 17 ---
      { id: 81, content: "Design finalized.", taskId: 17, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 82, content: "Development started.", taskId: 17, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 83, content: "Progress update shared.", taskId: 17, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 84, content: "QA testing started.", taskId: 17, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 85, content: "Task ready for deployment.", taskId: 17, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 18 ---
      { id: 86, content: "Initial analysis done.", taskId: 18, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 87, content: "Development started.", taskId: 18, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 88, content: "Bug found and fixed.", taskId: 18, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 89, content: "Code review completed.", taskId: 18, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 90, content: "QA approved.", taskId: 18, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 19 ---
      { id: 91, content: "Database schema created.", taskId: 19, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 92, content: "Schema optimized.", taskId: 19, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 93, content: "Testing done.", taskId: 19, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 94, content: "Minor fixes applied.", taskId: 19, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 95, content: "Task closed.", taskId: 19, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 20 ---
      { id: 96, content: "API integration started.", taskId: 20, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 97, content: "Integration completed.", taskId: 20, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 98, content: "Testing in progress.", taskId: 20, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 99, content: "QA approved.", taskId: 20, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 100, content: "Task deployed.", taskId: 20, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 21 ---
      { id: 101, content: "Feature planned.", taskId: 21, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 102, content: "Development started.", taskId: 21, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 103, content: "Progress update shared.", taskId: 21, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 104, content: "Code review completed.", taskId: 21, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 105, content: "Task ready for QA.", taskId: 21, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 22 ---
      { id: 106, content: "Design shared.", taskId: 22, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 107, content: "Development started.", taskId: 22, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 108, content: "Bug fixed.", taskId: 22, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 109, content: "QA completed.", taskId: 22, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 110, content: "Task closed.", taskId: 22, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 23 ---
      { id: 111, content: "Requirements analyzed.", taskId: 23, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 112, content: "Implementation started.", taskId: 23, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 113, content: "Progress update shared.", taskId: 23, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 114, content: "Testing done.", taskId: 23, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 115, content: "Task ready for deployment.", taskId: 23, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 24 ---
      { id: 116, content: "Initial setup completed.", taskId: 24, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 117, content: "Development started.", taskId: 24, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 118, content: "Bug fixed.", taskId: 24, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 119, content: "QA approved.", taskId: 24, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 120, content: "Task closed.", taskId: 24, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 25 ---
      { id: 121, content: "Design finalized.", taskId: 25, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 122, content: "Development started.", taskId: 25, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 123, content: "Progress update shared.", taskId: 25, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 124, content: "QA testing done.", taskId: 25, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 125, content: "Task ready for deployment.", taskId: 25, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 26 ---
      { id: 126, content: "Task setup completed.", taskId: 26, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 127, content: "Implementation started.", taskId: 26, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 128, content: "Progress update shared.", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 129, content: "QA testing done.", taskId: 26, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 130, content: "Task closed.", taskId: 26, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 27 ---
      { id: 131, content: "Requirements analyzed.", taskId: 27, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 132, content: "Development started.", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 133, content: "Progress update shared.", taskId: 27, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 134, content: "QA testing done.", taskId: 27, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 135, content: "Task deployed.", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 28 ---
      { id: 136, content: "Initial task setup.", taskId: 28, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 137, content: "Development started.", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 138, content: "Bug fixed.", taskId: 28, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 139, content: "QA completed.", taskId: 28, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 140, content: "Task ready for deployment.", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 29 ---
      { id: 141, content: "Design finalized.", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 142, content: "Implementation started.", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 143, content: "Progress update shared.", taskId: 29, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 144, content: "QA testing done.", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 145, content: "Task closed.", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 30 ---
      { id: 146, content: "Requirements reviewed.", taskId: 30, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 147, content: "Development started.", taskId: 30, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 148, content: "Progress update shared.", taskId: 30, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 149, content: "QA approved.", taskId: 30, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 150, content: "Task deployed.", taskId: 30, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
    ],
  });

  // ----------------- Message threads -----------------

  await prisma.messageThread.createMany({
    data: [
      { id: 1, workspaceId: 1 }, // John Doe - Alice
      { id: 2, workspaceId: 1 }, // John Doe - Fred
      { id: 3, workspaceId: 1 }, // John Doe - Kate
    ],
  });

  // ----------------- Messages -----------------

  await prisma.message.createMany({
    data: [
      // --- Thread 1: John - Alice ---
      { id: 1, body: "Hi Alice, how are you?", messageThreadId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 2, body: "Hey John, I'm good! How about you?", messageThreadId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 3, body: "All good, thanks. Did you finish the report?", messageThreadId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 4, body: "Yes, sent it this morning.", messageThreadId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 5, body: "Perfect, thanks!", messageThreadId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Thread 2: John - Fred ---
      { id: 6, body: "Hey Fred, did you check the server logs?", messageThreadId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, body: "Yes John, everything looks fine.", messageThreadId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 8, body: "Great! Can you prepare the report?", messageThreadId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 9, body: "Will do by today evening.", messageThreadId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 10, body: "Thanks Fred!", messageThreadId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Thread 3: John - Kate ---
      { id: 11, body: "Hi Kate, are you available for a quick call?", messageThreadId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 12, body: "Sure John, give me 10 minutes.", messageThreadId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 13, body: "Perfect, calling you then.", messageThreadId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 14, body: "Got it, waiting for your call.", messageThreadId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", receiverId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 15, body: "Call completed, thanks!", messageThreadId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", receiverId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
    ],
  });

  // ----------------- Notifications -----------------

  await prisma.notificationTarget.createMany({
    data: [
      {
        id: 1,
        taskId: 1,
      },
      {
        id: 2,
        taskId: 2,
      },
      {
        id: 3,
        taskId: 3,
      },
      {
        id: 4,
        projectId: 1,
      },
      {
        id: 5,
        projectId: 2,
      },
      {
        id: 6,
        projectId: 3,
      },
      {
        id: 7,
        userId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
      },
      {
        id: 8,
        userId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
      },
      {
        id: 9,
        customerId: 1,
      },
      {
        id: 10,
        customerId: 2,
      },
      {
        id: 11,
        messageId: 1,
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        id: 1,
        type: "TASK_ADDED",
        actorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        targetId: 1,
        createdAt: new Date(2025, 8, 1),
      },
      {
        id: 2,
        type: "TASK_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        targetName: "Task setup completed.",
        createdAt: new Date(2025, 8, 2),
      },
      {
        id: 3,
        type: "TASK_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        targetId: 2,
        createdAt: new Date(2025, 8, 3),
      },
      {
        id: 4,
        type: "TASK_COMMENTED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        targetId: 3,
        createdAt: new Date(2025, 8, 4),
      },
      {
        id: 5,
        type: "PROJECT_ADDED",
        actorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        targetId: 4,
        createdAt: new Date(2025, 8, 5),
      },
      {
        id: 6,
        type: "PROJECT_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        targetName: "Performance Monitoring",
        createdAt: new Date(2025, 8, 6),
      },
      {
        id: 7,
        type: "PROJECT_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        targetId: 5,
        createdAt: new Date(2025, 8, 7),
      },
      {
        id: 8,
        type: "PROJECT_COMMENTED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        targetId: 6,
        createdAt: new Date(2025, 8, 8),
      },
      {
        id: 9,
        type: "USER_ADDED",
        actorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        targetId: 7,
        createdAt: new Date(2025, 8, 9),
      },
      {
        id: 10,
        type: "USER_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        targetName: "Alice Smith",
        createdAt: new Date(2025, 8, 10),
      },
      {
        id: 11,
        type: "USER_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        targetId: 8,
        createdAt: new Date(2025, 8, 11),
      },
      {
        id: 12,
        type: "CUSTOMER_ADDED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        targetId: 9,
        createdAt: new Date(2025, 8, 12),
      },
      {
        id: 13,
        type: "CUSTOMER_DELETED",
        actorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        targetName: "Mike Johnson",
        createdAt: new Date(2025, 8, 13),
      },
      {
        id: 14,
        type: "CUSTOMER_UPDATED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        targetId: 10,
        createdAt: new Date(2025, 8, 14),
      },
      {
        id: 15,
        type: "MESSAGE_SENDED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        targetId: 11,
        createdAt: new Date(2025, 8, 15),
      },
    ],
  });

  await prisma.notificationRecipient.createMany({
    data: [
      {
        notificationId: 1,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 2,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 3,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 4,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 5,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 6,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 7,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 8,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 9,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 10,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 11,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 12,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 13,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 14,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
      {
        notificationId: 15,
        isRead: true,
        userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
      },
    ],
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

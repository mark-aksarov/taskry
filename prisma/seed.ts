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
        phone: "+380990000002",
        publicLink: "https://example.com/user2",
        positionId: 1,
      },
      {
        id: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        name: "Alice Smith",
        role: "user",
        email: "alice_smith@example.com",
        emailVerified: true,
        imageUrl: "/woman.jpg",
        phone: "+380990000002",
        publicLink: "https://example.com/user2",
        positionId: 2,
      },
      {
        id: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        name: "Fred Green",
        role: "user",
        email: "fred_green@example.com",
        emailVerified: true,
        imageUrl: null,
        positionId: 3,
      },
      {
        id: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        name: "Kate Brown",
        role: "user",
        email: "kate_brown@example.com",
        emailVerified: true,
        imageUrl: null,
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
      { id: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "Analytics Dashboard", description: "Dashboard to monitor sales", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 15), statusId: 2, categoryId: 8, customerId: 4, createdAt: new Date(2025, 7, 4) },

      { id: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "CRM Integration", description: "Integrate CRM system", deadline: new Date(now.getFullYear(), now.getMonth(), 21), statusId: 2, categoryId: 2, customerId: 1, createdAt: new Date(2025, 7, 5) },
      { id: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Landing Page", description: "Build marketing landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 2, categoryId: 1, customerId: 2, createdAt: new Date(2025, 7, 6) },
      { id: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Social Media Plan", description: "Plan social media content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 2, categoryId: 3, customerId: 3, createdAt: new Date(2025, 7, 7) },
      { id: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Data Cleanup", description: "Clean internal datasets", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 16), statusId: 2, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 1) },

      { id: 9, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Mobile App", description: "Develop company app", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: 3, categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 2) },
      { id: 10, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Website SEO", description: "Improve website SEO", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 3, categoryId: 7, customerId: 2, createdAt: new Date(2025, 8, 3) },
      { id: 11, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Marketing Campaign", description: "Launch ad campaigns", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 3, categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 4) },
      { id: 12, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Dashboard Enhancements", description: "Improve dashboard features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 17), statusId: 1, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 5) },

      { id: 13, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Inventory System", description: "Build inventory management system", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 1, categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 6) },
      { id: 14, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Marketing Website", description: "Create marketing website", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 2, categoryId: 1, customerId: 2, createdAt: new Date(2025, 8, 7) },
      { id: 15, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Content Strategy", description: "Plan content schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 2, categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 8) },
      { id: 16, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Data Reports", description: "Generate business reports", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 18), statusId: 3, categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 9) },
    ],
  });

  // ----------------- Project comments -----------------

  await prisma.projectComment.createMany({
    data: [
      // --- Project 1 ---
      { id: 1, content: "Initial project setup completed.", projectId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 2, content: "Front-end skeleton looks good. Need backend APIs next.", projectId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 3, content: "Database schema reviewed and approved.", projectId: 1, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 4, content: "Integrated authentication module.", projectId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 5, content: "Testing environment set up, ready for QA.", projectId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 2 ---
      { id: 6, content: "Reviewed current blog layout, need to improve readability.", projectId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, content: "Started working on new color scheme and typography.", projectId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 8, content: "Added wireframes for mobile version.", projectId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 9, content: "Feedback on navigation menu received, updating accordingly.", projectId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 10, content: "Implemented hero section redesign.", projectId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 11, content: "QA review scheduled for next week.", projectId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 3 ---
      { id: 12, content: "Analyzed current SEO performance, identified key issues.", projectId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 13, content: "Started optimizing meta tags and headings.", projectId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 14, content: "Submitted keyword research report for review.", projectId: 3, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 15, content: "Implemented improvements for site speed and mobile usability.", projectId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 16, content: "Preparing analytics tracking to monitor SEO impact.", projectId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 4 ---
      { id: 17, content: "Set up initial data connections for sales metrics.", projectId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 18, content: "Created mock dashboard layout for review.", projectId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 19, content: "Integrated real-time charts for key KPIs.", projectId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 20, content: "Implemented user permissions and access controls.", projectId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 21, content: "Performance testing shows smooth dashboard loading.", projectId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 22, content: "Preparing report templates for monthly analytics.", projectId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 5 ---
      { id: 23, content: "Reviewed CRM API documentation and planned integration steps.", projectId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 24, content: "Started implementing contact sync module.", projectId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 25, content: "Tested authentication flow with CRM sandbox environment.", projectId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 26, content: "Completed integration of leads and opportunities.", projectId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 27, content: "Preparing documentation for internal team training.", projectId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 6 ---
      { id: 28, content: "Drafted initial layout and hero section.", projectId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 29, content: "Reviewed typography and color palette choices.", projectId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 30, content: "Added call-to-action sections and contact form.", projectId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 31, content: "Optimized images for faster page load.", projectId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 32, content: "Final review done, preparing for publishing.", projectId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 7 ---
      { id: 33, content: "Created initial content calendar for next month.", projectId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 34, content: "Reviewed target audience engagement metrics.", projectId: 7, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 35, content: "Suggested new hashtags and post timing adjustments.", projectId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 36, content: "Scheduled posts for Facebook and Instagram.", projectId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 37, content: "Monitoring initial engagement, will report weekly.", projectId: 7, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 8 ---
      { id: 38, content: "Identified redundant and inconsistent records.", projectId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 39, content: "Started cleaning datasets and removing duplicates.", projectId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 40, content: "Validated cleaned data against reporting standards.", projectId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 41, content: "Automated data cleanup scripts deployed.", projectId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 42, content: "Reviewed remaining anomalies and flagged issues.", projectId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 43, content: "Final report prepared for internal analytics team.", projectId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
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
      { id: 1, projectId: 1, title: "Backend API Setup", description: "Develop core backend API for e-commerce platform", deadline: new Date(now.getFullYear(), now.getMonth(), 5), statusId: 1, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 2, projectId: 1, title: "Homepage Wireframe", description: "Create wireframe for main pages of e-commerce website", deadline: new Date(now.getFullYear(), now.getMonth(), 7), statusId: 1, categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 3, projectId: 1, title: "Payment Gateway Integration", description: "Integrate Stripe and PayPal payment systems", deadline: new Date(now.getFullYear(), now.getMonth(), 9), statusId: 1, categoryId: 6, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 4, projectId: 1, title: "Database Schema Design", description: "Design and optimize database schema for products and orders", deadline: new Date(now.getFullYear(), now.getMonth(), 11), statusId: 2, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 5, projectId: 1, title: "QA Testing", description: "Test all features of the platform to ensure reliability and performance", deadline: new Date(now.getFullYear(), now.getMonth(), 13), statusId: 2, categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 2 ---
      { id: 6, projectId: 2, title: "Landing Page Wireframe", description: "Create wireframes for new landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 6), statusId: 2, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 7, projectId: 2, title: "UI Mockup Review", description: "Review and finalize UI mockups for client approval", deadline: new Date(now.getFullYear(), now.getMonth(), 8), statusId: 3, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 8, projectId: 2, title: "CRM Integration Setup", description: "Integrate CRM system with existing platform", deadline: new Date(now.getFullYear(), now.getMonth(), 10), statusId: 3, categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 9, projectId: 2, title: "Social Media Campaign", description: "Plan and launch marketing campaign for social media channels", deadline: new Date(now.getFullYear(), now.getMonth(), 12), statusId: 3, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 10, projectId: 2, title: "Website QA Testing", description: "Perform quality assurance and bug fixes on website", deadline: new Date(now.getFullYear(), now.getMonth(), 14), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 3 ---
      { id: 11, projectId: 3, title: "On-Page SEO Audit", description: "Analyze website pages and optimize meta tags, headers, and content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 2, categoryId: 7, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 12, projectId: 3, title: "Content Strategy", description: "Plan and create SEO-focused blog posts and landing pages", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 3, categoryId: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 13, projectId: 3, title: "Keyword Research", description: "Identify high-value keywords for website optimization", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 1, categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 14, projectId: 3, title: "Backlink Outreach", description: "Develop and execute a backlink acquisition campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 2, categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 15, projectId: 3, title: "SEO Analytics", description: "Set up tracking and analyze SEO performance metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 2, categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 4 ---
      { id: 16, projectId: 4, title: "Sales Data Analysis", description: "Analyze monthly sales data and trends", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 3, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 17, projectId: 4, title: "Wireframe Dashboard Layout", description: "Design wireframes for dashboard interface", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 3, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 18, projectId: 4, title: "UI Mockups", description: "Create high-fidelity UI designs for dashboard screens", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 3, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 19, projectId: 4, title: "Marketing Dashboard Insights", description: "Provide marketing KPIs and insights in dashboard format", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 1, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 20, projectId: 4, title: "Backend Data Integration", description: "Connect dashboard to database and APIs for live data", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 2, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 5 ---
      { id: 21, projectId: 5, title: "Backend API Integration", description: "Connect CRM system with backend services and APIs", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: 3, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 22, projectId: 5, title: "Frontend CRM Dashboard", description: "Design and implement CRM dashboard interface for users", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: 1, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 23, projectId: 5, title: "CRM Testing", description: "Perform QA testing on CRM workflows and integration points", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 24, projectId: 5, title: "Data Migration", description: "Migrate existing customer data to new CRM system", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 2, categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 25, projectId: 5, title: "CRM QA & Bug Fixes", description: "Finalize testing and resolve any integration issues", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: 2, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 6 ---
      { id: 26, projectId: 6, title: "Landing Page Wireframe", description: "Create wireframes for the landing page layout", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 1, categoryId: 2, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 27, projectId: 6, title: "Landing Page UI Design", description: "Design high-fidelity UI for landing page screens", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 2, categoryId: 1, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 28, projectId: 6, title: "Marketing Copy", description: "Write persuasive content for landing page to boost conversions", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 3, categoryId: 3, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 29, projectId: 6, title: "Content Integration", description: "Add text, images, and media into landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 3, categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 30, projectId: 6, title: "Landing Page QA Testing", description: "Test landing page across devices and browsers for bugs", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 2, categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 7 ---
      { id: 31, projectId: 7, title: "Social Media Wireframe", description: "Draft content layout and posting schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 1, categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 32, projectId: 7, title: "UI Design for Posts", description: "Design visual templates for social media posts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 1, categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 33, projectId: 7, title: "Content Planning", description: "Create editorial calendar and post ideas", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 2, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 34, projectId: 7, title: "Engagement Analytics", description: "Analyze past post performance and engagement metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 2, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 35, projectId: 7, title: "SEO & Marketing Integration", description: "Optimize posts and hashtags for SEO and reach", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 3, categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 8 ---
      { id: 36, projectId: 8, title: "Dataset Review", description: "Inspect all internal datasets for inconsistencies", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 3, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 37, projectId: 8, title: "Data Validation Scripts", description: "Write scripts to validate dataset integrity and completeness", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 3, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 38, projectId: 8, title: "Data Transformation", description: "Clean and standardize dataset formats for analysis", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 1, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 39, projectId: 8, title: "QA Testing on Cleaned Data", description: "Test cleaned datasets for errors and accuracy", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 40, projectId: 8, title: "Data Reporting", description: "Generate reports summarizing the cleaned data and improvements", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: 2, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 9 ---
      { id: 41, projectId: 9, title: "App Wireframing", description: "Create wireframes for mobile app screens", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: 3, categoryId: 2, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 42, projectId: 9, title: "App UI Design", description: "Design high-fidelity UI for mobile app", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 1, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 43, projectId: 9, title: "API Integration", description: "Connect mobile app with backend services", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 2, categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 44, projectId: 9, title: "Data Sync & Analytics", description: "Implement data synchronization and analytics tracking", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 3, categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 45, projectId: 9, title: "App QA Testing", description: "Test app functionality across devices and fix bugs", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 3, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 10 ---
      { id: 46, projectId: 10, title: "SEO Audit", description: "Conduct full SEO audit of the website", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: 1, categoryId: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 47, projectId: 10, title: "Content Optimization", description: "Update website content for SEO improvements", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: 2, categoryId: 6, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 48, projectId: 10, title: "Keyword Research", description: "Research high-value keywords for website pages", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: 3, categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 49, projectId: 10, title: "SEO Reporting", description: "Generate reports on current SEO metrics and performance", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: 3, categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 50, projectId: 10, title: "Analytics Review", description: "Analyze SEO impact using website analytics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: 2, categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 11 ---
      { id: 51, projectId: 11, title: "Campaign Strategy", description: "Define goals and strategy for marketing campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 2, categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 52, projectId: 11, title: "Audience Research", description: "Analyze target audience and market trends", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: 3, categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 53, projectId: 11, title: "Visual Assets", description: "Design banners, images, and graphics for campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: 3, categoryId: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 54, projectId: 11, title: "Content Scheduling", description: "Plan posts and ad scheduling across channels", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: 2, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 55, projectId: 11, title: "Campaign Analytics", description: "Track campaign performance and engagement metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: 1, categoryId: 8, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 12 ---
      { id: 56, projectId: 12, title: "Frontend Optimization", description: "Refactor frontend code to improve dashboard performance", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: 1, categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 57, projectId: 12, title: "Feature Planning", description: "Define new dashboard features and enhancements", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: 2, categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 58, projectId: 12, title: "Backend Integration", description: "Integrate new data endpoints for dashboard metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: 3, categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 59, projectId: 12, title: "QA Testing", description: "Test all dashboard features for bugs and performance issues", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: 1, categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 60, projectId: 12, title: "Data Visualization Updates", description: "Enhance charts and graphs for better analytics insights", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 12), statusId: 2, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 13 ---
      { id: 61, projectId: 13, title: "Database Setup", description: "Design and implement database schema for inventory", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: 3, categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 62, projectId: 13, title: "UI Wireframes", description: "Create wireframes for inventory management interface", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: 2, categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 63, projectId: 13, title: "Backend API", description: "Develop backend endpoints to handle inventory operations", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: 1, categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 64, projectId: 13, title: "Analytics Dashboard", description: "Integrate inventory analytics and reporting features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: 2, categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 65, projectId: 13, title: "QA & Testing", description: "Test inventory system for functionality and data integrity", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: 3, categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
    ],
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: [
      // --- Task 1 ---
      { name: "Set up project structure", isDone: true, taskId: 1 },
      { name: "Configure server environment", isDone: true, taskId: 1 },
      { name: "Implement authentication endpoints", isDone: true, taskId: 1 },
      { name: "Create user management APIs", isDone: true, taskId: 1 },
      { name: "Develop product CRUD endpoints", isDone: true, taskId: 1 },
      { name: "Add order processing endpoints", isDone: true, taskId: 1 },
      { name: "Implement error handling & logging", isDone: true, taskId: 1 },
      { name: "Add rate limiting & security middleware", isDone: false, taskId: 1 },
      { name: "Write API documentation", isDone: false, taskId: 1 },
      { name: "Deploy API to staging server", isDone: false, taskId: 1 },

      // --- Task 2 ---
      { name: "Sketch layout ideas", isDone: true, taskId: 2 },
      { name: "Design homepage header", isDone: true, taskId: 2 },
      { name: "Design navigation menu", isDone: true, taskId: 2 },
      { name: "Wireframe hero section", isDone: true, taskId: 2 },
      { name: "Wireframe product showcase section", isDone: true, taskId: 2 },
      { name: "Wireframe footer section", isDone: true, taskId: 2 },
      { name: "Review and refine wireframes", isDone: true, taskId: 2 },

      // --- Task 3 ---
      { name: "Set up Stripe account", isDone: true, taskId: 3 },
      { name: "Set up PayPal account", isDone: true, taskId: 3 },
      { name: "Install payment SDKs", isDone: true, taskId: 3 },
      { name: "Implement Stripe checkout flow", isDone: true, taskId: 3 },
      { name: "Implement PayPal checkout flow", isDone: true, taskId: 3 },
      { name: "Handle payment success & failure callbacks", isDone: true, taskId: 3 },
      { name: "Secure API keys in environment variables", isDone: true, taskId: 3 },
      { name: "Add subscription support", isDone: false, taskId: 3 },
      { name: "Write automated payment tests", isDone: false, taskId: 3 },
      { name: "Integrate payment history tracking", isDone: false, taskId: 3 },
      { name: "Localize payment UI", isDone: false, taskId: 3 },
      { name: "Deploy payments to staging", isDone: false, taskId: 3 },

      // --- Task 4 ---
      { name: "Define entities and relationships", isDone: true, taskId: 4 },
      { name: "Design products table schema", isDone: true, taskId: 4 },
      { name: "Design orders table schema", isDone: true, taskId: 4 },
      { name: "Design users table schema", isDone: true, taskId: 4 },
      { name: "Add indexing for performance", isDone: true, taskId: 4 },
      { name: "Normalize schema where necessary", isDone: true, taskId: 4 },
      { name: "Add foreign key constraints", isDone: true, taskId: 4 },
      { name: "Design audit logs table", isDone: false, taskId: 4 },
      { name: "Document schema in ERD tool", isDone: false, taskId: 4 },

      // --- Task 5 ---
      { name: "Write test plan", isDone: true, taskId: 5 },
      { name: "Set up testing environment", isDone: true, taskId: 5 },
      { name: "Perform unit tests", isDone: true, taskId: 5 },
      { name: "Perform integration tests", isDone: true, taskId: 5 },
      { name: "Perform end-to-end tests", isDone: true, taskId: 5 },
      { name: "Check cross-browser compatibility", isDone: true, taskId: 5 },
      { name: "Run performance tests", isDone: true, taskId: 5 },
      { name: "Conduct security testing", isDone: false, taskId: 5 },
      { name: "Document test results", isDone: false, taskId: 5 },
      { name: "Fix critical bugs found", isDone: false, taskId: 5 },
      { name: "Retest after bug fixes", isDone: false, taskId: 5 },

      // --- Task 6 ---
      { name: "Brainstorm landing page structure", isDone: true, taskId: 6 },
      { name: "Wireframe header & navigation", isDone: true, taskId: 6 },
      { name: "Wireframe hero section", isDone: true, taskId: 6 },
      { name: "Wireframe features section", isDone: true, taskId: 6 },
      { name: "Wireframe testimonials section", isDone: false, taskId: 6 },
      { name: "Wireframe call-to-action section", isDone: true, taskId: 6 },
      { name: "Wireframe footer section", isDone: true, taskId: 6 },
      { name: "Review wireframes with team", isDone: true, taskId: 6 },
      { name: "Refine based on feedback", isDone: true, taskId: 6 },
      { name: "Export wireframes for client", isDone: false, taskId: 6 },
      { name: "Prepare presentation slides", isDone: false, taskId: 6 },
      { name: "Finalize approval notes", isDone: false, taskId: 6 },

      // --- Task 7 ---
      { name: "Collect all UI mockups", isDone: true, taskId: 7 },
      { name: "Check consistency in colors", isDone: true, taskId: 7 },
      { name: "Check typography & spacing", isDone: true, taskId: 7 },
      { name: "Identify usability issues", isDone: false, taskId: 7 },
      { name: "Compare mockups with wireframes", isDone: true, taskId: 7 },
      { name: "Review with design team", isDone: true, taskId: 7 },
      { name: "Prepare notes for client", isDone: true, taskId: 7 },

      // --- Task 8 ---
      { name: "Choose CRM system & confirm credentials", isDone: true, taskId: 8 },
      { name: "Install CRM integration SDK", isDone: true, taskId: 8 },
      { name: "Set up API connection", isDone: true, taskId: 8 },
      { name: "Sync customer data model", isDone: false, taskId: 8 },
      { name: "Map CRM fields to platform database", isDone: true, taskId: 8 },
      { name: "Implement lead capture forms", isDone: true, taskId: 8 },
      { name: "Test data synchronization", isDone: true, taskId: 8 },
      { name: "Handle error states", isDone: false, taskId: 8 },
      { name: "Add logging & monitoring", isDone: false, taskId: 8 },
      { name: "Secure API keys in env variables", isDone: true, taskId: 8 },
      { name: "Document CRM integration flow", isDone: false, taskId: 8 },
      { name: "Deploy to staging environment", isDone: false, taskId: 8 },
      { name: "QA test integration", isDone: false, taskId: 8 },
      { name: "Prepare client handoff", isDone: false, taskId: 8 },

      // --- Task 9 ---
      { name: "Define campaign goals", isDone: true, taskId: 9 },
      { name: "Select social media platforms", isDone: true, taskId: 9 },
      { name: "Prepare content calendar", isDone: false, taskId: 9 },
      { name: "Design campaign visuals", isDone: true, taskId: 9 },
      { name: "Write ad copy & captions", isDone: true, taskId: 9 },
      { name: "Schedule posts in tool", isDone: true, taskId: 9 },
      { name: "Set campaign budget & targeting", isDone: true, taskId: 9 },
      { name: "Launch campaign", isDone: false, taskId: 9 },
      { name: "Monitor engagement metrics", isDone: false, taskId: 9 },

      // --- Task 10 ---
      { name: "Set up QA environment", isDone: true, taskId: 10 },
      { name: "Perform functional tests", isDone: true, taskId: 10 },
      { name: "Perform integration tests", isDone: true, taskId: 10 },
      { name: "Perform cross-browser tests", isDone: true, taskId: 10 },
      { name: "Run performance benchmarks", isDone: true, taskId: 10 },
      { name: "Log bugs in issue tracker", isDone: false, taskId: 10 },
      { name: "Perform regression testing", isDone: true, taskId: 10 },
      { name: "Verify bug fixes", isDone: false, taskId: 10 },
      { name: "Generate QA report", isDone: true, taskId: 10 },

      // --- Task 11 ---
      { name: "Crawl website pages", isDone: true, taskId: 11 },
      { name: "Check page titles & meta descriptions", isDone: true, taskId: 11 },
      { name: "Analyze H1–H6 header structure", isDone: true, taskId: 11 },
      { name: "Review keyword placement in content", isDone: true, taskId: 11 },
      { name: "Identify duplicate or missing tags", isDone: false, taskId: 11 },
      { name: "Check internal linking strategy", isDone: true, taskId: 11 },
      { name: "Evaluate image alt attributes", isDone: true, taskId: 11 },
      { name: "Test page load speed", isDone: true, taskId: 11 },
      { name: "Check mobile responsiveness", isDone: true, taskId: 11 },
      { name: "Audit URL structure", isDone: false, taskId: 11 },
      { name: "Generate SEO audit report", isDone: false, taskId: 11 },
      { name: "Present findings to client", isDone: false, taskId: 11 },

      // --- Task 12 ---
      { name: "Define target audience personas", isDone: true, taskId: 12 },
      { name: "Research trending SEO topics", isDone: true, taskId: 12 },
      { name: "Plan content calendar", isDone: true, taskId: 12 },
      { name: "Assign blog post topics to writers", isDone: false, taskId: 12 },
      { name: "Draft first blog outline", isDone: true, taskId: 12 },
      { name: "Draft landing page copy", isDone: true, taskId: 12 },
      { name: "Review drafts with editor", isDone: true, taskId: 12 },

      // --- Task 13 ---
      { name: "List seed keywords", isDone: true, taskId: 13 },
      { name: "Use keyword research tools (SEMRush/Ahrefs)", isDone: true, taskId: 13 },
      { name: "Analyze search volume & difficulty", isDone: true, taskId: 13 },
      { name: "Filter out irrelevant keywords", isDone: false, taskId: 13 },
      { name: "Identify long-tail opportunities", isDone: true, taskId: 13 },
      { name: "Map keywords to website pages", isDone: true, taskId: 13 },
      { name: "Group keywords by intent", isDone: true, taskId: 13 },
      { name: "Check competitor keywords", isDone: false, taskId: 13 },
      { name: "Export keyword list to spreadsheet", isDone: false, taskId: 13 },
      { name: "Validate keywords with client", isDone: false, taskId: 13 },
      { name: "Finalize keyword strategy", isDone: true, taskId: 13 },
      { name: "Prepare documentation", isDone: false, taskId: 13 },
      { name: "Deliver final keyword set", isDone: false, taskId: 13 },
      { name: "Add keywords to SEO tool", isDone: false, taskId: 13 },

      // --- Task 14 ---
      { name: "Identify backlink opportunities", isDone: true, taskId: 14 },
      { name: "Collect contact information", isDone: true, taskId: 14 },
      { name: "Create outreach email templates", isDone: false, taskId: 14 },
      { name: "Segment prospects by priority", isDone: true, taskId: 14 },
      { name: "Send initial outreach emails", isDone: true, taskId: 14 },
      { name: "Follow up with non-responders", isDone: true, taskId: 14 },
      { name: "Track outreach responses", isDone: true, taskId: 14 },
      { name: "Negotiate guest posting opportunities", isDone: false, taskId: 14 },
      { name: "Record acquired backlinks", isDone: false, taskId: 14 },

      // --- Task 15 ---
      { name: "Set up Google Analytics", isDone: true, taskId: 15 },
      { name: "Set up Google Search Console", isDone: true, taskId: 15 },
      { name: "Connect analytics with website", isDone: true, taskId: 15 },
      { name: "Track organic traffic growth", isDone: true, taskId: 15 },
      { name: "Monitor keyword rankings", isDone: true, taskId: 15 },
      { name: "Analyze bounce rate", isDone: false, taskId: 15 },
      { name: "Create SEO performance dashboard", isDone: true, taskId: 15 },
      { name: "Generate weekly reports", isDone: false, taskId: 15 },
      { name: "Present insights to stakeholders", isDone: true, taskId: 15 },

      // --- Task 16 ---
      { name: "Collect monthly sales data from CRM", isDone: true, taskId: 16 },
      { name: "Clean and preprocess sales dataset", isDone: true, taskId: 16 },
      { name: "Identify monthly revenue trends", isDone: true, taskId: 16 },
      { name: "Visualize data with charts and graphs", isDone: true, taskId: 16 },
      { name: "Highlight top-performing products", isDone: false, taskId: 16 },
      { name: "Analyze seasonal sales fluctuations", isDone: true, taskId: 16 },
      { name: "Generate insights report for stakeholders", isDone: true, taskId: 16 },
      { name: "Compare current vs previous quarter", isDone: true, taskId: 16 },
      { name: "Prepare presentation slides", isDone: true, taskId: 16 },
      { name: "Suggest sales strategy improvements", isDone: false, taskId: 16 },
      { name: "Identify underperforming regions", isDone: false, taskId: 16 },
      { name: "Forecast next quarter sales", isDone: false, taskId: 16 },

      // --- Task 17 ---
      { name: "Sketch dashboard header layout", isDone: true, taskId: 17 },
      { name: "Define navigation menu structure", isDone: true, taskId: 17 },
      { name: "Add placeholders for KPI widgets", isDone: true, taskId: 17 },
      { name: "Include filter and search components", isDone: false, taskId: 17 },
      { name: "Design responsive grid layout", isDone: true, taskId: 17 },
      { name: "Validate wireframes with team feedback", isDone: true, taskId: 17 },
      { name: "Finalize dashboard wireframes", isDone: true, taskId: 17 },

      // --- Task 18 ---
      { name: "Design dashboard login screen", isDone: true, taskId: 18 },
      { name: "Create home dashboard mockup", isDone: true, taskId: 18 },
      { name: "Style KPI widget components", isDone: true, taskId: 18 },
      { name: "Design data visualization charts", isDone: false, taskId: 18 },
      { name: "Apply brand colors and typography", isDone: true, taskId: 18 },
      { name: "Export mockups for developer handoff", isDone: true, taskId: 18 },
      { name: "Review mockups with stakeholders", isDone: true, taskId: 18 },
      { name: "Adjust based on user feedback", isDone: false, taskId: 18 },
      { name: "Ensure accessibility compliance", isDone: false, taskId: 18 },
      { name: "Prepare final design package", isDone: false, taskId: 18 },
      { name: "Design notification popups", isDone: true, taskId: 18 },
      { name: "Refine mobile UI mockups", isDone: false, taskId: 18 },
      { name: "Optimize layout for tablets", isDone: false, taskId: 18 },
      { name: "Document design guidelines", isDone: false, taskId: 18 },

      // --- Task 19 ---
      { name: "Define key marketing KPIs", isDone: true, taskId: 19 },
      { name: "Integrate traffic analytics", isDone: true, taskId: 19 },
      { name: "Add campaign performance metrics", isDone: false, taskId: 19 },
      { name: "Track social media engagement", isDone: true, taskId: 19 },
      { name: "Include conversion rate analysis", isDone: true, taskId: 19 },
      { name: "Summarize ad spend efficiency", isDone: true, taskId: 19 },
      { name: "Prepare dashboard for presentation", isDone: true, taskId: 19 },
      { name: "Set up automatic data refresh", isDone: false, taskId: 19 },
      { name: "Highlight best-performing campaigns", isDone: false, taskId: 19 },

      // --- Task 20 ---
      { name: "Set up database connection", isDone: true, taskId: 20 },
      { name: "Implement API endpoints", isDone: true, taskId: 20 },
      { name: "Integrate real-time data fetch", isDone: true, taskId: 20 },
      { name: "Handle authentication for API", isDone: true, taskId: 20 },
      { name: "Test data synchronization", isDone: true, taskId: 20 },
      { name: "Optimize query performance", isDone: false, taskId: 20 },
      { name: "Set up error logging and monitoring", isDone: true, taskId: 20 },
      { name: "Secure sensitive API routes", isDone: false, taskId: 20 },
      { name: "Deploy backend integration", isDone: true, taskId: 20 },

      // --- Task 21 ---
      { name: "Set up API authentication middleware", isDone: true, taskId: 21 },
      { name: "Configure database connection pool", isDone: true, taskId: 21 },
      { name: "Implement customer data API endpoint", isDone: true, taskId: 21 },
      { name: "Integrate CRM with payment service API", isDone: true, taskId: 21 },
      { name: "Write unit tests for API routes", isDone: false, taskId: 21 },
      { name: "Add request validation and error handling", isDone: true, taskId: 21 },
      { name: "Optimize API response performance", isDone: true, taskId: 21 },
      { name: "Log API usage for monitoring", isDone: true, taskId: 21 },
      { name: "Implement rate limiting", isDone: true, taskId: 21 },
      { name: "Deploy API integration to staging", isDone: false, taskId: 21 },
      { name: "Fix authentication edge cases", isDone: false, taskId: 21 },
      { name: "Document API endpoints", isDone: false, taskId: 21 },

      // --- Task 22 ---
      { name: "Design dashboard layout structure", isDone: true, taskId: 22 },
      { name: "Implement navigation sidebar", isDone: true, taskId: 22 },
      { name: "Add customer list table component", isDone: true, taskId: 22 },
      { name: "Integrate live data from backend APIs", isDone: false, taskId: 22 },
      { name: "Build customer profile details view", isDone: true, taskId: 22 },
      { name: "Implement dashboard filters and search", isDone: true, taskId: 22 },
      { name: "Ensure mobile responsive design", isDone: true, taskId: 22 },

      // --- Task 23 ---
      { name: "Write test cases for CRM workflows", isDone: true, taskId: 23 },
      { name: "Perform functional tests on forms", isDone: true, taskId: 23 },
      { name: "Validate API responses in CRM", isDone: true, taskId: 23 },
      { name: "Run regression tests on critical flows", isDone: false, taskId: 23 },
      { name: "Check data integrity after operations", isDone: true, taskId: 23 },
      { name: "Perform cross-browser testing", isDone: true, taskId: 23 },
      { name: "Verify user role permissions", isDone: true, taskId: 23 },
      { name: "Test error handling and edge cases", isDone: false, taskId: 23 },
      { name: "Conduct performance and load testing", isDone: false, taskId: 23 },
      { name: "Check CRM workflow automation", isDone: false, taskId: 23 },
      { name: "Log and report found bugs", isDone: true, taskId: 23 },
      { name: "Retest after bug fixes", isDone: false, taskId: 23 },
      { name: "Validate email notifications", isDone: false, taskId: 23 },
      { name: "Confirm QA test coverage completeness", isDone: false, taskId: 23 },

      // --- Task 24 ---
      { name: "Export customer data from legacy CRM", isDone: true, taskId: 24 },
      { name: "Clean and normalize data fields", isDone: true, taskId: 24 },
      { name: "Write migration scripts", isDone: false, taskId: 24 },
      { name: "Import data into new CRM database", isDone: true, taskId: 24 },
      { name: "Verify migrated data accuracy", isDone: true, taskId: 24 },
      { name: "Check for duplicate or missing records", isDone: true, taskId: 24 },
      { name: "Validate data with stakeholders", isDone: true, taskId: 24 },
      { name: "Test rollback in case of failure", isDone: false, taskId: 24 },
      { name: "Finalize migration logs", isDone: false, taskId: 24 },

      // --- Task 25 ---
      { name: "Review open bug tickets", isDone: true, taskId: 25 },
      { name: "Reproduce reported issues", isDone: true, taskId: 25 },
      { name: "Fix UI layout inconsistencies", isDone: true, taskId: 25 },
      { name: "Patch API integration errors", isDone: true, taskId: 25 },
      { name: "Retest fixed CRM workflows", isDone: true, taskId: 25 },
      { name: "Check regression in other modules", isDone: false, taskId: 25 },
      { name: "Validate bug fixes in staging", isDone: true, taskId: 25 },
      { name: "Confirm fixes with QA team", isDone: false, taskId: 25 },
      { name: "Close resolved bug reports", isDone: true, taskId: 25 },

      // --- Task 26 ---
      { name: "Sketch initial layout ideas", isDone: true, taskId: 26 },
      { name: "Wireframe header section", isDone: true, taskId: 26 },
      { name: "Wireframe hero section", isDone: true, taskId: 26 },
      { name: "Wireframe features section", isDone: true, taskId: 26 },
      { name: "Wireframe testimonials section", isDone: false, taskId: 26 },
      { name: "Wireframe pricing section", isDone: true, taskId: 26 },
      { name: "Wireframe footer section", isDone: true, taskId: 26 },
      { name: "Prepare mobile wireframes", isDone: true, taskId: 26 },
      { name: "Prepare tablet wireframes", isDone: true, taskId: 26 },
      { name: "Prepare desktop wireframes", isDone: false, taskId: 26 },
      { name: "Review wireframes with team", isDone: false, taskId: 26 },
      { name: "Finalize landing page wireframe", isDone: false, taskId: 26 },

      // --- Task 27 ---
      { name: "Set up design system styles", isDone: true, taskId: 27 },
      { name: "Design landing page header", isDone: true, taskId: 27 },
      { name: "Design hero section with visuals", isDone: true, taskId: 27 },
      { name: "Design features grid", isDone: false, taskId: 27 },
      { name: "Design pricing tables", isDone: true, taskId: 27 },
      { name: "Design testimonials section", isDone: true, taskId: 27 },
      { name: "Design footer section", isDone: true, taskId: 27 },

      // --- Task 28 ---
      { name: "Research competitor landing pages", isDone: true, taskId: 28 },
      { name: "Define brand tone and messaging", isDone: true, taskId: 28 },
      { name: "Write headline options", isDone: true, taskId: 28 },
      { name: "Draft hero section copy", isDone: false, taskId: 28 },
      { name: "Write features section copy", isDone: true, taskId: 28 },
      { name: "Write benefits section copy", isDone: true, taskId: 28 },
      { name: "Write call-to-action buttons", isDone: true, taskId: 28 },
      { name: "Draft pricing section copy", isDone: false, taskId: 28 },
      { name: "Write FAQ section copy", isDone: false, taskId: 28 },
      { name: "Draft testimonials section text", isDone: false, taskId: 28 },
      { name: "Proofread all copy", isDone: true, taskId: 28 },
      { name: "Localize text for other languages", isDone: false, taskId: 28 },
      { name: "Optimize copy for SEO keywords", isDone: false, taskId: 28 },
      { name: "Finalize marketing copy", isDone: false, taskId: 28 },

      // --- Task 29 ---
      { name: "Insert marketing copy into layout", isDone: true, taskId: 29 },
      { name: "Add header images", isDone: true, taskId: 29 },
      { name: "Add hero section media", isDone: false, taskId: 29 },
      { name: "Integrate features icons", isDone: true, taskId: 29 },
      { name: "Add pricing tables content", isDone: true, taskId: 29 },
      { name: "Insert testimonials content", isDone: true, taskId: 29 },
      { name: "Add footer links & info", isDone: true, taskId: 29 },
      { name: "Embed videos in hero or features", isDone: false, taskId: 29 },
      { name: "Optimize image sizes", isDone: false, taskId: 29 },

      // --- Task 30 ---
      { name: "Test responsive design on mobile", isDone: true, taskId: 30 },
      { name: "Test responsive design on tablet", isDone: true, taskId: 30 },
      { name: "Test responsive design on desktop", isDone: true, taskId: 30 },
      { name: "Run cross-browser tests (Chrome, Safari, Firefox)", isDone: true, taskId: 30 },
      { name: "Check page load performance", isDone: true, taskId: 30 },
      { name: "Conduct accessibility testing", isDone: false, taskId: 30 },
      { name: "Verify forms & input fields", isDone: true, taskId: 30 },
      { name: "Check broken links and 404s", isDone: false, taskId: 30 },
      { name: "Log and report all found issues", isDone: true, taskId: 30 },

      // --- Task 31 ---
      { name: "Draft wireframe for post layout", isDone: true, taskId: 31 },
      { name: "Sketch profile page layout", isDone: true, taskId: 31 },
      { name: "Wireframe story format", isDone: true, taskId: 31 },
      { name: "Plan posting schedule layout", isDone: false, taskId: 31 },
      { name: "Wireframe engagement section", isDone: true, taskId: 31 },
      { name: "Design comment/reaction layout", isDone: true, taskId: 31 },
      { name: "Wireframe ad placement spots", isDone: true, taskId: 31 },
      { name: "Add mobile-friendly wireframe", isDone: false, taskId: 31 },
      { name: "Finalize wireframe presentation", isDone: false, taskId: 31 },

      // --- Task 32 ---
      { name: "Design Instagram post template", isDone: true, taskId: 32 },
      { name: "Design Facebook post template", isDone: true, taskId: 32 },
      { name: "Design Twitter/X post visuals", isDone: true, taskId: 32 },
      { name: "Design story backgrounds", isDone: false, taskId: 32 },
      { name: "Design carousel post layout", isDone: true, taskId: 32 },
      { name: "Design call-to-action banners", isDone: true, taskId: 32 },
      { name: "Prepare design system for posts", isDone: true, taskId: 32 },

      // --- Task 33 ---
      { name: "Research trending topics", isDone: true, taskId: 33 },
      { name: "Brainstorm post ideas", isDone: false, taskId: 33 },
      { name: "Create weekly content slots", isDone: true, taskId: 33 },
      { name: "Define posting frequency", isDone: true, taskId: 33 },
      { name: "Align posts with campaigns", isDone: true, taskId: 33 },
      { name: "Tag posts with categories", isDone: false, taskId: 33 },
      { name: "Prepare drafts in content calendar", isDone: false, taskId: 33 },
      { name: "Review content plan with team", isDone: true, taskId: 33 },
      { name: "Schedule first batch of posts", isDone: false, taskId: 33 },
      { name: "Export editorial calendar", isDone: false, taskId: 33 },

      // --- Task 34 ---
      { name: "Collect past post engagement data", isDone: true, taskId: 34 },
      { name: "Analyze reach and impressions", isDone: true, taskId: 34 },
      { name: "Analyze click-through rates", isDone: false, taskId: 34 },
      { name: "Review engagement by platform", isDone: true, taskId: 34 },
      { name: "Compare hashtags performance", isDone: true, taskId: 34 },
      { name: "Identify top-performing content", isDone: false, taskId: 34 },
      { name: "Generate insights dashboard", isDone: false, taskId: 34 },

      // --- Task 35 ---
      { name: "Research trending hashtags", isDone: true, taskId: 35 },
      { name: "Optimize post descriptions", isDone: true, taskId: 35 },
      { name: "Add SEO keywords to captions", isDone: true, taskId: 35 },
      { name: "Test hashtag groups", isDone: true, taskId: 35 },
      { name: "Optimize links for engagement", isDone: false, taskId: 35 },
      { name: "Review SEO analytics tools", isDone: true, taskId: 35 },
      { name: "A/B test marketing posts", isDone: false, taskId: 35 },
      { name: "Finalize SEO integration", isDone: true, taskId: 35 },

      // --- Task 36 ---
      { name: "Check dataset completeness", isDone: true, taskId: 36 },
      { name: "Identify missing values", isDone: true, taskId: 36 },
      { name: "Detect duplicate records", isDone: true, taskId: 36 },
      { name: "Verify data types", isDone: false, taskId: 36 },
      { name: "Review categorical consistency", isDone: true, taskId: 36 },
      { name: "Spot outliers in datasets", isDone: true, taskId: 36 },
      { name: "Cross-check datasets with sources", isDone: true, taskId: 36 },
      { name: "Document inconsistencies", isDone: false, taskId: 36 },
      { name: "Finalize dataset review report", isDone: false, taskId: 36 },

      // --- Task 37 ---
      { name: "Write script for null checks", isDone: true, taskId: 37 },
      { name: "Write script for duplicate checks", isDone: true, taskId: 37 },
      { name: "Write script for type validation", isDone: true, taskId: 37 },
      { name: "Add script for range validation", isDone: false, taskId: 37 },
      { name: "Validate referential integrity", isDone: true, taskId: 37 },
      { name: "Automate validation tasks", isDone: true, taskId: 37 },
      { name: "Run scripts on sample dataset", isDone: true, taskId: 37 },

      // --- Task 38 ---
      { name: "Standardize column naming", isDone: true, taskId: 38 },
      { name: "Normalize text fields", isDone: false, taskId: 38 },
      { name: "Convert date formats", isDone: true, taskId: 38 },
      { name: "Unify numeric precision", isDone: true, taskId: 38 },
      { name: "Handle missing values", isDone: true, taskId: 38 },
      { name: "Map legacy codes to new format", isDone: false, taskId: 38 },
      { name: "Transform categorical data", isDone: false, taskId: 38 },
      { name: "Run transformation pipeline", isDone: true, taskId: 38 },
      { name: "Check transformed dataset size", isDone: false, taskId: 38 },
      { name: "Document transformation steps", isDone: false, taskId: 38 },

      // --- Task 39 ---
      { name: "Verify dataset against requirements", isDone: true, taskId: 39 },
      { name: "Run automated QA scripts", isDone: true, taskId: 39 },
      { name: "Check random samples manually", isDone: false, taskId: 39 },
      { name: "Test transformation accuracy", isDone: true, taskId: 39 },
      { name: "Verify edge cases in data", isDone: true, taskId: 39 },
      { name: "Log and report QA findings", isDone: false, taskId: 39 },
      { name: "Prepare QA summary report", isDone: false, taskId: 39 },

      // --- Task 40 ---
      { name: "Create summary tables", isDone: true, taskId: 40 },
      { name: "Visualize trends with charts", isDone: true, taskId: 40 },
      { name: "Highlight key improvements", isDone: true, taskId: 40 },
      { name: "Prepare executive summary", isDone: true, taskId: 40 },
      { name: "Export dataset statistics", isDone: false, taskId: 40 },
      { name: "Add recommendations section", isDone: true, taskId: 40 },
      { name: "Finalize reporting template", isDone: false, taskId: 40 },
      { name: "Deliver final report", isDone: true, taskId: 40 },

      // --- Task 41 ---
      { name: "Sketch main screens", isDone: true, taskId: 41 },
      { name: "Define user flows", isDone: true, taskId: 41 },
      { name: "Create low-fidelity wireframes", isDone: true, taskId: 41 },
      { name: "Review wireframes with team", isDone: false, taskId: 41 },
      { name: "Update based on feedback", isDone: true, taskId: 41 },
      { name: "Finalize wireframes", isDone: true, taskId: 41 },
      { name: "Prepare handoff for UI design", isDone: true, taskId: 41 },
      { name: "Document wireframe decisions", isDone: false, taskId: 41 },
      { name: "Export wireframes for reference", isDone: true, taskId: 41 },
      { name: "Check wireframe consistency", isDone: false, taskId: 41 },

      // --- Task 42 ---
      { name: "Design home screen", isDone: true, taskId: 42 },
      { name: "Design onboarding screens", isDone: true, taskId: 42 },
      { name: "Create UI components library", isDone: true, taskId: 42 },
      { name: "Design profile screens", isDone: false, taskId: 42 },
      { name: "Design settings screens", isDone: true, taskId: 42 },
      { name: "Design notifications UI", isDone: false, taskId: 42 },
      { name: "Create design assets", isDone: false, taskId: 42 },
      { name: "Review design with team", isDone: true, taskId: 42 },
      { name: "Prepare handoff to frontend", isDone: true, taskId: 42 },

      // --- Task 43 ---
      { name: "Connect authentication endpoints", isDone: true, taskId: 43 },
      { name: "Integrate user data API", isDone: false, taskId: 43 },
      { name: "Connect content endpoints", isDone: true, taskId: 43 },
      { name: "Test API responses", isDone: false, taskId: 43 },
      { name: "Handle error responses", isDone: true, taskId: 43 },
      { name: "Document API integration", isDone: true, taskId: 43 },
      { name: "Set up automated API tests", isDone: false, taskId: 43 },
      { name: "Optimize API calls", isDone: false, taskId: 43 },
      { name: "Secure API endpoints", isDone: true, taskId: 43 },
      { name: "Verify API data mapping", isDone: false, taskId: 43 },
      { name: "Finalize API integration", isDone: false, taskId: 43 },

      // --- Task 44 ---
      { name: "Implement background sync", isDone: false, taskId: 44 },
      { name: "Sync user data", isDone: true, taskId: 44 },
      { name: "Sync content updates", isDone: true, taskId: 44 },
      { name: "Test sync performance", isDone: false, taskId: 44 },
      { name: "Integrate analytics tracking", isDone: true, taskId: 44 },
      { name: "Validate data sync accuracy", isDone: true, taskId: 44 },
      { name: "Debug sync issues", isDone: false, taskId: 44 },
      { name: "Optimize sync logic", isDone: false, taskId: 44 },

      // --- Task 45 ---
      { name: "Test app on iOS devices", isDone: true, taskId: 45 },
      { name: "Test app on Android devices", isDone: true, taskId: 45 },
      { name: "Check push notifications", isDone: false, taskId: 45 },
      { name: "Test login and auth flows", isDone: true, taskId: 45 },
      { name: "Test data sync accuracy", isDone: true, taskId: 45 },
      { name: "Report bugs found", isDone: false, taskId: 45 },
      { name: "Verify bug fixes", isDone: true, taskId: 45 },
      { name: "Retest critical flows", isDone: false, taskId: 45 },
      { name: "Finalize QA report", isDone: true, taskId: 45 },

      // --- Task 46 ---
      { name: "Check website meta tags", isDone: true, taskId: 46 },
      { name: "Audit backlinks", isDone: true, taskId: 46 },
      { name: "Analyze page speed", isDone: true, taskId: 46 },
      { name: "Review mobile responsiveness", isDone: false, taskId: 46 },
      { name: "Check on-page SEO", isDone: true, taskId: 46 },
      { name: "Identify SEO issues", isDone: true, taskId: 46 },
      { name: "Compile audit report", isDone: true, taskId: 46 },
      { name: "Prioritize SEO fixes", isDone: false, taskId: 46 },
      { name: "Share audit with team", isDone: true, taskId: 46 },
      { name: "Schedule follow-up audit", isDone: false, taskId: 46 },

      // --- Task 47 ---
      { name: "Update homepage content", isDone: true, taskId: 47 },
      { name: "Revise blog articles", isDone: true, taskId: 47 },
      { name: "Optimize product descriptions", isDone: true, taskId: 47 },
      { name: "Add internal links", isDone: false, taskId: 47 },
      { name: "Check content readability", isDone: true, taskId: 47 },
      { name: "Proofread content", isDone: false, taskId: 47 },
      { name: "Update images and media", isDone: false, taskId: 47 },
      { name: "Publish optimized content", isDone: true, taskId: 47 },
      { name: "Verify content updates", isDone: true, taskId: 47 },

      // --- Task 48 ---
      { name: "Identify target keywords", isDone: true, taskId: 48 },
      { name: "Analyze competitor keywords", isDone: false, taskId: 48 },
      { name: "Group keywords by topic", isDone: true, taskId: 48 },
      { name: "Check keyword search volume", isDone: false, taskId: 48 },
      { name: "Assess keyword difficulty", isDone: true, taskId: 48 },
      { name: "Prioritize high-value keywords", isDone: true, taskId: 48 },
      { name: "Compile keyword list", isDone: false, taskId: 48 },
      { name: "Share keyword research", isDone: false, taskId: 48 },
      { name: "Update SEO strategy", isDone: true, taskId: 48 },
      { name: "Finalize keyword report", isDone: false, taskId: 48 },
      { name: "Schedule review session", isDone: false, taskId: 48 },

      // --- Task 49 ---
      { name: "Collect SEO metrics", isDone: false, taskId: 49 },
      { name: "Analyze traffic trends", isDone: true, taskId: 49 },
      { name: "Check keyword rankings", isDone: true, taskId: 49 },
      { name: "Assess backlink profile", isDone: false, taskId: 49 },
      { name: "Identify performance gaps", isDone: true, taskId: 49 },
      { name: "Visualize SEO data", isDone: true, taskId: 49 },
      { name: "Prepare SEO report", isDone: false, taskId: 49 },
      { name: "Review report with team", isDone: false, taskId: 49 },

      // --- Task 50 ---
      { name: "Connect analytics tools", isDone: true, taskId: 50 },
      { name: "Check traffic sources", isDone: true, taskId: 50 },
      { name: "Analyze user behavior", isDone: false, taskId: 50 },
      { name: "Review conversion rates", isDone: true, taskId: 50 },
      { name: "Assess SEO impact", isDone: true, taskId: 50 },
      { name: "Document findings", isDone: false, taskId: 50 },
      { name: "Create recommendations", isDone: true, taskId: 50 },
      { name: "Schedule review meeting", isDone: false, taskId: 50 },
      { name: "Finalize analytics report", isDone: true, taskId: 50 },

      // --- Task 51 ---
      { name: "Define campaign goals", isDone: true, taskId: 51 },
      { name: "Outline target audience", isDone: true, taskId: 51 },
      { name: "Set KPIs", isDone: true, taskId: 51 },
      { name: "Review competitor strategies", isDone: false, taskId: 51 },
      { name: "Plan campaign phases", isDone: true, taskId: 51 },
      { name: "Create budget plan", isDone: true, taskId: 51 },
      { name: "Finalize strategy document", isDone: true, taskId: 51 },
      { name: "Share plan with stakeholders", isDone: false, taskId: 51 },
      { name: "Approve campaign strategy", isDone: true, taskId: 51 },
      { name: "Schedule strategy review", isDone: false, taskId: 51 },

      // --- Task 52 ---
      { name: "Collect demographic data", isDone: true, taskId: 52 },
      { name: "Analyze competitor audience", isDone: true, taskId: 52 },
      { name: "Identify audience pain points", isDone: true, taskId: 52 },
      { name: "Survey target users", isDone: false, taskId: 52 },
      { name: "Segment audience groups", isDone: true, taskId: 52 },
      { name: "Prioritize key segments", isDone: false, taskId: 52 },
      { name: "Validate insights with team", isDone: false, taskId: 52 },
      { name: "Compile audience report", isDone: true, taskId: 52 },
      { name: "Share findings with stakeholders", isDone: true, taskId: 52 },

      // --- Task 53 ---
      { name: "Design banners", isDone: true, taskId: 53 },
      { name: "Create social media graphics", isDone: false, taskId: 53 },
      { name: "Design email templates", isDone: true, taskId: 53 },
      { name: "Create ad visuals", isDone: false, taskId: 53 },
      { name: "Review design consistency", isDone: true, taskId: 53 },
      { name: "Update assets based on feedback", isDone: true, taskId: 53 },
      { name: "Export final visuals", isDone: false, taskId: 53 },
      { name: "Organize assets in repository", isDone: false, taskId: 53 },
      { name: "Share visuals with team", isDone: true, taskId: 53 },
      { name: "Prepare assets for launch", isDone: false, taskId: 53 },
      { name: "Archive old campaign assets", isDone: false, taskId: 53 },

      // --- Task 54 ---
      { name: "Plan content calendar", isDone: false, taskId: 54 },
      { name: "Assign post authors", isDone: true, taskId: 54 },
      { name: "Schedule posts in platform", isDone: true, taskId: 54 },
      { name: "Review scheduled posts", isDone: false, taskId: 54 },
      { name: "Adjust timings for engagement", isDone: true, taskId: 54 },
      { name: "Coordinate with design team", isDone: true, taskId: 54 },
      { name: "Confirm schedule with marketing", isDone: false, taskId: 54 },
      { name: "Update calendar with changes", isDone: false, taskId: 54 },

      // --- Task 55 ---
      { name: "Set up tracking tools", isDone: true, taskId: 55 },
      { name: "Collect engagement metrics", isDone: true, taskId: 55 },
      { name: "Analyze click-through rates", isDone: false, taskId: 55 },
      { name: "Measure conversion rates", isDone: true, taskId: 55 },
      { name: "Identify trends and patterns", isDone: true, taskId: 55 },
      { name: "Document insights", isDone: false, taskId: 55 },
      { name: "Create performance dashboards", isDone: true, taskId: 55 },
      { name: "Share analytics with team", isDone: false, taskId: 55 },
      { name: "Review campaign effectiveness", isDone: true, taskId: 55 },

      // --- Task 56 ---
      { name: "Audit current frontend code", isDone: true, taskId: 56 },
      { name: "Identify performance bottlenecks", isDone: true, taskId: 56 },
      { name: "Refactor heavy components", isDone: true, taskId: 56 },
      { name: "Optimize API calls", isDone: false, taskId: 56 },
      { name: "Improve loading times", isDone: true, taskId: 56 },
      { name: "Test refactored components", isDone: true, taskId: 56 },
      { name: "Update documentation", isDone: true, taskId: 56 },
      { name: "Code review with team", isDone: false, taskId: 56 },
      { name: "Deploy changes to staging", isDone: true, taskId: 56 },
      { name: "Monitor performance metrics", isDone: false, taskId: 56 },

      // --- Task 57 ---
      { name: "Brainstorm new features", isDone: true, taskId: 57 },
      { name: "Prioritize features", isDone: true, taskId: 57 },
      { name: "Draft feature specifications", isDone: true, taskId: 57 },
      { name: "Review feasibility with team", isDone: false, taskId: 57 },
      { name: "Estimate development time", isDone: true, taskId: 57 },
      { name: "Adjust roadmap based on feedback", isDone: false, taskId: 57 },
      { name: "Finalize feature list", isDone: false, taskId: 57 },
      { name: "Present plan to stakeholders", isDone: true, taskId: 57 },
      { name: "Document decisions", isDone: true, taskId: 57 },

      // --- Task 58 ---
      { name: "Identify required endpoints", isDone: true, taskId: 58 },
      { name: "Develop new API endpoints", isDone: false, taskId: 58 },
      { name: "Integrate frontend with API", isDone: true, taskId: 58 },
      { name: "Test API responses", isDone: false, taskId: 58 },
      { name: "Optimize database queries", isDone: true, taskId: 58 },
      { name: "Handle error logging", isDone: true, taskId: 58 },
      { name: "Secure API access", isDone: false, taskId: 58 },
      { name: "Document API changes", isDone: false, taskId: 58 },
      { name: "Deploy API updates", isDone: true, taskId: 58 },
      { name: "Monitor backend performance", isDone: false, taskId: 58 },
      { name: "Review integration with team", isDone: false, taskId: 58 },

      // --- Task 59 ---
      { name: "Create test cases", isDone: false, taskId: 59 },
      { name: "Execute functional tests", isDone: true, taskId: 59 },
      { name: "Report bugs", isDone: true, taskId: 59 },
      { name: "Verify bug fixes", isDone: false, taskId: 59 },
      { name: "Run performance tests", isDone: true, taskId: 59 },
      { name: "Conduct regression testing", isDone: true, taskId: 59 },
      { name: "Document test results", isDone: false, taskId: 59 },
      { name: "Approve release readiness", isDone: false, taskId: 59 },

      // --- Task 60 ---
      { name: "Audit current dashboards", isDone: true, taskId: 60 },
      { name: "Update chart types", isDone: true, taskId: 60 },
      { name: "Optimize data queries", isDone: false, taskId: 60 },
      { name: "Add new metrics", isDone: true, taskId: 60 },
      { name: "Improve chart labels and colors", isDone: true, taskId: 60 },
      { name: "Validate data accuracy", isDone: false, taskId: 60 },
      { name: "Document visualization updates", isDone: true, taskId: 60 },
      { name: "Share updated dashboards with team", isDone: false, taskId: 60 },
      { name: "Collect feedback for next iteration", isDone: true, taskId: 60 },

      // --- Task 61 ---
      { name: "Design database schema", isDone: true, taskId: 61 },
      { name: "Define tables and relationships", isDone: true, taskId: 61 },
      { name: "Set up initial migrations", isDone: true, taskId: 61 },
      { name: "Configure database connections", isDone: false, taskId: 61 },
      { name: "Seed initial data", isDone: true, taskId: 61 },
      { name: "Implement constraints and indexes", isDone: true, taskId: 61 },
      { name: "Test database integrity", isDone: true, taskId: 61 },
      { name: "Optimize queries", isDone: false, taskId: 61 },
      { name: "Document schema design", isDone: true, taskId: 61 },
      { name: "Review setup with team", isDone: false, taskId: 61 },

      // --- Task 62 ---
      { name: "Sketch main inventory screens", isDone: true, taskId: 62 },
      { name: "Create low-fidelity wireframes", isDone: true, taskId: 62 },
      { name: "Review wireframes with stakeholders", isDone: true, taskId: 62 },
      { name: "Adjust layout based on feedback", isDone: false, taskId: 62 },
      { name: "Define navigation flow", isDone: true, taskId: 62 },
      { name: "Create alternative design options", isDone: false, taskId: 62 },
      { name: "Finalize wireframes", isDone: false, taskId: 62 },
      { name: "Prepare wireframes for UI design", isDone: true, taskId: 62 },
      { name: "Document wireframe specifications", isDone: true, taskId: 62 },

      // --- Task 63 ---
      { name: "Define API endpoints", isDone: true, taskId: 63 },
      { name: "Implement CRUD operations", isDone: false, taskId: 63 },
      { name: "Integrate with database", isDone: true, taskId: 63 },
      { name: "Handle validation and errors", isDone: false, taskId: 63 },
      { name: "Implement authentication", isDone: true, taskId: 63 },
      { name: "Add logging and monitoring", isDone: true, taskId: 63 },
      { name: "Optimize API performance", isDone: false, taskId: 63 },
      { name: "Test all endpoints", isDone: false, taskId: 63 },
      { name: "Deploy API to staging", isDone: true, taskId: 63 },
      { name: "Document API usage", isDone: false, taskId: 63 },
      { name: "Code review and approval", isDone: false, taskId: 63 },

      // --- Task 64 ---
      { name: "Integrate analytics library", isDone: false, taskId: 64 },
      { name: "Design dashboard layout", isDone: true, taskId: 64 },
      { name: "Add key metrics", isDone: true, taskId: 64 },
      { name: "Implement filters and drill-downs", isDone: false, taskId: 64 },
      { name: "Connect to backend data", isDone: true, taskId: 64 },
      { name: "Validate data accuracy", isDone: true, taskId: 64 },
      { name: "Optimize dashboard performance", isDone: false, taskId: 64 },
      { name: "Review with team", isDone: false, taskId: 64 },

      // --- Task 65 ---
      { name: "Write test cases for inventory", isDone: true, taskId: 65 },
      { name: "Perform functional testing", isDone: true, taskId: 65 },
      { name: "Report identified bugs", isDone: false, taskId: 65 },
      { name: "Verify bug fixes", isDone: true, taskId: 65 },
      { name: "Test performance under load", isDone: true, taskId: 65 },
      { name: "Conduct regression testing", isDone: false, taskId: 65 },
      { name: "Validate data integrity", isDone: true, taskId: 65 },
      { name: "Document test results", isDone: false, taskId: 65 },
      { name: "Sign off QA approval", isDone: true, taskId: 65 },
    ],
  });

  // ----------------- Task comments -----------------

  await prisma.taskComment.createMany({
    data: [
      // --- Task 1 ---
      { content: "Setup project structure and endpoints", taskId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Implement authentication and user routes", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Configure middleware and error handling", taskId: 1, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create REST API documentation", taskId: 1, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Test API endpoints with Postman", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Integrate logging and monitoring tools", taskId: 1, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Optimize API performance", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 2 ---
      { content: "Sketch homepage layout", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Define navigation and header sections", taskId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Create wireframe for product pages", taskId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Review wireframes with design team", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize wireframe assets for handoff", taskId: 2, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 3 ---
      { content: "Integrate Stripe payment API", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Integrate PayPal payment API", taskId: 3, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Test payment transactions", taskId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Ensure secure payment data handling", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Implement payment error handling", taskId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document payment API integration", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Optimize payment workflow", taskId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 4 ---
      { content: "Create ER diagrams for database", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Define product and order tables", taskId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Set up indexes for performance", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Implement relationships and constraints", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Run migrations and seed initial data", taskId: 4, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Review schema with backend team", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Optimize queries for reporting", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 5 ---
      { content: "Test user registration and login", taskId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Perform functional testing for all pages", taskId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Report and fix bugs", taskId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 6 ---
      { content: "Sketch layout for hero section", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Define sections for features and testimonials", taskId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Create low-fidelity wireframes", taskId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Review wireframes with design team", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize wireframes for client approval", taskId: 6, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 7 ---
      { content: "Gather all UI mockup drafts", taskId: 7, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Review mockups for consistency and style", taskId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Incorporate client feedback into UI", taskId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Finalize high-fidelity UI mockups", taskId: 7, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 8 ---
      { content: "Set up CRM API integration", taskId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Configure user authentication with CRM", taskId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Sync contact and lead data", taskId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Test CRM workflows", taskId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document integration process", taskId: 8, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 9 ---
      { content: "Plan campaign strategy and goals", taskId: 9, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Design social media creatives", taskId: 9, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Schedule posts and monitor performance", taskId: 9, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Analyze campaign metrics and adjust", taskId: 9, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 10 ---
      { content: "Perform cross-browser testing", taskId: 10, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Test mobile responsiveness", taskId: 10, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Report bugs and verify fixes", taskId: 10, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 11 ---
      { content: "Audit meta titles and descriptions", taskId: 11, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Check H1-H6 headers for SEO best practices", taskId: 11, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Analyze page content for keyword optimization", taskId: 11, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Evaluate internal linking structure", taskId: 11, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Prepare SEO audit report with recommendations", taskId: 11, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 12 ---
      { content: "Plan blog content calendar", taskId: 12, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Draft SEO-focused articles", taskId: 12, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create landing page content drafts", taskId: 12, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review content for SEO and readability", taskId: 12, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Finalize content for publishing", taskId: 12, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 13 ---
      { content: "Compile keyword list for target pages", taskId: 13, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Analyze competitor keywords", taskId: 13, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Identify high-traffic long-tail keywords", taskId: 13, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Organize keywords by priority and relevance", taskId: 13, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Share keyword recommendations with content team", taskId: 13, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 14 ---
      { content: "Identify potential backlink opportunities", taskId: 14, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Reach out to relevant websites for backlinks", taskId: 14, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Track outreach responses and follow-ups", taskId: 14, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Secure high-quality backlinks", taskId: 14, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Report backlink acquisition progress", taskId: 14, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 15 ---
      { content: "Set up Google Analytics and Search Console", taskId: 15, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Track organic traffic and ranking changes", taskId: 15, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Analyze SEO metrics and prepare reports", taskId: 15, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Recommend actions based on performance data", taskId: 15, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 16 ---
      { content: "Collect monthly sales data from all regions", taskId: 16, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Analyze sales trends and patterns", taskId: 16, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create charts for revenue and units sold", taskId: 16, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Identify top-performing products", taskId: 16, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 17 ---
      { content: "Sketch layout for dashboard screens", taskId: 17, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Define user flow and key components", taskId: 17, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Iterate wireframes based on feedback", taskId: 17, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 18 ---
      { content: "Design high-fidelity dashboard mockups", taskId: 18, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Create responsive UI for desktop and mobile", taskId: 18, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Review mockups with product and design team", taskId: 18, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 19 ---
      { content: "Collect marketing KPIs for dashboard", taskId: 19, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Generate visualizations for campaign performance", taskId: 19, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Integrate insights into dashboard layout", taskId: 19, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 20 ---
      { content: "Set up database connections for dashboard", taskId: 20, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Integrate APIs for live data feed", taskId: 20, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Test data accuracy and refresh rates", taskId: 20, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document integration process for developers", taskId: 20, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 21 ---
      { content: "Set up API endpoints for CRM integration", taskId: 21, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Connect backend services to CRM API", taskId: 21, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Test API calls and error handling", taskId: 21, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 22 ---
      { content: "Design CRM dashboard layout", taskId: 22, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Implement frontend components", taskId: 22, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Ensure responsiveness for all screen sizes", taskId: 22, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 23 ---
      { content: "Create test cases for CRM workflows", taskId: 23, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Execute QA testing on integration points", taskId: 23, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Report and track any bugs found", taskId: 23, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 24 ---
      { content: "Export existing customer data", taskId: 24, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Transform data to match new CRM schema", taskId: 24, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Import data into CRM and validate accuracy", taskId: 24, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 25 ---
      { content: "Finalize QA tests for all CRM modules", taskId: 25, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Fix integration bugs and verify fixes", taskId: 25, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Confirm all workflows function correctly", taskId: 25, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 26 ---
      { content: "Create initial wireframe sketches", taskId: 26, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review wireframe layout with team", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust wireframes based on feedback", taskId: 26, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Validate usability of wireframe", taskId: 26, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Finalize wireframes for handoff", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare wireframes for UI design phase", taskId: 26, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document wireframe decisions", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 27 ---
      { content: "Design landing page header and hero section", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create UI components for landing page", taskId: 27, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review UI with stakeholders", taskId: 27, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust colors, typography, and spacing", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize UI screens for development", taskId: 27, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 28 ---
      { content: "Write headline and main copy", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Draft persuasive product descriptions", taskId: 28, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Proofread and edit marketing content", taskId: 28, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review copy with design team", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Finalize copy for integration", taskId: 28, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Optimize content for SEO", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare copy for landing page", taskId: 28, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 29 ---
      { content: "Add images and media to landing page", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Insert marketing copy into sections", taskId: 29, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Check responsiveness of content", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Adjust layout for media elements", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Verify links and call-to-action buttons", taskId: 29, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Optimize images for faster load", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Confirm content is ready for QA", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 30 ---
      { content: "Test landing page on Chrome and Firefox", taskId: 30, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Check responsiveness on mobile devices", taskId: 30, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Report bugs and issues found", taskId: 30, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 31 ---
      { content: "Draft initial wireframe for social media layout", taskId: 31, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review wireframe schedule with team", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust layout for optimal posting flow", taskId: 31, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Validate wireframe usability", taskId: 31, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Finalize wireframe for team handoff", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Document wireframe decisions", taskId: 31, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Prepare wireframe assets for design", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 32 ---
      { content: "Design visual templates for post types", taskId: 32, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create post UI components", taskId: 32, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review post designs with content team", taskId: 32, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust colors, fonts, and styles for posts", taskId: 32, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize templates for scheduled posts", taskId: 32, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 33 ---
      { content: "Plan content calendar for the month", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Brainstorm post ideas for engagement", taskId: 33, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Assign topics and deadlines to team", taskId: 33, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review calendar with marketing team", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Finalize editorial calendar", taskId: 33, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Optimize calendar for posting frequency", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare calendar assets for team", taskId: 33, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 34 ---
      { content: "Analyze past posts engagement metrics", taskId: 34, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Prepare performance report", taskId: 34, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Identify high-performing content", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Recommend improvements for future posts", taskId: 34, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Share analytics insights with marketing team", taskId: 34, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Track engagement trends over time", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize analytics summary", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 35 ---
      { content: "Research SEO keywords for posts", taskId: 35, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Optimize hashtags for reach", taskId: 35, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Integrate SEO tips into content", taskId: 35, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 36 ---
      { content: "Review dataset entries for missing values", taskId: 36, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Identify inconsistencies across datasets", taskId: 36, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document data issues found", taskId: 36, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Flag datasets requiring correction", taskId: 36, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Prepare summary of dataset review", taskId: 36, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 37 ---
      { content: "Write scripts to check dataset integrity", taskId: 37, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Validate completeness of all datasets", taskId: 37, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document validation results", taskId: 37, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Debug and fix validation script errors", taskId: 37, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Ensure scripts cover all data formats", taskId: 37, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 38 ---
      { content: "Clean and standardize dataset formats", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Normalize data types and structures", taskId: 38, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Remove duplicate or redundant entries", taskId: 38, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document transformations applied", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare cleaned dataset for analysis", taskId: 38, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Verify transformation rules applied correctly", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Handoff standardized datasets to team", taskId: 38, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 39 ---
      { content: "Test cleaned datasets for accuracy", taskId: 39, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Run automated QA checks", taskId: 39, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Identify errors and anomalies", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Document QA findings", taskId: 39, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Confirm datasets meet quality standards", taskId: 39, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Communicate QA results to team", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize QA report for documentation", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 40 ---
      { content: "Generate summary reports from cleaned data", taskId: 40, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Visualize improvements in data quality", taskId: 40, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Prepare reports for stakeholders", taskId: 40, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 41 ---
      { content: "Draft wireframes for main app screens", taskId: 41, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review wireframes with UX team", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust layout and flow according to feedback", taskId: 41, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize wireframes for handoff to design", taskId: 41, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document wireframe decisions", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare wireframe assets for dev team", taskId: 41, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Validate wireframes against requirements", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 42 ---
      { content: "Design high-fidelity UI screens for the app", taskId: 42, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Create UI components and style guide", taskId: 42, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Review design with product team", taskId: 42, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Adjust designs based on feedback", taskId: 42, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize UI assets for development", taskId: 42, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 43 ---
      { content: "Integrate API endpoints with mobile app", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Test API calls and responses", taskId: 43, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Debug and fix integration issues", taskId: 43, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document API usage for team", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Verify backend service stability", taskId: 43, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Confirm API coverage for all features", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare API integration report", taskId: 43, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 44 ---
      { content: "Implement data synchronization logic", taskId: 44, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Track analytics events and metrics", taskId: 44, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Ensure data consistency across devices", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Test analytics tracking accuracy", taskId: 44, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Optimize sync performance", taskId: 44, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document sync and analytics implementation", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize tracking for release", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 45 ---
      { content: "Test app on multiple devices", taskId: 45, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Report and fix critical bugs", taskId: 45, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Perform UI and UX testing", taskId: 45, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 46 ---
      { content: "Review website for SEO issues", taskId: 46, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Analyze meta tags and headings", taskId: 46, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Check internal linking structure", taskId: 46, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Evaluate page speed and performance", taskId: 46, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document SEO audit findings", taskId: 46, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 47 ---
      { content: "Update page content with SEO keywords", taskId: 47, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Optimize headings and meta descriptions", taskId: 47, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Ensure proper content formatting", taskId: 47, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Check content readability and structure", taskId: 47, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Review updated content for SEO impact", taskId: 47, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 48 ---
      { content: "Research top-performing keywords", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Analyze competitors’ keyword strategies", taskId: 48, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Select high-value keywords for pages", taskId: 48, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Create keyword mapping for website", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Validate keyword choices with SEO team", taskId: 48, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Prepare keyword report", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Update content strategy based on research", taskId: 48, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 49 ---
      { content: "Generate current SEO performance reports", taskId: 49, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Analyze trends and keyword rankings", taskId: 49, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Highlight areas for improvement", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Compare performance with previous periods", taskId: 49, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Document findings for the team", taskId: 49, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Prepare visual SEO report for stakeholders", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize report for presentation", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 50 ---
      { content: "Analyze website analytics for SEO impact", taskId: 50, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Compare traffic before and after updates", taskId: 50, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Identify trends and anomalies", taskId: 50, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 51 ---
      { content: "Define campaign objectives and KPIs", taskId: 51, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Outline marketing strategy and channels", taskId: 51, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Set timeline and milestones for campaign", taskId: 51, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Discuss budget allocation and resources", taskId: 51, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Review draft strategy with team", taskId: 51, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 52 ---
      { content: "Analyze audience demographics and behavior", taskId: 52, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Identify target segments and personas", taskId: 52, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Study market trends and competitors", taskId: 52, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Compile audience research report", taskId: 52, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Present research findings to stakeholders", taskId: 52, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 53 ---
      { content: "Design campaign banners and visuals", taskId: 53, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Create graphics for social media ads", taskId: 53, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Prepare images in required formats", taskId: 53, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Review visual assets with marketing team", taskId: 53, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Finalize assets for campaign launch", taskId: 53, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 54 ---
      { content: "Schedule posts and ads across platforms", taskId: 54, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Coordinate posting times with campaign plan", taskId: 54, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Ensure content aligns with marketing goals", taskId: 54, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Monitor scheduling and make adjustments", taskId: 54, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Confirm schedule with team before launch", taskId: 54, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 55 ---
      { content: "Track campaign performance metrics", taskId: 55, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Analyze engagement across channels", taskId: 55, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Report findings to marketing team", taskId: 55, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Recommend improvements for future campaigns", taskId: 55, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Document analytics in campaign report", taskId: 55, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 56 ---
      { content: "Refactor dashboard code for faster load times", taskId: 56, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Optimize components and reduce bundle size", taskId: 56, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Check responsiveness and performance metrics", taskId: 56, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 57 ---
      { content: "Define new dashboard features with team", taskId: 57, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Prioritize features based on user needs", taskId: 57, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Document feature specifications", taskId: 57, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Review proposed features with stakeholders", taskId: 57, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 58 ---
      { content: "Integrate new backend endpoints for metrics", taskId: 58, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Ensure API responses match frontend requirements", taskId: 58, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Test data consistency and error handling", taskId: 58, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Update documentation for backend changes", taskId: 58, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 59 ---
      { content: "Run QA tests for all dashboard features", taskId: 59, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Report bugs and issues to development team", taskId: 59, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Verify bug fixes and performance improvements", taskId: 59, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Ensure feature compliance with requirements", taskId: 59, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 60 ---
      { content: "Update charts and graphs for better insights", taskId: 60, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { content: "Verify data accuracy and visualization clarity", taskId: 60, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { content: "Optimize visual components for performance", taskId: 60, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { content: "Gather feedback on visualizations from team", taskId: 60, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { content: "Finalize visual updates for production", taskId: 60, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
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

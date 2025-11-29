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
        fullName: "John Doe",
        role: "admin",
        email: "john_doe@example.com",
        emailVerified: true,
        imageUrl: "/man.jpg",
        phoneNumber: "+380990000002",
        publicLink: "https://example.com/user2",
        positionId: 1, // Founder
        bio: "As the Founder of the company, John established the core vision and long-term strategy. With more than a decade of leadership experience, he focuses on innovation, company culture, and sustainable growth. John believes that great teams are built on trust, transparency, and continuous learning.",
        birthdate: new Date(1990, 7, 14),
        address: "123 Main St, San Francisco, CA, USA",
      },
      {
        id: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        fullName: "Alice Smith",
        role: "user",
        email: "alice_smith@example.com",
        emailVerified: true,
        imageUrl: "/woman.jpg",
        phoneNumber: "+380990000002",
        publicLink: "https://example.com/user2",
        positionId: 2, // Manager
        bio: "Alice is a results-driven Manager known for her ability to align team goals with business objectives. She excels at coordinating cross-functional teams and improving workflows to enhance productivity. Her leadership style emphasizes empathy, accountability, and clear communication.",
        birthdate: new Date(1995, 11, 1),
        address: "45 Sunset Blvd, Los Angeles, CA, USA",
      },
      {
        id: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        fullName: "Fred Green",
        role: "user",
        email: "fred_green@example.com",
        emailVerified: true,
        imageUrl: null,
        positionId: 3, // Designer
        bio: "Fred is a creative Designer with a passion for crafting user-centered experiences. His work blends aesthetics and functionality to deliver intuitive interfaces that delight users. Fred constantly explores design trends, typography, and motion to keep his work modern and engaging.",
        birthdate: new Date(1987, 11, 30),
        address: "78 Pine St, Seattle, WA, USA",
      },
      {
        id: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        fullName: "Kate Brown",
        role: "user",
        email: "kate_brown@example.com",
        emailVerified: true,
        imageUrl: null,
        positionId: 4, // Developer
        bio: "Kate is a skilled Developer who specializes in building performant and scalable web applications. She enjoys solving complex technical challenges and collaborating closely with designers to deliver polished user experiences. Kate is passionate about clean architecture and modern JavaScript frameworks.",
        birthdate: new Date(1987, 5, 15),
        address: "91 Lakeview Dr, Chicago, IL, USA",
      },
    ],
  });

  // ----------------- Projects -----------------

  await prisma.projectStatus.createMany({
    data: [
      { id: "pending", name: "Pending" },
      { id: "active", name: "Active" },
      { id: "completed", name: "Completed" },
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
      { id: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "E-commerce Platform", description: "Build online store", deadline: new Date(now.getFullYear(), now.getMonth(), 20), statusId: "pending", categoryId: 2, customerId: 1, createdAt: new Date(2025, 7, 1) },
      { id: 2, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "Blog Redesign", description: "Update blog UI/UX", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: "pending", categoryId: 1, customerId: 2, createdAt: new Date(2025, 7, 2) },
      { id: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "SEO Optimization", description: "Optimize website for search engines", deadline: new Date(now.getFullYear(), now.getMonth(), 5), statusId: "pending", categoryId: 7, customerId: 3, createdAt: new Date(2025, 7, 3) },
      { id: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", title: "Analytics Dashboard", description: "Dashboard to monitor sales", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 15), statusId: "active", categoryId: 8, customerId: 4, createdAt: new Date(2025, 7, 4) },

      { id: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "CRM Integration", description: "Integrate CRM system", deadline: new Date(now.getFullYear(), now.getMonth(), 21), statusId: "active", categoryId: 2, customerId: 1, createdAt: new Date(2025, 7, 5) },
      { id: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Landing Page", description: "Build marketing landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: "active", categoryId: 1, customerId: 2, createdAt: new Date(2025, 7, 6) },
      { id: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Social Media Plan", description: "Plan social media content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: "active", categoryId: 3, customerId: 3, createdAt: new Date(2025, 7, 7) },
      { id: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", title: "Data Cleanup", description: "Clean internal datasets", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 16), statusId: "active", categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 1) },

      { id: 9, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Mobile App", description: "Develop company app", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: "completed", categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 2) },
      { id: 10, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Website SEO", description: "Improve website SEO", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: "completed", categoryId: 7, customerId: 2, createdAt: new Date(2025, 8, 3) },
      { id: 11, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Marketing Campaign", description: "Launch ad campaigns", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: "completed", categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 4) },
      { id: 12, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", title: "Dashboard Enhancements", description: "Improve dashboard features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 17), statusId: "pending", categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 5) },

      { id: 13, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Inventory System", description: "Build inventory management system", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: "pending", categoryId: 2, customerId: 1, createdAt: new Date(2025, 8, 6) },
      { id: 14, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Marketing Website", description: "Create marketing website", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: "active", categoryId: 1, customerId: 2, createdAt: new Date(2025, 8, 7) },
      { id: 15, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Content Strategy", description: "Plan content schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: "active", categoryId: 3, customerId: 3, createdAt: new Date(2025, 8, 8) },
      { id: 16, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", title: "Data Reports", description: "Generate business reports", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 18), statusId: "completed", categoryId: 8, customerId: 4, createdAt: new Date(2025, 8, 9) },
    ],
  });

  // ----------------- Project comments -----------------

  await prisma.comment.createMany({
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
      { id: "pending", name: "Pending" },
      { id: "active", name: "Active" },
      { id: "completed", name: "Completed" },
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
      { id: 1, projectId: 1, title: "Backend API Setup", description: "Develop core backend API for e-commerce platform", deadline: new Date(now.getFullYear(), now.getMonth(), 5), statusId: "pending", categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 2, projectId: 1, title: "Homepage Wireframe", description: "Create wireframe for main pages of e-commerce website", deadline: new Date(now.getFullYear(), now.getMonth(), 7), statusId: "pending", categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 3, projectId: 1, title: "Payment Gateway Integration", description: "Integrate Stripe and PayPal payment systems", deadline: new Date(now.getFullYear(), now.getMonth(), 9), statusId: "pending", categoryId: 6, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 4, projectId: 1, title: "Database Schema Design", description: "Design and optimize database schema for products and orders", deadline: new Date(now.getFullYear(), now.getMonth(), 11), statusId: "active", categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 5, projectId: 1, title: "QA Testing", description: "Test all features of the platform to ensure reliability and performance", deadline: new Date(now.getFullYear(), now.getMonth(), 13), statusId: "active", categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Project 2 ---
      { id: 6, projectId: 2, title: "Landing Page Wireframe", description: "Create wireframes for new landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 6), statusId: "active", categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 7, projectId: 2, title: "UI Mockup Review", description: "Review and finalize UI mockups for client approval", deadline: new Date(now.getFullYear(), now.getMonth(), 8), statusId: "completed", categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 8, projectId: 2, title: "CRM Integration Setup", description: "Integrate CRM system with existing platform", deadline: new Date(now.getFullYear(), now.getMonth(), 10), statusId: "completed", categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 9, projectId: 2, title: "Social Media Campaign", description: "Plan and launch marketing campaign for social media channels", deadline: new Date(now.getFullYear(), now.getMonth(), 12), statusId: "completed", categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 10, projectId: 2, title: "Website QA Testing", description: "Perform quality assurance and bug fixes on website", deadline: new Date(now.getFullYear(), now.getMonth(), 14), statusId: "pending", categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 3 ---
      { id: 11, projectId: 3, title: "On-Page SEO Audit", description: "Analyze website pages and optimize meta tags, headers, and content", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: "active", categoryId: 7, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 12, projectId: 3, title: "Content Strategy", description: "Plan and create SEO-focused blog posts and landing pages", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: "completed", categoryId: 6, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 13, projectId: 3, title: "Keyword Research", description: "Identify high-value keywords for website optimization", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: "pending", categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 14, projectId: 3, title: "Backlink Outreach", description: "Develop and execute a backlink acquisition campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: "active", categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 15, projectId: 3, title: "SEO Analytics", description: "Set up tracking and analyze SEO performance metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: "active", categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 4 ---
      { id: 16, projectId: 4, title: "Sales Data Analysis", description: "Analyze monthly sales data and trends", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: "completed", categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 17, projectId: 4, title: "Wireframe Dashboard Layout", description: "Design wireframes for dashboard interface", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: "completed", categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 18, projectId: 4, title: "UI Mockups", description: "Create high-fidelity UI designs for dashboard screens", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: "completed", categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 19, projectId: 4, title: "Marketing Dashboard Insights", description: "Provide marketing KPIs and insights in dashboard format", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: "pending", categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 20, projectId: 4, title: "Backend Data Integration", description: "Connect dashboard to database and APIs for live data", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: "active", categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 5 ---
      { id: 21, projectId: 5, title: "Backend API Integration", description: "Connect CRM system with backend services and APIs", deadline: new Date(now.getFullYear(), now.getMonth(), 22), statusId: "completed", categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 22, projectId: 5, title: "Frontend CRM Dashboard", description: "Design and implement CRM dashboard interface for users", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: "pending", categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 23, projectId: 5, title: "CRM Testing", description: "Perform QA testing on CRM workflows and integration points", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: "pending", categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 24, projectId: 5, title: "Data Migration", description: "Migrate existing customer data to new CRM system", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: "active", categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 25, projectId: 5, title: "CRM QA & Bug Fixes", description: "Finalize testing and resolve any integration issues", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: "active", categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 6 ---
      { id: 26, projectId: 6, title: "Landing Page Wireframe", description: "Create wireframes for the landing page layout", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: "pending", categoryId: 2, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 27, projectId: 6, title: "Landing Page UI Design", description: "Design high-fidelity UI for landing page screens", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: "active", categoryId: 1, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 28, projectId: 6, title: "Marketing Copy", description: "Write persuasive content for landing page to boost conversions", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: "completed", categoryId: 3, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 29, projectId: 6, title: "Content Integration", description: "Add text, images, and media into landing page", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: "completed", categoryId: 6, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 30, projectId: 6, title: "Landing Page QA Testing", description: "Test landing page across devices and browsers for bugs", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: "active", categoryId: 5, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 7 ---
      { id: 31, projectId: 7, title: "Social Media Wireframe", description: "Draft content layout and posting schedule", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: "pending", categoryId: 2, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 32, projectId: 7, title: "UI Design for Posts", description: "Design visual templates for social media posts", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: "pending", categoryId: 1, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 33, projectId: 7, title: "Content Planning", description: "Create editorial calendar and post ideas", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: "active", categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 34, projectId: 7, title: "Engagement Analytics", description: "Analyze past post performance and engagement metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: "active", categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 35, projectId: 7, title: "SEO & Marketing Integration", description: "Optimize posts and hashtags for SEO and reach", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: "completed", categoryId: 7, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 8 ---
      { id: 36, projectId: 8, title: "Dataset Review", description: "Inspect all internal datasets for inconsistencies", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: "completed", categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 37, projectId: 8, title: "Data Validation Scripts", description: "Write scripts to validate dataset integrity and completeness", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: "completed", categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 38, projectId: 8, title: "Data Transformation", description: "Clean and standardize dataset formats for analysis", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: "pending", categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 39, projectId: 8, title: "QA Testing on Cleaned Data", description: "Test cleaned datasets for errors and accuracy", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: "pending", categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 40, projectId: 8, title: "Data Reporting", description: "Generate reports summarizing the cleaned data and improvements", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: "active", categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 9 ---
      { id: 41, projectId: 9, title: "App Wireframing", description: "Create wireframes for mobile app screens", deadline: new Date(now.getFullYear(), now.getMonth(), 23), statusId: "completed", categoryId: 2, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 42, projectId: 9, title: "App UI Design", description: "Design high-fidelity UI for mobile app", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: "pending", categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 43, projectId: 9, title: "API Integration", description: "Connect mobile app with backend services", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: "active", categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 44, projectId: 9, title: "Data Sync & Analytics", description: "Implement data synchronization and analytics tracking", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: "completed", categoryId: 4, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 45, projectId: 9, title: "App QA Testing", description: "Test app functionality across devices and fix bugs", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: "completed", categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Project 10 ---
      { id: 46, projectId: 10, title: "SEO Audit", description: "Conduct full SEO audit of the website", deadline: new Date(now.getFullYear(), now.getMonth(), 24), statusId: "pending", categoryId: 7, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 47, projectId: 10, title: "Content Optimization", description: "Update website content for SEO improvements", deadline: new Date(now.getFullYear(), now.getMonth(), 26), statusId: "active", categoryId: 6, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 48, projectId: 10, title: "Keyword Research", description: "Research high-value keywords for website pages", deadline: new Date(now.getFullYear(), now.getMonth(), 28), statusId: "completed", categoryId: 7, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 49, projectId: 10, title: "SEO Reporting", description: "Generate reports on current SEO metrics and performance", deadline: new Date(now.getFullYear(), now.getMonth(), 30), statusId: "completed", categoryId: 8, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 50, projectId: 10, title: "Analytics Review", description: "Analyze SEO impact using website analytics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 2), statusId: "active", categoryId: 8, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 11 ---
      { id: 51, projectId: 11, title: "Campaign Strategy", description: "Define goals and strategy for marketing campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: "active", categoryId: 3, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 52, projectId: 11, title: "Audience Research", description: "Analyze target audience and market trends", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 5), statusId: "completed", categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 53, projectId: 11, title: "Visual Assets", description: "Design banners, images, and graphics for campaign", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 7), statusId: "completed", categoryId: 1, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 54, projectId: 11, title: "Content Scheduling", description: "Plan posts and ad scheduling across channels", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 9), statusId: "active", categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 55, projectId: 11, title: "Campaign Analytics", description: "Track campaign performance and engagement metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 11), statusId: "pending", categoryId: 8, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Project 12 ---
      { id: 56, projectId: 12, title: "Frontend Optimization", description: "Refactor frontend code to improve dashboard performance", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 4), statusId: "pending", categoryId: 2, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 57, projectId: 12, title: "Feature Planning", description: "Define new dashboard features and enhancements", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 6), statusId: "active", categoryId: 3, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 58, projectId: 12, title: "Backend Integration", description: "Integrate new data endpoints for dashboard metrics", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 8), statusId: "completed", categoryId: 4, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 59, projectId: 12, title: "QA Testing", description: "Test all dashboard features for bugs and performance issues", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 10), statusId: "pending", categoryId: 5, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 60, projectId: 12, title: "Data Visualization Updates", description: "Enhance charts and graphs for better analytics insights", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 12), statusId: "active", categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Project 13 ---
      { id: 61, projectId: 13, title: "Database Setup", description: "Design and implement database schema for inventory", deadline: new Date(now.getFullYear(), now.getMonth(), 25), statusId: "completed", categoryId: 4, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 62, projectId: 13, title: "UI Wireframes", description: "Create wireframes for inventory management interface", deadline: new Date(now.getFullYear(), now.getMonth(), 27), statusId: "active", categoryId: 3, creatorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 63, projectId: 13, title: "Backend API", description: "Develop backend endpoints to handle inventory operations", deadline: new Date(now.getFullYear(), now.getMonth(), 29), statusId: "pending", categoryId: 4, creatorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", assigneeId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 64, projectId: 13, title: "Analytics Dashboard", description: "Integrate inventory analytics and reporting features", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 1), statusId: "active", categoryId: 8, creatorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", assigneeId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 65, projectId: 13, title: "QA & Testing", description: "Test inventory system for functionality and data integrity", deadline: new Date(now.getFullYear(), now.getMonth() - 1, 3), statusId: "completed", categoryId: 5, creatorId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", assigneeId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
    ],
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: [
      // --- Task 1 ---
      { text: "Set up project structure", isDone: true, taskId: 1, deadline: new Date("2025-01-10") },
      { text: "Configure server environment", isDone: true, taskId: 1, deadline: new Date("2025-01-12") },
      { text: "Implement authentication endpoints", isDone: true, taskId: 1, deadline: new Date("2025-01-15") },
      { text: "Create user management APIs", isDone: true, taskId: 1, deadline: new Date("2025-01-17") },
      { text: "Develop product CRUD endpoints", isDone: true, taskId: 1, deadline: new Date("2025-01-20") },
      { text: "Add order processing endpoints", isDone: true, taskId: 1, deadline: new Date("2025-01-22") },
      { text: "Implement error handling & logging", isDone: true, taskId: 1, deadline: new Date("2025-01-24") },
      { text: "Add rate limiting & security middleware", isDone: false, taskId: 1, deadline: new Date("2025-01-27") },
      { text: "Write API documentation", isDone: false, taskId: 1, deadline: new Date("2025-01-30") },
      { text: "Deploy API to staging server", isDone: false, taskId: 1, deadline: new Date("2025-02-02") },

      // --- Task 2 ---
      { text: "Sketch layout ideas", isDone: true, taskId: 2, deadline: new Date("2025-02-05") },
      { text: "Design homepage header", isDone: true, taskId: 2, deadline: new Date("2025-02-07") },
      { text: "Design navigation menu", isDone: true, taskId: 2, deadline: new Date("2025-02-09") },
      { text: "Wireframe hero section", isDone: true, taskId: 2, deadline: new Date("2025-02-11") },
      { text: "Wireframe product showcase section", isDone: true, taskId: 2, deadline: new Date("2025-02-13") },
      { text: "Wireframe footer section", isDone: true, taskId: 2, deadline: new Date("2025-02-15") },
      { text: "Review and refine wireframes", isDone: true, taskId: 2, deadline: new Date("2025-02-17") },

      // --- Task 3 ---
      { text: "Set up Stripe account", isDone: true, taskId: 3, deadline: new Date("2025-03-01") },
      { text: "Set up PayPal account", isDone: true, taskId: 3, deadline: new Date("2025-03-03") },
      { text: "Install payment SDKs", isDone: true, taskId: 3, deadline: new Date("2025-03-05") },
      { text: "Implement Stripe checkout flow", isDone: true, taskId: 3, deadline: new Date("2025-03-08") },
      { text: "Implement PayPal checkout flow", isDone: true, taskId: 3, deadline: new Date("2025-03-10") },
      { text: "Handle payment success & failure callbacks", isDone: true, taskId: 3, deadline: new Date("2025-03-12") },
      { text: "Secure API keys in environment variables", isDone: true, taskId: 3, deadline: new Date("2025-03-14") },
      { text: "Add subscription support", isDone: false, taskId: 3, deadline: new Date("2025-03-17") },
      { text: "Write automated payment tests", isDone: false, taskId: 3, deadline: new Date("2025-03-20") },
      { text: "Integrate payment history tracking", isDone: false, taskId: 3, deadline: new Date("2025-03-22") },
      { text: "Localize payment UI", isDone: false, taskId: 3, deadline: new Date("2025-03-24") },
      { text: "Deploy payments to staging", isDone: false, taskId: 3, deadline: new Date("2025-03-27") },

      // --- Task 4 ---
      { text: "Define entities and relationships", isDone: true, taskId: 4, deadline: new Date("2025-04-01") },
      { text: "Design products table schema", isDone: true, taskId: 4, deadline: new Date("2025-04-03") },
      { text: "Design orders table schema", isDone: true, taskId: 4, deadline: new Date("2025-04-05") },
      { text: "Design users table schema", isDone: true, taskId: 4, deadline: new Date("2025-04-07") },
      { text: "Add indexing for performance", isDone: true, taskId: 4, deadline: new Date("2025-04-09") },
      { text: "Normalize schema where necessary", isDone: true, taskId: 4, deadline: new Date("2025-04-11") },
      { text: "Add foreign key constraints", isDone: true, taskId: 4, deadline: new Date("2025-04-13") },
      { text: "Design audit logs table", isDone: false, taskId: 4, deadline: new Date("2025-04-16") },
      { text: "Document schema in ERD tool", isDone: false, taskId: 4, deadline: new Date("2025-04-18") },

      // --- Task 5 ---
      { text: "Write test plan", isDone: true, taskId: 5, deadline: new Date("2025-04-20") },
      { text: "Set up testing environment", isDone: true, taskId: 5, deadline: new Date("2025-04-22") },
      { text: "Perform unit tests", isDone: true, taskId: 5, deadline: new Date("2025-04-24") },
      { text: "Perform integration tests", isDone: true, taskId: 5, deadline: new Date("2025-04-26") },
      { text: "Perform end-to-end tests", isDone: true, taskId: 5, deadline: new Date("2025-04-28") },
      { text: "Check cross-browser compatibility", isDone: true, taskId: 5, deadline: new Date("2025-04-30") },
      { text: "Run performance tests", isDone: true, taskId: 5, deadline: new Date("2025-05-02") },
      { text: "Conduct security testing", isDone: false, taskId: 5, deadline: new Date("2025-05-05") },
      { text: "Document test results", isDone: false, taskId: 5, deadline: new Date("2025-05-07") },
      { text: "Fix critical bugs found", isDone: false, taskId: 5, deadline: new Date("2025-05-09") },
      { text: "Retest after bug fixes", isDone: false, taskId: 5, deadline: new Date("2025-05-11") },

      // --- Task 6 ---
      { text: "Brainstorm landing page structure", isDone: true, taskId: 6, deadline: new Date("2025-05-15") },
      { text: "Wireframe header & navigation", isDone: true, taskId: 6, deadline: new Date("2025-05-17") },
      { text: "Wireframe hero section", isDone: true, taskId: 6, deadline: new Date("2025-05-19") },
      { text: "Wireframe features section", isDone: true, taskId: 6, deadline: new Date("2025-05-21") },
      { text: "Wireframe testimonials section", isDone: false, taskId: 6, deadline: new Date("2025-05-23") },
      { text: "Wireframe call-to-action section", isDone: true, taskId: 6, deadline: new Date("2025-05-25") },
      { text: "Wireframe footer section", isDone: true, taskId: 6, deadline: new Date("2025-05-27") },
      { text: "Review wireframes with team", isDone: true, taskId: 6, deadline: new Date("2025-05-29") },
      { text: "Refine based on feedback", isDone: true, taskId: 6, deadline: new Date("2025-05-31") },
      { text: "Export wireframes for client", isDone: false, taskId: 6, deadline: new Date("2025-06-03") },
      { text: "Prepare presentation slides", isDone: false, taskId: 6, deadline: new Date("2025-06-05") },
      { text: "Finalize approval notes", isDone: false, taskId: 6, deadline: new Date("2025-06-07") },

      // --- Task 7 ---
      { text: "Collect all UI mockups", isDone: true, taskId: 7, deadline: new Date("2025-06-10") },
      { text: "Check consistency in colors", isDone: true, taskId: 7, deadline: new Date("2025-06-12") },
      { text: "Check typography & spacing", isDone: true, taskId: 7, deadline: new Date("2025-06-14") },
      { text: "Identify usability issues", isDone: false, taskId: 7, deadline: new Date("2025-06-16") },
      { text: "Compare mockups with wireframes", isDone: true, taskId: 7, deadline: new Date("2025-06-18") },
      { text: "Review with design team", isDone: true, taskId: 7, deadline: new Date("2025-06-20") },
      { text: "Prepare notes for client", isDone: true, taskId: 7, deadline: new Date("2025-06-22") },

      // --- Task 8 ---
      { text: "Choose CRM system & confirm credentials", isDone: true, taskId: 8, deadline: new Date("2025-06-25") },
      { text: "Install CRM integration SDK", isDone: true, taskId: 8, deadline: new Date("2025-06-27") },
      { text: "Set up API connection", isDone: true, taskId: 8, deadline: new Date("2025-06-29") },
      { text: "Sync customer data model", isDone: false, taskId: 8, deadline: new Date("2025-07-01") },
      { text: "Map CRM fields to platform database", isDone: true, taskId: 8, deadline: new Date("2025-07-03") },
      { text: "Implement lead capture forms", isDone: true, taskId: 8, deadline: new Date("2025-07-05") },
      { text: "Test data synchronization", isDone: true, taskId: 8, deadline: new Date("2025-07-07") },
      { text: "Handle error states", isDone: false, taskId: 8, deadline: new Date("2025-07-09") },
      { text: "Add logging & monitoring", isDone: false, taskId: 8, deadline: new Date("2025-07-11") },
      { text: "Secure API keys in env variables", isDone: true, taskId: 8, deadline: new Date("2025-07-13") },
      { text: "Document CRM integration flow", isDone: false, taskId: 8, deadline: new Date("2025-07-15") },
      { text: "Deploy to staging environment", isDone: false, taskId: 8, deadline: new Date("2025-07-17") },
      { text: "QA test integration", isDone: false, taskId: 8, deadline: new Date("2025-07-19") },
      { text: "Prepare client handoff", isDone: false, taskId: 8, deadline: new Date("2025-07-21") },

      // --- Task 9 ---
      { text: "Define campaign goals", isDone: true, taskId: 9, deadline: new Date("2025-07-23") },
      { text: "Select social media platforms", isDone: true, taskId: 9, deadline: new Date("2025-07-25") },
      { text: "Prepare content calendar", isDone: false, taskId: 9, deadline: new Date("2025-07-27") },
      { text: "Design campaign visuals", isDone: true, taskId: 9, deadline: new Date("2025-07-29") },
      { text: "Write ad copy & captions", isDone: true, taskId: 9, deadline: new Date("2025-07-31") },
      { text: "Schedule posts in tool", isDone: true, taskId: 9, deadline: new Date("2025-08-02") },
      { text: "Set campaign budget & targeting", isDone: true, taskId: 9, deadline: new Date("2025-08-04") },
      { text: "Launch campaign", isDone: false, taskId: 9, deadline: new Date("2025-08-06") },
      { text: "Monitor engagement metrics", isDone: false, taskId: 9, deadline: new Date("2025-08-08") },

      // --- Task 10 ---
      { text: "Set up QA environment", isDone: true, taskId: 10, deadline: new Date("2025-08-10") },
      { text: "Perform functional tests", isDone: true, taskId: 10, deadline: new Date("2025-08-12") },
      { text: "Perform integration tests", isDone: true, taskId: 10, deadline: new Date("2025-08-14") },
      { text: "Perform cross-browser tests", isDone: true, taskId: 10, deadline: new Date("2025-08-16") },
      { text: "Run performance benchmarks", isDone: true, taskId: 10, deadline: new Date("2025-08-18") },
      { text: "Log bugs in issue tracker", isDone: false, taskId: 10, deadline: new Date("2025-08-20") },
      { text: "Perform regression testing", isDone: true, taskId: 10, deadline: new Date("2025-08-22") },
      { text: "Verify bug fixes", isDone: false, taskId: 10, deadline: new Date("2025-08-24") },
      { text: "Generate QA report", isDone: true, taskId: 10, deadline: new Date("2025-08-26") },

      // --- Task 11 ---
      { text: "Crawl website pages", isDone: true, taskId: 11, deadline: new Date("2025-08-28") },
      { text: "Check page titles & meta descriptions", isDone: true, taskId: 11, deadline: new Date("2025-08-30") },
      { text: "Analyze H1–H6 header structure", isDone: true, taskId: 11, deadline: new Date("2025-09-01") },
      { text: "Review keyword placement in content", isDone: true, taskId: 11, deadline: new Date("2025-09-03") },
      { text: "Identify duplicate or missing tags", isDone: false, taskId: 11, deadline: new Date("2025-09-05") },
      { text: "Check internal linking strategy", isDone: true, taskId: 11, deadline: new Date("2025-09-07") },
      { text: "Evaluate image alt attributes", isDone: true, taskId: 11, deadline: new Date("2025-09-09") },
      { text: "Test page load speed", isDone: true, taskId: 11, deadline: new Date("2025-09-11") },
      { text: "Check mobile responsiveness", isDone: true, taskId: 11, deadline: new Date("2025-09-13") },
      { text: "Audit URL structure", isDone: false, taskId: 11, deadline: new Date("2025-09-15") },
      { text: "Generate SEO audit report", isDone: false, taskId: 11, deadline: new Date("2025-09-17") },
      { text: "Present findings to client", isDone: false, taskId: 11, deadline: new Date("2025-09-19") },

      // --- Task 12 ---
      { text: "Define target audience personas", isDone: true, taskId: 12, deadline: new Date("2025-09-21") },
      { text: "Research trending SEO topics", isDone: true, taskId: 12, deadline: new Date("2025-09-23") },
      { text: "Plan content calendar", isDone: true, taskId: 12, deadline: new Date("2025-09-25") },
      { text: "Assign blog post topics to writers", isDone: false, taskId: 12, deadline: new Date("2025-09-27") },
      { text: "Draft first blog outline", isDone: true, taskId: 12, deadline: new Date("2025-09-29") },
      { text: "Draft landing page copy", isDone: true, taskId: 12, deadline: new Date("2025-10-01") },
      { text: "Review drafts with editor", isDone: true, taskId: 12, deadline: new Date("2025-10-03") },

      // --- Task 13 ---
      { text: "List seed keywords", isDone: true, taskId: 13, deadline: new Date("2025-10-05") },
      { text: "Use keyword research tools (SEMRush/Ahrefs)", isDone: true, taskId: 13, deadline: new Date("2025-10-07") },
      { text: "Analyze search volume & difficulty", isDone: true, taskId: 13, deadline: new Date("2025-10-09") },
      { text: "Filter out irrelevant keywords", isDone: false, taskId: 13, deadline: new Date("2025-10-11") },
      { text: "Identify long-tail opportunities", isDone: true, taskId: 13, deadline: new Date("2025-10-13") },
      { text: "Map keywords to website pages", isDone: true, taskId: 13, deadline: new Date("2025-10-15") },
      { text: "Group keywords by intent", isDone: true, taskId: 13, deadline: new Date("2025-10-17") },
      { text: "Check competitor keywords", isDone: false, taskId: 13, deadline: new Date("2025-10-19") },
      { text: "Export keyword list to spreadsheet", isDone: false, taskId: 13, deadline: new Date("2025-10-21") },
      { text: "Validate keywords with client", isDone: false, taskId: 13, deadline: new Date("2025-10-23") },
      { text: "Finalize keyword strategy", isDone: true, taskId: 13, deadline: new Date("2025-10-25") },
      { text: "Prepare documentation", isDone: false, taskId: 13, deadline: new Date("2025-10-27") },
      { text: "Deliver final keyword set", isDone: false, taskId: 13, deadline: new Date("2025-10-29") },
      { text: "Add keywords to SEO tool", isDone: false, taskId: 13, deadline: new Date("2025-10-31") },

      // --- Task 14 ---
      { text: "Identify backlink opportunities", isDone: true, taskId: 14, deadline: new Date("2025-11-02") },
      { text: "Collect contact information", isDone: true, taskId: 14, deadline: new Date("2025-11-04") },
      { text: "Create outreach email templates", isDone: false, taskId: 14, deadline: new Date("2025-11-06") },
      { text: "Segment prospects by priority", isDone: true, taskId: 14, deadline: new Date("2025-11-08") },
      { text: "Send initial outreach emails", isDone: true, taskId: 14, deadline: new Date("2025-11-10") },
      { text: "Follow up with non-responders", isDone: true, taskId: 14, deadline: new Date("2025-11-12") },
      { text: "Track outreach responses", isDone: true, taskId: 14, deadline: new Date("2025-11-14") },
      { text: "Negotiate guest posting opportunities", isDone: false, taskId: 14, deadline: new Date("2025-11-16") },
      { text: "Record acquired backlinks", isDone: false, taskId: 14, deadline: new Date("2025-11-18") },

      // --- Task 15 ---
      { text: "Set up Google Analytics", isDone: true, taskId: 15, deadline: new Date("2025-11-20") },
      { text: "Set up Google Search Console", isDone: true, taskId: 15, deadline: new Date("2025-11-22") },
      { text: "Connect analytics with website", isDone: true, taskId: 15, deadline: new Date("2025-11-24") },
      { text: "Track organic traffic growth", isDone: true, taskId: 15, deadline: new Date("2025-11-26") },
      { text: "Monitor keyword rankings", isDone: true, taskId: 15, deadline: new Date("2025-11-28") },
      { text: "Analyze bounce rate", isDone: false, taskId: 15, deadline: new Date("2025-11-30") },
      { text: "Create SEO performance dashboard", isDone: true, taskId: 15, deadline: new Date("2025-12-02") },
      { text: "Generate weekly reports", isDone: false, taskId: 15, deadline: new Date("2025-12-04") },
      { text: "Present insights to stakeholders", isDone: true, taskId: 15, deadline: new Date("2025-12-06") },

      // --- Task 16 ---
      { text: "Collect monthly sales data from CRM", isDone: true, taskId: 16, deadline: new Date("2025-08-01") },
      { text: "Clean and preprocess sales dataset", isDone: true, taskId: 16, deadline: new Date("2025-08-03") },
      { text: "Identify monthly revenue trends", isDone: true, taskId: 16, deadline: new Date("2025-08-05") },
      { text: "Visualize data with charts and graphs", isDone: true, taskId: 16, deadline: new Date("2025-08-07") },
      { text: "Highlight top-performing products", isDone: false, taskId: 16, deadline: new Date("2025-08-09") },
      { text: "Analyze seasonal sales fluctuations", isDone: true, taskId: 16, deadline: new Date("2025-08-11") },
      { text: "Generate insights report for stakeholders", isDone: true, taskId: 16, deadline: new Date("2025-08-13") },
      { text: "Compare current vs previous quarter", isDone: true, taskId: 16, deadline: new Date("2025-08-15") },
      { text: "Prepare presentation slides", isDone: true, taskId: 16, deadline: new Date("2025-08-17") },
      { text: "Suggest sales strategy improvements", isDone: false, taskId: 16, deadline: new Date("2025-08-19") },
      { text: "Identify underperforming regions", isDone: false, taskId: 16, deadline: new Date("2025-08-21") },
      { text: "Forecast next quarter sales", isDone: false, taskId: 16, deadline: new Date("2025-08-23") },

      // --- Task 17 ---
      { text: "Sketch dashboard header layout", isDone: true, taskId: 17, deadline: new Date("2025-08-25") },
      { text: "Define navigation menu structure", isDone: true, taskId: 17, deadline: new Date("2025-08-27") },
      { text: "Add placeholders for KPI widgets", isDone: true, taskId: 17, deadline: new Date("2025-08-29") },
      { text: "Include filter and search components", isDone: false, taskId: 17, deadline: new Date("2025-08-31") },
      { text: "Design responsive grid layout", isDone: true, taskId: 17, deadline: new Date("2025-09-02") },
      { text: "Validate wireframes with team feedback", isDone: true, taskId: 17, deadline: new Date("2025-09-04") },
      { text: "Finalize dashboard wireframes", isDone: true, taskId: 17, deadline: new Date("2025-09-06") },

      // --- Task 18 ---
      { text: "Design dashboard login screen", isDone: true, taskId: 18, deadline: new Date("2025-09-08") },
      { text: "Create home dashboard mockup", isDone: true, taskId: 18, deadline: new Date("2025-09-10") },
      { text: "Style KPI widget components", isDone: true, taskId: 18, deadline: new Date("2025-09-12") },
      { text: "Design data visualization charts", isDone: false, taskId: 18, deadline: new Date("2025-09-14") },
      { text: "Apply brand colors and typography", isDone: true, taskId: 18, deadline: new Date("2025-09-16") },
      { text: "Export mockups for developer handoff", isDone: true, taskId: 18, deadline: new Date("2025-09-18") },
      { text: "Review mockups with stakeholders", isDone: true, taskId: 18, deadline: new Date("2025-09-20") },
      { text: "Adjust based on user feedback", isDone: false, taskId: 18, deadline: new Date("2025-09-22") },
      { text: "Ensure accessibility compliance", isDone: false, taskId: 18, deadline: new Date("2025-09-24") },
      { text: "Prepare final design package", isDone: false, taskId: 18, deadline: new Date("2025-09-26") },
      { text: "Design notification popups", isDone: true, taskId: 18, deadline: new Date("2025-09-28") },
      { text: "Refine mobile UI mockups", isDone: false, taskId: 18, deadline: new Date("2025-09-30") },
      { text: "Optimize layout for tablets", isDone: false, taskId: 18, deadline: new Date("2025-10-02") },
      { text: "Document design guidelines", isDone: false, taskId: 18, deadline: new Date("2025-10-04") },

      // --- Task 19 ---
      { text: "Define key marketing KPIs", isDone: true, taskId: 19, deadline: new Date("2025-10-06") },
      { text: "Integrate traffic analytics", isDone: true, taskId: 19, deadline: new Date("2025-10-08") },
      { text: "Add campaign performance metrics", isDone: false, taskId: 19, deadline: new Date("2025-10-10") },
      { text: "Track social media engagement", isDone: true, taskId: 19, deadline: new Date("2025-10-12") },
      { text: "Include conversion rate analysis", isDone: true, taskId: 19, deadline: new Date("2025-10-14") },
      { text: "Summarize ad spend efficiency", isDone: true, taskId: 19, deadline: new Date("2025-10-16") },
      { text: "Prepare dashboard for presentation", isDone: true, taskId: 19, deadline: new Date("2025-10-18") },
      { text: "Set up automatic data refresh", isDone: false, taskId: 19, deadline: new Date("2025-10-20") },
      { text: "Highlight best-performing campaigns", isDone: false, taskId: 19, deadline: new Date("2025-10-22") },

      // --- Task 20 ---
      { text: "Set up database connection", isDone: true, taskId: 20, deadline: new Date("2025-10-24") },
      { text: "Implement API endpoints", isDone: true, taskId: 20, deadline: new Date("2025-10-26") },
      { text: "Integrate real-time data fetch", isDone: true, taskId: 20, deadline: new Date("2025-10-28") },
      { text: "Handle authentication for API", isDone: true, taskId: 20, deadline: new Date("2025-10-30") },
      { text: "Test data synchronization", isDone: true, taskId: 20, deadline: new Date("2025-11-01") },
      { text: "Optimize query performance", isDone: false, taskId: 20, deadline: new Date("2025-11-03") },
      { text: "Set up error logging and monitoring", isDone: true, taskId: 20, deadline: new Date("2025-11-05") },
      { text: "Secure sensitive API routes", isDone: false, taskId: 20, deadline: new Date("2025-11-07") },
      { text: "Deploy backend integration", isDone: true, taskId: 20, deadline: new Date("2025-11-09") },

      // --- Task 21 ---
      { text: "Set up API authentication middleware", isDone: true, taskId: 21, deadline: new Date("2025-11-11") },
      { text: "Configure database connection pool", isDone: true, taskId: 21, deadline: new Date("2025-11-13") },
      { text: "Implement customer data API endpoint", isDone: true, taskId: 21, deadline: new Date("2025-11-15") },
      { text: "Integrate CRM with payment service API", isDone: true, taskId: 21, deadline: new Date("2025-11-17") },
      { text: "Write unit tests for API routes", isDone: false, taskId: 21, deadline: new Date("2025-11-19") },
      { text: "Add request validation and error handling", isDone: true, taskId: 21, deadline: new Date("2025-11-21") },
      { text: "Optimize API response performance", isDone: true, taskId: 21, deadline: new Date("2025-11-23") },
      { text: "Log API usage for monitoring", isDone: true, taskId: 21, deadline: new Date("2025-11-25") },
      { text: "Implement rate limiting", isDone: true, taskId: 21, deadline: new Date("2025-11-27") },
      { text: "Deploy API integration to staging", isDone: false, taskId: 21, deadline: new Date("2025-11-29") },
      { text: "Fix authentication edge cases", isDone: false, taskId: 21, deadline: new Date("2025-12-01") },
      { text: "Document API endpoints", isDone: false, taskId: 21, deadline: new Date("2025-12-03") },

      // --- Task 22 ---
      { text: "Design dashboard layout structure", isDone: true, taskId: 22, deadline: new Date("2025-12-05") },
      { text: "Implement navigation sidebar", isDone: true, taskId: 22, deadline: new Date("2025-12-07") },
      { text: "Add customer list table component", isDone: true, taskId: 22, deadline: new Date("2025-12-09") },
      { text: "Integrate live data from backend APIs", isDone: false, taskId: 22, deadline: new Date("2025-12-11") },
      { text: "Build customer profile details view", isDone: true, taskId: 22, deadline: new Date("2025-12-13") },
      { text: "Implement dashboard filters and search", isDone: true, taskId: 22, deadline: new Date("2025-12-15") },
      { text: "Ensure mobile responsive design", isDone: true, taskId: 22, deadline: new Date("2025-12-17") },

      // --- Task 23 ---
      { text: "Write test cases for CRM workflows", isDone: true, taskId: 23, deadline: new Date("2025-12-19") },
      { text: "Perform functional tests on forms", isDone: true, taskId: 23, deadline: new Date("2025-12-21") },
      { text: "Validate API responses in CRM", isDone: true, taskId: 23, deadline: new Date("2025-12-23") },
      { text: "Run regression tests on critical flows", isDone: false, taskId: 23, deadline: new Date("2025-12-25") },
      { text: "Check data integrity after operations", isDone: true, taskId: 23, deadline: new Date("2025-12-27") },
      { text: "Perform cross-browser testing", isDone: true, taskId: 23, deadline: new Date("2025-12-29") },
      { text: "Verify user role permissions", isDone: true, taskId: 23, deadline: new Date("2025-12-31") },
      { text: "Test error handling and edge cases", isDone: false, taskId: 23, deadline: new Date("2026-01-02") },
      { text: "Conduct performance and load testing", isDone: false, taskId: 23, deadline: new Date("2026-01-04") },
      { text: "Check CRM workflow automation", isDone: false, taskId: 23, deadline: new Date("2026-01-06") },
      { text: "Log and report found bugs", isDone: true, taskId: 23, deadline: new Date("2026-01-08") },
      { text: "Retest after bug fixes", isDone: false, taskId: 23, deadline: new Date("2026-01-10") },
      { text: "Validate email notifications", isDone: false, taskId: 23, deadline: new Date("2026-01-12") },
      { text: "Confirm QA test coverage completeness", isDone: false, taskId: 23, deadline: new Date("2026-01-14") },

      // --- Task 24 ---
      { text: "Export customer data from legacy CRM", isDone: true, taskId: 24, deadline: new Date("2025-10-10") },
      { text: "Clean and normalize data fields", isDone: true, taskId: 24, deadline: new Date("2025-10-11") },
      { text: "Write migration scripts", isDone: false, taskId: 24, deadline: new Date("2025-10-13") },
      { text: "Import data into new CRM database", isDone: true, taskId: 24, deadline: new Date("2025-10-14") },
      { text: "Verify migrated data accuracy", isDone: true, taskId: 24, deadline: new Date("2025-10-15") },
      { text: "Check for duplicate or missing records", isDone: true, taskId: 24, deadline: new Date("2025-10-16") },
      { text: "Validate data with stakeholders", isDone: true, taskId: 24, deadline: new Date("2025-10-17") },
      { text: "Test rollback in case of failure", isDone: false, taskId: 24, deadline: new Date("2025-10-18") },
      { text: "Finalize migration logs", isDone: false, taskId: 24, deadline: new Date("2025-10-19") },

      // --- Task 25 ---
      { text: "Review open bug tickets", isDone: true, taskId: 25, deadline: new Date("2025-10-12") },
      { text: "Reproduce reported issues", isDone: true, taskId: 25, deadline: new Date("2025-10-13") },
      { text: "Fix UI layout inconsistencies", isDone: true, taskId: 25, deadline: new Date("2025-10-14") },
      { text: "Patch API integration errors", isDone: true, taskId: 25, deadline: new Date("2025-10-15") },
      { text: "Retest fixed CRM workflows", isDone: true, taskId: 25, deadline: new Date("2025-10-16") },
      { text: "Check regression in other modules", isDone: false, taskId: 25, deadline: new Date("2025-10-17") },
      { text: "Validate bug fixes in staging", isDone: true, taskId: 25, deadline: new Date("2025-10-18") },
      { text: "Confirm fixes with QA team", isDone: false, taskId: 25, deadline: new Date("2025-10-19") },
      { text: "Close resolved bug reports", isDone: true, taskId: 25, deadline: new Date("2025-10-20") },

      // --- Task 26 ---
      { text: "Sketch initial layout ideas", isDone: true, taskId: 26, deadline: new Date("2025-10-15") },
      { text: "Wireframe header section", isDone: true, taskId: 26, deadline: new Date("2025-10-16") },
      { text: "Wireframe hero section", isDone: true, taskId: 26, deadline: new Date("2025-10-17") },
      { text: "Wireframe features section", isDone: true, taskId: 26, deadline: new Date("2025-10-18") },
      { text: "Wireframe testimonials section", isDone: false, taskId: 26, deadline: new Date("2025-10-19") },
      { text: "Wireframe pricing section", isDone: true, taskId: 26, deadline: new Date("2025-10-20") },
      { text: "Wireframe footer section", isDone: true, taskId: 26, deadline: new Date("2025-10-21") },
      { text: "Prepare mobile wireframes", isDone: true, taskId: 26, deadline: new Date("2025-10-22") },
      { text: "Prepare tablet wireframes", isDone: true, taskId: 26, deadline: new Date("2025-10-23") },
      { text: "Prepare desktop wireframes", isDone: false, taskId: 26, deadline: new Date("2025-10-24") },
      { text: "Review wireframes with team", isDone: false, taskId: 26, deadline: new Date("2025-10-25") },
      { text: "Finalize landing page wireframe", isDone: false, taskId: 26, deadline: new Date("2025-10-26") },

      // --- Task 27 ---
      { text: "Set up design system styles", isDone: true, taskId: 27, deadline: new Date("2025-10-20") },
      { text: "Design landing page header", isDone: true, taskId: 27, deadline: new Date("2025-10-21") },
      { text: "Design hero section with visuals", isDone: true, taskId: 27, deadline: new Date("2025-10-22") },
      { text: "Design features grid", isDone: false, taskId: 27, deadline: new Date("2025-10-23") },
      { text: "Design pricing tables", isDone: true, taskId: 27, deadline: new Date("2025-10-24") },
      { text: "Design testimonials section", isDone: true, taskId: 27, deadline: new Date("2025-10-25") },
      { text: "Design footer section", isDone: true, taskId: 27, deadline: new Date("2025-10-26") },

      // --- Task 28 ---
      { text: "Research competitor landing pages", isDone: true, taskId: 28, deadline: new Date("2025-10-22") },
      { text: "Define brand tone and messaging", isDone: true, taskId: 28, deadline: new Date("2025-10-23") },
      { text: "Write headline options", isDone: true, taskId: 28, deadline: new Date("2025-10-24") },
      { text: "Draft hero section copy", isDone: false, taskId: 28, deadline: new Date("2025-10-25") },
      { text: "Write features section copy", isDone: true, taskId: 28, deadline: new Date("2025-10-26") },
      { text: "Write benefits section copy", isDone: true, taskId: 28, deadline: new Date("2025-10-27") },
      { text: "Write call-to-action buttons", isDone: true, taskId: 28, deadline: new Date("2025-10-28") },
      { text: "Draft pricing section copy", isDone: false, taskId: 28, deadline: new Date("2025-10-29") },
      { text: "Write FAQ section copy", isDone: false, taskId: 28, deadline: new Date("2025-10-30") },
      { text: "Draft testimonials section text", isDone: false, taskId: 28, deadline: new Date("2025-10-31") },
      { text: "Proofread all copy", isDone: true, taskId: 28, deadline: new Date("2025-11-01") },
      { text: "Localize text for other languages", isDone: false, taskId: 28, deadline: new Date("2025-11-02") },
      { text: "Optimize copy for SEO keywords", isDone: false, taskId: 28, deadline: new Date("2025-11-03") },
      { text: "Finalize marketing copy", isDone: false, taskId: 28, deadline: new Date("2025-11-04") },

      // --- Task 29 ---
      { text: "Insert marketing copy into layout", isDone: true, taskId: 29, deadline: new Date("2025-10-25") },
      { text: "Add header images", isDone: true, taskId: 29, deadline: new Date("2025-10-26") },
      { text: "Add hero section media", isDone: false, taskId: 29, deadline: new Date("2025-10-27") },
      { text: "Integrate features icons", isDone: true, taskId: 29, deadline: new Date("2025-10-28") },
      { text: "Add pricing tables content", isDone: true, taskId: 29, deadline: new Date("2025-10-29") },
      { text: "Insert testimonials content", isDone: true, taskId: 29, deadline: new Date("2025-10-30") },
      { text: "Add footer links & info", isDone: true, taskId: 29, deadline: new Date("2025-10-31") },
      { text: "Embed videos in hero or features", isDone: false, taskId: 29, deadline: new Date("2025-11-01") },
      { text: "Optimize image sizes", isDone: false, taskId: 29, deadline: new Date("2025-11-02") },

      // --- Task 30 ---
      { text: "Test responsive design on mobile", isDone: true, taskId: 30, deadline: new Date("2025-10-28") },
      { text: "Test responsive design on tablet", isDone: true, taskId: 30, deadline: new Date("2025-10-29") },
      { text: "Test responsive design on desktop", isDone: true, taskId: 30, deadline: new Date("2025-10-30") },
      { text: "Run cross-browser tests (Chrome, Safari, Firefox)", isDone: true, taskId: 30, deadline: new Date("2025-10-31") },
      { text: "Check page load performance", isDone: true, taskId: 30, deadline: new Date("2025-11-01") },
      { text: "Conduct accessibility testing", isDone: false, taskId: 30, deadline: new Date("2025-11-02") },
      { text: "Verify forms & input fields", isDone: true, taskId: 30, deadline: new Date("2025-11-03") },
      { text: "Check broken links and 404s", isDone: false, taskId: 30, deadline: new Date("2025-11-04") },
      { text: "Log and report all found issues", isDone: true, taskId: 30, deadline: new Date("2025-11-05") },

      // --- Task 31 ---
      { text: "Draft wireframe for post layout", isDone: true, taskId: 31, deadline: new Date("2025-10-29") },
      { text: "Sketch profile page layout", isDone: true, taskId: 31, deadline: new Date("2025-10-30") },
      { text: "Wireframe story format", isDone: true, taskId: 31, deadline: new Date("2025-10-31") },
      { text: "Plan posting schedule layout", isDone: false, taskId: 31, deadline: new Date("2025-11-01") },
      { text: "Wireframe engagement section", isDone: true, taskId: 31, deadline: new Date("2025-11-02") },
      { text: "Design comment/reaction layout", isDone: true, taskId: 31, deadline: new Date("2025-11-03") },
      { text: "Wireframe ad placement spots", isDone: true, taskId: 31, deadline: new Date("2025-11-04") },
      { text: "Add mobile-friendly wireframe", isDone: false, taskId: 31, deadline: new Date("2025-11-05") },
      { text: "Finalize wireframe presentation", isDone: false, taskId: 31, deadline: new Date("2025-11-06") },

      // --- Task 32 ---
      { text: "Design Instagram post template", isDone: true, taskId: 32, deadline: new Date("2025-10-20") },
      { text: "Design Facebook post template", isDone: true, taskId: 32, deadline: new Date("2025-10-21") },
      { text: "Design Twitter/X post visuals", isDone: true, taskId: 32, deadline: new Date("2025-10-22") },
      { text: "Design story backgrounds", isDone: false, taskId: 32, deadline: new Date("2025-10-23") },
      { text: "Design carousel post layout", isDone: true, taskId: 32, deadline: new Date("2025-10-24") },
      { text: "Design call-to-action banners", isDone: true, taskId: 32, deadline: new Date("2025-10-25") },
      { text: "Prepare design system for posts", isDone: true, taskId: 32, deadline: new Date("2025-10-26") },

      // --- Task 33 ---
      { text: "Research trending topics", isDone: true, taskId: 33, deadline: new Date("2025-10-24") },
      { text: "Brainstorm post ideas", isDone: false, taskId: 33, deadline: new Date("2025-10-25") },
      { text: "Create weekly content slots", isDone: true, taskId: 33, deadline: new Date("2025-10-26") },
      { text: "Define posting frequency", isDone: true, taskId: 33, deadline: new Date("2025-10-27") },
      { text: "Align posts with campaigns", isDone: true, taskId: 33, deadline: new Date("2025-10-28") },
      { text: "Tag posts with categories", isDone: false, taskId: 33, deadline: new Date("2025-10-29") },
      { text: "Prepare drafts in content calendar", isDone: false, taskId: 33, deadline: new Date("2025-10-30") },
      { text: "Review content plan with team", isDone: true, taskId: 33, deadline: new Date("2025-10-31") },
      { text: "Schedule first batch of posts", isDone: false, taskId: 33, deadline: new Date("2025-11-01") },
      { text: "Export editorial calendar", isDone: false, taskId: 33, deadline: new Date("2025-11-02") },

      // --- Task 34 ---
      { text: "Collect past post engagement data", isDone: true, taskId: 34, deadline: new Date("2025-10-27") },
      { text: "Analyze reach and impressions", isDone: true, taskId: 34, deadline: new Date("2025-10-28") },
      { text: "Analyze click-through rates", isDone: false, taskId: 34, deadline: new Date("2025-10-29") },
      { text: "Review engagement by platform", isDone: true, taskId: 34, deadline: new Date("2025-10-30") },
      { text: "Compare hashtags performance", isDone: true, taskId: 34, deadline: new Date("2025-10-31") },
      { text: "Identify top-performing content", isDone: false, taskId: 34, deadline: new Date("2025-11-01") },
      { text: "Generate insights dashboard", isDone: false, taskId: 34, deadline: new Date("2025-11-02") },

      // --- Task 35 ---
      { text: "Research trending hashtags", isDone: true, taskId: 35, deadline: new Date("2025-10-29") },
      { text: "Optimize post descriptions", isDone: true, taskId: 35, deadline: new Date("2025-10-30") },
      { text: "Add SEO keywords to captions", isDone: true, taskId: 35, deadline: new Date("2025-10-31") },
      { text: "Test hashtag groups", isDone: true, taskId: 35, deadline: new Date("2025-11-01") },
      { text: "Optimize links for engagement", isDone: false, taskId: 35, deadline: new Date("2025-11-02") },
      { text: "Review SEO analytics tools", isDone: true, taskId: 35, deadline: new Date("2025-11-03") },
      { text: "A/B test marketing posts", isDone: false, taskId: 35, deadline: new Date("2025-11-04") },
      { text: "Finalize SEO integration", isDone: true, taskId: 35, deadline: new Date("2025-11-05") },

      // --- Task 36 ---
      { text: "Check dataset completeness", isDone: true, taskId: 36, deadline: new Date("2025-10-30") },
      { text: "Identify missing values", isDone: true, taskId: 36, deadline: new Date("2025-10-31") },
      { text: "Detect duplicate records", isDone: true, taskId: 36, deadline: new Date("2025-11-01") },
      { text: "Verify data types", isDone: false, taskId: 36, deadline: new Date("2025-11-02") },
      { text: "Review categorical consistency", isDone: true, taskId: 36, deadline: new Date("2025-11-03") },
      { text: "Spot outliers in datasets", isDone: true, taskId: 36, deadline: new Date("2025-11-04") },
      { text: "Cross-check datasets with sources", isDone: true, taskId: 36, deadline: new Date("2025-11-05") },
      { text: "Document inconsistencies", isDone: false, taskId: 36, deadline: new Date("2025-11-06") },
      { text: "Finalize dataset review report", isDone: false, taskId: 36, deadline: new Date("2025-11-07") },

      // --- Task 37 ---
      { text: "Write script for null checks", isDone: true, taskId: 37, deadline: new Date("2025-11-01") },
      { text: "Write script for duplicate checks", isDone: true, taskId: 37, deadline: new Date("2025-11-02") },
      { text: "Write script for type validation", isDone: true, taskId: 37, deadline: new Date("2025-11-03") },
      { text: "Add script for range validation", isDone: false, taskId: 37, deadline: new Date("2025-11-04") },
      { text: "Validate referential integrity", isDone: true, taskId: 37, deadline: new Date("2025-11-05") },
      { text: "Automate validation tasks", isDone: true, taskId: 37, deadline: new Date("2025-11-06") },
      { text: "Run scripts on sample dataset", isDone: true, taskId: 37, deadline: new Date("2025-11-07") },

      // --- Task 38 ---
      { text: "Standardize column naming", isDone: true, taskId: 38, deadline: new Date("2025-11-02") },
      { text: "Normalize text fields", isDone: false, taskId: 38, deadline: new Date("2025-11-03") },
      { text: "Convert date formats", isDone: true, taskId: 38, deadline: new Date("2025-11-04") },
      { text: "Unify numeric precision", isDone: true, taskId: 38, deadline: new Date("2025-11-05") },
      { text: "Handle missing values", isDone: true, taskId: 38, deadline: new Date("2025-11-06") },
      { text: "Map legacy codes to new format", isDone: false, taskId: 38, deadline: new Date("2025-11-07") },
      { text: "Transform categorical data", isDone: false, taskId: 38, deadline: new Date("2025-11-08") },
      { text: "Run transformation pipeline", isDone: true, taskId: 38, deadline: new Date("2025-11-09") },
      { text: "Check transformed dataset size", isDone: false, taskId: 38, deadline: new Date("2025-11-10") },
      { text: "Document transformation steps", isDone: false, taskId: 38, deadline: new Date("2025-11-11") },

      // --- Task 39 ---
      { text: "Verify dataset against requirements", isDone: true, taskId: 39, deadline: new Date("2025-10-20") },
      { text: "Run automated QA scripts", isDone: true, taskId: 39, deadline: new Date("2025-10-21") },
      { text: "Check random samples manually", isDone: false, taskId: 39, deadline: new Date("2025-10-22") },
      { text: "Test transformation accuracy", isDone: true, taskId: 39, deadline: new Date("2025-10-23") },
      { text: "Verify edge cases in data", isDone: true, taskId: 39, deadline: new Date("2025-10-24") },
      { text: "Log and report QA findings", isDone: false, taskId: 39, deadline: new Date("2025-10-25") },
      { text: "Prepare QA summary report", isDone: false, taskId: 39, deadline: new Date("2025-10-26") },

      // --- Task 40 ---
      { text: "Create summary tables", isDone: true, taskId: 40, deadline: new Date("2025-10-27") },
      { text: "Visualize trends with charts", isDone: true, taskId: 40, deadline: new Date("2025-10-28") },
      { text: "Highlight key improvements", isDone: true, taskId: 40, deadline: new Date("2025-10-29") },
      { text: "Prepare executive summary", isDone: true, taskId: 40, deadline: new Date("2025-10-30") },
      { text: "Export dataset statistics", isDone: false, taskId: 40, deadline: new Date("2025-10-31") },
      { text: "Add recommendations section", isDone: true, taskId: 40, deadline: new Date("2025-11-01") },
      { text: "Finalize reporting template", isDone: false, taskId: 40, deadline: new Date("2025-11-02") },
      { text: "Deliver final report", isDone: true, taskId: 40, deadline: new Date("2025-11-03") },

      // --- Task 41 ---
      { text: "Sketch main screens", isDone: true, taskId: 41, deadline: new Date("2025-11-04") },
      { text: "Define user flows", isDone: true, taskId: 41, deadline: new Date("2025-11-05") },
      { text: "Create low-fidelity wireframes", isDone: true, taskId: 41, deadline: new Date("2025-11-06") },
      { text: "Review wireframes with team", isDone: false, taskId: 41, deadline: new Date("2025-11-07") },
      { text: "Update based on feedback", isDone: true, taskId: 41, deadline: new Date("2025-11-08") },
      { text: "Finalize wireframes", isDone: true, taskId: 41, deadline: new Date("2025-11-09") },
      { text: "Prepare handoff for UI design", isDone: true, taskId: 41, deadline: new Date("2025-11-10") },
      { text: "Document wireframe decisions", isDone: false, taskId: 41, deadline: new Date("2025-11-11") },
      { text: "Export wireframes for reference", isDone: true, taskId: 41, deadline: new Date("2025-11-12") },
      { text: "Check wireframe consistency", isDone: false, taskId: 41, deadline: new Date("2025-11-13") },

      // --- Task 42 ---
      { text: "Design home screen", isDone: true, taskId: 42, deadline: new Date("2025-11-14") },
      { text: "Design onboarding screens", isDone: true, taskId: 42, deadline: new Date("2025-11-15") },
      { text: "Create UI components library", isDone: true, taskId: 42, deadline: new Date("2025-11-16") },
      { text: "Design profile screens", isDone: false, taskId: 42, deadline: new Date("2025-11-17") },
      { text: "Design settings screens", isDone: true, taskId: 42, deadline: new Date("2025-11-18") },
      { text: "Design notifications UI", isDone: false, taskId: 42, deadline: new Date("2025-11-19") },
      { text: "Create design assets", isDone: false, taskId: 42, deadline: new Date("2025-11-20") },
      { text: "Review design with team", isDone: true, taskId: 42, deadline: new Date("2025-11-21") },
      { text: "Prepare handoff to frontend", isDone: true, taskId: 42, deadline: new Date("2025-11-22") },

      // --- Task 43 ---
      { text: "Connect authentication endpoints", isDone: true, taskId: 43, deadline: new Date("2025-11-23") },
      { text: "Integrate user data API", isDone: false, taskId: 43, deadline: new Date("2025-11-24") },
      { text: "Connect content endpoints", isDone: true, taskId: 43, deadline: new Date("2025-11-25") },
      { text: "Test API responses", isDone: false, taskId: 43, deadline: new Date("2025-11-26") },
      { text: "Handle error responses", isDone: true, taskId: 43, deadline: new Date("2025-11-27") },
      { text: "Document API integration", isDone: true, taskId: 43, deadline: new Date("2025-11-28") },
      { text: "Set up automated API tests", isDone: false, taskId: 43, deadline: new Date("2025-11-29") },
      { text: "Optimize API calls", isDone: false, taskId: 43, deadline: new Date("2025-11-30") },
      { text: "Secure API endpoints", isDone: true, taskId: 43, deadline: new Date("2025-12-01") },
      { text: "Verify API data mapping", isDone: false, taskId: 43, deadline: new Date("2025-12-02") },
      { text: "Finalize API integration", isDone: false, taskId: 43, deadline: new Date("2025-12-03") },

      // --- Task 44 ---
      { text: "Implement background sync", isDone: false, taskId: 44, deadline: new Date("2025-12-04") },
      { text: "Sync user data", isDone: true, taskId: 44, deadline: new Date("2025-12-05") },
      { text: "Sync content updates", isDone: true, taskId: 44, deadline: new Date("2025-12-06") },
      { text: "Test sync performance", isDone: false, taskId: 44, deadline: new Date("2025-12-07") },
      { text: "Integrate analytics tracking", isDone: true, taskId: 44, deadline: new Date("2025-12-08") },
      { text: "Validate data sync accuracy", isDone: true, taskId: 44, deadline: new Date("2025-12-09") },
      { text: "Debug sync issues", isDone: false, taskId: 44, deadline: new Date("2025-12-10") },
      { text: "Optimize sync logic", isDone: false, taskId: 44, deadline: new Date("2025-12-11") },

      // --- Task 45 ---
      { text: "Test app on iOS devices", isDone: true, taskId: 45, deadline: new Date("2025-12-12") },
      { text: "Test app on Android devices", isDone: true, taskId: 45, deadline: new Date("2025-12-13") },
      { text: "Check push notifications", isDone: false, taskId: 45, deadline: new Date("2025-12-14") },
      { text: "Test login and auth flows", isDone: true, taskId: 45, deadline: new Date("2025-12-15") },
      { text: "Test data sync accuracy", isDone: true, taskId: 45, deadline: new Date("2025-12-16") },
      { text: "Report bugs found", isDone: false, taskId: 45, deadline: new Date("2025-12-17") },
      { text: "Verify bug fixes", isDone: true, taskId: 45, deadline: new Date("2025-12-18") },
      { text: "Retest critical flows", isDone: false, taskId: 45, deadline: new Date("2025-12-19") },
      { text: "Finalize QA report", isDone: true, taskId: 45, deadline: new Date("2025-12-20") },

      // --- Task 46 ---
      { text: "Check website meta tags", isDone: true, taskId: 46, deadline: new Date("2025-12-21") },
      { text: "Audit backlinks", isDone: true, taskId: 46, deadline: new Date("2025-12-22") },
      { text: "Analyze page speed", isDone: true, taskId: 46, deadline: new Date("2025-12-23") },
      { text: "Review mobile responsiveness", isDone: false, taskId: 46, deadline: new Date("2025-12-24") },
      { text: "Check on-page SEO", isDone: true, taskId: 46, deadline: new Date("2025-12-25") },
      { text: "Identify SEO issues", isDone: true, taskId: 46, deadline: new Date("2025-12-26") },
      { text: "Compile audit report", isDone: true, taskId: 46, deadline: new Date("2025-12-27") },
      { text: "Prioritize SEO fixes", isDone: false, taskId: 46, deadline: new Date("2025-12-28") },
      { text: "Share audit with team", isDone: true, taskId: 46, deadline: new Date("2025-12-29") },
      { text: "Schedule follow-up audit", isDone: false, taskId: 46, deadline: new Date("2025-12-30") },

      // --- Task 47 ---
      { text: "Update homepage content", isDone: true, taskId: 47, deadline: new Date("2025-10-20") },
      { text: "Revise blog articles", isDone: true, taskId: 47, deadline: new Date("2025-10-21") },
      { text: "Optimize product descriptions", isDone: true, taskId: 47, deadline: new Date("2025-10-22") },
      { text: "Add internal links", isDone: false, taskId: 47, deadline: new Date("2025-10-23") },
      { text: "Check content readability", isDone: true, taskId: 47, deadline: new Date("2025-10-24") },
      { text: "Proofread content", isDone: false, taskId: 47, deadline: new Date("2025-10-25") },
      { text: "Update images and media", isDone: false, taskId: 47, deadline: new Date("2025-10-26") },
      { text: "Publish optimized content", isDone: true, taskId: 47, deadline: new Date("2025-10-27") },
      { text: "Verify content updates", isDone: true, taskId: 47, deadline: new Date("2025-10-28") },

      // --- Task 48 ---
      { text: "Identify target keywords", isDone: true, taskId: 48, deadline: new Date("2025-10-20") },
      { text: "Analyze competitor keywords", isDone: false, taskId: 48, deadline: new Date("2025-10-21") },
      { text: "Group keywords by topic", isDone: true, taskId: 48, deadline: new Date("2025-10-22") },
      { text: "Check keyword search volume", isDone: false, taskId: 48, deadline: new Date("2025-10-23") },
      { text: "Assess keyword difficulty", isDone: true, taskId: 48, deadline: new Date("2025-10-24") },
      { text: "Prioritize high-value keywords", isDone: true, taskId: 48, deadline: new Date("2025-10-25") },
      { text: "Compile keyword list", isDone: false, taskId: 48, deadline: new Date("2025-10-26") },
      { text: "Share keyword research", isDone: false, taskId: 48, deadline: new Date("2025-10-27") },
      { text: "Update SEO strategy", isDone: true, taskId: 48, deadline: new Date("2025-10-28") },
      { text: "Finalize keyword report", isDone: false, taskId: 48, deadline: new Date("2025-10-29") },
      { text: "Schedule review session", isDone: false, taskId: 48, deadline: new Date("2025-10-30") },

      // --- Task 49 ---
      { text: "Collect SEO metrics", isDone: false, taskId: 49, deadline: new Date("2025-10-20") },
      { text: "Analyze traffic trends", isDone: true, taskId: 49, deadline: new Date("2025-10-21") },
      { text: "Check keyword rankings", isDone: true, taskId: 49, deadline: new Date("2025-10-22") },
      { text: "Assess backlink profile", isDone: false, taskId: 49, deadline: new Date("2025-10-23") },
      { text: "Identify performance gaps", isDone: true, taskId: 49, deadline: new Date("2025-10-24") },
      { text: "Visualize SEO data", isDone: true, taskId: 49, deadline: new Date("2025-10-25") },
      { text: "Prepare SEO report", isDone: false, taskId: 49, deadline: new Date("2025-10-26") },
      { text: "Review report with team", isDone: false, taskId: 49, deadline: new Date("2025-10-27") },

      // --- Task 50 ---
      { text: "Connect analytics tools", isDone: true, taskId: 50, deadline: new Date("2025-10-20") },
      { text: "Check traffic sources", isDone: true, taskId: 50, deadline: new Date("2025-10-21") },
      { text: "Analyze user behavior", isDone: false, taskId: 50, deadline: new Date("2025-10-22") },
      { text: "Review conversion rates", isDone: true, taskId: 50, deadline: new Date("2025-10-23") },
      { text: "Assess SEO impact", isDone: true, taskId: 50, deadline: new Date("2025-10-24") },
      { text: "Document findings", isDone: false, taskId: 50, deadline: new Date("2025-10-25") },
      { text: "Create recommendations", isDone: true, taskId: 50, deadline: new Date("2025-10-26") },
      { text: "Schedule review meeting", isDone: false, taskId: 50, deadline: new Date("2025-10-27") },
      { text: "Finalize analytics report", isDone: true, taskId: 50, deadline: new Date("2025-10-28") },

      // --- Task 51 ---
      { text: "Define campaign goals", isDone: true, taskId: 51, deadline: new Date("2025-10-20") },
      { text: "Outline target audience", isDone: true, taskId: 51, deadline: new Date("2025-10-21") },
      { text: "Set KPIs", isDone: true, taskId: 51, deadline: new Date("2025-10-22") },
      { text: "Review competitor strategies", isDone: false, taskId: 51, deadline: new Date("2025-10-23") },
      { text: "Plan campaign phases", isDone: true, taskId: 51, deadline: new Date("2025-10-24") },
      { text: "Create budget plan", isDone: true, taskId: 51, deadline: new Date("2025-10-25") },
      { text: "Finalize strategy document", isDone: true, taskId: 51, deadline: new Date("2025-10-26") },
      { text: "Share plan with stakeholders", isDone: false, taskId: 51, deadline: new Date("2025-10-27") },
      { text: "Approve campaign strategy", isDone: true, taskId: 51, deadline: new Date("2025-10-28") },
      { text: "Schedule strategy review", isDone: false, taskId: 51, deadline: new Date("2025-10-29") },

      // --- Task 52 ---
      { text: "Collect demographic data", isDone: true, taskId: 52, deadline: new Date("2025-10-20") },
      { text: "Analyze competitor audience", isDone: true, taskId: 52, deadline: new Date("2025-10-21") },
      { text: "Identify audience pain points", isDone: true, taskId: 52, deadline: new Date("2025-10-22") },
      { text: "Survey target users", isDone: false, taskId: 52, deadline: new Date("2025-10-23") },
      { text: "Segment audience groups", isDone: true, taskId: 52, deadline: new Date("2025-10-24") },
      { text: "Prioritize key segments", isDone: false, taskId: 52, deadline: new Date("2025-10-25") },
      { text: "Validate insights with team", isDone: false, taskId: 52, deadline: new Date("2025-10-26") },
      { text: "Compile audience report", isDone: true, taskId: 52, deadline: new Date("2025-10-27") },
      { text: "Share findings with stakeholders", isDone: true, taskId: 52, deadline: new Date("2025-10-28") },

      // --- Task 53 ---
      { text: "Design banners", isDone: true, taskId: 53, deadline: new Date("2025-10-20") },
      { text: "Create social media graphics", isDone: false, taskId: 53, deadline: new Date("2025-10-21") },
      { text: "Design email templates", isDone: true, taskId: 53, deadline: new Date("2025-10-22") },
      { text: "Create ad visuals", isDone: false, taskId: 53, deadline: new Date("2025-10-23") },
      { text: "Review design consistency", isDone: true, taskId: 53, deadline: new Date("2025-10-24") },
      { text: "Update assets based on feedback", isDone: true, taskId: 53, deadline: new Date("2025-10-25") },
      { text: "Export final visuals", isDone: false, taskId: 53, deadline: new Date("2025-10-26") },
      { text: "Organize assets in repository", isDone: false, taskId: 53, deadline: new Date("2025-10-27") },
      { text: "Share visuals with team", isDone: true, taskId: 53, deadline: new Date("2025-10-28") },
      { text: "Prepare assets for launch", isDone: false, taskId: 53, deadline: new Date("2025-10-29") },
      { text: "Archive old campaign assets", isDone: false, taskId: 53, deadline: new Date("2025-10-30") },

      // --- Task 54 ---
      { text: "Plan content calendar", isDone: false, taskId: 54, deadline: new Date("2025-10-20") },
      { text: "Assign post authors", isDone: true, taskId: 54, deadline: new Date("2025-10-21") },
      { text: "Schedule posts in platform", isDone: true, taskId: 54, deadline: new Date("2025-10-22") },
      { text: "Review scheduled posts", isDone: false, taskId: 54, deadline: new Date("2025-10-23") },
      { text: "Adjust timings for engagement", isDone: true, taskId: 54, deadline: new Date("2025-10-24") },
      { text: "Coordinate with design team", isDone: true, taskId: 54, deadline: new Date("2025-10-25") },
      { text: "Confirm schedule with marketing", isDone: false, taskId: 54, deadline: new Date("2025-10-26") },
      { text: "Update calendar with changes", isDone: false, taskId: 54, deadline: new Date("2025-10-27") },

      // --- Task 55 ---
      { text: "Set up tracking tools", isDone: true, taskId: 55, deadline: new Date("2025-10-20") },
      { text: "Collect engagement metrics", isDone: true, taskId: 55, deadline: new Date("2025-10-21") },
      { text: "Analyze click-through rates", isDone: false, taskId: 55, deadline: new Date("2025-10-22") },
      { text: "Measure conversion rates", isDone: true, taskId: 55, deadline: new Date("2025-10-23") },
      { text: "Identify trends and patterns", isDone: true, taskId: 55, deadline: new Date("2025-10-24") },
      { text: "Document insights", isDone: false, taskId: 55, deadline: new Date("2025-10-25") },
      { text: "Create performance dashboards", isDone: true, taskId: 55, deadline: new Date("2025-10-26") },
      { text: "Share analytics with team", isDone: false, taskId: 55, deadline: new Date("2025-10-27") },
      { text: "Review campaign effectiveness", isDone: true, taskId: 55, deadline: new Date("2025-10-28") },

      // --- Task 56 ---
      { text: "Audit current frontend code", isDone: true, taskId: 56, deadline: new Date("2025-10-20") },
      { text: "Identify performance bottlenecks", isDone: true, taskId: 56, deadline: new Date("2025-10-21") },
      { text: "Refactor heavy components", isDone: true, taskId: 56, deadline: new Date("2025-10-22") },
      { text: "Optimize API calls", isDone: false, taskId: 56, deadline: new Date("2025-10-23") },
      { text: "Improve loading times", isDone: true, taskId: 56, deadline: new Date("2025-10-24") },
      { text: "Test refactored components", isDone: true, taskId: 56, deadline: new Date("2025-10-25") },
      { text: "Update documentation", isDone: true, taskId: 56, deadline: new Date("2025-10-26") },
      { text: "Code review with team", isDone: false, taskId: 56, deadline: new Date("2025-10-27") },
      { text: "Deploy changes to staging", isDone: true, taskId: 56, deadline: new Date("2025-10-28") },
      { text: "Monitor performance metrics", isDone: false, taskId: 56, deadline: new Date("2025-10-29") },

      // --- Task 57 ---
      { text: "Brainstorm new features", isDone: true, taskId: 57, deadline: new Date("2025-10-20") },
      { text: "Prioritize features", isDone: true, taskId: 57, deadline: new Date("2025-10-21") },
      { text: "Draft feature specifications", isDone: true, taskId: 57, deadline: new Date("2025-10-22") },
      { text: "Review feasibility with team", isDone: false, taskId: 57, deadline: new Date("2025-10-23") },
      { text: "Estimate development time", isDone: true, taskId: 57, deadline: new Date("2025-10-24") },
      { text: "Adjust roadmap based on feedback", isDone: false, taskId: 57, deadline: new Date("2025-10-25") },
      { text: "Finalize feature list", isDone: false, taskId: 57, deadline: new Date("2025-10-26") },
      { text: "Present plan to stakeholders", isDone: true, taskId: 57, deadline: new Date("2025-10-27") },
      { text: "Document decisions", isDone: true, taskId: 57, deadline: new Date("2025-10-28") },

      // --- Task 58 ---
      { text: "Identify required endpoints", isDone: true, taskId: 58, deadline: new Date("2025-10-20") },
      { text: "Develop new API endpoints", isDone: false, taskId: 58, deadline: new Date("2025-10-21") },
      { text: "Integrate frontend with API", isDone: true, taskId: 58, deadline: new Date("2025-10-22") },
      { text: "Test API responses", isDone: false, taskId: 58, deadline: new Date("2025-10-23") },
      { text: "Optimize database queries", isDone: true, taskId: 58, deadline: new Date("2025-10-24") },
      { text: "Handle error logging", isDone: true, taskId: 58, deadline: new Date("2025-10-25") },
      { text: "Secure API access", isDone: false, taskId: 58, deadline: new Date("2025-10-26") },
      { text: "Document API changes", isDone: false, taskId: 58, deadline: new Date("2025-10-27") },
      { text: "Deploy API updates", isDone: true, taskId: 58, deadline: new Date("2025-10-28") },
      { text: "Monitor backend performance", isDone: false, taskId: 58, deadline: new Date("2025-10-29") },
      { text: "Review integration with team", isDone: false, taskId: 58, deadline: new Date("2025-10-30") },

      // --- Task 59 ---
      { text: "Create test cases", isDone: false, taskId: 59, deadline: new Date("2025-10-20") },
      { text: "Execute functional tests", isDone: true, taskId: 59, deadline: new Date("2025-10-21") },
      { text: "Report bugs", isDone: true, taskId: 59, deadline: new Date("2025-10-22") },
      { text: "Verify bug fixes", isDone: false, taskId: 59, deadline: new Date("2025-10-23") },
      { text: "Run performance tests", isDone: true, taskId: 59, deadline: new Date("2025-10-24") },
      { text: "Conduct regression testing", isDone: true, taskId: 59, deadline: new Date("2025-10-25") },
      { text: "Document test results", isDone: false, taskId: 59, deadline: new Date("2025-10-26") },
      { text: "Approve release readiness", isDone: false, taskId: 59, deadline: new Date("2025-10-27") },

      // --- Task 60 ---
      { text: "Audit current dashboards", isDone: true, taskId: 60, deadline: new Date("2025-10-20") },
      { text: "Update chart types", isDone: true, taskId: 60, deadline: new Date("2025-10-21") },
      { text: "Optimize data queries", isDone: false, taskId: 60, deadline: new Date("2025-10-22") },
      { text: "Add new metrics", isDone: true, taskId: 60, deadline: new Date("2025-10-23") },
      { text: "Improve chart labels and colors", isDone: true, taskId: 60, deadline: new Date("2025-10-24") },
      { text: "Validate data accuracy", isDone: false, taskId: 60, deadline: new Date("2025-10-25") },
      { text: "Document visualization updates", isDone: true, taskId: 60, deadline: new Date("2025-10-26") },
      { text: "Share updated dashboards with team", isDone: false, taskId: 60, deadline: new Date("2025-10-27") },
      { text: "Collect feedback for next iteration", isDone: true, taskId: 60, deadline: new Date("2025-10-28") },

      // --- Task 61 ---
      { text: "Design database schema", isDone: true, taskId: 61, deadline: new Date("2025-10-20") },
      { text: "Define tables and relationships", isDone: true, taskId: 61, deadline: new Date("2025-10-21") },
      { text: "Set up initial migrations", isDone: true, taskId: 61, deadline: new Date("2025-10-22") },
      { text: "Configure database connections", isDone: false, taskId: 61, deadline: new Date("2025-10-23") },
      { text: "Seed initial data", isDone: true, taskId: 61, deadline: new Date("2025-10-24") },
      { text: "Implement constraints and indexes", isDone: true, taskId: 61, deadline: new Date("2025-10-25") },
      { text: "Test database integrity", isDone: true, taskId: 61, deadline: new Date("2025-10-26") },
      { text: "Optimize queries", isDone: false, taskId: 61, deadline: new Date("2025-10-27") },
      { text: "Document schema design", isDone: true, taskId: 61, deadline: new Date("2025-10-28") },
      { text: "Review setup with team", isDone: false, taskId: 61, deadline: new Date("2025-10-29") },

      // --- Task 62 ---
      { text: "Sketch main inventory screens", isDone: true, taskId: 62, deadline: new Date("2025-10-20") },
      { text: "Create low-fidelity wireframes", isDone: true, taskId: 62, deadline: new Date("2025-10-21") },
      { text: "Review wireframes with stakeholders", isDone: true, taskId: 62, deadline: new Date("2025-10-22") },
      { text: "Adjust layout based on feedback", isDone: false, taskId: 62, deadline: new Date("2025-10-23") },
      { text: "Define navigation flow", isDone: true, taskId: 62, deadline: new Date("2025-10-24") },
      { text: "Create alternative design options", isDone: false, taskId: 62, deadline: new Date("2025-10-25") },
      { text: "Finalize wireframes", isDone: false, taskId: 62, deadline: new Date("2025-10-26") },
      { text: "Prepare wireframes for UI design", isDone: true, taskId: 62, deadline: new Date("2025-10-27") },
      { text: "Document wireframe specifications", isDone: true, taskId: 62, deadline: new Date("2025-10-28") },

      // --- Task 63 ---
      { text: "Define API endpoints", isDone: true, taskId: 63, deadline: new Date("2025-10-20") },
      { text: "Implement CRUD operations", isDone: false, taskId: 63, deadline: new Date("2025-10-21") },
      { text: "Integrate with database", isDone: true, taskId: 63, deadline: new Date("2025-10-22") },
      { text: "Handle validation and errors", isDone: false, taskId: 63, deadline: new Date("2025-10-23") },
      { text: "Implement authentication", isDone: true, taskId: 63, deadline: new Date("2025-10-24") },
      { text: "Add logging and monitoring", isDone: true, taskId: 63, deadline: new Date("2025-10-25") },
      { text: "Optimize API performance", isDone: false, taskId: 63, deadline: new Date("2025-10-26") },
      { text: "Test all endpoints", isDone: false, taskId: 63, deadline: new Date("2025-10-27") },
      { text: "Deploy API to staging", isDone: true, taskId: 63, deadline: new Date("2025-10-28") },
      { text: "Document API usage", isDone: false, taskId: 63, deadline: new Date("2025-10-29") },
      { text: "Code review and approval", isDone: false, taskId: 63, deadline: new Date("2025-10-30") },

      // --- Task 64 ---
      { text: "Integrate analytics library", isDone: false, taskId: 64, deadline: new Date("2025-10-20") },
      { text: "Design dashboard layout", isDone: true, taskId: 64, deadline: new Date("2025-10-21") },
      { text: "Add key metrics", isDone: true, taskId: 64, deadline: new Date("2025-10-22") },
      { text: "Implement filters and drill-downs", isDone: false, taskId: 64, deadline: new Date("2025-10-23") },
      { text: "Connect to backend data", isDone: true, taskId: 64, deadline: new Date("2025-10-24") },
      { text: "Validate data accuracy", isDone: true, taskId: 64, deadline: new Date("2025-10-25") },
      { text: "Optimize dashboard performance", isDone: false, taskId: 64, deadline: new Date("2025-10-26") },
      { text: "Review with team", isDone: false, taskId: 64, deadline: new Date("2025-10-27") },

      // --- Task 65 ---
      { text: "Write test cases for inventory", isDone: true, taskId: 65, deadline: new Date("2025-10-20") },
      { text: "Perform functional testing", isDone: true, taskId: 65, deadline: new Date("2025-10-21") },
      { text: "Report identified bugs", isDone: false, taskId: 65, deadline: new Date("2025-10-22") },
      { text: "Verify bug fixes", isDone: true, taskId: 65, deadline: new Date("2025-10-23") },
      { text: "Test performance under load", isDone: true, taskId: 65, deadline: new Date("2025-10-24") },
      { text: "Conduct regression testing", isDone: false, taskId: 65, deadline: new Date("2025-10-25") },
      { text: "Validate data integrity", isDone: true, taskId: 65, deadline: new Date("2025-10-26") },
      { text: "Document test results", isDone: false, taskId: 65, deadline: new Date("2025-10-27") },
      { text: "Sign off QA approval", isDone: true, taskId: 65, deadline: new Date("2025-10-28") },
    ],
  });

  // ----------------- Task comments -----------------

  await prisma.comment.createMany({
    data: [
      // --- Task 1 ---
      { id: 45, content: "Setup the overall project structure by organizing folders for routes, controllers, services, and models. Ensure a clear separation of concerns so that the backend remains maintainable and scalable as the codebase grows. Also, configure environment variables and base configurations for both development and production environments.", taskId: 1, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 46, content: "Implement authentication and user management routes using JWT for session handling. Include user registration, login, and password reset flows. Validate input thoroughly and make sure to hash passwords securely using bcrypt before storing them in the database.", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 47, content: "Configure middleware for request parsing, CORS handling, and centralized error management. The middleware should return consistent error responses in JSON format, making debugging and frontend integration easier. Consider adding request logging to simplify troubleshooting.", taskId: 1, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 48, content: "Create detailed REST API documentation using Swagger or Postman Collections. Include endpoint descriptions, expected input/output examples, authentication requirements, and status code explanations. This documentation should be automatically updated whenever the API changes.", taskId: 1, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 49, content: "Test all API endpoints in Postman to ensure correct behavior under various scenarios. Include success cases, validation errors, and server errors. Verify that endpoints handle invalid tokens and missing parameters gracefully.", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 50, content: "Integrate logging and monitoring tools like Winston and Prometheus to capture runtime metrics and error logs. Make sure critical events are logged with appropriate severity levels, and setup alerts for unexpected behavior or high error rates.", taskId: 1, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 51, content: "Optimize API performance by introducing caching where appropriate, minimizing database queries, and ensuring the most used endpoints are non-blocking. Use profiling tools to identify bottlenecks and document the improvements made.", taskId: 1, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 2 ---
      { id: 52, content: "Sketch the homepage layout focusing on clear visual hierarchy. Define placeholder sections for hero banner, product highlights, testimonials, and footer. The goal is to provide a layout that feels modern and balanced while maintaining usability.", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 53, content: "Define navigation and header components with a focus on accessibility and responsiveness. Include menu items, a logo area, search input, and possibly a user avatar for account management. Test layout at multiple viewport sizes.", taskId: 2, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 54, content: "Create a high-fidelity wireframe for product pages showing how product images, pricing, and descriptions will be displayed. Ensure consistent spacing and typography across sections, and consider user flow from browsing to checkout.", taskId: 2, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 55, content: "Review the current wireframes with the design team to gather feedback on usability and branding consistency. Take notes on layout refinements, typography changes, and color adjustments to improve the visual appeal.", taskId: 2, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 56, content: "Finalize wireframe assets for handoff by cleaning up annotations and naming layers correctly. Prepare the files in Figma with organized pages and components so that developers can easily access them for implementation.", taskId: 2, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 3 ---
      { id: 57, content: "Integrate the Stripe payment API to support credit and debit card payments. Configure test keys and webhook endpoints for payment success and failure events. Validate the request payloads to prevent fraudulent transactions.", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 58, content: "Integrate the PayPal payment API as an additional payment method. Make sure users can toggle between Stripe and PayPal during checkout. Test both sandbox and live modes to confirm compatibility with backend order creation logic.", taskId: 3, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 59, content: "Perform comprehensive testing of payment transactions including success, failure, and cancellation cases. Verify that order records are correctly updated in the database and that email notifications are sent after successful transactions.", taskId: 3, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 60, content: "Ensure that all payment data handling is fully secure. Follow PCI DSS best practices by not storing sensitive card details, and only storing payment tokens provided by Stripe or PayPal. Use HTTPS for all requests.", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 61, content: "Implement detailed error handling for payment processes to catch and log all possible failure scenarios, such as network errors or declined transactions. Display user-friendly messages to help users retry safely.", taskId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 62, content: "Document the entire payment API integration process, including environment setup, API key management, and webhook testing. Make sure this documentation can be used by new developers joining the project.", taskId: 3, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 63, content: "Optimize the payment workflow by minimizing the number of API calls and ensuring smooth transitions between checkout steps. Monitor latency and UX issues to ensure fast and reliable user experience across devices.", taskId: 3, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 4 ---
      { id: 64, content: "Create comprehensive ER diagrams for the database structure, outlining all major entities and their relationships. Focus on keeping the schema scalable and well-documented to support future feature expansion without structural conflicts.", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 65, content: "Define the product and order tables in detail, specifying all relevant fields such as pricing, stock, and order statuses. Make sure to include constraints like foreign keys and default values to maintain data consistency across the application.", taskId: 4, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 66, content: "Set up indexes on frequently queried fields to improve database performance, especially for product lookups and order history. Evaluate query execution plans and confirm that indexes are being used effectively.", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 67, content: "Implement relationships and constraints between tables to enforce referential integrity. Ensure cascading deletes are handled properly and that data updates in related tables are synchronized to prevent inconsistencies.", taskId: 4, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 68, content: "Run initial database migrations and seed the system with test data for products, categories, and orders. Verify that all migrations run cleanly and data can be retrieved without errors.", taskId: 4, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 69, content: "Review the entire schema design with the backend team to ensure it meets API and business logic requirements. Discuss any potential performance bottlenecks or redundancy issues.", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 70, content: "Optimize SQL queries used for reporting and analytics. Consider implementing materialized views or pre-aggregated tables for dashboards where real-time updates are not critical.", taskId: 4, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 5 ---
      { id: 75, content: "Test user registration and login flows under different conditions. Include edge cases such as weak passwords, invalid emails, and duplicate usernames to ensure the system behaves correctly.", taskId: 5, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 76, content: "Perform full functional testing across all pages, checking that each form submission, button, and link behaves as expected. Document inconsistencies and visual bugs for the QA report.", taskId: 5, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 77, content: "Log all identified bugs and track them in the issue management system. Collaborate with developers to ensure each issue is properly fixed, retested, and closed with reproducible evidence.", taskId: 5, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 6 ---
      { id: 78, content: "Sketch a detailed layout for the hero section including title hierarchy, call-to-action placement, and background imagery. Keep accessibility and responsiveness in mind during the design phase.", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 79, content: "Define dedicated sections for features, testimonials, and key selling points. Maintain a consistent grid and typography scale to ensure the layout feels cohesive and easy to navigate.", taskId: 6, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 80, content: "Create low-fidelity wireframes that outline the page flow without focusing on visuals. The goal is to validate structure and content hierarchy before moving on to detailed design work.", taskId: 6, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 81, content: "Review wireframes with the design team and gather input regarding layout spacing, usability improvements, and overall flow. Make revisions based on the collected feedback.", taskId: 6, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 82, content: "Finalize the wireframes for client approval by adding annotations and interaction notes. Ensure the presentation clearly communicates the design intent and expected behavior.", taskId: 6, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 7 ---
      { id: 83, content: "Gather all UI mockup drafts from designers and consolidate them into a single workspace. Check for version mismatches and ensure naming conventions follow team standards.", taskId: 7, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 84, content: "Review mockups for stylistic consistency across all screens. Confirm that color palettes, button shapes, and typography are aligned with the latest design guidelines.", taskId: 7, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 85, content: "Incorporate client feedback into the UI by refining color usage, layout balance, and spacing between components. Validate the updates against accessibility standards.", taskId: 7, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 86, content: "Finalize all high-fidelity mockups, ensuring each is pixel-perfect and export-ready for handoff. Include notes on hover states, transitions, and responsive adaptations.", taskId: 7, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 8 ---
      { id: 87, content: "Set up integration with the CRM API to enable bidirectional communication for customer data. Establish authentication and connection handling for multiple environments.", taskId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 88, content: "Configure user authentication within the CRM integration. Make sure that user roles and permissions sync correctly and access tokens are refreshed automatically when expired.", taskId: 8, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 89, content: "Sync contact and lead data between the CRM and the main application. Validate that data mappings are correct and that updates in one system reflect accurately in the other.", taskId: 8, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 90, content: "Test all CRM workflows including lead creation, data synchronization, and activity tracking. Simulate various user scenarios to ensure end-to-end reliability.", taskId: 8, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 91, content: "Document the CRM integration process, covering API setup, authentication flow, synchronization logic, and known limitations. Share it with both backend and frontend teams.", taskId: 8, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 9 ---
      { id: 92, content: "Plan the overall campaign strategy by defining goals, target audiences, and performance metrics. Include budget allocation and timeline breakdown for each platform.", taskId: 9, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 93, content: "Design creative assets for social media platforms including banners, videos, and infographics. Ensure branding consistency and adjust formats for each target network.", taskId: 9, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 94, content: "Schedule all social media posts using an automation tool and monitor early engagement metrics. Adjust posting frequency and timing based on audience response.", taskId: 9, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 95, content: "Analyze the performance of each campaign by reviewing conversion data, CTRs, and engagement trends. Prepare a summary report with actionable recommendations for the next cycle.", taskId: 9, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 10 ---
      { id: 96, content: "I’ve completed an initial round of cross-browser testing and noticed some inconsistencies between Safari and Firefox when rendering form elements. The layout shifts slightly in responsive views, so I’ll prepare a detailed list of affected components along with screenshots to help the dev team reproduce these issues.", taskId: 10, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 97, content: "Testing on various mobile devices shows that while the design scales correctly, the navigation menu sometimes overlaps the page title on smaller Android screens. I recommend reviewing the breakpoint logic and adjusting the padding in the header component to ensure consistent spacing.", taskId: 10, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 98, content: "I’ve gone through all the reported issues and verified the recent fixes in the latest build. Most of them are resolved, but a few UI bugs persist on iOS Safari. I’ll reopen those specific tickets and attach the console logs so we can prioritize them in the next sprint.", taskId: 10, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 11 ---
      { id: 99, content: "I reviewed all meta titles and descriptions across major pages. Some of them exceed the character limit and might be truncated in search results. I’ll suggest more concise alternatives that still preserve key SEO phrases.", taskId: 11, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 100, content: "Checked H1–H6 hierarchy for best SEO practices. A few pages have multiple H1 tags, which can confuse crawlers. I’ll adjust them to a single H1 and reformat subheadings for logical structure and accessibility.", taskId: 11, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 101, content: "The current page content includes relevant keywords but lacks natural variation. To improve readability and search performance, I propose rewriting key paragraphs using synonyms and including semantic terms.", taskId: 11, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 102, content: "After analyzing internal links, I found that many blog articles don’t link back to cornerstone pages. Adding contextual links could help distribute link equity more effectively across the site.", taskId: 11, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 103, content: "I’m putting together a full SEO audit report summarizing title optimizations, structural issues, and link opportunities. It will also include step-by-step recommendations for improving domain authority.", taskId: 11, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 12 ---
      { id: 104, content: "Outlined a three-month content calendar focusing on seasonal topics and trending keywords. The plan includes blog posts, case studies, and landing page refreshes aligned with our marketing campaigns.", taskId: 12, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 105, content: "Started drafting the first batch of SEO-driven articles. Each one targets a specific search intent and includes structured headings and meta snippets optimized for featured results.", taskId: 12, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 106, content: "I’ve created draft content for several new landing pages focused on user acquisition. These drafts highlight key value propositions and include optimized CTAs for better conversion rates.", taskId: 12, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 107, content: "Conducted a readability and SEO audit on all content drafts. Most pieces meet the target keyword density, but some could benefit from shorter paragraphs and more active voice for better engagement.", taskId: 12, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 108, content: "Finalized all blog and landing page content for publishing. Everything has been proofread, formatted, and scheduled for release according to the editorial plan.", taskId: 12, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 13 ---
      { id: 109, content: "Compiled a detailed keyword list based on our target product categories and customer personas. Each keyword is mapped to a specific page or content type to ensure even distribution.", taskId: 13, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 110, content: "Analyzed competitor websites to identify overlapping and missing keywords. The findings show opportunities in long-tail phrases that we haven’t yet targeted.", taskId: 13, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 111, content: "Discovered several long-tail keywords with high search intent and low competition. Incorporating these into our new content strategy could significantly boost organic visibility.", taskId: 13, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 112, content: "Grouped all keywords by topic and assigned priority levels. This will help streamline future content planning and ensure we cover both short-term and evergreen opportunities.", taskId: 13, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 113, content: "Shared the finalized keyword recommendations with the content and design teams to help them align messaging and metadata for upcoming campaigns.", taskId: 13, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 14 ---
      { id: 114, content: "I’ve started researching websites that would be good candidates for backlink outreach. The focus is on industry blogs, directories, and niche communities with strong domain authority.", taskId: 14, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 115, content: "Reached out to several relevant partners for potential backlink collaborations. I’ll follow up next week and record their responses in our outreach tracker.", taskId: 14, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 116, content: "Tracking outreach responses now. About 40% have replied positively, and I’m scheduling follow-ups for content exchanges and guest post opportunities.", taskId: 14, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 117, content: "Managed to secure a few high-quality backlinks from reputable tech blogs. These should start showing measurable SEO benefits within the next few weeks.", taskId: 14, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 118, content: "Compiled a progress report summarizing all backlink efforts. The document includes outreach stats, acquired links, and domain authority improvements.", taskId: 14, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 15 ---
      { id: 119, content: "Configured Google Analytics and Search Console for all environments. Data tracking is now active, and I’ve set up key dashboards for organic and referral traffic.", taskId: 15, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 120, content: "Monitored traffic performance over the last two weeks. Organic visits have increased slightly, while average session duration remains stable. I’ll continue tracking ranking shifts.", taskId: 15, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 121, content: "Analyzed monthly SEO metrics and compiled a report summarizing keyword trends, backlink growth, and CTR changes. I’ll present this during our next team review.", taskId: 15, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 122, content: "Based on the analytics data, I recommend optimizing a few underperforming landing pages and updating meta descriptions to improve CTR and engagement.", taskId: 15, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 16 ---
      { id: 123, content: "Gathered monthly sales data from all regions and normalized it into a unified spreadsheet. The data includes both online and offline performance metrics.", taskId: 16, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 124, content: "Analyzed sales trends for Q3. There’s a noticeable increase in the southern region, likely due to recent promotional campaigns. I’ll confirm with the marketing team.", taskId: 16, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 125, content: "Created several charts visualizing revenue, units sold, and regional distribution. These visuals will be part of the main analytics dashboard update.", taskId: 16, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 126, content: "After analyzing the data, I identified the top-performing products for the quarter. I’ll prepare a short summary outlining potential upsell opportunities.", taskId: 16, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 17 ---
      { id: 127, content: "Created initial sketches for the dashboard layout, focusing on a clean, data-centric interface with clear visual hierarchy. These will serve as a foundation for the next wireframe iteration.", taskId: 17, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 128, content: "Mapped out the user flow and defined key UI components. The structure supports both quick insights and detailed drill-downs for advanced users.", taskId: 17, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 129, content: "Incorporated feedback from the design review session and updated wireframes accordingly. Navigation now feels smoother, and the layout better adapts to different screen widths.", taskId: 17, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 18 ---
      { id: 130, content: "Designed the high-fidelity dashboard mockups with detailed attention to typography, spacing, and visual hierarchy. Included multiple states for widgets to demonstrate hover and loading behaviors, and added annotations for developers.", taskId: 18, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 131, content: "Created responsive layouts for both desktop and mobile versions using flexible grid systems. Ensured that key visual elements remain consistent across breakpoints, maintaining usability and aesthetic balance.", taskId: 18, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 132, content: "Reviewed all dashboard mockups with the product and design teams during our weekly sync. Gathered valuable feedback regarding the placement of data visualizations and the clarity of color-coded metrics.", taskId: 18, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 19 ---
      { id: 133, content: "Collected all relevant marketing KPIs to be visualized in the new dashboard, including conversion rates, click-through metrics, and user engagement over time. Compiled them into a shared document for reference.", taskId: 19, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 134, content: "Generated multiple visualization prototypes to represent campaign performance trends. Tested different chart types and color palettes to find the most accessible and readable combination.", taskId: 19, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 135, content: "Integrated insights from the data analysis directly into the dashboard’s layout. Focused on aligning business goals with the data display to ensure the dashboard tells a clear story.", taskId: 19, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 20 ---
      { id: 136, content: "Set up secure and persistent database connections for the dashboard, making sure connection pooling and timeout configurations are properly handled. Documented the setup for future scalability.", taskId: 20, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 137, content: "Integrated APIs for live data feeds from multiple services. Implemented error handling for rate limits and temporarily unavailable endpoints to ensure a smooth user experience.", taskId: 20, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 138, content: "Ran comprehensive tests to verify data accuracy, latency, and refresh rates. Noted several discrepancies between live and cached data, which will require further optimization.", taskId: 20, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 139, content: "Documented the entire integration process in detail, covering environment setup, API authentication, and deployment notes. Shared the guide in the internal developer portal.", taskId: 20, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 21 ---
      { id: 140, content: "Created and tested API endpoints required for CRM integration. Added rate limiting, validation middleware, and descriptive response codes to maintain reliability.", taskId: 21, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 141, content: "Connected backend services to the CRM API using OAuth 2.0 authentication. Verified data exchange consistency by comparing logs from both systems.", taskId: 21, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 142, content: "Tested API calls under multiple failure scenarios including timeouts, malformed requests, and expired tokens. Added retry logic with exponential backoff where needed.", taskId: 21, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 22 ---
      { id: 143, content: "Designed the initial CRM dashboard layout with a focus on usability and data visibility. Added visual cues and tooltips to improve user comprehension.", taskId: 22, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 144, content: "Implemented frontend components in React using modular and reusable patterns. Employed a consistent design system to ensure a unified look and feel.", taskId: 22, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 145, content: "Tested the dashboard on multiple devices and screen sizes. Made several adjustments to typography and spacing to enhance readability on smaller screens.", taskId: 22, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 23 ---
      { id: 146, content: "Created comprehensive test cases covering all CRM workflows. Ensured that each test case is clearly documented with steps, expected results, and environment details.", taskId: 23, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 147, content: "Executed QA tests focusing on integration points between CRM and external systems. Detected several inconsistencies in the synchronization process, logged them for review.", taskId: 23, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 148, content: "Tracked all bugs using the internal issue tracker. Categorized them by severity and assigned responsible developers to ensure timely resolution.", taskId: 23, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 24 ---
      { id: 149, content: "Exported customer data from the legacy CRM system and checked for completeness. Found a few missing records, which were escalated to the data management team.", taskId: 24, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 150, content: "Transformed the exported data to match the new CRM schema. Wrote custom scripts to handle format inconsistencies and duplicate records.", taskId: 24, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 151, content: "Imported the cleaned dataset into the new CRM environment and ran validation scripts. Verified record integrity and checked foreign key consistency.", taskId: 24, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 25 ---
      { id: 152, content: "Finalized QA tests across all CRM modules. Confirmed that all workflows behave as expected and no regressions were introduced after the last patch.", taskId: 25, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 153, content: "Fixed several integration bugs related to authentication and data caching. Re-tested each fix in staging to ensure no side effects occurred.", taskId: 25, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 154, content: "Conducted a final round of functional verification to ensure all workflows and endpoints are operational. Prepared a release checklist for deployment approval.", taskId: 25, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 26 ---
      { id: 155, content: "Created the first batch of wireframe sketches outlining the basic page structure. Focused on key navigation elements and content hierarchy to guide user flow.", taskId: 26, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 156, content: "Reviewed the wireframe layout with the entire design team. Noted improvements for spacing, button placement, and overall accessibility.", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 157, content: "Adjusted several wireframes based on team feedback. Simplified navigation and refined the hierarchy to reduce cognitive load on users.", taskId: 26, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 158, content: "Validated the usability of wireframes by conducting quick internal user tests. Feedback indicated that task completion rates improved significantly.", taskId: 26, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 159, content: "Finalized all wireframes and prepared them for design handoff. Ensured all screens were annotated and linked in the design tool for smooth collaboration.", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 160, content: "Prepared final assets and documentation for the upcoming UI design phase. Highlighted key user journeys and components that require attention.", taskId: 26, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 161, content: "Documented every decision made during the wireframing process, including design rationale and rejected alternatives. This should help future iterations stay consistent.", taskId: 26, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 27 ---
      { id: 162, content: "Designed the landing page header and hero section, emphasizing clarity and brand alignment. Added interactive scroll animations for a more engaging user experience.", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 163, content: "Created modular UI components for the landing page such as buttons, cards, and forms. All components were built with accessibility and reusability in mind.", taskId: 27, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 164, content: "Conducted a review session with key stakeholders to ensure the UI direction aligns with marketing goals. Gathered feedback for the next design iteration.", taskId: 27, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 165, content: "Refined visual design details such as typography scales, color contrast, and component spacing. Ensured WCAG 2.1 compliance across the entire layout.", taskId: 27, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 166, content: "Finalized all UI screens and handed them over to development. Included exportable assets and responsive specifications for accurate implementation.", taskId: 27, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 28 ---
      { id: 167, content: "Write a compelling headline and main copy that captures the essence of the product, resonates with the target audience, and clearly communicates the value proposition in a concise, persuasive manner.", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 168, content: "Draft detailed and persuasive product descriptions for all offerings, highlighting key features, benefits, and differentiators to engage users and encourage conversions.", taskId: 28, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 169, content: "Proofread and edit all marketing content for clarity, grammar, tone, and style, ensuring it aligns with brand voice and maintains a high level of readability and professionalism.", taskId: 28, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 170, content: "Review the drafted copy with the design team to ensure textual elements fit seamlessly with visual layouts and overall user experience, providing feedback and revisions as needed.", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 171, content: "Finalize all copy for integration into the product or landing page, making sure all content is polished, consistent, and ready for publishing without errors or inconsistencies.", taskId: 28, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 172, content: "Optimize content for SEO by incorporating targeted keywords naturally, enhancing readability, and following best practices to improve search engine ranking and organic traffic.", taskId: 28, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 173, content: "Prepare and format copy specifically for the landing page, ensuring all sections, headings, and CTAs are clear, persuasive, and effectively guide users through the conversion funnel.", taskId: 28, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 29 ---
      { id: 174, content: "Add relevant images, videos, and other media to the landing page, ensuring visual elements enhance the content, maintain brand consistency, and load efficiently without affecting performance.", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 175, content: "Insert marketing copy into the appropriate sections of the landing page, making sure it aligns with design elements, flows naturally, and communicates messages effectively.", taskId: 29, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 176, content: "Check the responsiveness of all content, ensuring text, images, and layout adapt seamlessly across different screen sizes and devices to provide a consistent user experience.", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 177, content: "Adjust the layout for media elements, making sure images, videos, and interactive elements fit well within the design and contribute positively to the page flow and aesthetics.", taskId: 29, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 178, content: "Verify all links and call-to-action buttons on the landing page function correctly, direct users to the intended destinations, and support a smooth conversion process.", taskId: 29, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 179, content: "Optimize all images for faster loading times without compromising quality, ensuring the page performance meets standards for SEO and user experience.", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 180, content: "Confirm that all content is fully integrated and ready for quality assurance, including checking for consistency, formatting, accuracy, and adherence to project requirements.", taskId: 29, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 30 ---
      { id: 181, content: "Test the landing page thoroughly on Chrome and Firefox browsers to ensure compatibility, correct rendering, and functionality across different platforms.", taskId: 30, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 182, content: "Check the responsiveness of the landing page on mobile devices, tablets, and different screen resolutions to guarantee a consistent user experience for all visitors.", taskId: 30, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 183, content: "Report all bugs, errors, and usability issues discovered during testing, providing detailed descriptions, screenshots, and steps to reproduce for efficient fixing by the development team.", taskId: 30, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 31 ---
      { id: 184, content: "Draft the initial wireframe for social media layout, outlining the structure, flow, and positioning of key elements to guide content creation and posting strategy.", taskId: 31, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 185, content: "Review the wireframe schedule with the team to ensure timelines, post frequency, and content priorities are aligned with project goals and marketing strategies.", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 186, content: "Adjust the layout for optimal posting flow, making sure posts are visually balanced, content is easy to consume, and engagement opportunities are maximized.", taskId: 31, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 187, content: "Validate the usability of the wireframe by checking navigation, readability, and ease of content updates to ensure it supports an efficient workflow for the team.", taskId: 31, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 188, content: "Finalize the wireframe for team handoff, ensuring all design decisions are clearly documented, all layouts are consistent, and assets are ready for the next design stage.", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 189, content: "Document all wireframe decisions, including rationale for layout choices, visual hierarchy, and content placement to maintain clarity for current and future team members.", taskId: 31, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 190, content: "Prepare all wireframe assets for the design team, ensuring all files are organized, labeled, and compatible with the tools and workflow they will use.", taskId: 31, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 32 ---
      { id: 191, content: "Design visual templates for different post types, considering branding guidelines, color schemes, typography, and user engagement patterns to ensure consistency across all content.", taskId: 32, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 192, content: "Create reusable UI components for posts, including headers, footers, and interactive elements, to streamline content creation and maintain visual consistency across platforms.", taskId: 32, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 193, content: "Review post designs with the content team to gather feedback on clarity, engagement potential, and visual appeal, making necessary adjustments based on collaborative input.", taskId: 32, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 194, content: "Adjust colors, fonts, and other style elements for posts, ensuring alignment with brand identity and enhancing readability, accessibility, and user engagement.", taskId: 32, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 195, content: "Finalize templates for scheduled posts, ensuring all design and content elements are polished, properly formatted, and ready for automated posting or team use.", taskId: 32, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 33 ---
      { id: 196, content: "Plan the content calendar for the upcoming month, including post topics, publishing dates, and distribution channels, to ensure a consistent and strategic content flow.", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 197, content: "Brainstorm post ideas to maximize audience engagement, considering trends, seasonal content, and creative approaches that align with marketing goals.", taskId: 33, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 198, content: "Assign topics, deadlines, and responsibilities to team members, ensuring clarity of expectations and smooth coordination across content creation and publishing workflows.", taskId: 33, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 199, content: "Review the calendar with the marketing team to verify alignment with campaigns, promotions, and overall strategy, and make adjustments as needed to optimize impact.", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 200, content: "Finalize the editorial calendar, confirming all post details, timelines, and assets are prepared for execution without conflicts or delays.", taskId: 33, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 201, content: "Optimize the calendar for posting frequency and audience engagement, adjusting timings, mix of content types, and distribution strategies for maximum reach.", taskId: 33, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 202, content: "Prepare all assets related to the content calendar, including graphics, captions, and scheduling notes, to facilitate efficient execution by the team.", taskId: 33, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 34 ---
      { id: 203, content: "Analyze engagement metrics from past posts to identify trends, patterns, and areas for improvement, providing a foundation for future content strategy decisions.", taskId: 34, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 204, content: "Prepare a detailed performance report, including metrics, charts, and insights, to communicate the effectiveness of past campaigns and posts to stakeholders.", taskId: 34, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 205, content: "Identify high-performing content based on metrics such as engagement rate, reach, and conversions, highlighting successful strategies to replicate in future campaigns.", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 206, content: "Recommend improvements for future posts based on analytics, including content adjustments, timing, formatting, and audience targeting to optimize engagement and results.", taskId: 34, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 207, content: "Share analytics insights with the marketing team, ensuring all members understand key takeaways, trends, and actionable recommendations for content planning.", taskId: 34, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 208, content: "Track engagement trends over time to monitor growth, audience behavior changes, and the long-term impact of content strategies, enabling data-driven decision-making.", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 209, content: "Finalize a comprehensive analytics summary that consolidates findings, recommendations, and actionable insights for strategic planning and stakeholder review.", taskId: 34, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 35 ---
      { id: 210, content: "Research SEO keywords for upcoming posts, analyzing search volume, competition, and relevance to maximize organic reach and improve search engine visibility.", taskId: 35, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 211, content: "Optimize hashtags and metadata to increase post reach, visibility, and discoverability across social media platforms, ensuring alignment with target audience behavior.", taskId: 35, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 212, content: "Integrate SEO and social optimization tips directly into content, including keyword placement, meta descriptions, and formatting adjustments for maximum effectiveness.", taskId: 35, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 36 ---
      { id: 213, content: "Review all dataset entries for missing values, inconsistencies, and anomalies, ensuring data integrity and accuracy before further analysis or reporting.", taskId: 36, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 214, content: "Identify inconsistencies and discrepancies across datasets, comparing sources and entries to flag potential errors or data quality issues that require attention.", taskId: 36, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 215, content: "Document all data issues found, including missing values, duplicates, and anomalies, providing clear notes and recommendations for corrections and data cleaning procedures.", taskId: 36, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 216, content: "Flag datasets that require correction or further investigation, prioritizing critical data errors and communicating necessary actions to responsible team members.", taskId: 36, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 217, content: "Prepare a summary report of the dataset review, including identified issues, corrective actions, and recommendations for maintaining data quality moving forward.", taskId: 36, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 37 ---
      { id: 218, content: "Write scripts to check dataset integrity, including verifying that all expected tables and fields exist, and that there are no missing values or unexpected data types throughout the datasets.", taskId: 37, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 219, content: "Validate completeness of all datasets by ensuring every record conforms to the defined schema and that all mandatory data points are filled correctly, highlighting any gaps for further review.", taskId: 37, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 220, content: "Document validation results in a structured report, capturing both the areas that passed checks and those that require attention, so that stakeholders have a clear overview of dataset integrity.", taskId: 37, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 221, content: "Debug and fix validation script errors, including handling exceptions, edge cases, and unexpected data formats, to ensure scripts can reliably run across all datasets without interruption.", taskId: 37, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 222, content: "Ensure scripts cover all data formats, including CSV, JSON, and database extracts, so that the validation process is comprehensive and consistent across different input types.", taskId: 37, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 38 ---
      { id: 223, content: "Clean and standardize dataset formats, including converting all text to consistent casing, formatting dates uniformly, and removing extraneous whitespace or special characters.", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 224, content: "Normalize data types and structures to ensure consistency across datasets, such as converting numerical strings to integers or floats and standardizing categorical labels.", taskId: 38, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 225, content: "Remove duplicate or redundant entries, keeping only unique and relevant data, while documenting the criteria used for removal to maintain traceability.", taskId: 38, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 226, content: "Document transformations applied, including any modifications to fields, normalization rules, or cleaning strategies, to ensure reproducibility and clarity for team members.", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 227, content: "Prepare cleaned dataset for analysis by validating it against requirements, confirming no data loss occurred during cleaning, and structuring it for easy integration into analytics pipelines.", taskId: 38, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 228, content: "Verify transformation rules applied correctly, checking sample records and cross-referencing with original datasets to ensure data accuracy and integrity.", taskId: 38, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 229, content: "Handoff standardized datasets to team with clear documentation and any necessary usage instructions, so downstream processes can leverage them effectively.", taskId: 38, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 39 ---
      { id: 230, content: "Test cleaned datasets for accuracy using both automated and manual checks, ensuring that the data aligns with expected patterns and that no errors remain after the cleaning process.", taskId: 39, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 231, content: "Run automated QA checks on datasets, including validation scripts and data quality metrics, to detect inconsistencies, missing values, or anomalies efficiently.", taskId: 39, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 232, content: "Identify errors and anomalies, categorize them by severity, and suggest corrective actions to improve dataset quality and reliability for analysis purposes.", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 233, content: "Document QA findings in a comprehensive report, including identified issues, corrective actions taken, and remaining considerations, to maintain transparency for stakeholders.", taskId: 39, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 234, content: "Confirm datasets meet quality standards by cross-checking against predefined thresholds and validation criteria to ensure readiness for analysis or production use.", taskId: 39, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 235, content: "Communicate QA results to team, including summaries, key findings, and recommendations, to align everyone on dataset status and next steps.", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 236, content: "Finalize QA report for documentation and archival, ensuring it captures all relevant details, evidence, and verification steps for future reference.", taskId: 39, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 40 ---
      { id: 237, content: "Generate summary reports from cleaned data, including key metrics, trends, and observations, to provide stakeholders with actionable insights derived from the datasets.", taskId: 40, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 238, content: "Visualize improvements in data quality using charts and graphs, highlighting before-and-after metrics to clearly show the impact of cleaning and standardization efforts.", taskId: 40, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 239, content: "Prepare reports for stakeholders with narrative explanations, visualizations, and key takeaways, ensuring that non-technical audiences can easily understand the data outcomes.", taskId: 40, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 41 ---
      { id: 240, content: "Draft wireframes for main app screens, considering user flows, layout hierarchy, and feature placement, to provide a clear blueprint for design and development teams.", taskId: 41, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 241, content: "Review wireframes with UX team to gather feedback on usability, accessibility, and navigation, ensuring the proposed layouts meet user experience standards.", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 242, content: "Adjust layout and flow according to feedback, refining spacing, alignment, and interaction patterns to create a cohesive and intuitive user interface.", taskId: 41, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 243, content: "Finalize wireframes for handoff to design team, ensuring all screens are documented, interactions are clearly noted, and assets are ready for high-fidelity mockups.", taskId: 41, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 244, content: "Document wireframe decisions including rationale for layout choices, user flow logic, and interaction patterns, to provide context for future design iterations.", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 245, content: "Prepare wireframe assets for dev team, including annotations, dimensions, and references, to facilitate smooth implementation during development.", taskId: 41, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 246, content: "Validate wireframes against requirements to ensure that all functional specifications, user needs, and business objectives are addressed before proceeding to design.", taskId: 41, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 42 ---
      { id: 247, content: "Design high-fidelity UI screens for the app, applying branding guidelines, visual hierarchy, and component consistency, to provide polished interfaces ready for development.", taskId: 42, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 248, content: "Create UI components and style guide, including typography, colors, spacing, and interactive elements, to ensure consistent design implementation across the application.", taskId: 42, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 249, content: "Review design with product team to ensure alignment with requirements, gather feedback on visual consistency, and confirm that designs meet business and user objectives.", taskId: 42, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 250, content: "Adjust designs based on feedback, refining component layouts, interactions, and visual details to achieve a balance between usability and aesthetic quality.", taskId: 42, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 251, content: "Finalize UI assets for development, ensuring all screens, components, and guidelines are complete, export-ready, and accompanied by necessary documentation for developers.", taskId: 42, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 43 ---
      { id: 252, content: "Integrate API endpoints with the mobile app, ensuring all required routes are connected and data is properly fetched. Pay attention to error handling and authentication flows.", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 253, content: "Test all API calls and responses thoroughly, including edge cases and unexpected inputs, to ensure the app behaves correctly and data is returned as expected.", taskId: 43, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 254, content: "Debug and fix integration issues that arise during API testing. Focus on both frontend handling and backend responses to maintain data integrity.", taskId: 43, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 255, content: "Document API usage for the team, including endpoint details, request/response examples, and common pitfalls to help new developers integrate easily.", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 256, content: "Verify backend service stability under load and edge conditions. Include monitoring logs and handle timeouts gracefully to prevent app crashes.", taskId: 43, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 257, content: "Confirm API coverage for all features by cross-checking with the requirements document and ensuring every user story has the necessary endpoints.", taskId: 43, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 258, content: "Prepare a detailed API integration report summarizing the implementation, tests performed, issues found, and recommendations for future improvements.", taskId: 43, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 44 ---
      { id: 259, content: "Implement data synchronization logic to ensure user data is consistent across all devices. Handle conflicts and merge strategies carefully.", taskId: 44, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 260, content: "Track analytics events and metrics comprehensively, including user interactions, page views, and conversions to improve product insights.", taskId: 44, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 261, content: "Ensure data consistency across devices by implementing proper synchronization mechanisms, validation, and periodic reconciliation checks.", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 262, content: "Test analytics tracking accuracy by comparing tracked events against expected user actions and verifying data integrity in the analytics dashboard.", taskId: 44, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 263, content: "Optimize synchronization performance by reducing payload size, using incremental updates, and minimizing network requests for a smooth user experience.", taskId: 44, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 264, content: "Document the sync and analytics implementation in detail, including architecture decisions, event schemas, and troubleshooting guidelines for future reference.", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 265, content: "Finalize tracking for release by verifying all critical metrics are captured correctly and analytics dashboards are ready for monitoring post-launch.", taskId: 44, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 45 ---
      { id: 266, content: "Test the app on multiple devices with varying screen sizes and OS versions to ensure consistent behavior and appearance across platforms.", taskId: 45, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 267, content: "Report and fix critical bugs that impact functionality or user experience, prioritizing issues based on severity and reproducibility.", taskId: 45, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 268, content: "Perform comprehensive UI and UX testing to identify usability issues, inconsistencies, or confusing elements, and propose improvements.", taskId: 45, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 46 ---
      { id: 269, content: "Review the website thoroughly for SEO issues, including meta tags, headings, page titles, alt texts, and overall content relevance.", taskId: 46, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 270, content: "Analyze all meta tags and headings to ensure they follow SEO best practices and accurately reflect the page content for search engine indexing.", taskId: 46, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 271, content: "Check the internal linking structure to ensure logical navigation paths, proper anchor text, and crawlable links for SEO benefits.", taskId: 46, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 272, content: "Evaluate page speed and overall performance, identifying bottlenecks in images, scripts, and server responses that may affect SEO rankings.", taskId: 46, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 273, content: "Document all SEO audit findings comprehensively, including recommended fixes, priority levels, and potential impact on search rankings.", taskId: 46, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 47 ---
      { id: 274, content: "Update page content with relevant SEO keywords naturally, ensuring readability and proper keyword density without keyword stuffing.", taskId: 47, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 275, content: "Optimize headings and meta descriptions for SEO, making sure they are clear, concise, and contain target keywords for improved search ranking.", taskId: 47, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 276, content: "Ensure proper content formatting, including paragraph structure, lists, and emphasis, so that the content is easy to read and accessible.", taskId: 47, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 277, content: "Check content readability and structure for clarity, logical flow, and user engagement, making adjustments as needed to improve user experience.", taskId: 47, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 278, content: "Review the updated content to measure potential SEO impact, checking keyword integration, readability scores, and alignment with best practices.", taskId: 47, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 48 ---
      { id: 279, content: "Research top-performing keywords across our niche, examining both search volume and user intent, and identify terms that can drive the most relevant traffic to our website.", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 280, content: "Analyze competitors’ keyword strategies, including which keywords they rank for, the content they produce around them, and how we can differentiate or improve upon their approach.", taskId: 48, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 281, content: "Select high-value keywords for pages based on a balance of search volume, competitiveness, and relevance to our content and target audience.", taskId: 48, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 282, content: "Create a keyword mapping for the website, assigning specific keywords to relevant pages to ensure optimal coverage and minimize internal competition.", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 283, content: "Validate keyword choices with the SEO team, reviewing alignment with overall strategy and confirming the selection reflects our content priorities and audience needs.", taskId: 48, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 284, content: "Prepare a detailed keyword report, including target keywords, search volumes, ranking difficulty, and recommendations for content optimization.", taskId: 48, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 285, content: "Update the content strategy based on keyword research findings, ensuring new content aligns with high-priority terms and improves our organic visibility.", taskId: 48, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 49 ---
      { id: 286, content: "Generate current SEO performance reports covering traffic, conversions, keyword rankings, and other key metrics to evaluate overall effectiveness.", taskId: 49, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 287, content: "Analyze trends and keyword rankings over time, identifying positive or negative shifts and potential factors contributing to these changes.", taskId: 49, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 288, content: "Highlight areas for improvement, focusing on pages with underperforming keywords or low engagement, and propose actionable recommendations.", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 289, content: "Compare performance with previous periods to detect seasonal trends, content gaps, or technical SEO issues affecting our rankings and traffic.", taskId: 49, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 290, content: "Document findings for the team in a clear, structured format to ensure all insights are actionable and easily understood by stakeholders.", taskId: 49, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 291, content: "Prepare a visual SEO report for stakeholders, including charts, graphs, and key metrics that communicate performance clearly and concisely.", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 292, content: "Finalize the report for presentation, reviewing all data for accuracy, ensuring visuals are clear, and making recommendations easy to act upon.", taskId: 49, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 50 ---
      { id: 293, content: "Analyze website analytics for SEO impact, assessing which updates have led to traffic changes, and identifying patterns in user behavior.", taskId: 50, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 294, content: "Compare traffic before and after updates to evaluate the effectiveness of recent SEO actions, noting improvements, declines, and any unexpected anomalies.", taskId: 50, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 295, content: "Identify trends and anomalies in site performance that may indicate content gaps, technical issues, or opportunities for optimization.", taskId: 50, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 51 ---
      { id: 296, content: "Define campaign objectives and KPIs, establishing clear goals such as traffic growth, conversion targets, or engagement metrics to measure success.", taskId: 51, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 297, content: "Outline the marketing strategy and channels, specifying where and how we will promote content to reach our target audience effectively.", taskId: 51, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 298, content: "Set a timeline and milestones for the campaign to track progress, assign responsibilities, and ensure deliverables are completed on schedule.", taskId: 51, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 299, content: "Discuss budget allocation and resources to ensure the campaign has sufficient funding for advertising, creative production, and analytics tools.", taskId: 51, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 300, content: "Review the draft strategy with the team to gather feedback, refine tactics, and confirm alignment with overall business objectives.", taskId: 51, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 52 ---
      { id: 301, content: "Analyze audience demographics and behavior to understand who engages with our content and how we can better meet their needs.", taskId: 52, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 302, content: "Identify target segments and personas, creating detailed profiles that capture motivations, pain points, and typical behavior patterns.", taskId: 52, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 303, content: "Study market trends and competitors to detect opportunities, threats, and emerging patterns that can inform campaign strategy.", taskId: 52, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 304, content: "Compile the audience research into a comprehensive report, including insights, charts, and actionable recommendations for marketing decisions.", taskId: 52, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 305, content: "Present research findings to stakeholders, highlighting key takeaways and suggested actions to optimize marketing campaigns and engagement.", taskId: 52, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 53 ---
      { id: 306, content: "Design campaign banners and visuals that align with brand guidelines, ensuring they are visually appealing and convey the campaign message effectively.", taskId: 53, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 307, content: "Create graphics for social media ads optimized for each platform, considering size, format, and audience engagement patterns.", taskId: 53, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 308, content: "Prepare images in required formats and resolutions to ensure compatibility with advertising platforms and maintain high visual quality.", taskId: 53, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 309, content: "Review visual assets with the marketing team to gather feedback, confirm messaging alignment, and ensure consistency across channels.", taskId: 53, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 310, content: "Finalize all assets for campaign launch, ensuring they are approved, formatted correctly, and ready for deployment across platforms.", taskId: 53, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 54 ---
      { id: 311, content: "Schedule posts and ads across all campaign platforms, taking into account optimal times for audience engagement and platform-specific recommendations.", taskId: 54, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 312, content: "Coordinate posting times with the overall campaign plan, ensuring that content is delivered in a consistent and strategic manner.", taskId: 54, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 313, content: "Ensure all content aligns with marketing goals, brand guidelines, and messaging strategy to maintain a coherent and professional campaign presence.", taskId: 54, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 314, content: "Monitor scheduling and make adjustments in real-time to account for performance metrics, unexpected events, or audience engagement patterns.", taskId: 54, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 315, content: "Confirm the final schedule with the team before launch, ensuring all stakeholders are aware of posting times and any dependencies are accounted for.", taskId: 54, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 55 ---
      { id: 316, content: "Track campaign performance metrics over the last quarter, analyze trends in user engagement, and identify which channels are driving the most conversions to improve future strategies.", taskId: 55, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 317, content: "Analyze engagement across all active marketing channels, including social media, email campaigns, and paid advertising, and provide insights on areas where optimization is needed.", taskId: 55, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 318, content: "Prepare a comprehensive report summarizing campaign performance, highlight key successes and challenges, and present actionable insights to the marketing team for review.", taskId: 55, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 319, content: "Recommend improvements for future campaigns based on past performance, audience behavior, and industry best practices to maximize ROI and engagement.", taskId: 55, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 320, content: "Document analytics findings in the official campaign report, ensuring all metrics, visualizations, and key takeaways are clear and actionable for the team.", taskId: 55, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },

      // --- Task 56 ---
      { id: 321, content: "Refactor dashboard code to improve load times and maintainability, while ensuring all current functionalities remain fully operational and optimized for scalability.", taskId: 56, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 322, content: "Optimize components and reduce overall bundle size by analyzing dependencies, removing redundant code, and implementing efficient rendering techniques.", taskId: 56, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 323, content: "Check responsiveness and performance metrics across different devices and browsers, ensuring the dashboard maintains a smooth user experience under varying conditions.", taskId: 56, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },

      // --- Task 57 ---
      { id: 324, content: "Define new dashboard features collaboratively with the team, gather requirements, brainstorm ideas, and ensure all suggestions align with business objectives and user needs.", taskId: 57, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 325, content: "Prioritize proposed features based on user impact, implementation effort, and alignment with project goals to ensure the most valuable improvements are delivered first.", taskId: 57, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 326, content: "Document detailed specifications for each feature, including expected behavior, edge cases, UI/UX design references, and acceptance criteria for future development.", taskId: 57, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 327, content: "Review the proposed features with stakeholders to gather feedback, ensure alignment with business objectives, and address any potential concerns before implementation.", taskId: 57, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },

      // --- Task 58 ---
      { id: 328, content: "Integrate new backend endpoints to provide accurate metrics, ensure proper authentication and authorization, and handle edge cases gracefully to maintain system stability.", taskId: 58, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 329, content: "Ensure that all API responses are consistent with frontend requirements, including correct data structures, proper formatting, and meaningful error messages.", taskId: 58, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 330, content: "Test data consistency, validate correctness, and implement robust error handling to prevent potential failures in production and improve overall reliability.", taskId: 58, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 331, content: "Update backend documentation to reflect recent changes, including new endpoints, expected responses, authentication details, and example usage scenarios for developers.", taskId: 58, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 59 ---
      { id: 332, content: "Run comprehensive QA tests for all dashboard features, including functional, integration, and regression tests to ensure consistent behavior across all modules.", taskId: 59, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 333, content: "Report all bugs and issues discovered during QA testing to the development team with detailed steps to reproduce, screenshots, and suggested priority levels.", taskId: 59, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 334, content: "Verify bug fixes and confirm performance improvements, ensuring all resolved issues no longer affect the dashboard's usability or stability.", taskId: 59, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 335, content: "Ensure that all dashboard features comply with defined requirements, meet quality standards, and deliver the intended value to end users.", taskId: 59, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },

      // --- Task 60 ---
      { id: 336, content: "Update charts and graphs to provide better insights, enhance visual clarity, and ensure that the data representation is intuitive and actionable for stakeholders.", taskId: 60, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
      { id: 337, content: "Verify that all data visualizations are accurate, clearly labeled, and convey the intended information without ambiguity or confusion.", taskId: 60, senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI" },
      { id: 338, content: "Optimize visual components for performance, reducing render times and ensuring smooth interactivity even with large datasets.", taskId: 60, senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp" },
      { id: 339, content: "Gather feedback from the team on the updated visualizations, discuss potential improvements, and iterate on designs to meet user expectations.", taskId: 60, senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3" },
      { id: 340, content: "Finalize all visual updates, ensure consistency across all charts and graphs, and prepare them for production deployment with proper documentation.", taskId: 60, senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9" },
    ],
  });

  // ----------------- Project comments replies -----------------

  await prisma.comment.createMany({
    data: [
      // --- Project 1, Project comment 1 ---
      { id: 341, content: "Looks great! I’ve checked the initial commit.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 342, content: "Thanks! I’ll handle environment setup next.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 343, content: "Can you push the database schema updates?", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 344, content: "Schema pushed, please verify migration logs.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 345, content: "Checked, everything looks clean so far.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 346, content: "Next, I’ll integrate the authentication module.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 347, content: "Make sure to use JWT and refresh tokens.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 348, content: "Got it. I’ll also add role-based access control.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 349, content: "Perfect, I’ll prepare API documentation.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 350, content: "API endpoints draft uploaded to Notion.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 351, content: "Thanks, reviewing now.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 352, content: "Let’s finalize naming conventions today.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 353, content: "Agreed, I’ll add them to the project README.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 354, content: "I’ve pushed UI boilerplate to `frontend/`.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 355, content: "I’ll review UI layout structure tonight.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 356, content: "We should define color tokens early on.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 357, content: "Yes, I’ll sync design variables with Figma.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 358, content: "Added product schema and seed script.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 359, content: "Awesome. Will you also add sample images?", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 360, content: "Yes, small mock assets are coming.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 361, content: "I’ve tested the signup flow – smooth!", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 362, content: "Working on logout/session expiry next.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 363, content: "Heads-up: API base URL moved to env.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },
      { id: 364, content: "Nice, that should simplify deployment.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 365, content: "Don’t forget to update CI configs.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 366, content: "Already done! Builds run automatically.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 367, content: "Let’s schedule a review for Friday.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 1, parentId: 1 },
      { id: 368, content: "Good idea. I’ll compile release notes.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 1, parentId: 1 },
      { id: 369, content: "Release draft posted to Slack.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 1, parentId: 1 },
      { id: 370, content: "Everything’s coming together nicely!", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 1, parentId: 1 },

      // --- Project 2, Project comment 8 ---
      { id: 371, content: "Looks great on mobile! Smooth layout.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 2, parentId: 8 },
      { id: 372, content: "I noticed the header logo overlaps on iPhone SE.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 2, parentId: 8 },
      { id: 373, content: "Good catch, I’ll fix that with a media query.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 374, content: "Let’s also update the footer links for consistency.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 2, parentId: 8 },
      { id: 375, content: "Footer redesign is in progress, will commit soon.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 376, content: "We might want to test dark mode too.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 2, parentId: 8 },
      { id: 377, content: "Agreed. I’ll prepare a color palette for that.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 2, parentId: 8 },
      { id: 378, content: "Navbar animation feels a bit too fast.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 2, parentId: 8 },
      { id: 379, content: "Slowed down the transition duration to 0.3s.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 380, content: "Perfect, animation feels more natural now.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 2, parentId: 8 },
      { id: 381, content: "Added hover effect for post cards.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 2, parentId: 8 },
      { id: 382, content: "Hover looks nice! Maybe add subtle shadow.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 2, parentId: 8 },
      { id: 383, content: "Done, added shadow and smooth scale on hover.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 384, content: "Could we test how it behaves on tablets?", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 2, parentId: 8 },
      { id: 385, content: "Sure, layout scales correctly up to 1024px now.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 386, content: "Typography feels much cleaner after last commit.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 2, parentId: 8 },
      { id: 387, content: "Added spacing between sections for better readability.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", projectId: 2, parentId: 8 },
      { id: 388, content: "Nice improvement. Also updated favicon.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", projectId: 2, parentId: 8 },
      { id: 389, content: "Pushed latest assets to the design folder.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", projectId: 2, parentId: 8 },
      { id: 390, content: "Everything’s polished! Ready for review tomorrow.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", projectId: 2, parentId: 8 },
    ],
  });

  // ----------------- Task comments replies -----------------

  await prisma.comment.createMany({
    data: [
      // --- Task 1, Task comment 45 ---
      { id: 391, content: "Great start! Folder structure looks clean.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 392, content: "Thanks, I’ll add Swagger for endpoint docs.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 393, content: "Nice, don’t forget auth routes first.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 394, content: "Working on JWT strategy today.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 395, content: "Perfect, I’ll integrate Prisma schema later.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 396, content: "Make sure migrations run automatically in dev mode.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 397, content: "Yes, added a postinstall script for that.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 398, content: "API now supports pagination and filtering.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 399, content: "Pagination logic looks solid, nice work!", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 400, content: "Next up: file upload endpoints.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 401, content: "We’ll use S3 SDK for uploads, right?", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 402, content: "Yes, environment keys already set.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 403, content: "Remember to validate MIME types for uploads.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 404, content: "Added file validation middleware.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 405, content: "Error handling for uploads tested and clean.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 406, content: "Sweet. Next: connect product routes.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 407, content: "Product CRUD working, pushing commit soon.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 408, content: "Added category relation in Prisma model.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 409, content: "I’ll test nested queries with categories.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 410, content: "Results look fine, includes work as expected.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 411, content: "Implementing authentication middleware now.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 412, content: "Tested protected routes – tokens verified correctly.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 413, content: "Good! Let’s move to email verification next.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 414, content: "I’ll add a sendgrid service wrapper.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 415, content: "Mail templates uploaded to `/emails` folder.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 416, content: "Signup verification flow tested – works perfectly.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 417, content: "API logging added using Winston.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 418, content: "Logs look clean and structured.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 419, content: "Added unit tests for routes and services.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 420, content: "All tests passing locally", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 421, content: "CI pipeline now runs on push.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 1, parentId: 45 },
      { id: 422, content: "Excellent. Let’s deploy staging tomorrow.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },
      { id: 423, content: "Staging deployment script added to repo.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 1, parentId: 45 },
      { id: 424, content: "Everything works perfectly on staging", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 1, parentId: 45 },
      { id: 425, content: "Nice job team! Moving to frontend integration next.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 1, parentId: 45 },

      // --- Task 2, Task comment 52 ---
      { id: 426, content: "Header placement looks balanced.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 2, parentId: 52 },
      { id: 427, content: "I think we should make the search bar more prominent.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 2, parentId: 52 },
      { id: 428, content: "Agree, it’s key for usability.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 2, parentId: 52 },
      { id: 429, content: "I’ll move it above the nav links and test the layout.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 2, parentId: 52 },
      { id: 430, content: "Looks cleaner now, great adjustment.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 2, parentId: 52 },
      { id: 431, content: "Add a featured products carousel under the hero banner.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 2, parentId: 52 },
      { id: 432, content: "Yes, that will make the page more dynamic.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 2, parentId: 52 },
      { id: 433, content: "We can also show categories with icons below.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 2, parentId: 52 },
      { id: 434, content: "Don’t forget responsive alignment for mobile view.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 2, parentId: 52 },
      { id: 435, content: "Good point — will use CSS grid for flexibility.", senderId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp", taskId: 2, parentId: 52 },
      { id: 436, content: "Try reducing spacing between sections slightly.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 2, parentId: 52 },
      { id: 437, content: "Done, layout feels tighter now.", senderId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3", taskId: 2, parentId: 52 },
      { id: 438, content: "Nice progress, I’ll prepare feedback notes for review.", senderId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI", taskId: 2, parentId: 52 },
      { id: 439, content: "Everything’s aligned — ready for client preview.", senderId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9", taskId: 2, parentId: 52 },
    ],
  });

  // ----------------- Attachments -----------------

  await prisma.attachment.createMany({
    data: [
      { fileUrl: "/placeholder.jpg", fileName: "Profile Picture.jpg", taskId: 1 },
      { fileUrl: "/placeholder.jpg", fileName: "Team Photo.jpg", taskId: 1 },
      { fileUrl: "/placeholder.jpg", fileName: "Screenshot 1.jpg", taskId: 2 },
      { fileUrl: "/placeholder.jpg", fileName: "Screenshot 2.jpg", taskId: 2 },
      { fileUrl: "/placeholder.jpg", fileName: "Document Preview.jpg", taskId: 3 },
      { fileUrl: "/placeholder.jpg", fileName: "Mockup Design.jpg", taskId: 3 },
      { fileUrl: "/placeholder.jpg", fileName: "Diagram.jpg", taskId: 4 },
      { fileUrl: "/placeholder.jpg", fileName: "Chart.jpg", taskId: 4 },
      { fileUrl: "/placeholder.jpg", fileName: "Banner.jpg", taskId: 5 },
      { fileUrl: "/placeholder.jpg", fileName: "Icon Set.jpg", taskId: 5 },
      { fileUrl: "/placeholder.jpg", fileName: "Reference Image.jpg", taskId: 6 },
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
        commentId: 45,
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
        commentId: 1,
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
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        id: 1,
        type: "TASK_ADDED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 1,
        createdAt: new Date(2025, 8, 1),
        isRead: true,
      },
      {
        id: 2,
        type: "TASK_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetName: "Task setup completed.",
        createdAt: new Date(2025, 8, 2),
        isRead: false,
      },
      {
        id: 3,
        type: "TASK_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 2,
        createdAt: new Date(2025, 8, 3),
        isRead: false,
      },
      {
        id: 4,
        type: "COMMENT_ADDED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 3,
        createdAt: new Date(2025, 8, 4),
        isRead: true,
      },
      {
        id: 5,
        type: "PROJECT_ADDED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 4,
        createdAt: new Date(2025, 8, 5),
        isRead: false,
      },
      {
        id: 6,
        type: "PROJECT_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetName: "Performance Monitoring",
        createdAt: new Date(2025, 8, 6),
        isRead: false,
      },
      {
        id: 7,
        type: "PROJECT_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 5,
        createdAt: new Date(2025, 8, 7),
        isRead: false,
      },
      {
        id: 8,
        type: "COMMENT_ADDED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 6,
        createdAt: new Date(2025, 8, 8),
        isRead: false,
      },
      {
        id: 9,
        type: "USER_ADDED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 7,
        createdAt: new Date(2025, 8, 9),
        isRead: false,
      },
      {
        id: 10,
        type: "USER_DELETED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetName: "Alice Smith",
        createdAt: new Date(2025, 8, 10),
        isRead: true,
      },
      {
        id: 11,
        type: "USER_UPDATED",
        actorId: "W9OZkgMnF12FNBlys4frkj1Lj5de5Nj3",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 8,
        createdAt: new Date(2025, 8, 11),
        isRead: true,
      },
      {
        id: 12,
        type: "CUSTOMER_ADDED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 9,
        createdAt: new Date(2025, 8, 12),
        isRead: false,
      },
      {
        id: 13,
        type: "CUSTOMER_DELETED",
        actorId: "VQmrwbFoX834fHEb1q1qo7CmKVV6NLF9",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetName: "Mike Johnson",
        createdAt: new Date(2025, 8, 13),
        isRead: false,
      },
      {
        id: 14,
        type: "CUSTOMER_UPDATED",
        actorId: "MNCCPei6KJZiRuIkPbdDxhhJWEoxnUlp",
        recipientId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
        workspaceId: 1,
        targetId: 10,
        createdAt: new Date(2025, 8, 14),
        isRead: false,
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

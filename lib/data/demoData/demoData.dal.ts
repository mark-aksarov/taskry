import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Lang } from "@/lib/types";
import { addDays } from "date-fns";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { validateWorkspaceIsEmpty } from "../utils/validation";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

const today = new Date();

export async function seedDemoData(lang: Lang) {
  // Authorization
  const {
    user: { id: userId },
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        demo: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create demo data.",
    );
  }

  await validateWorkspaceIsEmpty(organizationId);

  if (lang === "en") {
    await seedDemoDataEn(userId, organizationId);
  } else {
    await seedDemoDataRu(userId, organizationId);
  }
}

async function seedDemoDataEn(userId: string, organizationId: string) {
  // Create companies
  const companies = await prisma.company.createManyAndReturn({
    data: [
      {
        name: "TechNova Solutions Inc.",
        organizationId,
      },
      {
        name: "Global Dynamics Ltd.",
        organizationId,
      },
      {
        name: "Astra Marketing Group",
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const companyMap = new Map(
    companies.map((company) => [company.name, company.id]),
  );

  // Create clients
  const clients = await prisma.client.createManyAndReturn({
    data: [
      {
        fullName: "Elena Rodriguez",
        bio: "Head of Product Development overseeing the launch of new SaaS platforms.",
        email: "elena.rodriguez@technova.com",
        phoneNumber: "+1-212-555-0101",
        publicLink: null,
        companyId: companyMap.get("TechNova Solutions Inc."),
        organizationId,
      },
      {
        fullName: "Michael Chen",
        bio: "Lead Software Architect responsible for cloud infrastructure migration.",
        email: "michael.chen@technova.com",
        phoneNumber: "+1-212-555-0102",
        publicLink: null,
        companyId: companyMap.get("TechNova Solutions Inc."),
        organizationId,
      },
      {
        fullName: "Sophia Davies",
        bio: "Chief Operating Officer managing international logistics and supply chains.",
        email: "sophia.davies@globaldyn.co",
        phoneNumber: "+44-20-7946-0103",
        publicLink: null,
        companyId: companyMap.get("Global Dynamics Ltd."),
        organizationId,
      },
      {
        fullName: "James Wilson",
        bio: "Director of Procurement focused on optimizing vendor relationships.",
        email: "james.wilson@globaldyn.co",
        phoneNumber: "+44-20-7946-0104",
        publicLink: null,
        companyId: companyMap.get("Global Dynamics Ltd."),
        organizationId,
      },
      {
        fullName: "Liam O'Connell",
        bio: "Creative Director overseeing all digital and print campaign production.",
        email: "liam.oconnell@astramg.net",
        phoneNumber: "+353-1-555-0105",
        publicLink: null,
        companyId: companyMap.get("Astra Marketing Group"),
        organizationId,
      },
      {
        fullName: "Ava Sharma",
        bio: "Senior Digital Strategist specializing in SEO and content performance.",
        email: "ava.sharma@astramg.net",
        phoneNumber: "+353-1-555-0106",
        publicLink: null,
        companyId: companyMap.get("Astra Marketing Group"),
        organizationId,
      },
    ],
    select: {
      id: true,
      fullName: true,
    },
  });

  const clientMap = new Map(
    clients.map((client) => [client.fullName, client.id]),
  );

  // Create project categories
  const projectCategories = await prisma.projectCategory.createManyAndReturn({
    data: [
      {
        name: "Web Development",
        organizationId,
      },
      {
        name: "Mobile Applications",
        organizationId,
      },
      {
        name: "Marketing",
        organizationId,
      },
      {
        name: "Design",
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const projectCategoryMap = new Map(
    projectCategories.map((projectCategory) => [
      projectCategory.name,
      projectCategory.id,
    ]),
  );

  // Create projects
  const projects = await prisma.project.createManyAndReturn({
    data: [
      {
        title: "E-commerce Platform Redesign",
        description:
          "Full overhaul of the existing e-commerce platform, focusing on modernizing the UI/UX, improving conversion funnels, and integrating a new payment gateway. The project will involve extensive A/B testing and performance optimization across all major browsers and mobile devices. Key deliverables include a component library and a comprehensive style guide.",
        deadline: addDays(today, 12),
        clientId: clientMap.get("Elena Rodriguez"),
        categoryId: projectCategoryMap.get("Web Development"),
        status: "active",
        creatorId: userId,
        organizationId,
      },
      {
        title: "iOS & Android App Development",
        description:
          "Design and build a new cross-platform mobile application to complement the company's core services. The app must feature real-time data synchronization, offline capabilities, and push notifications. Technology stack will be React Native to ensure rapid deployment on both iOS and Android platforms. Security audit required prior to launch.",
        deadline: addDays(today, 22),
        clientId: clientMap.get("Sophia Davies"),
        categoryId: projectCategoryMap.get("Mobile Applications"),
        status: "pending",
        creatorId: userId,
        organizationId,
      },
      {
        title: "Q4 Digital Marketing Campaign",
        description:
          "Execute a comprehensive Q4 digital marketing strategy covering SEO content, paid social media ads, and email campaigns. The goal is to increase lead generation by 25% and boost brand awareness in target regions. Requires collaboration with the content and design teams for asset creation and deployment tracking.",
        deadline: addDays(today, 35),
        clientId: clientMap.get("Liam O'Connell"),
        categoryId: projectCategoryMap.get("Marketing"),
        status: "active",
        creatorId: userId,
        organizationId,
      },
      {
        title: "Brand Style Guide Finalization",
        description:
          "Complete the final comprehensive brand style guide, covering typography, color palettes, logo usage, and voice/tone guidelines for all external communication channels. This includes creation of a high-fidelity design system that will be used by both internal and external design partners for future projects and campaigns.",
        deadline: addDays(today, 8),
        clientId: clientMap.get("Liam O'Connell"),
        categoryId: projectCategoryMap.get("Design"),
        status: "completed",
        creatorId: userId,
        organizationId,
      },
    ],
    select: {
      id: true,
      title: true,
    },
  });

  const projectMap = new Map(
    projects.map((project) => [project.title, project.id]),
  );

  // Create task categories
  const taskCategories = await prisma.taskCategory.createManyAndReturn({
    data: [
      {
        name: "Frontend",
        organizationId,
      },
      {
        name: "Backend",
        organizationId,
      },
      {
        name: "Testing",
        organizationId,
      },
      {
        name: "Documentation",
        organizationId,
      },
      {
        name: "Content",
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const taskCategoryMap = new Map(
    taskCategories.map((taskCategory) => [taskCategory.name, taskCategory.id]),
  );

  // Create tasks

  const tasks = await prisma.task.createManyAndReturn({
    data: [
      {
        title: "Setup React Project Structure",
        description:
          "Initialize the new e-commerce frontend repository, configure Webpack/Vite, and establish the base folder structure for components, pages, and utilities.",
        deadline: addDays(today, 45),
        projectId: projectMap.get("E-commerce Platform Redesign"),
        categoryId: taskCategoryMap.get("Frontend"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Design System Component Audit",
        description:
          "Review all existing UI components and prepare a list of those needing redesign or replacement to align with the new style guide.",
        deadline: addDays(today, 34),
        projectId: projectMap.get("E-commerce Platform Redesign"),
        categoryId: taskCategoryMap.get("Frontend"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Integrate New Payment Gateway",
        description:
          "Implement the backend integration for the new payment processor (Stripe/PayPal) and ensure secure token handling and transaction logging.",
        deadline: addDays(today, 27),
        projectId: projectMap.get("E-commerce Platform Redesign"),
        categoryId: taskCategoryMap.get("Backend"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Create App Landing Page Docs",
        description:
          "Write initial documentation for the mobile app landing page, including installation steps and key feature overview for users.",
        deadline: addDays(today, 42),
        projectId: projectMap.get("iOS & Android App Development"),
        categoryId: taskCategoryMap.get("Documentation"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Setup React Native Environment",
        description:
          "Configure the React Native development environment, including setting up simulators, connecting to backend staging API, and installing necessary dependencies.",
        deadline: addDays(today, 24),
        projectId: projectMap.get("iOS & Android App Development"),
        categoryId: taskCategoryMap.get("Frontend"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Design App Navigation Flow",
        description:
          "Create wireframes and a detailed user flow diagram for the main navigation, user profiles, and settings screens in the mobile app.",
        deadline: addDays(today, 15),
        projectId: projectMap.get("iOS & Android App Development"),
        categoryId: taskCategoryMap.get("Frontend"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Finalize Q4 Ad Copy & Assets",
        description:
          "Review and approve the final text, images, and video assets for deployment across all paid social media platforms (Facebook, LinkedIn, Instagram).",
        deadline: addDays(today, 22),
        projectId: projectMap.get("Q4 Digital Marketing Campaign"),
        categoryId: taskCategoryMap.get("Content"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Implement Google Ads Campaigns",
        description:
          "Setup and launch three targeted search and display campaigns on Google Ads, focusing on long-tail keywords identified in the SEO audit.",
        deadline: addDays(today, 10),
        projectId: projectMap.get("Q4 Digital Marketing Campaign"),
        categoryId: taskCategoryMap.get("Testing"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Draft 5 SEO Blog Posts",
        description:
          "Write and schedule five new blog posts focusing on high-priority SEO topics relevant to the Q4 campaign goals. Requires content review by Grace Hall.",
        deadline: addDays(today, 9),
        projectId: projectMap.get("Q4 Digital Marketing Campaign"),
        categoryId: taskCategoryMap.get("Content"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Gathering All Style Assets",
        description:
          "Collect all existing design assets, including old logo variations, current color codes, and any typography documentation to form the basis of the new guide.",
        deadline: addDays(today, 17),
        projectId: projectMap.get("Brand Style Guide Finalization"),
        categoryId: taskCategoryMap.get("Frontend"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Define Color Palette Rules",
        description:
          "Finalize the primary, secondary, and accent color palettes, defining hex codes, RGB values, and acceptable usage rules for each color across digital and print media.",
        deadline: addDays(today, 27),
        projectId: projectMap.get("Brand Style Guide Finalization"),
        categoryId: taskCategoryMap.get("Documentation"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Typography Usage Guidelines",
        description:
          "Document font families, weights, sizing hierarchy (H1, H2, body, etc.), and pairing rules for all communications.",
        deadline: addDays(today, 37),
        projectId: projectMap.get("Brand Style Guide Finalization"),
        categoryId: taskCategoryMap.get("Documentation"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
    ],
    select: {
      id: true,
      title: true,
    },
  });

  const taskMap = new Map(tasks.map((task) => [task.title, task.id]));

  //subtasks
  await prisma.subtask.createMany({
    data: [
      {
        text: "Initialize Git repository and create .gitignore file",
        isDone: true,
        taskId: taskMap.get("Setup React Project Structure")!,
        createdAt: "2025-12-05T10:05:00.000Z",
      },
      {
        text: "Install React and essential dependencies (e.g., react-router-dom)",
        isDone: true,
        taskId: taskMap.get("Setup React Project Structure")!,
        createdAt: "2025-12-05T10:06:00.000Z",
      },
      {
        text: "Configure bundler (Webpack/Vite) for development and production builds",
        isDone: false,
        taskId: taskMap.get("Setup React Project Structure")!,
        createdAt: "2025-12-05T10:07:00.000Z",
      },
      {
        text: "Gather documentation for existing components",
        isDone: true,
        taskId: taskMap.get("Design System Component Audit")!,
        createdAt: "2025-12-05T10:20:00.000Z",
      },
      {
        text: "Perform a visual audit of all live UI components",
        isDone: true,
        taskId: taskMap.get("Design System Component Audit")!,
        createdAt: "2025-12-05T10:21:00.000Z",
      },
      {
        text: "Compare current components against the new style guide (color, typography, spacing)",
        isDone: false,
        taskId: taskMap.get("Design System Component Audit")!,
        createdAt: "2025-12-05T10:22:00.000Z",
      },
      {
        text: "Select a payment gateway provider (e.g., Stripe) for integration",
        isDone: true,
        taskId: taskMap.get("Integrate New Payment Gateway")!,
        createdAt: "2025-12-05T10:35:00.000Z",
      },
      {
        text: "Obtain necessary API keys and credentials",
        isDone: true,
        taskId: taskMap.get("Integrate New Payment Gateway")!,
        createdAt: "2025-12-05T10:36:00.000Z",
      },
      {
        text: "Implement backend endpoint for creating payment intents",
        isDone: true,
        taskId: taskMap.get("Integrate New Payment Gateway")!,
        createdAt: "2025-12-05T10:37:00.000Z",
      },
      {
        text: "Outline the structure of the landing page documentation",
        isDone: true,
        taskId: taskMap.get("Create App Landing Page Docs")!,
        createdAt: "2025-12-06T14:35:00.000Z",
      },
      {
        text: "Draft step-by-step instructions for mobile app installation (iOS and Android)",
        isDone: false,
        taskId: taskMap.get("Create App Landing Page Docs")!,
        createdAt: "2025-12-06T14:38:00.000Z",
      },
      {
        text: "Write compelling summaries for 3-5 key app features",
        isDone: false,
        taskId: taskMap.get("Create App Landing Page Docs")!,
        createdAt: "2025-12-06T14:41:00.000Z",
      },
      {
        text: "Install Node.js, Watchman, and the React Native CLI",
        isDone: true,
        taskId: taskMap.get("Setup React Native Environment")!,
        createdAt: "2025-12-06T14:50:00.000Z",
      },
      {
        text: "Set up Android Studio and configure the Android Emulator",
        isDone: false,
        taskId: taskMap.get("Setup React Native Environment")!,
        createdAt: "2025-12-06T14:53:00.000Z",
      },
      {
        text: "Set up Xcode and configure the iOS Simulator",
        isDone: false,
        taskId: taskMap.get("Setup React Native Environment")!,
        createdAt: "2025-12-06T14:56:00.000Z",
      },
      {
        text: "Develop wireframes for the main tab navigation structure",
        isDone: true,
        taskId: taskMap.get("Design App Navigation Flow")!,
        createdAt: "2025-12-07T10:05:00.000Z",
      },
      {
        text: "Map out the detailed user flow from login to the main dashboard",
        isDone: true,
        taskId: taskMap.get("Design App Navigation Flow")!,
        createdAt: "2025-12-07T10:08:00.000Z",
      },
      {
        text: "Wireframe the user profile screen and its editable fields",
        isDone: false,
        taskId: taskMap.get("Design App Navigation Flow")!,
        createdAt: "2025-12-07T10:11:00.000Z",
      },
      {
        text: "Collect and organize all draft ad copy variants",
        isDone: true,
        taskId: taskMap.get("Finalize Q4 Ad Copy & Assets")!,
        createdAt: "2025-12-10T10:05:00.000Z",
      },
      {
        text: "Review ad copy for clarity, grammar, and alignment with marketing goals",
        isDone: true,
        taskId: taskMap.get("Finalize Q4 Ad Copy & Assets")!,
        createdAt: "2025-12-10T10:07:00.000Z",
      },
      {
        text: "Verify all image and video assets meet platform size and resolution requirements",
        isDone: true,
        taskId: taskMap.get("Finalize Q4 Ad Copy & Assets")!,
        createdAt: "2025-12-10T10:09:00.000Z",
      },
      {
        text: "Review long-tail keyword list from the SEO audit",
        isDone: true,
        taskId: taskMap.get("Implement Google Ads Campaigns")!,
        createdAt: "2025-12-10T10:35:00.000Z",
      },
      {
        text: "Structure Campaign 1: High-intent search terms (e.g., product names)",
        isDone: true,
        taskId: taskMap.get("Implement Google Ads Campaigns")!,
        createdAt: "2025-12-10T10:38:00.000Z",
      },
      {
        text: "Structure Campaign 2: Broad product category display network targeting",
        isDone: false,
        taskId: taskMap.get("Implement Google Ads Campaigns")!,
        createdAt: "2025-12-10T10:41:00.000Z",
      },
      {
        text: "Identify five high-priority SEO topics based on keyword research",
        isDone: true,
        taskId: taskMap.get("Draft 5 SEO Blog Posts")!,
        createdAt: "2025-12-11T09:05:00.000Z",
      },
      {
        text: "Draft outline and structure for all five blog posts",
        isDone: false,
        taskId: taskMap.get("Draft 5 SEO Blog Posts")!,
        createdAt: "2025-12-11T09:09:00.000Z",
      },
      {
        text: "Write the full content and integrate target keywords for all five posts",
        isDone: false,
        taskId: taskMap.get("Draft 5 SEO Blog Posts")!,
        createdAt: "2025-12-11T09:13:00.000Z",
      },
      {
        text: "Gather all official and unofficial logo files, including different color schemes",
        isDone: true,
        taskId: taskMap.get("Gathering All Style Assets")!,
        createdAt: "2025-12-20T17:05:00.000Z",
      },
      {
        text: "Collect all current brand color HEX codes, RGB values, and usage guidelines",
        isDone: true,
        taskId: taskMap.get("Gathering All Style Assets")!,
        createdAt: "2025-12-20T17:08:00.000Z",
      },
      {
        text: "Compile documentation on primary and secondary typefaces and font weights",
        isDone: true,
        taskId: taskMap.get("Gathering All Style Assets")!,
        createdAt: "2025-12-20T17:11:00.000Z",
      },
      {
        text: "Select and finalize the primary brand color (HEX, RGB, CMYK values)",
        isDone: true,
        taskId: taskMap.get("Define Color Palette Rules")!,
        createdAt: "2025-12-21T09:05:00.000Z",
      },
      {
        text: "Define 2-3 secondary colors for complementary use",
        isDone: true,
        taskId: taskMap.get("Define Color Palette Rules")!,
        createdAt: "2025-12-21T09:08:00.000Z",
      },
      {
        text: "Establish accent colors for CTAs and interactive elements",
        isDone: true,
        taskId: taskMap.get("Define Color Palette Rules")!,
        createdAt: "2025-12-21T09:11:00.000Z",
      },
      {
        text: "Finalize the primary and secondary font families",
        isDone: true,
        taskId: taskMap.get("Typography Usage Guidelines")!,
        createdAt: "2025-12-22T10:05:00.000Z",
      },
      {
        text: "Define specific weights and styles to be used for consistency",
        isDone: true,
        taskId: taskMap.get("Typography Usage Guidelines")!,
        createdAt: "2025-12-22T10:08:00.000Z",
      },
      {
        text: "Establish the type hierarchy: sizes (px/rem) and weights for H1, H2, H3, Body, Caption",
        isDone: true,
        taskId: taskMap.get("Typography Usage Guidelines")!,
        createdAt: "2025-12-22T10:11:00.000Z",
      },
    ],
  });
}

async function seedDemoDataRu(userId: string, organizationId: string) {
  // Create companies
  const companies = await prisma.company.createManyAndReturn({
    data: [
      {
        name: 'ООО "ТехноВектор"',
        organizationId,
      },
      {
        name: 'ЗАО "Инновация"',
        organizationId,
      },
      {
        name: "ИП Струков",
        organizationId,
      },
      {
        name: 'АО "ГлобалСтрой"',
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const companyMap = new Map(
    companies.map((company) => [company.name, company.id]),
  );

  // Create clients
  const clients = await prisma.client.createManyAndReturn({
    data: [
      {
        fullName: "Николай Орлов",
        bio: "Руководитель отдела закупок в 'ТехноВектор'. Отвечает за стратегическое партнерство.",
        email: "orlov@tech.com",
        phoneNumber: "+7-910-123-45-67",
        publicLink: null,
        companyId: companyMap.get('ООО "ТехноВектор"'),
        organizationId,
      },
      {
        fullName: "Марина Белова",
        bio: "Менеджер проекта, курирующий внедрение новых IT-решений в 'ТехноВектор'.",
        email: "belova@tech.com",
        phoneNumber: "+7-910-234-56-78",
        publicLink: null,
        companyId: companyMap.get('ООО "ТехноВектор"'),
        organizationId,
      },
      {
        fullName: "Лидия Симонова",
        bio: "Ведущий аналитик по продуктам в 'ТехноВектор'.",
        email: "simonova@tech.com",
        phoneNumber: "+7-910-012-34-56",
        publicLink: null,
        companyId: companyMap.get('ООО "ТехноВектор"'),
        organizationId,
      },
      {
        fullName: "Артем Гусев",
        bio: "Главный инженер ЗАО 'Инновация'. Специалист по промышленному оборудованию.",
        email: "gusev@innov.com",
        phoneNumber: "+7-910-345-67-89",
        publicLink: null,
        companyId: companyMap.get('ЗАО "Инновация"'),
        organizationId,
      },
      {
        fullName: "Кира Логинова",
        bio: "Финансовый аналитик. Отвечает за бюджетирование и отчетность в ЗАО 'Инновация'.",
        email: "loginova@innov.com",
        phoneNumber: "+7-910-456-78-90",
        publicLink: null,
        companyId: companyMap.get('ЗАО "Инновация"'),
        organizationId,
      },
      {
        fullName: "Денис Струков",
        bio: "Владелец ИП. Ключевое контактное лицо по всем вопросам сотрудничества.",
        email: "denis@ip.com",
        phoneNumber: "+7-910-567-89-01",
        publicLink: null,
        companyId: companyMap.get("ИП Струков"),
        organizationId,
      },
      {
        fullName: "Жанна Крылова",
        bio: "Менеджер по развитию бизнеса в АО 'ГлобалСтрой'. Курирует крупные строительные проекты.",
        email: "krylova@global.com",
        phoneNumber: "+7-910-678-90-12",
        publicLink: null,
        companyId: companyMap.get('АО "ГлобалСтрой"'),
        organizationId,
      },
      {
        fullName: "Егор Дроздов",
        bio: "Специалист по снабжению строительными материалами в АО 'ГлобалСтрой'.",
        email: "drozdov@global.com",
        phoneNumber: "+7-910-789-01-23",
        publicLink: null,
        companyId: companyMap.get('АО "ГлобалСтрой"'),
        organizationId,
      },
    ],
    select: {
      id: true,
      fullName: true,
    },
  });

  const clientMap = new Map(
    clients.map((client) => [client.fullName, client.id]),
  );

  // Create project categories
  const projectCategories = await prisma.projectCategory.createManyAndReturn({
    data: [
      {
        name: "Веб-разработка",
        organizationId,
      },
      {
        name: "Мобильные приложения",
        organizationId,
      },
      {
        name: "Дизайн",
        organizationId,
      },
      {
        name: "Внутренние системы",
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const projectCategoryMap = new Map(
    projectCategories.map((projectCategory) => [
      projectCategory.name,
      projectCategory.id,
    ]),
  );

  // Create projects
  const projects = await prisma.project.createManyAndReturn({
    data: [
      {
        title: "Разработка корпоративного сайта",
        description:
          "Создание современного, адаптивного корпоративного сайта с каталогом услуг и системой обратной связи. Проект включает полную разработку дизайна, фронтенда и бэкенда, обеспечивая высокую производительность и удобство использования.",
        deadline: addDays(today, 14),
        clientId: clientMap.get("Николай Орлов"),
        categoryId: projectCategoryMap.get("Веб-разработка"),
        status: "active",
        creatorId: userId,
        organizationId,
      },
      {
        title: "Мобильное приложение (MVP)",
        description:
          "Разработка MVP для iOS и Android, позволяющего пользователям просматривать, анализировать и управлять своими инвестиционными портфелями. Фокус на интуитивном UX/UI и обеспечении безопасности данных для первичного запуска.",
        deadline: addDays(today, 32),
        clientId: clientMap.get("Артем Гусев"),
        categoryId: projectCategoryMap.get("Мобильные приложения"),
        status: "active",
        creatorId: userId,
        organizationId,
      },
      {
        title: "Редизайн логотипа и стиля",
        description:
          "Обновление визуальной идентичности компании для более современного восприятия на рынке. Задача включает разработку нового логотипа, выбор фирменных цветов, шрифтов и создание руководства по использованию брендбука.",
        deadline: addDays(today, 39),
        clientId: clientMap.get("Денис Струков"),
        categoryId: projectCategoryMap.get("Дизайн"),
        status: "completed",
        creatorId: userId,
        organizationId,
      },
      {
        title: "Внедрение CRM-системы",
        description:
          "Интеграция облачной CRM для автоматизации процессов продаж и управления клиентами. Проект включает настройку системы под специфику бизнеса, миграцию данных и обучение персонала для эффективного использования нового инструмента.",
        deadline: addDays(today, 26),
        clientId: clientMap.get("Жанна Крылова"),
        categoryId: projectCategoryMap.get("Внутренние системы"),
        status: "active",
        creatorId: userId,
        organizationId,
      },
    ],
    select: {
      id: true,
      title: true,
    },
  });

  const projectMap = new Map(
    projects.map((project) => [project.title, project.id]),
  );

  // Create task categories
  const taskCategories = await prisma.taskCategory.createManyAndReturn({
    data: [
      {
        name: "Фронтенд",
        organizationId,
      },
      {
        name: "Бэкенд",
        organizationId,
      },
      {
        name: "Тестирование",
        organizationId,
      },
      {
        name: "Документация",
        organizationId,
      },
      {
        name: "Контент",
        organizationId,
      },
    ],
    select: {
      id: true,
      name: true,
    },
  });

  const taskCategoryMap = new Map(
    taskCategories.map((taskCategory) => [taskCategory.name, taskCategory.id]),
  );

  // Create tasks

  const tasks = await prisma.task.createManyAndReturn({
    data: [
      {
        title: "Разработка главной страницы (макет)",
        description:
          "Создать адаптивный макет главной страницы в Figma/Sketch, включая шапку, подвал и основные секции (о нас, услуги, контакты). Необходимо также разработать и утвердить цветовую палитру и типографику, следуя принципам удобства и современному дизайну.",
        deadline: addDays(today, 14),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Настройка структуры проекта",
        description:
          "Инициализировать репозиторий, настроить сборку (Webpack/Vite), подключить базовые стили (SCSS/Tailwind) и роутинг. Проект должен использовать современную структуру с разделением на компоненты и модули для обеспечения легкой поддержки и масштабируемости.",
        deadline: addDays(today, 17),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Создание API: список услуг",
        description:
          "Разработать REST API эндпоинт для получения данных о каталоге услуг (название, описание, иконка). API должно быть защищено, возвращать данные в стандартизированном формате (JSON) и быть оптимизировано для быстрого ответа на запросы фронтенда.",
        deadline: addDays(today, 20),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Верстка 'Карточка услуги'",
        description:
          "Реализовать адаптивный и reusable компонент для отображения отдельной услуги на странице каталога. Компонент должен корректно отображаться на всех типах устройств и быть семантически правильно размечен для SEO-оптимизации.",
        deadline: addDays(today, 21),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Написание ТЗ для тестирования",
        description:
          "Составить полный список тестовых сценариев и кейсов для функционального и кросс-браузерного тестирования основных разделов. Тестовая документация должна включать позитивные и негативные сценарии для всех интерактивных элементов сайта.",
        deadline: addDays(today, 23),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Тестирование"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Интеграция формы обратной связи",
        description:
          "Подключить фронтенд-форму 'Связаться с нами' к разработанному API для отправки данных. Необходимо реализовать валидацию данных на стороне клиента и сервера, а также обработку всех возможных ошибок при отправке сообщения.",
        deadline: addDays(today, 36),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Наполнение раздела 'О нас'",
        description:
          "Загрузить тексты, фотографии и логотипы, предоставленные заказчиком, в базу данных. Контент должен быть правильно структурирован, оптимизирован (сжатые изображения) и проверен на соответствие макетам и общему тону бренда.",
        deadline: addDays(today, 38),
        projectId: projectMap.get("Разработка корпоративного сайта"),
        categoryId: taskCategoryMap.get("Контент"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "UI/UX макеты MVP (iOS/Android)",
        description:
          "Создать адаптивные макеты основных экранов (портфель, графики, настройки) в Figma/Sketch. Работа включает разработку пользовательских сценариев, создание интерактивного прототипа и финальное утверждение дизайна с командой и заказчиком.",
        deadline: addDays(today, 24),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Настройка сервера и БД",
        description:
          "Инициализация бэкенд-проекта, развертывание базовой базы данных (PostgreSQL) для хранения данных пользователей. Настройка должна включать базовое кеширование, миграции схемы БД и создание среды для разработки (Dev/Stage).",
        deadline: addDays(today, 22),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Реализация API: Аутентификация",
        description:
          "Разработка эндпоинтов для регистрации, входа в систему и получения JWT-токенов. Необходимо обеспечить высокий уровень криптографической защиты паролей, внедрить механизм обновления токенов (refresh token) и обработку всех ошибок авторизации.",
        deadline: addDays(today, 31),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Настройка мобильного клиента",
        description:
          "Инициализация проекта, настройка навигации и подключение к тестовому API. Проект должен быть настроен для сборки под обе платформы (iOS/Android), с учетом особенностей каждого SDK и использованием общих модулей для кроссплатформенной разработки.",
        deadline: addDays(today, 11),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Интеграция экрана портфеля",
        description:
          "Разработка компонента для отображения общего баланса и списка активов пользователя с получением данных с бэкенда. Компонент должен включать интерактивные графики и возможность сортировки данных, обеспечивая при этом высокую скорость загрузки информации.",
        deadline: addDays(today, 31),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Написание E2E тестов (Android)",
        description:
          "Создание сквозных тестов для ключевого функционала (вход, просмотр портфеля) с использованием Detox/Appium. Тесты должны охватывать все критические пользовательские сценарии для обеспечения стабильности приложения перед релизом и после каждого обновления.",
        deadline: addDays(today, 28),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Тестирование"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Кэширование данных на клиенте",
        description:
          "Реализовать локальное хранение данных портфеля для обеспечения работы в режиме оффлайн. Необходимо настроить логику синхронизации данных при восстановлении соединения, чтобы пользователь всегда видел актуальную информацию после возвращения в сеть.",
        deadline: addDays(today, 18),
        projectId: projectMap.get("Мобильное приложение (MVP)"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "pending",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Сбор и анализ требований",
        description:
          "Провести интервью с заказчиком, собрать референсы и определить ключевые ценности, которые должен отражать новый логотип. Сбор информации включает изучение целевой аудитории, анализ конкурентов и формулирование четкого технического задания на разработку.",
        deadline: addDays(today, 46),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Контент"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Разработка 3 концепций лого",
        description:
          "Создание трех различных черновых концепций логотипа, отражающих современный стиль и сферу деятельности компании. Концепции должны включать текстовый, графический и комбинированный варианты для выбора и дальнейшего развития с заказчиком.",
        deadline: addDays(today, 41),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        id: 33,
        title: "Выбор палитры и шрифтов",
        description:
          "Определение основных и акцентных корпоративных цветов (CMYK, RGB, HEX) и подбор подходящих шрифтов. Цветовая палитра и шрифтовая пара должны соответствовать психологии бренда и быть универсальными для использования как в печати, так и в цифровых медиа.",
        deadline: addDays(today, 31),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Финальная доработка логотипа",
        description:
          "Внесение правок по выбранной заказчиком концепции, финализация геометрии и подготовка векторных исходников. Этап включает детальную проработку всех элементов, тестирование на масштабируемость и утверждение точных пропорций логотипа.",
        deadline: addDays(today, 29),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Создание макетов визиток/бланков",
        description:
          "Разработка макетов деловой документации в новом фирменном стиле (визитки, фирменные бланки, конверты). Макеты должны быть подготовлены с учетом типографских требований (вылеты, цветовая модель CMYK) и переданы в печать.",
        deadline: addDays(today, 26),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Разработка гайдлайна (Часть 1)",
        description:
          "Описание правил использования логотипа (охранное поле, минимальный размер, инверсные версии) и цветовой палитры. Документ должен четко регламентировать, какие модификации логотипа допустимы, а какие строго запрещены, для сохранения целостности бренда.",
        deadline: addDays(today, 25),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Документация"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Создание иконки и фавикона",
        description:
          "Разработка оптимизированной версии логотипа для использования в качестве фавикона, иконки мобильного приложения и социальных сетей. Иконка должна быть разборчивой в маленьком размере и соответствовать требованиям всех платформ (iOS, Android, Web).",
        deadline: addDays(today, 34),
        projectId: projectMap.get("Редизайн логотипа и стиля"),
        categoryId: taskCategoryMap.get("Фронтенд"),
        status: "completed",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Выбор и закупка лицензии CRM",
        description:
          "Анализ предложений (например, Bitrix24, AmoCRM, Salesforce) и оформление подписки/лицензии для необходимого количества пользователей. Проект включает сравнительный анализ функционала, ценовых планов, а также юридическое оформление договора и оплаты лицензии.",
        deadline: addDays(today, 13),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Контент"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Настройка структуры CRM",
        description:
          "Создание необходимых воронок продаж, кастомизация полей для сделок, контактов и компаний в соответствии с требованиями. Настройка должна быть гибкой, отражать реальные бизнес-процессы компании и обеспечивать легкую работу для менеджеров.",
        deadline: addDays(today, 14),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Импорт существующей базы",
        description:
          "Сбор данных из старых таблиц/систем и загрузка их в новую CRM-систему, обеспечение чистоты данных. Включает дедупликацию, стандартизацию форматов данных (например, номеров телефонов) и верификацию успешного переноса всех существующих сделок и контактов.",
        deadline: addDays(today, 19),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Контент"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Интеграция с корпоративной почтой",
        description:
          "Настройка подключения почтовых ящиков менеджеров к CRM для автоматической привязки переписки к сделкам. Необходимо обеспечить корректную работу с несколькими доменами, безопасность учетных данных и тестирование отправки/получения писем через CRM-интерфейс.",
        deadline: addDays(today, 23),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Обучающие материалы по CRM",
        description:
          "Создание пошаговых инструкций и видео-гайдов по работе с CRM для менеджеров отдела продаж. Материалы должны охватывать все ключевые функции: создание лидов, ведение сделок, работу с контактами и использование встроенных инструментов коммуникации.",
        deadline: addDays(today, 20),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Документация"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Тестирование процесса продаж",
        description:
          "Проверка корректности прохождения тестовой сделки по всем этапам воронки и автоматическому созданию задач. Тестирование должно симулировать реальные сценарии, включая обработку отказов, перенос сделок и проверку корректности автоматических уведомлений.",
        deadline: addDays(today, 21),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Тестирование"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
      {
        title: "Настройка прав доступа (роли)",
        description:
          "Определение и настройка различных уровней доступа для менеджеров, руководителей отдела и администратора CRM. Настройка должна строго разграничивать видимость данных и разрешенные действия, согласно иерархии и политике безопасности компании.",
        deadline: addDays(today, 16),
        projectId: projectMap.get("Внедрение CRM-системы"),
        categoryId: taskCategoryMap.get("Бэкенд"),
        status: "active",
        creatorId: userId,
        assigneeId: userId,
        organizationId,
      },
    ],
    select: {
      id: true,
      title: true,
    },
  });

  const taskMap = new Map(tasks.map((task) => [task.title, task.id]));

  //subtasks
  await prisma.subtask.createMany({
    data: [
      {
        text: "Проверить и утвердить разработанную цветовую палитру и шрифты перед началом работы над макетом.",
        isDone: true,
        taskId: taskMap.get("Разработка главной страницы (макет)")!,
      },
      {
        text: "Создать три варианта дизайна секции 'Наши услуги' для обсуждения.",
        isDone: false,
        taskId: taskMap.get("Разработка главной страницы (макет)")!,
      },
      {
        text: "Разработать адаптивное состояние шапки и подвала для мобильных устройств (ширина до 480px).",
        isDone: true,
        taskId: taskMap.get("Разработка главной страницы (макет)")!,
      },
      {
        text: "Инициализировать Git репозиторий и настроить удаленный доступ (GitHub/GitLab).",
        isDone: false,
        taskId: taskMap.get("Настройка структуры проекта")!,
      },
      {
        text: "Выбрать и настроить бандлер проекта (Vite) с поддержкой TypeScript.",
        isDone: false,
        taskId: taskMap.get("Настройка структуры проекта")!,
      },
      {
        text: "Настроить Tailwind CSS для быстрой разработки стилей.",
        isDone: true,
        taskId: taskMap.get("Настройка структуры проекта")!,
      },
      {
        text: "Определить конечную структуру JSON ответа для списка услуг (включая название, описание, URL иконки).",
        isDone: false,
        taskId: taskMap.get("Создание API: список услуг")!,
      },
      {
        text: "Разработать логику получения данных из базы данных (SQL-запрос или ORM-запрос) и их форматирования.",
        isDone: false,
        taskId: taskMap.get("Создание API: список услуг")!,
      },
      {
        text: "Добавить базовую аутентификацию (например, токен) для защиты эндпоинта /api/services.",
        isDone: true,
        taskId: taskMap.get("Создание API: список услуг")!,
      },
      {
        text: "Создать базовую HTML-разметку компонента 'Карточка услуги' с использованием семантических тегов (article, section, h2, p) для SEO.",
        isDone: true,
        taskId: taskMap.get("Верстка 'Карточка услуги'")!,
      },
      {
        text: "Стилизовать компонент согласно макету, обеспечив его корректное отображение на десктопных экранах.",
        isDone: false,
        taskId: taskMap.get("Верстка 'Карточка услуги'")!,
      },
      {
        text: "Реализовать адаптивные стили компонента для мобильных устройств и планшетов (Media Queries).",
        isDone: true,
        taskId: taskMap.get("Верстка 'Карточка услуги'")!,
      },
      {
        text: "Определить и задокументировать список целевых браузеров и устройств для кросс-браузерного тестирования (Chrome, Firefox, Safari, Edge, Mobile iOS/Android).",
        isDone: true,
        taskId: taskMap.get("Написание ТЗ для тестирования")!,
      },
      {
        text: "Составить полный перечень тестовых сценариев (позитивных и негативных) для интерактивных элементов главной страницы (например, кнопки, формы обратной связи).",
        isDone: false,
        taskId: taskMap.get("Написание ТЗ для тестирования")!,
      },
      {
        text: "Разработать тестовые кейсы для проверки работы фильтрации и поиска в разделе 'Услуги', если применимо.",
        isDone: false,
        taskId: taskMap.get("Написание ТЗ для тестирования")!,
      },
      {
        text: "Разработать компонент формы 'Связаться с нами' (HTML/CSS) с полями для имени, email и сообщения.",
        isDone: true,
        taskId: taskMap.get("Интеграция формы обратной связи")!,
      },
      {
        text: "Реализовать клиентскую (фронтенд) валидацию для всех полей формы (проверка на заполненность, формат email).",
        isDone: false,
        taskId: taskMap.get("Интеграция формы обратной связи")!,
      },
      {
        text: "Написать логику для отправки данных формы на API-эндпоинт (POST-запрос) и обработки успешного ответа.",
        isDone: false,
        taskId: taskMap.get("Интеграция формы обратной связи")!,
      },
      {
        text: "Получить от заказчика финальный пакет контента для раздела 'О нас' (тексты, изображения, логотипы).",
        isDone: true,
        taskId: taskMap.get("Наполнение раздела 'О нас'")!,
      },
      {
        text: "Оптимизировать все изображения (сжатие, изменение размера) для быстрой загрузки на сайте.",
        isDone: false,
        taskId: taskMap.get("Наполнение раздела 'О нас'")!,
      },
      {
        text: "Загрузить оптимизированные изображения в хранилище (S3/CDN) и записать URL-адреса в базу данных.",
        isDone: false,
        taskId: taskMap.get("Наполнение раздела 'О нас'")!,
      },
      {
        text: "Разработать основные пользовательские сценарии (User Flows) для ключевых экранов MVP.",
        isDone: false,
        taskId: taskMap.get("UI/UX макеты MVP (iOS/Android)")!,
      },
      {
        text: "Создать низкодетализированные вайрфреймы (Wireframes) для экранов 'Портфель', 'Графики' и 'Настройки'.",
        isDone: false,
        taskId: taskMap.get("UI/UX макеты MVP (iOS/Android)")!,
      },
      {
        text: "Разработать высокодетализированные UI/UX макеты (High-Fidelity) в Figma для iOS и Android, учитывая гайдлайны платформ.",
        isDone: true,
        taskId: taskMap.get("UI/UX макеты MVP (iOS/Android)")!,
      },
      {
        text: "Инициализировать бэкенд-проект и настроить базовые зависимости (фреймворк, ORM).",
        isDone: true,
        taskId: taskMap.get("Настройка сервера и БД")!,
      },
      {
        text: "Развернуть базу данных PostgreSQL и создать схему пользователя, включая таблицы для аутентификации.",
        isDone: true,
        taskId: taskMap.get("Настройка сервера и БД")!,
      },
      {
        text: "Настроить систему миграций (например, Alembic/Knex) для управления изменениями схемы БД.",
        isDone: true,
        taskId: taskMap.get("Настройка сервера и БД")!,
      },
      {
        text: "Разработать эндпоинт для регистрации нового пользователя, включая проверку уникальности email.",
        isDone: true,
        taskId: taskMap.get("Реализация API: Аутентификация")!,
      },
      {
        text: "Реализовать криптографическое хеширование паролей (например, bcrypt) перед их сохранением в БД.",
        isDone: false,
        taskId: taskMap.get("Реализация API: Аутентификация")!,
      },
      {
        text: "Настроить выдачу и валидацию JWT-токенов при успешном входе в систему.",
        isDone: true,
        taskId: taskMap.get("Реализация API: Аутентификация")!,
      },
      {
        text: "Инициализировать мобильный проект (например, React Native/Flutter) и настроить окружение для iOS и Android.",
        isDone: false,
        taskId: taskMap.get("Настройка мобильного клиента")!,
      },
      {
        text: "Настроить базовую структуру навигации приложения (табы, стек-навигация).",
        isDone: false,
        taskId: taskMap.get("Настройка мобильного клиента")!,
      },
      {
        text: "Создать базовый HTTP-клиент для подключения к тестовому API-эндпоинту.",
        isDone: true,
        taskId: taskMap.get("Настройка мобильного клиента")!,
      },
      {
        text: "Разработать компонент для отображения общего баланса портфеля (заголовок, итоговая сумма).",
        isDone: true,
        taskId: taskMap.get("Интеграция экрана портфеля")!,
      },
      {
        text: "Интегрировать библиотеку для построения интерактивных графиков изменения стоимости активов.",
        isDone: false,
        taskId: taskMap.get("Интеграция экрана портфеля")!,
      },
      {
        text: "Реализовать получение и отображение списка активов пользователя с бэкенда, используя настроенный API.",
        isDone: true,
        taskId: taskMap.get("Интеграция экрана портфеля")!,
      },
      {
        text: "Выбрать и настроить фреймворк для E2E тестирования (например, Detox) в Android-части проекта.",
        isDone: true,
        taskId: taskMap.get("Написание E2E тестов (Android)")!,
      },
      {
        text: "Разработать сквозной тест для сценария успешного входа в систему (авторизация).",
        isDone: false,
        taskId: taskMap.get("Написание E2E тестов (Android)")!,
      },
      {
        text: "Написать E2E тест для проверки корректного отображения данных на экране портфеля.",
        isDone: false,
        taskId: taskMap.get("Написание E2E тестов (Android)")!,
      },
      {
        text: "Выбрать механизм локального хранения данных на клиенте (например, AsyncStorage, Realm или SQLite).",
        isDone: true,
        taskId: taskMap.get("Кэширование данных на клиенте")!,
      },
      {
        text: "Реализовать сохранение данных портфеля (список активов) в локальное хранилище после получения от API.",
        isDone: false,
        taskId: taskMap.get("Кэширование данных на клиенте")!,
      },
      {
        text: "Внедрить логику проверки статуса сети (онлайн/оффлайн) и автоматической загрузки данных из кэша в оффлайн-режиме.",
        isDone: false,
        taskId: taskMap.get("Кэширование данных на клиенте")!,
      },
      {
        text: "Провести интервью с ключевыми стейкхолдерами для определения видения и миссии бренда.",
        isDone: true,
        taskId: taskMap.get("Сбор и анализ требований")!,
      },
      {
        text: "Собрать не менее 10 примеров (референсов) логотипов конкурентов и смежных ниш.",
        isDone: false,
        taskId: taskMap.get("Сбор и анализ требований")!,
      },
      {
        text: "Составить список ключевых слов и ассоциаций, которые должен вызывать логотип.",
        isDone: false,
        taskId: taskMap.get("Сбор и анализ требований")!,
      },
      {
        text: "Набросать эскизы и идеи для текстового варианта логотипа (фокус на типографике).",
        isDone: true,
        taskId: taskMap.get("Разработка 3 концепций лого")!,
      },
      {
        text: "Разработать черновую концепцию логотипа, основанную на графическом символе (иконке).",
        isDone: true,
        taskId: taskMap.get("Разработка 3 концепций лого")!,
      },
      {
        text: "Создать комбинированный вариант (текст + графика) логотипа.",
        isDone: false,
        taskId: taskMap.get("Разработка 3 концепций лого")!,
      },
      {
        text: "Провести анализ психологии цвета и выбрать 2-3 основных корпоративных цвета, соответствующих бренду.",
        isDone: true,
        taskId: taskMap.get("Выбор палитры и шрифтов")!,
      },
      {
        text: "Определить дополнительные акцентные цвета и составить финальную цветовую палитру (включая HEX, RGB, CMYK).",
        isDone: false,
        taskId: taskMap.get("Выбор палитры и шрифтов")!,
      },
      {
        text: "Выбрать основную шрифтовую гарнитуру для заголовков, обеспечивающую читаемость и характер бренда.",
        isDone: true,
        taskId: taskMap.get("Выбор палитры и шрифтов")!,
      },
      {
        text: "Внести все правки заказчика по выбранной концепции логотипа.",
        isDone: false,
        taskId: taskMap.get("Финальная доработка логотипа")!,
      },
      {
        text: "Детальная проработка геометрии и контуров логотипа для идеальной симметрии и пропорций.",
        isDone: true,
        taskId: taskMap.get("Финальная доработка логотипа")!,
      },
      {
        text: "Создание монохромных и инверсных версий логотипа для использования на разных фонах.",
        isDone: true,
        taskId: taskMap.get("Финальная доработка логотипа")!,
      },
      {
        text: "Создание дизайн-макета фирменной визитки (двусторонняя) в утвержденном стиле.",
        isDone: true,
        taskId: taskMap.get("Создание макетов визиток/бланков")!,
      },
      {
        text: "Разработка макета фирменного бланка (А4) с правильным расположением логотипа и контактных данных.",
        isDone: true,
        taskId: taskMap.get("Создание макетов визиток/бланков")!,
      },
      {
        text: "Подготовка всех макетов к печати: цветовая модель CMYK, вылеты (bleed), разрешение 300 dpi.",
        isDone: false,
        taskId: taskMap.get("Создание макетов визиток/бланков")!,
      },
      {
        text: "Описание базовых правил использования логотипа: охранное поле и минимальный размер.",
        isDone: false,
        taskId: taskMap.get("Разработка гайдлайна (Часть 1)")!,
      },
      {
        text: "Создание раздела 'Цветовая палитра' с точными кодами (HEX, RGB, CMYK) для всех корпоративных цветов.",
        isDone: false,
        taskId: taskMap.get("Разработка гайдлайна (Часть 1)")!,
      },
      {
        text: "Разработка примеров 'недопустимого использования' логотипа (растягивание, изменение цвета, наложение эффектов).",
        isDone: false,
        taskId: taskMap.get("Разработка гайдлайна (Часть 1)")!,
      },
      {
        text: "Создать адаптированную графическую версию логотипа, разборчивую в размере 32x32px (для фавикона).",
        isDone: false,
        taskId: taskMap.get("Создание иконки и фавикона")!,
      },
      {
        text: "Разработать версию иконки мобильного приложения, соответствующую гайдлайнам Android (Adaptive Icons).",
        isDone: true,
        taskId: taskMap.get("Создание иконки и фавикона")!,
      },
      {
        text: "Создать версию иконки мобильного приложения, соответствующую гайдлайнам iOS (закругленные углы, отсутствие прозрачности).",
        isDone: false,
        taskId: taskMap.get("Создание иконки и фавикона")!,
      },
      {
        text: "Провести сравнительный анализ функционала 3-5 основных CRM-систем (Bitrix24, AmoCRM, Salesforce).",
        isDone: true,
        taskId: taskMap.get("Выбор и закупка лицензии CRM")!,
      },
      {
        text: "Собрать требования по количеству пользователей и необходимому объему хранения данных.",
        isDone: true,
        taskId: taskMap.get("Выбор и закупка лицензии CRM")!,
      },
      {
        text: "Выбрать оптимальную CRM-систему на основе анализа и получить коммерческое предложение.",
        isDone: true,
        taskId: taskMap.get("Выбор и закупка лицензии CRM")!,
      },
      {
        text: "Определить и создать основные воронки продаж, отражающие бизнес-процессы компании.",
        isDone: false,
        taskId: taskMap.get("Настройка структуры CRM")!,
      },
      {
        text: "Кастомизировать поля для сделок и контактов, добавив специфические для проекта параметры.",
        isDone: true,
        taskId: taskMap.get("Настройка структуры CRM")!,
      },
      {
        text: "Настроить права доступа пользователей и создать профили для разных ролей (менеджер, руководитель).",
        isDone: false,
        taskId: taskMap.get("Настройка структуры CRM")!,
      },
      {
        text: "Экспортировать контакты и сделки из старой системы (или таблиц) в формат CSV/Excel.",
        isDone: true,
        taskId: taskMap.get("Импорт существующей базы")!,
      },
      {
        text: "Провести дедупликацию данных и стандартизировать форматы номеров телефонов и адресов электронной почты.",
        isDone: true,
        taskId: taskMap.get("Импорт существующей базы")!,
      },
      {
        text: "Осуществить пробный импорт небольшой партии данных в CRM для проверки корректности маппинга полей.",
        isDone: false,
        taskId: taskMap.get("Импорт существующей базы")!,
      },
      {
        text: "Собрать список корпоративных почтовых ящиков, подлежащих интеграции.",
        isDone: false,
        taskId: taskMap.get("Интеграция с корпоративной почтой")!,
      },
      {
        text: "Настроить параметры подключения корпоративной почты к CRM (IMAP/SMTP/OAuth).",
        isDone: true,
        taskId: taskMap.get("Интеграция с корпоративной почтой")!,
      },
      {
        text: "Протестировать автоматическое связывание входящей и исходящей почты со сделками/контактами.",
        isDone: true,
        taskId: taskMap.get("Интеграция с корпоративной почтой")!,
      },
      {
        text: "Разработать пошаговую инструкцию по созданию нового лида и конвертации его в сделку.",
        isDone: true,
        taskId: taskMap.get("Обучающие материалы по CRM")!,
      },
      {
        text: "Создать видео-гайд по работе с карточкой сделки, включая перенос по этапам воронки.",
        isDone: true,
        taskId: taskMap.get("Обучающие материалы по CRM")!,
      },
      {
        text: "Описать процесс использования встроенных инструментов коммуникации (звонки, почта) через CRM-интерфейс.",
        isDone: true,
        taskId: taskMap.get("Обучающие материалы по CRM")!,
      },
      {
        text: "Подготовить тестовый сценарий прохождения сделки, включающий 5-7 основных этапов воронки.",
        isDone: true,
        taskId: taskMap.get("Тестирование процесса продаж")!,
      },
      {
        text: "Провести симуляцию создания нового лида и автоматического назначения ответственного менеджера.",
        isDone: false,
        taskId: taskMap.get("Тестирование процесса продаж")!,
      },
      {
        text: "Проверить корректность создания автоматических задач и напоминаний при переходе сделки между этапами.",
        isDone: true,
        taskId: taskMap.get("Тестирование процесса продаж")!,
      },
      {
        text: "Определить три ключевые роли в CRM: Менеджер, Руководитель, Администратор.",
        isDone: true,
        taskId: taskMap.get("Настройка прав доступа (роли)")!,
      },
      {
        text: "Настроить права доступа для роли 'Менеджер' (доступ только к своим сделкам и контактам).",
        isDone: true,
        taskId: taskMap.get("Настройка прав доступа (роли)")!,
      },
      {
        text: "Настроить права для роли 'Руководитель' (доступ к сделкам всего отдела, просмотр отчетов).",
        isDone: true,
        taskId: taskMap.get("Настройка прав доступа (роли)")!,
      },
    ],
  });
}

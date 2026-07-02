# Разработка веб-приложения на Next.js

## Введение

Данная статья посвящена разработке приложения для управления проектами и задачами.

Проект получился достаточно большим, поэтому подробно рассматривать каждую его часть в рамках одной статьи было бы сложно.
Вместо этого я решил сосредоточиться на том как организована структура проекта, а также на используемых инструментах и подходах, которые использовались в процессе разработки.

В статье приведены намеренно упрощенные примеры кода, предназначенные исключительно для иллюстрации рассматриваемых подходов. В реальном проекте код существенно отличается.

### Ссылки

- Проект: https://taskry.ru
- GitHub: https://github.com/mark-aksarov/taskry
- Storybook: https://storybook.taskry.ru
- Видео-демонстрации: https://vkvideo.ru/video-239311905_456239022, https://vkvideo.ru/video-239311905_456239021

## Возможности

Приложение представляет собой систему для управления проектами и задачами, а также обеспечивает управление клиентами, командой и связанными сущностями.

Возможности которые реализует приложение: 

- Управление проектами: создание, редактирование, изменение статуса и удаление проектов
- Управление задачами: создание, редактирование, изменение статуса и удаление задач
- Подзадачи: добавление, редактирование, изменение статуса и удаление подзадач
- Категории проектов и задач: создание, редактирование и удаление категорий
- Команда и пользователи: управление пользователями и должностями
- Клиенты и компании: управление клиентами и компаниями
- Поиск, фильтрация и сортировка: быстрый поиск по проектам, задачам, клиентам и пользователям
- Комментарии: работа с комментариями внутри проектов и задач

## Структура проекта

Ниже представлена структура проекта, основанного на Next.js App Router. Папка `app` используется исключительно для маршрутизации, в которой маршруты для основных части приложения (auth, dashboard и site) организованы с помощью `Route Groups`, что позволяет использовать независимые `layout` для них. Остальные файлы и папки проекта находятся за пределами папки `app`.

```
├── app/
│   ├── [locale]/
│   │   ├── (auth)/                   # Роуты аутентификации
│   │   ├── (dashboard)/              # Роуты дашборда
│   │   ├── (site)/                   # Роуты лендинга и документации
│   │   └── layout.tsx
│   ├── api/                          # API-роуты (Route Handlers)
│   └── globals.css
├── auth/                             # Компоненты аутентификации
├── common/                           # Общие компоненты
├── cypress/                          # e2e тесты
├── dashboard/                        # Компоненты дашборда
├── i18n                              # Файлы конфигурации next-intl
├── icons                             # Компоненты иконок
├── markdown                          # markdown-контент для страниц: docs, privacy policy, terms of service
├── messages                          # JSON‑файлы переводов для всех локалей (ru, en)
├── mocks                             # Mock данные для storybook
├── lib/
│   ├── actions/                      # Серверные действия
│   ├── data/                         # Слой доступа к данным (DAL) и DTO-модели
│   ├── hooks/                        # Хуки
│   ├── schemas/                      # Схемы валидации (Zod)
│   ├── swr/                          # SWR хуки для работы с данными
│   ├── utils/                        # Вспомогательные утилиты
│   ├── auth-client.ts                # Клиентский экземпляр библиотеки Better Auth
│   ├── auth.ts                       # Серверная конфигурация библиотеки Better Auth
│   ├── mail.ts                       # Конфигурация nodemailer для отправки писем
│   ├── permissions.ts                # Роли и права доступа
│   ├── prisma.ts                     # Инициализация Prisma Client
│   └── types.ts                      # Типы для фильтрации, сортировки и контекстов
├── prisma/                           # схема, миграции и seed-данные
├── site/                             # Компоненты лендинга и документации
├── ui/                               # UIKit компоненты
├── public/                           # Статические файлы
├── .env.development.example          # Переменные окружения для разработки
├── .env.e2e.example                  # Переменные окружения для e2e-тестов
├── .env.integration.example          # Переменные окружения для интеграционных тестов
├── .env.production.example           # Переменные окружения для production
├── cypress.config.ts
├── docker-compose.e2e.yml            # Docker Compose для e2e-тестов
├── docker-compose.integration.yml    # Docker Compose для интеграционных тестов
├── docker-compose.production.yml     # Docker Compose для production
├── Dockerfile                        # Dockerfile для приложения
├── Dockerfile.dbinit                 # Dockerfile для инициализации базы данных
├── Dockerfile.storybook              # Dockerfile для Storybook
├── middleware.ts
├── next.config.ts
├── prisma.config.ts
├── vitest.config.ts
├── vitest.setup.integration.ts       # Настройка Vitest для интеграционных тестов
└── vitest.setup.ui.ts                # Настройка Vitest для UI-тестов
```

## UI Kit

UI Kit построен на основе React Aria — библиотеки нестилизованных React-компонентов и хуков, которые обеспечивают логику, поведение и доступность компонентов, а внешний вид компонентов полностью определяется разработчиком.

Для стилизации компонентов использовался Tailwind CSS. Помимо него в проекте используется библиотека Tailwind Variants — библиотека для удобного управления классами через варианты. В качестве примера готового UI Kit в репозитории react-spectrum доступен Starter Kit, в котором используются вышеупомянутые библиотеки, ссылка на который приведена ниже.

Ниже приведена структура компонентов UI Kit. 

```
ui/
├── Badge/
├── BottomSheet/
├── Breadcrumbs/
├── Button/
├── Checkbox/
├── CheckboxGroup/
├── DatePicker/
├── Dialog/
├── Disclosure/
├── Link/
├── Menu/
├── Modal/
├── ProgressBar/
├── SearchField/
├── Select/
├── SideSheet/
├── Skeleton/
├── Switch/
├── TextField/
├── Toast/
├── ToggleButtonGroup/
├── Field.tsx
├── I18nProvider.tsx
├── Popover.tsx
├── RouterProvider.tsx
├── Separator.tsx
└── styles.ts
```

С момента разработки UI Kit документация React Aria была сильно изменена, поэтому некоторые подходы могут не совпадать с актуальными.

### Ссылки

- React Aria Starter Kit: https://github.com/adobe/react-spectrum/tree/main/starters/tailwind

## Storybook

Storybook был использован для изолированной разработки UI-компонентов. Он позволяет разрабатывать компоненты любой сложности — от небольших компонентов до полноценных страниц.

При разработке компонентов UI Kit использование Storybook не вызывало сложностей. Однако по мере роста сложности компонентов появлялась дополнительная логика, связанная с загрузкой данных, например с помощью `Prisma` или `SWR`. Для отображения таких компонентов в Storybook обычно приходится имитировать внешние зависимости.

### Презентационные компоненты

Чтобы избежать создания сложных моков и упростить разработку компонентов в Storybook, компоненты были разделены на контейнерные и презентационные. При таком подходе презентационные компоненты содержат только логику отображения и не зависят от источника данных, а вся логика загрузки данных выносится в контейнерные компоненты. Благодаря этому презентационные компоненты можно использовать в Storybook без дополнительной настройки. Ниже приведён упрощённый пример такого разделения.

Презентационные компоненты используются исключительно для отображения UI.

```tsx
interface Props {
  dataContainer: React.ReactNode;
}

export function PagePresentational({ dataContainer }: Props) {
  return <div>{dataContainer}</div>;
}
```

`DataContainer` отвечает за загрузку данных.

```tsx
export async function DataContainer() {
  const data = await getData();

  // ...
}
```

`PageContainer` объединяет презентационный компонент и контейнер, отвечающий за получение данных. Контейнер данных передается в презентационный компонент через проп `dataContainer`, благодаря чему последний остается независимым от загрузки данных.

```tsx
export function PageContainer() {
  return (
    <PagePresentational 
      dataContainer={<DataContainer />} 
    />
  )
}
```

Если бы контейнер был встроен непосредственно в компонент страницы, для Storybook пришлось бы создавать сложные моки, чтобы имитировать загрузку данных. Передача контейнера через пропсы позволяет этого избежать. Вместо реального контейнера в `stories` передается его упрощенная заглушка через проп `dataContainer`.

```tsx
const meta = {
  title: "pages/PagePresentational",
  component: PagePresentational,
} satisfies Meta<typeof PagePresentational>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataContainer: (
      <div>
        <div>Задача 1</div>
        <div>Задача 2</div>
        <div>Задача 3</div>
      </div>
    ),
  },
};
```

### Mocking providers

Если для рендеринга компонентов требуются данные извне, также можно использовать `decorators`, чтобы предоставлять эти данные в виде моков, без необходимости изменять компоненты и передавать эти данные через аргументы `args`.

Например, компонент `UIComponent` получает данные из `DataContext`:

```tsx
export function UIComponent() {
  const value = useContext(DataContext);

  return <div>{value}</div>;
}
```

Чтобы такой компонент работал корректно, ему нужен соответствующий `Provider`:

```tsx
interface Props {
  value: any;
  children: React.ReactNode;
}

export function DataProvider({ value, children }: Props) {
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
```

Чтобы имитировать работу провайдера, можно обернуть компонент в `decorator`, который предоставляет необходимый контекст:

```tsx
export const withDataProvider: Decorator = (Story) => {
  return (
    <DataProvider value="mocked data">
      <Story />
    </DataProvider>
  );
};
```

В этом случае достаточно подключить созданный `decorator` в `stories`:

```tsx
const meta = {
  component: UIComponent,
  decorators: [withDataProvider],
} satisfies Meta<typeof UIComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

По ссылкам ниже можно найти детальное описание этих подходов в Storybook.

### Ссылки

- Создание страниц с помощью Storybook: https://storybook.js.org/docs/writing-stories/build-pages-with-storybook
- Имитация провайдеров: https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-providers
- Подключение данных к UI-компоненту: https://storybook.js.org/tutorials/intro-to-storybook/react/en/data

## Аутентификация

В качестве системы аутентификации была использована библиотека Better Auth. Она предоставляет полный набор функций «из коробки» и включает экосистему плагинов, упрощающую добавление расширенных возможностей.

На данный момент реализован следующий функционал:

- вход / регистрация по электронной почте
- смена пароля
- восстановление пароля
- удаление пользователя
- управление ролями и контроль доступа

На текущем этапе планируется дальнейшее улучшение системы аутентификации:

- Внедрение плагина organization для поддержки организаций (workspaces), участников, ролей, команд и инвайтов
- Добавление социальной аутентификации через VK, Google, Yandex и другие сервисы
- Обновление версии Better Auth до актуальной для поддержки новых возможностей (включая i18n и другие улучшения экосистемы)

## Манипуляции с данными

В этом разделе описываются основные подходы к работе с данными: централизованный доступ к данным через `DAL`, загрузка данных в серверных и клиентских компонентах, а также обновление данных через серверные функции.

### Data Access Layer

Работа с данными осуществляется через слой доступа к данным (`DAL`) — внутреннюю серверную библиотеку, которая отвечает за управление процессом получения данных, проверку прав доступа, а также формирование `DTO` для передачи данных. `DAL` обеспечивает централизованную логику авторизации и выполнение запросов к базе данных через Prisma ORM.

В примере ниже `requireSession` используется для получения текущей сессии пользователя и проверки авторизации. Она гарантирует, что дальнейшие операции выполняются только для авторизованного пользователя.

```tsx
export async function requireSession() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });
  
  if (!session) {
    throw new UnauthorizedError();
  }

  return session;
}
```

После успешной проверки выполняется запрос к базе данных через Prisma ORM. Затем полученная модель преобразуется в `DTO`, содержащий только те поля, которые необходимы вызывающему коду.

```tsx
export const getUser = cache(
  async (id: string): Promise<UserDTO | null> => {
    // Авторизация
    const session = await requireSession();

    // Запрос к БД
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    // преобразование в DTO
    return {
      id: user.id,
      fullName: user.fullName,
    };
  },
);
```

### Загрузка данных

Загрузка данных осуществляется как в серверных, так и в клиентских компонентах. В обоих случаях она ограничена либо компонентами-контейнерами либо файлами маршрутов (`layout.tsx`, `page.tsx`, `route.ts`), которые в свою очередь загружают данные через `DAL`.

В примере ниже загрузка данных выполняется в серверном компоненте-контейнере через `DAL`.

```tsx
interface UserContainerProps {
  userId: string;
}

export async function UserContainer({
  userId,
}: UserContainerProps) {
  // Получение данных через DAL
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  // Отображение данных в UI-компоненте
  return (
    <UserDetail
      id={user.id}
      fullName={user.fullName}
    />
  );
}
```

В следующем примере загрузка данных выполняется в клиентском компоненте-контейнере с использованием библиотеки `SWR`.

```tsx
interface UserContainerProps {
  userId: string;
}

export function UserContainer({ 
  userId 
}: UserContainerProps) {
  const { data: user, error } = useSWR<UserDTO>(`/api/users/${userId}`);

  if (error) {
    throw new Error();
  }

  // Отображение данных в UI-компоненте
  return (
    <UserDetail
      id={user.id}
      fullName={user.fullName}
    />
  );
}
```

Вся логика авторизации, проверки прав доступа, валидации и взаимодействия с `DAL` находится в соответсвующем обработчике запроса в файле `route.ts`:

```tsx
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Авторизация
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    // Валидация данных
    const { id } = schema.parse(await params);

    // Загрузка пользователя из DAL
    const user = await getUser(id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Обновление данных

Обновление данных осуществляется с использованием серверных функций (`Server Functions`) — асинхронных функций, выполняемых на сервере и вызываемых с клиента посредством сетевого запроса.

В примере ниже показана серверная функция `createUser`: она выполняет проверку авторизации, выполняет валидацию входных данных, а затем выполняет создание пользователя через `DAL`.

```tsx
export async function createUser(formData: FormData) {
  // Авторизация
  await requireSessionOrRedirect();

  try {
    // Валидация
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    // Создание пользователя в DAL
    await createUserQuery(parsedData);

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
    };
  }
}
```

## i18n

### Ссылки

- сторибук - https://next-intl.dev/docs/workflows/storybook
- удобный плагин - https://next-intl.dev/docs/workflows/vscode-integration

## Тестирование

### Unit тесты

Основная часть unit тестов используется для тестирования UIKit

### Интеграционные тесты

Интеграционные тесты используются для тестирования DAL

### e2e тесты

В папке cypress находятся e2e тесты

### Ссылки

- https://www.prisma.io/docs/orm/v6/prisma-client/testing/integration-testing

```
cypress/
├── e2e/
│   ├── comments/
│   ├── company/
│   ├── customers/
│   ├── dashboard/
│   ├── positions/
│   ├── project-categories/
│   ├── projects/
│   ├── subtasks/
│   ├── task-categories/
│   ├── tasks/
│   └── users/
├── support/
└── tsconfig.json
```

## Итоги

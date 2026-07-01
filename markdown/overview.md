# Разработка веб-приложения на Next.js

## Введение

Данная статья посвящена разработке SaaS-приложения для управления задачами. В ней будет рассказано об инструментах и подходах, которые использовались в процессе разработки.

Проект получился достаточно большим, поэтому подробно рассматривать каждую его часть в рамках одной статьи было бы сложно.
Вместо этого я решил сосредоточиться на том как организована структура проекта, а также на используемых инструментах и популярных паттернах, которые были использованы во время разработки.

Ссылки

- Проект: https://taskry.ru
- GitHub: https://github.com/mark-aksarov/taskry
- Storybook: https://storybook.taskry.ru
- Видео-демонстрации: https://vkvideo.ru/video-239311905_456239022, https://vkvideo.ru/video-239311905_456239021

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

Для стилизации компонентов использовался Tailwind CSS. Помимо него в проекте используется библиотека Tailwind Variants — утилита для удобного управления классами через варианты. В качестве примера готового UI Kit в репозитории react-spectrum доступен Starter Kit, ссылка на который приведена ниже.

При необходимости компоненты можно полностью кастомизировать с помощью встроенных хуков. Например, компонент `Select` был кастомизирован с использованием хука `useSelect` из React Aria и может использовать различные варианты отображения (`Popover` и `BottomSheet`).

### Ссылки

- React Aria Starter Kit: https://github.com/adobe/react-spectrum/tree/main/starters/tailwind
- `useSelect`: https://react-aria.adobe.com/Select/useSelect.html
- `Popover`: https://storybook.taskry.ru/?path=/story/ui-select--default
- `BottomSheet`: https://storybook.taskry.ru/?path=/story/ui-select--with-sheet

Ниже приведена структура компонентов UI Kit. Поскольку с момента разработки UI Kit документация React Aria была сильно изменена, некоторые подходы могут не совпадать с актуальными.

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

## Storybook

Для изолированной разработки UI-компонентов использовался Storybook. Он позволяет разрабатывать компоненты любой сложности — от небольших компонентов до полноценных страниц.

При разработке компонентов UI Kit использование Storybook не вызывало сложностей. Однако по мере роста сложности компонентов появлялась дополнительная логика, связанная с загрузкой данных, например с помощью `Prisma` или `SWR`. Для отображения таких компонентов в Storybook обычно приходится имитировать внешние зависимости.

### Контейнерные и презентационные компоненты

Чтобы избежать создания сложных моков и сохранить презентационные компоненты независимыми от источника данных, компоненты были разделены на контейнерные и презентационные.

Контейнерные компоненты отвечают за получение данных.

```tsx
async function DataContainer() {
  const data = await getData();

  return <div>Загружено {data.length} элемента</div>;
}
```

Контейнер страницы отвечает за композицию: он объединяет презентационный компонент и контейнер для получения данных, передавая последний через проп `dataContainer`.

```tsx
function PageContainer() {
  return <PagePresentational dataContainer={<DataContainer />} />;
}
```

В этом компоненте через проп `dataContainer` передается контейнерный компонент, отвечающий за загрузку данных. Благодаря этому в Storybook его можно заменить простой заглушкой, не зависящей от логики загрузки данных.

Презентационные компоненты используются исключительно для отображения UI.

```tsx
type Props = {
  dataContainer: React.ReactNode;
};

function PagePresentational({ dataContainer }: Props) {
  return <div>{dataContainer}</div>;
}
```

Если бы контейнер был встроен непосредственно в компонент страницы, для Storybook пришлось бы создавать сложные моки, чтобы имитировать загрузку данных. Передача контейнера через пропсы позволяет этого избежать. Вместо реального контейнера в `stories` передается его упрощенная заглушка через проп `dataContainer`.

```tsx
import { PagePresentational } from "./PagePresentational";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/PagePresentational",
  component: PagePresentational,
} satisfies Meta<typeof PagePresentational>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataContainer: <div>Загружено 3 элемента</div>,
  },
};
```

### Mocking providers

Еще один способ передавать фиктивные данные в компонент — `Mocking providers`: в этом случае в `stories` используется соответствующий `decorator`, который предоставляет нужный контекст.

Например, компонент `UIComponent` получает данные из `DataContext`:

```tsx
function UIComponent() {
  const value = useContext(DataContext);

  return <div>{value}</div>;
}
```

Чтобы такой компонент работал корректно, ему нужен соответствующий `Provider`:

```tsx
function DataProvider({ value, children }: CreateTaskProviderProps) {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
```

В Storybook вместо реального провайдера можно использовать `decorator`, который передает фиктивные данные:

```tsx
export const withDataProvider: Decorator = (Story) => {
  return (
    <DataProvider value="mocked data">
      <Story />
    </DataProvider>
  );
};
```

В этом случае достаточно подключить созданный `decorator` в `stories`, после чего компонент будет получать данные из фиктивного провайдера:

```tsx
const meta = {
  component: Component,
  decorators: [withDataProvider],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

По ссылкам ниже можно найти детальное описание этих подходов в Storybook, включая разделение контейнерных и презентационных компонентов, а также использование mocking providers для изоляции зависимостей и данных в сторисах.

### Ссылки

- Создание страниц с помощью Storybook: https://storybook.js.org/docs/writing-stories/build-pages-with-storybook
- Имитация провайдеров: https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-providers
- Подключение данных к UI-компоненту: https://storybook.js.org/tutorials/intro-to-storybook/react/en/data

## Аутентификация

В качестве системы аутентификации была использована библиотека Better Auth

## Манипуляции с данными

### Ссылки

- https://nextjs.org/docs/15/app/guides/data-security
- https://nextjs.org/docs/15/app/guides/authentication

## Локализация

### Ссылки

- сторибук - https://next-intl.dev/docs/workflows/storybook
- удобный плагин - https://next-intl.dev/docs/workflows/vscode-integration

## Тестирование

### Unit тесты

Основная часть unit тестов используется для тестирования UIKit

### Интеграционные тесты

Интеграционные тесты используются для тестирования DAL

### Ссылки

- https://www.prisma.io/docs/orm/v6/prisma-client/testing/integration-testing

### e2e тесты

В папке cypress находятся e2e тесты

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

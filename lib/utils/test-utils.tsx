import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import messages from "@/messages/en";
import React, { ReactElement } from "react";
import { NextIntlClientProvider } from "next-intl";
import { render, RenderOptions } from "@testing-library/react";

const context: GlobalContainerContextType = {
  EditProjectFormContainer: () => <div />,
  EditTaskFormContainer: () => <div />,
  CustomerDetailContainer: () => <div />,
  EditCustomerFormContainer: () => <div />,
  NotificationModalContentContainer: () => <div />,
  ProjectCommentsContainer: () => <div />,
  ProjectDetailContainer: () => <div />,
  TaskCommentsContainer: () => <div />,
  TaskDetailContainer: () => <div />,
  UserDetailContainer: () => <div />,
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalContainerProvider value={context}>
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
      </NextIntlClientProvider>
    </GlobalContainerProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

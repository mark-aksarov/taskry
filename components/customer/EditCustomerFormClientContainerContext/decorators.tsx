import React from "react";
import { type Decorator } from "@storybook/react";
import { EditCustomerForm } from "../EditCustomerForm/EditCustomerForm";
import { Default as CustomerFormBaseStory } from "../CustomerFormBase/CustomerFormBase.stories";
import { EditCustomerFormClientContainerProvider } from "./EditCustomerFormClientContainerContext";

export const withEditCustomerForm: Decorator = (Story) => {
  return (
    <EditCustomerFormClientContainerProvider
      value={() => (
        <EditCustomerForm
          {...CustomerFormBaseStory.args}
          customerId={1}
          fullNameDefaultValue="John Doe"
          bioDefaultValue="Tech enthusiast based in NYC."
          emailDefaultValue="alex@example.com"
          phoneNumberDefaultValue="555-987-6543"
          publicLinkDefaultValue="https://twitter.com/alex_dev"
        />
      )}
    >
      <Story />
    </EditCustomerFormClientContainerProvider>
  );
};

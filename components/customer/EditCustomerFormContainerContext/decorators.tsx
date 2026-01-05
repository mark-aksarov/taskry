import React from "react";
import { type Decorator } from "@storybook/react";
import { EditCustomerForm } from "../EditCustomerForm/EditCustomerForm";
import { EditCustomerFormContainerProvider } from "./EditCustomerFormContainerContext";
import { Default as CustomerFormBaseStory } from "../CustomerFormBase/CustomerFormBase.stories";

export const withEditCustomerForm: Decorator = (Story) => {
  return (
    <EditCustomerFormContainerProvider
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
    </EditCustomerFormContainerProvider>
  );
};

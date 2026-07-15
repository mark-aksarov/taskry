import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
} from "@/site/common/Accordion";

import {
  PageSection,
  PageSectionHeader,
  PageSectionHeading,
  PageSectionContent,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/site/common/PageContainer";

export function FaqSection() {
  const t = useTranslations("site.home.FaqSection");

  return (
    <PageSection>
      <PageContainer>
        <PageSectionContent className="items-center">
          <PageSectionHeader>
            <PageSectionHeading>{t("heading")}</PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          <Accordion>
            <AccordionItem>
              <AccordionHeader>
                {t("accordion.whatIsTaskry.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.whatIsTaskry.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                {t("accordion.teamCollaboration.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.teamCollaboration.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                {t("accordion.dataSecurity.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.dataSecurity.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                {t("accordion.mobileSupport.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.mobileSupport.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                {t("accordion.freeToUse.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.freeToUse.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                {t("accordion.integrations.title")}
              </AccordionHeader>
              <AccordionPanel>
                <AccordionContent>
                  {t("accordion.integrations.content")}
                </AccordionContent>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}

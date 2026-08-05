import { HStack, Stack, Text, useMediaQuery } from "@chakra-ui/react"

import FormContainer from "@/components/containers/FormContainer"
import PageTitle from "@/components/generic/PageTitle"
import StickyTitleWithBackButton from "@/components/navigation/StickyTitleWithBackButton"
import {
  dashboardPageIntroTextStyles,
  dashboardPageIntroWrapStyles,
  resM,
} from "@/utils/css-chakra"

function PageHeaderWrapper({
  pageTitle,
  pageDescription = null,
  pageIcon = null,
  mobileBackButtonEnabled = true,
  desktopTitleBreadCrumb = null,
  contentMaxW = "1000px",
  titleNs,
  titleKey = "page-title",
  documentTitle,
}) {
  const [isDesktop] = useMediaQuery("(min-width: 768px)")

  return (
    <>
      <PageTitle
        ns={titleNs}
        title={documentTitle ?? pageTitle}
        titleKey={titleKey}
      />

      {!isDesktop ? (
        <StickyTitleWithBackButton
          pageTitle={pageTitle}
          backButton={mobileBackButtonEnabled}
          icon={pageIcon}
        />
      ) : null}

      <FormContainer maxW={contentMaxW}>
        {isDesktop
          ? desktopTitleBreadCrumb || (
              <HStack spacing={3} my={1} mx={resM} align="center">
                {pageIcon}
                <Stack>
                  <Text fontWeight="bold" fontSize="lg">
                    {pageTitle}
                  </Text>
                </Stack>
              </HStack>
            )
          : null}

        {pageDescription ? (
          <Stack {...dashboardPageIntroWrapStyles} mx={resM}>
            <Text {...dashboardPageIntroTextStyles}>{pageDescription}</Text>
          </Stack>
        ) : null}
      </FormContainer>
    </>
  )
}

export default PageHeaderWrapper

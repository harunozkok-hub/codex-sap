import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"

function AccessRequired() {
  const { t } = useTranslation(["dashboard", "common"])
  const params = useParams()

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <PageTitle ns="dashboard" titleKey="onboarding-access-required-title" />
      <GlassEffectContainer maxW="lg" w="100%" mx={resPX} mb={resPY}>
        <Stack gap="2" align="center" textAlign="center">
          <Heading
            {...dashboardSectionTitleTextStyles}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.2"
          >
            {t("onboarding-access-required-title")}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="46ch"
          >
            {t("onboarding-access-required-description")}
          </Text>
        </Stack>

        <HStack justify="center" w="100%" pt="2" gap="3">
          <SecondaryButton
            to={`/${params.lang}/logout`}
            label={t("common:logout")}
            minW="124px"
          />
          <PrimaryButton
            to={`/${params.lang}`}
            label={t("onboarding-access-required-cta")}
            minW="180px"
          />
        </HStack>
      </GlassEffectContainer>
    </Flex>
  )
}

export default AccessRequired

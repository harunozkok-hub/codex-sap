import { Flex, Heading, Stack, Text, HStack, Avatar } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useSuspenseQuery } from "@tanstack/react-query"
import { LuArrowRight } from "react-icons/lu"
import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
  dashboardSectionHeaderStyles,
} from "@/utils/css-chakra"
import { sessionQuery } from "@/queries/profile-queries"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import CustomCard from "@/components/generic/CustomCard"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"

function Welcome() {
  const { t } = useTranslation("dashboard")
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const { data: companyOnboarding } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )

  const companyName = companyOnboarding?.company?.name ?? ""
  const fullName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ")
    .toUpperCase()

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <PageTitle ns="dashboard" titleKey="onboarding-welcome-title" />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={1}
          indicatorSize={{ base: "4", md: "4.5" }}
        />
      </Stack>
      <GlassEffectContainer maxW="lg" w="100%" mx={resPX} mb={resPY}>
        <Heading
          {...dashboardSectionTitleTextStyles}
          fontSize={{ base: "xl", md: "2xl" }}
          lineHeight="1.2"
          textAlign="center"
        >
          {t("onboarding-welcome-title")}
        </Heading>
        <Stack align="center" textAlign="center" gap="2">
          <Text {...dashboardPageIntroTextStyles} maxW="42ch">
            {t("onboarding-welcome-description")}
          </Text>
        </Stack>

        <CustomCard>
          <Stack
            align="center"
            gap="1"
            {...dashboardSectionHeaderStyles}
            borderTopColor="rgba(255,255,255,0.1)"
            my="0"
          >
            <Text
              {...dashboardSectionTitleTextStyles}
              fontSize={{ base: "lg", md: "xl" }}
            >
              {companyName}
            </Text>
            <Text {...dashboardPageIntroTextStyles}>
              {t("onboarding-welcome-company-workspace")}
            </Text>
          </Stack>
          <HStack gap={5} mt="3" align="center" justify="center">
            <Avatar.Root colorPalette="purple" size="xl">
              <Avatar.Fallback />
            </Avatar.Root>
            <Stack>
              <Text {...dashboardSectionTitleTextStyles} fontSize="md">
                {fullName}
              </Text>
              <Text {...dashboardPageIntroTextStyles}>
                {t("onboarding-welcome-account-owner")}
              </Text>
            </Stack>
          </HStack>
        </CustomCard>
        <HStack justifyContent="center" align="center" mt={5} w="100%">
          <PrimaryButton
            label={t("onboarding-welcome-cta")}
            h="50px"
            minW="160px"
            to="../company-country"
            iconRight={<LuArrowRight />}
          />
        </HStack>
      </GlassEffectContainer>
    </Flex>
  )
}

export default Welcome

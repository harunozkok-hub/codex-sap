import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { Form, useActionData, useNavigation } from "react-router"
import { useSuspenseQuery } from "@tanstack/react-query"

import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"
import { clearFieldErrorFromErrors, isFormDifferent } from "@/utils/validators"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import FormSelect from "@/components/form/FormSelect"
import LanguageSelector from "@/components/generic/LanguageSelector"
import FormAlert from "@/components/form/FormAlert"
import { currencies, europeTimezones } from "@/utils/country"
import { mapPreferencesToForm } from "./util/dashboard-onboarding"

function Preferences() {
  const { t } = useTranslation(["dashboard", "common"])
  const { data: dashboardOnboardingItem } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"
  const initialFormData = useMemo(
    () => mapPreferencesToForm(dashboardOnboardingItem),
    [dashboardOnboardingItem],
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialFormData, formData)
  const timezoneError = errors?.timezone
  const currencyError = errors?.currency
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.errors) {
      // Existing form pattern: copy latest action errors into local state so
      // inputs can clear field-by-field as the user edits.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(actionData.errors)
    }
  }, [actionData, navigation.state])

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target.name))
  }

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <PageTitle ns="dashboard" titleKey="onboarding-preferences-title" />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={5}
          indicatorSize={{ base: "4", md: "4.5" }}
        />
      </Stack>
      <GlassEffectContainer maxW="lg" w="100%" mx={resPX} mb={resPY}>
        <Stack gap="2" align="center" textAlign="center">
          <Heading
            {...dashboardSectionTitleTextStyles}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.2"
          >
            {t("onboarding-preferences-title")}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="42ch"
          >
            {t("onboarding-preferences-description")}
          </Text>
        </Stack>
        <Form method="PUT" action="." style={{ width: "100%" }}>
          <input
            type="hidden"
            name="isDirty"
            value={formDirty ? "true" : "false"}
          />
          <Stack gap="5" py="2">
            <FormSelect
              inputName="timezone"
              value={formData.timezone}
              onChange={handleFormData}
              error={timezoneError}
              required
              placeholder={t("onboarding-preferences-timezone-placeholder")}
              label={t("onboarding-preferences-timezone-label")}
              selectList={europeTimezones}
            />
            <FormSelect
              inputName="currency"
              value={formData.currency}
              onChange={handleFormData}
              error={currencyError}
              required
              label={t("onboarding-preferences-currency-label")}
              selectList={currencies(t)}
              placeholder={t("onboarding-preferences-currency-placeholder")}
              tooltipInfo={t("onboarding-preferences-currency-tooltip")}
            />
            <LanguageSelector
              label={t("onboarding-preferences-language-label")}
              tooltipInfo={t("onboarding-preferences-language-tooltip")}
            />
          </Stack>
          {formSubmitError && (
            <FormAlert status="error" mt="3" title={formSubmitError} />
          )}
          <HStack justify="space-between" w="100%" pt="5">
            <SecondaryButton
              neutral
              to="../company-address"
              label={t("common:back")}
              minW="124px"
              iconLeft={<LuArrowLeft />}
              loading={pending}
            />
            <PrimaryButton
              type="submit"
              label={t("common:next")}
              minW="160px"
              iconRight={<LuArrowRight />}
              loading={pending}
            />
          </HStack>
        </Form>
      </GlassEffectContainer>
    </Flex>
  )
}

export default Preferences

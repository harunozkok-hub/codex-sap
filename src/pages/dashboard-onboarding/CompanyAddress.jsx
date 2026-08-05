import { Flex, Heading, HStack, Separator, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import {
  useOutletContext,
  useNavigation,
  useActionData,
  Form,
} from "react-router"
import { useEffect, useId, useState, useMemo } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"
import { clearFieldErrorFromErrors, isFormDifferent } from "@/utils/validators"
import { mapAddressToForm } from "@/components/form/util/address-input"
import {
  dashboardPageIntroTextStyles,
  dashboardSectionHeaderStyles,
  dashboardSectionTitleTextStyles,
  resM,
  resPX,
  resPY,
} from "@/utils/css-chakra"

import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import AddressInput from "@/components/form/AddressInput"
import FormAlert from "@/components/form/FormAlert"
import FormRadioGroup from "@/components/form/FormRadioGroup"

function CompanyAddress() {
  const { t } = useTranslation(["dashboard", "company-profile", "common"])
  const { setBlockerState } = useOutletContext()
  const blockerId = useId()

  const { data: companyOnboardingData } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const userCountry = companyOnboardingData?.company?.company_location_code

  const initialFormData = useMemo(
    () => ({
      hqAddress: mapAddressToForm(companyOnboardingData?.addresses?.hq),
      billingAddressMode: companyOnboardingData?.addresses?.billing
        ? "use-hq-address"
        : "enter-billing-later",
    }),
    [companyOnboardingData],
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialFormData, formData)
  const formSubmitError = errors?.form

  useEffect(() => {
    setBlockerState(blockerId, formDirty)
    return () => setBlockerState(blockerId, false)
  }, [blockerId, formDirty, setBlockerState])

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.errors) {
      // Existing form pattern: copy latest action errors into local state so
      // inputs can clear field-by-field as the user edits.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(actionData.errors)
    }
  }, [actionData, navigation.state])

  const handleHQAddressChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hqAddress: {
        ...prev.hqAddress,
        [e.target.name]: e.target.value,
      },
    }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target.name))
  }

  const handleBillingAddressModeChange = ({ value }) => {
    setFormData((prev) => ({
      ...prev,
      billingAddressMode: value,
    }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, "billingAddressMode"))
  }

  const handleHQAddressFormDataChange = (updater) => {
    setFormData((prev) => ({
      ...prev,
      hqAddress: updater(prev.hqAddress),
    }))
  }

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <PageTitle ns="dashboard" titleKey="onboarding-company-address-title" />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={4}
          indicatorSize={{ base: "4", md: "4.5" }}
        />
      </Stack>
      <GlassEffectContainer maxW="3xl" w="100%" mx={resPX} mb={resPY} px="2rem">
        <Stack gap="2" align="center" textAlign="center">
          <Heading
            {...dashboardSectionTitleTextStyles}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.2"
          >
            {t("onboarding-company-address-title")}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="48ch"
          >
            {t("onboarding-company-address-description")}
          </Text>
        </Stack>
        <Form method="PUT" style={{ width: "100%" }}>
          <input
            type="hidden"
            name="isDirty"
            value={formDirty ? "true" : "false"}
          />
          <Stack {...dashboardSectionHeaderStyles}>
            <Text {...dashboardSectionTitleTextStyles} color="purple.800">
              {t("company-profile:hq-address")}
            </Text>
          </Stack>
          <AddressInput
            mb={resM}
            formData={formData.hqAddress}
            errors={errors}
            onChange={handleHQAddressChange}
            onFormDataChange={handleHQAddressFormDataChange}
            country={userCountry}
          />
          <Stack {...dashboardSectionHeaderStyles}>
            <Text {...dashboardSectionTitleTextStyles} color="purple.800">
              {t("company-profile:billing-address")}
            </Text>
          </Stack>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="left"
            maxW="58ch"
            mb="3"
          >
            {t("onboarding-company-address-billing-description")}
          </Text>
          <FormRadioGroup
            inputName="billingAddressMode"
            value={formData.billingAddressMode}
            onValueChange={handleBillingAddressModeChange}
            options={[
              {
                value: "use-hq-address",
                label: t("onboarding-company-address-use-hq-as-billing"),
              },
              {
                value: "enter-billing-later",
                label: t("onboarding-company-address-enter-billing-later"),
              },
            ]}
          />
          {formSubmitError && (
            <FormAlert status="error" mt="3" title={formSubmitError} />
          )}

          <HStack justify="space-between" w="100%" pt={resM}>
            <SecondaryButton
              neutral
              to="../company-legal-info"
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

export default CompanyAddress

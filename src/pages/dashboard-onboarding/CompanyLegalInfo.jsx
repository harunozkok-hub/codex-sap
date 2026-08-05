import {
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useId, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"
import { mapCompanyLegalInfoToForm } from "./util/dashboard-onboarding"
import { isFormDifferent, clearFieldErrorFromErrors } from "@/utils/validators"

import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import FormInput from "@/components/form/FormInput"
import FormCheckbox from "@/components/form/FormCheckbox"
import FormAlert from "@/components/form/FormAlert"

function CompanyLegalInfo() {
  const { t } = useTranslation(["dashboard", "company-profile", "common"])
  const { setBlockerState } = useOutletContext()
  const blockerId = useId()

  const { data: companyLegalInfoData } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"
  const initialFormData = useMemo(
    () => mapCompanyLegalInfoToForm(companyLegalInfoData),
    [companyLegalInfoData],
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialFormData, formData)

  const legalNameError = errors?.legalName
  const billingEmailError = errors?.billingEmail

  const vatNumberError = errors?.vatNumber
  const legalIdError = errors?.legalId
  const formSubmitError = errors?.form

  const legalNameCopied = initialFormData.name === formData.legalName

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

  const handleCopyNameToLegalName = (e) => {
    if (e.checked) {
      setFormData((prev) => ({ ...prev, legalName: initialFormData.name }))
      setErrors((prev) => clearFieldErrorFromErrors(prev, "legalName"))
    } else {
      setFormData((prev) => ({ ...prev, legalName: "" }))
      setErrors((prev) => clearFieldErrorFromErrors(prev, "legalName"))
    }
  }

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
      <PageTitle ns="dashboard" titleKey="onboarding-company-legal-title" />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={3}
          indicatorSize={{ base: "4", md: "4.5" }}
        />
      </Stack>
      <GlassEffectContainer maxW="xl" w="100%" mx={resPX} mb={resPY}>
        <Stack gap="2" align="center" textAlign="center">
          <Heading
            {...dashboardSectionTitleTextStyles}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.2"
          >
            {t("onboarding-company-legal-title")}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="42ch"
          >
            {t("onboarding-company-legal-description")}
          </Text>
        </Stack>
        <Form method="PUT" style={{ width: "100%" }}>
          <input
            type="hidden"
            name="isDirty"
            value={formDirty ? "true" : "false"}
          />
          <SimpleGrid minChildWidth="xs" gap="5">
            <VStack gap={0}>
              <FormInput
                required
                value={formData?.legalName}
                inputName="legalName"
                placeholder={t("company-profile:legal-name-placeholder")}
                label={t("company-profile:legal-name")}
                error={legalNameError}
                onChange={handleFormData}
                tooltipInfo={t("company-profile:legal-name-tooltip")}
              />
              <FormCheckbox
                checked={legalNameCopied}
                inputName="legalNameCopied"
                onCheckedChange={handleCopyNameToLegalName}
                text={t("dashboard:onboarding-company-legal-copy-name")}
                labelPosition="right"
              />
            </VStack>
            <FormInput
              required
              inputName="billingEmail"
              placeholder={t("company-profile:billing-email-placeholder")}
              value={formData?.billingEmail}
              onChange={handleFormData}
              label={t("company-profile:billing-email")}
              error={billingEmailError}
              tooltipInfo={t("company-profile:biling-email-tooltip")}
            />
            <FormInput
              required={formData.vatNumberRequired}
              inputName="vatNumber"
              placeholder={
                formData.vatNumberPlaceholder ||
                t("company-profile:vat-number-placeholder")
              }
              value={formData?.vatNumber}
              onChange={handleFormData}
              label={formData.vatNumberLabel || t("company-profile:vat-number")}
              error={vatNumberError}
              tooltipInfo={t("company-profile:vat-number-tooltip")}
            />
            {formData.legalIdRequired && (
              <FormInput
                required={formData.legalIdRequired}
                inputName="legalId"
                placeholder={
                  formData.legalIdPlaceholder ||
                  t("company-profile:legal-id-placeholder")
                }
                value={formData?.legalId}
                onChange={handleFormData}
                label={formData.legalIdLabel}
                error={legalIdError}
                tooltipInfo={t(
                  "dashboard:onboarding-company-legal-id-tooltip",
                  {
                    legalIdLabel: formData.legalIdLabel,
                  },
                )}
              />
            )}
          </SimpleGrid>
          {formSubmitError && (
            <FormAlert status="error" mt="3" title={formSubmitError} />
          )}
          <HStack justify="space-between" w="100%" pt="7">
            <SecondaryButton
              neutral
              to="../company-country"
              label={t("common:back")}
              minW="124px"
              iconLeft={<LuArrowLeft />}
              loading={pending}
            />
            <PrimaryButton
              label={t("common:next")}
              type="submit"
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

export default CompanyLegalInfo

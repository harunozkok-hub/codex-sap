import { Flex, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useState, useEffect, useMemo } from "react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { Form, useActionData, useNavigation } from "react-router"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"
import { country } from "@/utils/country"
import { LANGUAGES } from "@/utils/languages"
import { useCountry } from "@/utils/hooks/useGeolocationCountry"
import {
  dashboardOnboardingQuery,
  dashboardOndoardingMetadataQuery,
} from "@/queries/dashboard-queries"
import { mapCompanyContextToForm } from "./util/dashboard-onboarding"
import { clearFieldErrorFromErrors, isFormDifferent } from "@/utils/validators"

import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import FormSelect from "@/components/form/FormSelect"
import FormAlert from "@/components/form/FormAlert"

function CompanyContext() {
  const { t } = useTranslation(["dashboard", "common", "company-profile"])

  const { country: detectedCountry, loading: loadingUserLocation } =
    useCountry()

  const { data: companyContextData } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )

  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"
  const hasSavedDocumentLanguage =
    !!companyContextData?.company?.document_language

  const initialFormData = useMemo(() => {
    const mappedFormData = mapCompanyContextToForm(companyContextData)
    const country =
      mappedFormData.country || detectedCountry?.toUpperCase() || ""

    return {
      country,
      documentLanguage: mappedFormData.documentLanguage,
    }
  }, [companyContextData, detectedCountry])

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)
  const [countryTouched, setCountryTouched] = useState(false)
  const [lastAutoSuggestedCountry, setLastAutoSuggestedCountry] = useState(null)

  const formDirty = isFormDifferent(initialFormData, formData)

  const { data: documentLangData, isPending: loadingSuggestedLang } = useQuery({
    ...dashboardOndoardingMetadataQuery(formData.country),
    enabled: !!formData.country,
    suspense: false,
  })

  const countryOptions = country(t)
  const languageOptions = LANGUAGES(t)

  const countryError = errors?.country
  const documentLanguageError = errors?.documentLanguage
  const formSubmitError = errors?.form
  const selectedCountryLabel =
    countryOptions.find((item) => item.iso2 === formData.country)?.country ?? ""
  const suggestedDocumentLanguageLabel =
    languageOptions.find(
      (item) => item.code === documentLangData?.suggested_document_language,
    )?.label ?? ""

  //Setting validation errors coming from submit action
  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        // Existing form pattern: copy latest action errors into local state so inputs
        // can clear field-by-field as the user edits.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  // if the form is emptry and user location is not fetched yet, (for fallback)
  useEffect(() => {
    if (!formData.country && initialFormData.country) {
      setFormData((prev) => ({
        ...prev,
        country: initialFormData.country,
      }))
    }
  }, [formData.country, initialFormData.country])

  //when user changes country, assign auto-suggested document language
  //or initially when user country is detected, auto-suggest the document language
  useEffect(() => {
    const suggestedDocumentLanguage =
      documentLangData?.suggested_document_language

    if (!suggestedDocumentLanguage) return

    const shouldUseAutoSuggestion =
      formData.country &&
      formData.country !== lastAutoSuggestedCountry &&
      (!hasSavedDocumentLanguage || countryTouched)

    if (!shouldUseAutoSuggestion) return

    setFormData((prev) => {
      if (prev.documentLanguage === suggestedDocumentLanguage) return prev

      return {
        ...prev,
        documentLanguage: suggestedDocumentLanguage,
      }
    })
    setLastAutoSuggestedCountry(formData.country)
  }, [
    countryTouched,
    documentLangData,
    formData.country,
    hasSavedDocumentLanguage,
    lastAutoSuggestedCountry,
  ])

  const handleFormData = (e) => {
    if (e.target.name === "country") {
      setCountryTouched(true)
    }

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
      <PageTitle ns="dashboard" titleKey="onboarding-company-country-title" />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={2}
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
            {t("onboarding-company-country-title")}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="42ch"
          >
            {t("onboarding-company-country-description")}
          </Text>
        </Stack>
        <Form method="PUT" style={{ width: "100%" }}>
          <Stack gap="5" py="2">
            {selectedCountryLabel &&
              suggestedDocumentLanguageLabel &&
              !hasSavedDocumentLanguage &&
              !countryTouched && (
                <FormAlert
                  status="warning"
                  title={t("onboarding-company-context-detected-warning", {
                    countryLabel: selectedCountryLabel,
                    languageLabel: suggestedDocumentLanguageLabel,
                  })}
                />
              )}

            {documentLangData?.suggested_document_language_is_localized ===
              false &&
              (!hasSavedDocumentLanguage || countryTouched) && (
                <FormAlert
                  status="warning"
                  title={t(
                    "onboarding-company-context-unsupported-language-warning",
                  )}
                />
              )}
            <input
              type="hidden"
              name="isDirty"
              value={formDirty ? "true" : "false"}
            />

            <FormSelect
              required
              inputName="country"
              value={formData.country}
              onChange={handleFormData}
              label={t("onboarding-company-context-country-label")}
              labelAside={
                loadingUserLocation ? (
                  <HStack gap="1" color="gray.500">
                    <Spinner size="xs" color="gray.500" />
                    <Text fontSize="xs" fontWeight="500">
                      {t("onboarding-company-context-country-loading")}
                    </Text>
                  </HStack>
                ) : null
              }
              placeholder={t("company-profile:select-country")}
              error={countryError}
              selectList={countryOptions.map((item) => {
                return {
                  value: item.iso2,
                  label: item.icon + "  " + item.country,
                }
              })}
            />
            <FormSelect
              required
              inputName="documentLanguage"
              value={formData.documentLanguage}
              onChange={handleFormData}
              label={t("onboarding-company-context-document-language-label")}
              labelAside={
                loadingSuggestedLang ? (
                  <HStack gap="1" color="gray.500">
                    <Spinner size="xs" color="gray.500" />
                    <Text fontSize="xs" fontWeight="500">
                      {t(
                        "onboarding-company-context-document-language-loading",
                      )}
                    </Text>
                  </HStack>
                ) : null
              }
              placeholder={t(
                "onboarding-company-context-document-language-placeholder",
              )}
              error={documentLanguageError}
              selectList={languageOptions.map((item) => {
                return {
                  value: item.code,
                  label: `${item.flag} - ${item.label}`,
                }
              })}
            />
          </Stack>
          {formSubmitError && (
            <FormAlert status="error" mt="3" title={formSubmitError} />
          )}

          <HStack justify="space-between" w="100%" mt="5">
            <SecondaryButton
              neutral
              to="../welcome"
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

export default CompanyContext

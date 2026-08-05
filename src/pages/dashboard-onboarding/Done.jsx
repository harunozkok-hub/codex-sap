import {
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  SimpleGrid,
  VStack,
  For,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuArrowLeft, LuSquareCheck } from "react-icons/lu"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Form, useActionData, useNavigation } from "react-router"

import {
  dashboardPageIntroTextStyles,
  dashboardSectionTitleTextStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"
import { country, currencies, europeTimezones } from "@/utils/country"
import { LANGUAGES } from "@/utils/languages"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"
import PrimaryButton from "@/components/form/PrimaryButton"
import OnboardingStepper from "@/pages/dashboard-onboarding/OnboardingStepper"
import SecondaryButton from "@/components/form/SecondaryButton"
import CustomAccordion from "@/components/generic/CustomAccordion"
import AddressCard from "@/components/form/AddressCard"
import FormCheckbox from "@/components/form/FormCheckbox"
import FormAlert from "@/components/form/FormAlert"
import { clearFieldErrorFromErrors } from "@/utils/validators"

function SummaryGrid({ items }) {
  return (
    <SimpleGrid
      minChildWidth="14rem"
      gapX="2"
      gapY="3"
      maxW="xl"
      alignItems="flex-start"
    >
      <For each={items}>
        {(item) => (
          <Stack justifySelf="flex-start" key={item.key}>
            <Text fontWeight="semibold">{item.title}</Text>
            <Text>{item.value}</Text>
          </Stack>
        )}
      </For>
    </SimpleGrid>
  )
}

function Done() {
  const { t, i18n } = useTranslation(["dashboard", "common", "company-profile"])
  const { data: dashboardOnboardingItem } = useSuspenseQuery(
    dashboardOnboardingQuery(),
  )
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"
  const companyName =
    dashboardOnboardingItem?.company?.name ||
    dashboardOnboardingItem?.company?.legal_name ||
    t("onboarding-done-company-name-fallback")
  const title = t("onboarding-done-title", { companyName })
  const countryOptions = country(t)
  const currencyOptions = currencies(t)
  const timezoneOptions = europeTimezones
  const languageOptions = LANGUAGES(t)

  const companyCountryValue =
    countryOptions.find(
      (item) =>
        item.iso2 === dashboardOnboardingItem?.company?.company_location_code,
    )?.country ?? "-"

  const documentLanguageValue =
    languageOptions.find(
      (item) =>
        item.code === dashboardOnboardingItem?.company?.document_language,
    )?.label ?? "-"

  const legalIdLabel =
    dashboardOnboardingItem?.country_metadata?.legal_id_label ?? ""
  const legalIdRequired =
    dashboardOnboardingItem?.country_metadata?.legal_id_required ?? false

  const legalNameValue = dashboardOnboardingItem?.company?.legal_name ?? "-"
  const billingEmailValue =
    dashboardOnboardingItem?.company?.billing_email ?? "-"
  const legalIdValue = dashboardOnboardingItem?.company?.legal_id ?? "-"
  const vatNumberValue = dashboardOnboardingItem?.company?.vat_number ?? "-"
  const timezoneValue =
    timezoneOptions.find(
      (item) => item.value === dashboardOnboardingItem?.company?.timezone,
    )?.label ?? "-"
  const currencyValue =
    currencyOptions.find(
      (item) => item.value === dashboardOnboardingItem?.company?.currency,
    )?.label ?? "-"
  const dashboardLanguageValue =
    languageOptions.find((item) => item.code === i18n.resolvedLanguage)
      ?.label ?? "-"
  const addressesList = [
    { type: "hq", label: t("company-profile:hq-address") },
    { type: "billing", label: t("company-profile:billing-address") },
  ]
  const companyCountryList = [
    {
      key: "cc1",
      title: t("onboarding-done-company-location"),
      value: companyCountryValue,
    },
    {
      key: "cc2",
      title: t("onboarding-company-context-document-language-label"),
      value: documentLanguageValue,
    },
  ]
  const companyLegalInfoList = [
    {
      key: "cli1",
      title: t("company-profile:legal-name"),
      value: legalNameValue,
    },
    {
      key: "cli2",
      title: t("company-profile:billing-email"),
      value: billingEmailValue,
    },
    {
      key: "cli3",
      title: t("company-profile:vat-number"),
      value: vatNumberValue,
    },
    legalIdRequired && {
      key: "cli4",
      title: legalIdLabel,
      value: legalIdValue,
    },
  ]
  const addressData = dashboardOnboardingItem.addresses
  const companyPreferencesList = [
    {
      key: "cp1",
      title: t("onboarding-preferences-timezone-label"),
      value: timezoneValue,
    },
    {
      key: "cp2",
      title: t("onboarding-preferences-currency-label"),
      value: currencyValue,
    },
    {
      key: "cp3",
      title: t("onboarding-preferences-language-label"),
      value: dashboardLanguageValue,
    },
  ]

  const companyCountryBody = <SummaryGrid items={companyCountryList} />
  const companyLegalInfoBody = <SummaryGrid items={companyLegalInfoList} />
  const [informationVerified, setInformationVerified] = useState(false)
  const [errors, setErrors] = useState(null)

  const addressBody = (
    <SimpleGrid
      minChildWidth="2xs"
      gap="3"
      mx="auto"
      my="3"
      maxW="3xl"
      justifyItems="stretch"
      alignItems="stretch"
    >
      <For each={addressesList}>
        {(item) => {
          return addressData[item.type] ? (
            <AddressCard
              key={item.type}
              address={addressData[item.type]}
              label={item.label}
              editDateHidden
              editable={false}
              showPhone
              maxW="sm"
              minH="2xs"
              px={{ base: "1rem", md: "1.2rem" }}
              py={{ base: "1rem", md: "1.15rem" }}
            />
          ) : (
            <GlassEffectContainer
              maxW="sm"
              w="100%"
              minH="2xs"
              key={item.type}
              justifyContent="center"
              px={{ base: "1rem", md: "1.2rem" }}
              py={{ base: "1rem", md: "1.15rem" }}
            >
              <VStack
                justifyContent="center"
                align="stretch"
                textAlign="center"
                w="100%"
                h="100%"
                gap="3"
              >
                <Text fontWeight="bold">{item.label}</Text>
                <Text
                  color="gray.600"
                  overflowWrap="anywhere"
                  wordBreak="break-word"
                >
                  {t("company-profile:no-address-information-was-fou")}
                </Text>
              </VStack>
            </GlassEffectContainer>
          )
        }}
      </For>
    </SimpleGrid>
  )
  const companyPreferencesBody = <SummaryGrid items={companyPreferencesList} />
  const informationVerifiedError = errors?.informationVerified
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.errors) {
      // Existing form pattern: copy latest action errors into local state so
      // inputs can clear field-by-field as the user edits.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(actionData.errors)
    }
  }, [actionData, navigation.state])

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <PageTitle ns="dashboard" title={title} />
      <Stack
        mx={resPX}
        my={{ base: "1rem", md: "1.25rem" }}
        maxW="lg"
        w="100%"
        px={{ base: "1.25rem", md: "1.75rem" }}
        py={{ base: "1rem", md: "1.15rem" }}
      >
        <OnboardingStepper
          currentStep={6}
          indicatorSize={{ base: "4", md: "4.5" }}
        />
      </Stack>
      <GlassEffectContainer maxW="3xl" w="100%" mx={resPX} mb={resPY} px="5">
        <Stack gap="2" align="center" textAlign="center">
          <Heading
            {...dashboardSectionTitleTextStyles}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.2"
          >
            {title}
          </Heading>
          <Text
            {...dashboardPageIntroTextStyles}
            textAlign="center"
            maxW="56ch"
          >
            {t("onboarding-done-description")}
          </Text>
        </Stack>
        <Form method="PUT" action="." style={{ width: "100%" }}>
          <CustomAccordion
            items={[
              {
                value: "company-country",
                title: t("onboarding-company-context-country-label"),
                body: companyCountryBody,
              },
              {
                value: "legal-info",
                title: t("onboarding-done-legal-information"),
                body: companyLegalInfoBody,
              },
              {
                value: "company-addresses",
                title: t("company-profile:adresses"),
                body: addressBody,
              },
              {
                value: "preferences",
                title: t("onboarding-preferences-title"),
                body: companyPreferencesBody,
              },
            ]}
          />
          <Stack my="3" justifySelf="center">
            <FormCheckbox
              inputName="informationVerified"
              checked={informationVerified}
              onCheckedChange={(e) => {
                setInformationVerified(e.checked)
                setErrors((prev) =>
                  clearFieldErrorFromErrors(prev, "informationVerified"),
                )
              }}
              text={t("onboarding-done-information-verified")}
              labelPosition="right"
              error={informationVerifiedError}
              required
            />
          </Stack>
          {formSubmitError && (
            <FormAlert status="error" mt="3" title={formSubmitError} />
          )}

          <HStack justify="center" w="100%" pt="5">
            <SecondaryButton
              neutral
              to="../preferences"
              label={t("common:back")}
              minW="124px"
              iconLeft={<LuArrowLeft />}
              loading={pending}
            />
            <PrimaryButton
              type="submit"
              label={t("onboarding-complete-setup")}
              minW="180px"
              iconRight={<LuSquareCheck />}
              loading={pending}
            />
          </HStack>
        </Form>
      </GlassEffectContainer>
    </Flex>
  )
}

export default Done

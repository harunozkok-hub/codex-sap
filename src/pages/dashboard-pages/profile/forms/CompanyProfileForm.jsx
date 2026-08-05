import { Alert, ButtonGroup, GridItem, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useId, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router"

import { mapCompanyDetailsToForm } from "@/pages/dashboard-pages/profile/util/profile"
import {
  clearFieldErrorFromErrors,
  isFormDifferent,
} from "@/utils/validators"
import { Tooltip } from "@/components/ui/tooltip"
import FormSelect from "@/components/form/FormSelect"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import PhoneInput from "@/components/form/PhoneInput"
import CustomDialog from "@/components/generic/CustomDialog"
import { currencies, europeTimezones } from "@/utils/country"
import { LANGUAGES } from "@/utils/languages"
import { resGap, resM } from "@/utils/css-chakra"

function CompanyProfileForm({
  compDetailsData,
  onboardingData,
  countryOptions,
  onChangeCountry,
  changeCompanyPending = false,
  openDialog,
  setOpenDialog,
}) {
  const { t } = useTranslation([
    "company-profile",
    "profile",
    "common",
    "dashboard",
  ])
  const { setBlockerState } = useOutletContext()
  const blockerId = useId()
  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"
  const languageOptions = LANGUAGES(t)
  const initialProfile = useMemo(
    () => mapCompanyDetailsToForm(compDetailsData),
    [compDetailsData],
  )
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialProfile, formData)

  const legalNameError = errors?.legalName
  const displayNameError = errors?.displayName
  const billingEmailError = errors?.billingEmail
  const vatNumberError = errors?.vatNumber
  const legalIdError = errors?.legalId
  const companyPhoneError = errors?.companyPhone
  const formSubmitError = errors?.form
  const vatNumberLabel =
    onboardingData?.country_metadata?.vat_number_label ?? ""
  const vatNumberPlaceholder =
    onboardingData?.country_metadata?.vat_number_placeholder ?? ""
  const vatNumberRequired =
    onboardingData?.country_metadata?.vat_number_required ?? false
  const legalIdLabel = onboardingData?.country_metadata?.legal_id_label ?? ""
  const legalIdPlaceholder =
    onboardingData?.country_metadata?.legal_id_placeholder ?? ""
  const legalIdRequired =
    onboardingData?.country_metadata?.legal_id_required ?? false

  useEffect(() => {
    setBlockerState(blockerId, formDirty)
    return () => setBlockerState(blockerId, false)
  }, [blockerId, formDirty, setBlockerState])

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.errors) {
      setErrors(actionData.errors)
    }
  }, [actionData, navigation.state])

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target?.name]: e.target?.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
  }

  const resetFormHandler = () => {
    setFormData(initialProfile)
    setErrors(null)
  }

  return (
    <Form method="post" action=".">
      <input type="hidden" name="country" value={formData.country ?? ""} />
      <input
        type="hidden"
        name="documentLanguage"
        value={formData.documentLanguage ?? ""}
      />
      <input type="hidden" name="vatNumberLabel" value={vatNumberLabel} />
      <input
        type="hidden"
        name="vatNumberRequired"
        value={vatNumberRequired ? "true" : "false"}
      />
      <input type="hidden" name="legalIdLabel" value={legalIdLabel} />
      <input
        type="hidden"
        name="legalIdRequired"
        value={legalIdRequired ? "true" : "false"}
      />

      <SimpleGrid
        columns={{ base: 2, md: 3 }}
        gapX={{ base: "3", md: "4" }}
        gapY={{ base: "2", md: "4" }}
        w="100%"
        alignItems="flex-end"
        minW="xs"
        mb={resGap}
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <FormSelect
            readOnly
            inputName="country"
            value={formData.country}
            label={t("dashboard:onboarding-company-context-country-label")}
            placeholder={t("company-profile:select-country")}
            selectList={countryOptions.map((item) => ({
              value: item.iso2,
              label: item.icon + "  " + item.country,
            }))}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <FormSelect
            readOnly
            inputName="documentLanguage"
            value={formData.documentLanguage}
            label={t(
              "dashboard:onboarding-company-context-document-language-label",
            )}
            placeholder={t(
              "dashboard:onboarding-company-context-document-language-placeholder",
            )}
            selectList={languageOptions.map((item) => ({
              value: item.code,
              label: `${item.flag} - ${item.label}`,
            }))}
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          display="flex"
          justifyContent={{ base: "center", md: "stretch" }}
        >
          <CustomDialog
            type="custom-destructive"
            actionLabel={t("continue-and-reset-country")}
            triggerButton={
              <SecondaryButton
                neutral
                justifyContent={{ base: "center", md: "flex-start" }}
                alignSelf="flex-end"
                w={{ base: "auto", md: "100%" }}
                whiteSpace={{ base: "nowrap", md: "normal" }}
                px={{ base: "5", md: "4" }}
                py={{ base: "2", md: "3" }}
                h="auto"
                minW="128px"
                disabled={pending}
                label={t("change-country-document-language")}
              />
            }
            dialogTitle={t("change-company-country")}
            dialogText={t("change-company-country-dialog-text")}
            onConfirm={onChangeCountry}
            confirmLoading={changeCompanyPending}
            isOpen={openDialog === "change-country"}
            onOpenChange={(open) =>
              setOpenDialog(open && !changeCompanyPending ? "change-country" : null)
            }
          />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid minChildWidth="xs" gap={resGap} mb={resGap}>
        <FormInput
          required
          value={formData?.legalName}
          inputName="legalName"
          placeholder={t("legal-name-placeholder")}
          label={t("legal-name")}
          error={legalNameError}
          onChange={handleFormData}
          tooltipInfo={t("legal-name-tooltip")}
        />
        <FormInput
          inputName="displayName"
          placeholder={t("display-name-placeholder")}
          value={formData?.displayName}
          onChange={handleFormData}
          label={t("display-name")}
          error={displayNameError}
          tooltipInfo={t("display-name-tooltip")}
        />
      </SimpleGrid>

      <SimpleGrid minChildWidth="xs" gap={resGap} mb={resGap} mx="auto">
        <FormInput
          required
          inputName="billingEmail"
          placeholder={t("billing-email-placeholder")}
          value={formData?.billingEmail}
          onChange={handleFormData}
          label={t("billing-email")}
          error={billingEmailError}
          tooltipInfo={t("biling-email-tooltip")}
        />
        <FormInput
          required={vatNumberRequired}
          inputName="vatNumber"
          placeholder={vatNumberPlaceholder || t("vat-number-placeholder")}
          value={formData?.vatNumber}
          onChange={handleFormData}
          label={vatNumberLabel || t("vat-number")}
          error={vatNumberError}
          tooltipInfo={t("vat-number-tooltip")}
        />
        {legalIdLabel && (
          <FormInput
            required={legalIdRequired}
            inputName="legalId"
            placeholder={legalIdPlaceholder || t("legal-id-placeholder")}
            value={formData?.legalId}
            onChange={handleFormData}
            label={legalIdLabel}
            error={legalIdError}
            tooltipInfo={t("dashboard:onboarding-company-legal-id-tooltip", {
              legalIdLabel,
            })}
          />
        )}
        <PhoneInput
          error={companyPhoneError}
          label={t("company-phone")}
          tooltipInfo={t("company-phone-tooltip")}
          countryCodeValue={formData?.countryCodeCompany}
          phoneNumberValue={formData?.phoneNumberCompany}
          onChange={handleFormData}
        />
      </SimpleGrid>

      <SimpleGrid minChildWidth="xs" gap={resGap}>
        <FormSelect
          inputName="timezone"
          value={formData.timezone}
          onChange={handleFormData}
          required
          placeholder={t(
            "dashboard:onboarding-preferences-timezone-placeholder",
          )}
          label={t("dashboard:onboarding-preferences-timezone-label")}
          selectList={europeTimezones}
        />
        <FormSelect
          inputName="currency"
          value={formData.currency}
          onChange={handleFormData}
          required
          label={t("dashboard:onboarding-preferences-currency-label")}
          selectList={currencies(t)}
          placeholder={t(
            "dashboard:onboarding-preferences-currency-placeholder",
          )}
          tooltipInfo={t("dashboard:onboarding-preferences-currency-tooltip")}
        />
      </SimpleGrid>

      {formSubmitError && (
        <Alert.Root mt={resM} status="error" title={formSubmitError}>
          <Alert.Indicator />
          <Alert.Title>{formSubmitError}</Alert.Title>
        </Alert.Root>
      )}

      <ButtonGroup
        size="md"
        variant="solid"
        justifyContent="center"
        align="center"
        display="flex"
        my={resM}
      >
        <PrimaryButton
          type="submit"
          disabled={!formDirty}
          loading={pending}
          label={t("save", { ns: "profile" })}
        />
        <Tooltip
          disabled={!formDirty || pending}
          showArrow
          content={t("restore-the-last-saved-values", {
            ns: "profile",
          })}
        >
          <SecondaryButton
            neutral
            onClick={resetFormHandler}
            label={t("reset-changes", { ns: "profile" })}
            disabled={!formDirty || pending}
          />
        </Tooltip>
      </ButtonGroup>
    </Form>
  )
}

export default CompanyProfileForm

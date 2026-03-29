import { useEffect, useMemo, useState } from "react"
import {
  Form,
  Navigate,
  useActionData,
  useNavigation,
  useParams,
} from "react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  GridItem,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import { PiFactory } from "react-icons/pi"
import { useTranslation } from "react-i18next"

import PageTitle from "../../components/generic/PageTitle"
import NavBreadCrumb from "../../components/navigation/NavBreadCrumb"
import StickyTitleWithBackButton from "../../components/navigation/StickyTitleWithBackButton"
import FormInput from "../../components/form/FormInput"
import PhoneInput from "../../components/form/PhoneInput"
import FormSelect from "../../components/form/FormSelect"
import FormCheckbox from "../../components/form/FormCheckbox"
import ErrorMessage from "../../components/generic/ErrorMessage"
import FullpageSpinner from "../../components/generic/FullpageSpinner"
import PageContainer from "../../components/containers/PageContainer"
import FormContainer from "../../components/containers/FormContainer"
import AddressSuggesstionInput from "../../components/form/AddressSuggestionInput"
import { Tooltip } from "../../components/ui/tooltip"
import { resGap, resM } from "../../utils/css-chakra"
import { country } from "../../utils/country"
import { mapAddressToForm } from "./util/profile"
import {
  clearFieldErrorFromErrors,
  isFormDifferent,
} from "../../utils/validators"
import {
  companyAddressQuery,
  companyProfileQuery,
} from "../../queries/profile-queries"

const ADDRESS_TYPES = ["hq", "billing"]

function EditCompanyAddress() {
  const { t } = useTranslation(["company-profile", "profile", "common"])
  const { type } = useParams()
  const [isDesktop] = useMediaQuery("(min-width: 768px)")
  const currentAddressType = type === "billing" ? "billing" : "hq"
  const otherAddressType = currentAddressType === "hq" ? "billing" : "hq"

  const { data: compDetailsData } = useSuspenseQuery(companyProfileQuery())
  const { data: selectedAddress } = useSuspenseQuery(
    companyAddressQuery(currentAddressType),
  )
  const { data: otherAddress } = useSuspenseQuery(
    companyAddressQuery(otherAddressType),
  )

  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const isValidType = ADDRESS_TYPES.includes(type)
  const isEditMode = !!selectedAddress

  const initialFormData = useMemo(
    () => mapAddressToForm(selectedAddress),
    [selectedAddress],
  )
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)

  const formDirty = isFormDifferent(initialFormData, formData)
  const nameError = errors?.name
  const phoneNumberAddressError = errors?.phoneNumberAddress
  const streetNameError = errors?.streetName
  const houseNumberError = errors?.houseNumber
  const addressExtraError = errors?.addressExtra
  const postalCodeError = errors?.postalCode
  const cityError = errors?.city
  const regionError = errors?.region
  const countryError = errors?.country
  const copyToOtherAddressError = errors?.copyToOtherAddress
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  if (!isValidType) {
    return <Navigate to="../" replace />
  }

  const addressLabel =
    currentAddressType === "hq" ? t("hq-address") : t("billing-address")
  const otherAddressLabel =
    otherAddressType === "hq" ? t("hq-address") : t("billing-address")
  const canCopyToOtherAddress = !otherAddress

  const pageTitle = isEditMode
    ? t("edit-company-address-title", { addressLabel })
    : t("add-company-address-title", { addressLabel })

  const companyName =
    compDetailsData?.company_name ?? compDetailsData?.display_name

  const description = companyName
    ? t("manage-company-address-description-with-company", {
        addressLabel: addressLabel.toLowerCase(),
        companyName,
      })
    : t("manage-company-address-description", {
        addressLabel: addressLabel.toLowerCase(),
      })

  const pickAutofillValue = (nextValue, prevValue) => {
    if (nextValue == null) return prevValue
    if (typeof nextValue === "string" && nextValue.trim() === "") {
      return prevValue
    }
    return nextValue
  }

  const onSelectHandler = (item) => {
    setFormData((prev) => ({
      ...prev,
      streetName: pickAutofillValue(item.street, prev.streetName),
      houseNumber: pickAutofillValue(item.housenumber, prev.houseNumber),
      city: pickAutofillValue(item.city, prev.city),
      region: pickAutofillValue(item.state, prev.region),
      postalCode: pickAutofillValue(item.postcode, prev.postalCode),
      country: pickAutofillValue(
        item.country_code?.toUpperCase(),
        prev.country,
      ),
    }))
  }

  const handleFormData = (e, checkboxName = null) => {
    if (checkboxName) {
      setFormData((prev) => ({ ...prev, [checkboxName]: !!e.checked }))
      setErrors((prev) => clearFieldErrorFromErrors(prev, checkboxName))
      return
    }

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target.name))
  }

  const resetFormHandler = () => {
    setFormData(initialFormData)
    setErrors(null)
  }

  return (
    <PageContainer>
      {pending && <FullpageSpinner />}
      <PageTitle ns="company-profile" titleKey="edit-company-address-page" />

      <FormContainer maxW="800px">
        {isDesktop ? (
          <NavBreadCrumb
            currentPageLabel={pageTitle}
            items={[{ link: "../", title: t("manage-company-profile") }]}
            icon={<PiFactory size={24} color="#2b6cb0" />}
          />
        ) : (
          <StickyTitleWithBackButton
            pageTitle={pageTitle}
            icon={<PiFactory size={24} color="#2b6cb0" />}
          />
        )}

        <Stack px={1}>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
        </Stack>

        <Separator size="xs" colorPalette="blue" m={2} />

        <Form method="put" action=".">
          <AddressSuggesstionInput onSelect={onSelectHandler} />

          <SimpleGrid minChildWidth="xs" gap={resGap} mb={resGap}>
            <FormInput
              inputName="name"
              value={formData.name}
              onChange={handleFormData}
              label={t("address-name")}
              placeholder={t("address-name-placeholder")}
              error={nameError}
            />
            <PhoneInput
              error={phoneNumberAddressError}
              label={t("profile:phone-number")}
              countryCodeValue={formData?.countryCodeAddress}
              phoneNumberValue={formData?.phoneNumberAddress}
              countryCodeName="countryCodeAddress"
              phoneNumberName="phoneNumberAddress"
              onChange={handleFormData}
            />
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, sm: 4 }}
            gapY={resGap}
            width="100%"
            mb={resGap}
          >
            <GridItem colSpan={{ base: 1, sm: 3 }}>
              <FormInput
                inputName="streetName"
                value={formData.streetName}
                onChange={handleFormData}
                label={t("street-name")}
                placeholder={t("street-name-placeholder")}
                error={streetNameError}
                required
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, sm: 1 }}>
              <FormInput
                inputName="houseNumber"
                value={formData.houseNumber}
                onChange={handleFormData}
                label={t("house-number")}
                placeholder={t("house-number-placeholder")}
                error={houseNumberError}
              />
            </GridItem>
          </SimpleGrid>

          <FormInput
            inputName="addressExtra"
            value={formData.addressExtra}
            onChange={handleFormData}
            label={t("address-extra")}
            placeholder={t("address-extra-placeholder")}
            error={addressExtraError}
            mb={resGap}
          />

          <SimpleGrid minChildWidth="xs" gap={resGap} mb={resGap}>
            <FormInput
              inputName="postalCode"
              value={formData.postalCode}
              onChange={handleFormData}
              label={t("postal-code")}
              placeholder={t("postal-code-placeholder")}
              error={postalCodeError}
              required
            />
            <FormInput
              inputName="city"
              value={formData.city}
              onChange={handleFormData}
              label={t("city")}
              placeholder={t("city-placeholder")}
              error={cityError}
              required
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="xs" gap={resGap} mb={resGap}>
            <FormInput
              inputName="region"
              value={formData.region}
              onChange={handleFormData}
              label={t("region")}
              placeholder={t("region-placeholder")}
              error={regionError}
            />
            <FormSelect
              required
              inputName="country"
              value={formData.country}
              onChange={handleFormData}
              label={t("country")}
              placeholder={t("select-country")}
              error={countryError}
              selectList={country.map((item) => {
                return {
                  value: item.iso2,
                  label: item.country,
                }
              })}
            />
          </SimpleGrid>

          <Box alignSelf="center" justifySelf="center">
            <FormCheckbox
              inputName="copyToOtherAddress"
              checked={formData.copyToOtherAddress}
              onCheckedChange={(e) => handleFormData(e, "copyToOtherAddress")}
              text={t("copy-address-to-other-type", {
                addressLabel: otherAddressLabel,
              })}
              error={copyToOtherAddressError}
              disabled={!canCopyToOtherAddress}
            />
          </Box>

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
            <Button
              type="submit"
              variant="surface"
              colorPalette="teal"
              disabled={!formDirty || pending}
            >
              {t("save", { ns: "profile" })}
            </Button>
            <Tooltip
              disabled={!formDirty || pending}
              showArrow
              content={t("restore-the-last-saved-values", { ns: "profile" })}
            >
              <Button
                type="button"
                variant="outline"
                color="red.600"
                onClick={resetFormHandler}
                disabled={!formDirty || pending}
              >
                {t("cancel", { ns: "common" })}
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </PageContainer>
  )
}

export default EditCompanyAddress

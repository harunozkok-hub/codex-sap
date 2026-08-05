import { useEffect, useMemo, useState } from "react"
import { Box, ButtonGroup } from "@chakra-ui/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { LuBuilding2 } from "react-icons/lu"
import {
  Form,
  Navigate,
  NavLink,
  useActionData,
  useNavigation,
  useParams,
} from "react-router"
import {
  companyAddressQuery,
  companyProfileQuery,
} from "@/queries/profile-queries"
import {
  dashboardTitleIconColor,
  pageContentWrapperStyles,
  resGap,
  resM,
} from "@/utils/css-chakra"
import { clearFieldErrorFromErrors, isFormDifferent } from "@/utils/validators"
import { Tooltip } from "@/components/ui/tooltip"
import FormContainer from "@/components/containers/FormContainer"
import PageContainer from "@/components/containers/PageContainer"
import AddressInput from "@/components/form/AddressInput"
import FormCheckbox from "@/components/form/FormCheckbox"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import PageHeaderWrapper from "@/components/generic/PageHeaderWrapper"
import NavBreadCrumb from "@/components/navigation/NavBreadCrumb"

import { mapAddressToForm } from "@/components/form/util/address-input"
import FormAlert from "@/components/form/FormAlert"

const ADDRESS_TYPES = ["hq", "billing"]

function EditCompanyAddress() {
  const { t } = useTranslation(["company-profile", "profile", "common"])
  const { type } = useParams()
  const currentAddressType = type === "billing" ? "billing" : "hq"
  const otherAddressType = currentAddressType === "hq" ? "billing" : "hq"

  const { data: compDetailsData } = useSuspenseQuery(companyProfileQuery())
  const { data: selectedAddress } = useSuspenseQuery(
    companyAddressQuery(currentAddressType),
  )
  const { data: otherAddress } = useSuspenseQuery(
    companyAddressQuery(otherAddressType),
  )

  const userCountry = compDetailsData?.company_location_code

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

  const handleFormData = (e, checkboxName = null) => {
    if (checkboxName) {
      setFormData((prev) => ({ ...prev, [checkboxName]: !!e.checked }))
      setErrors((prev) => clearFieldErrorFromErrors(prev, checkboxName))
      return
    }

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target.name))
  }

  const handleAddressFormDataChange = (updater) => {
    setFormData((prev) => updater(prev))
  }

  return (
    <PageContainer px="0">
      {pending && <FullpageSpinner />}
      <PageHeaderWrapper
        titleNs="company-profile"
        titleKey="edit-company-address-page"
        pageTitle={pageTitle}
        pageDescription={description}
        pageIcon={<LuBuilding2 size={24} color={dashboardTitleIconColor} />}
        contentMaxW="800px"
        desktopTitleBreadCrumb={
          <NavBreadCrumb
            currentPageLabel={pageTitle}
            items={[{ link: "../", title: t("manage-company-profile") }]}
            icon={<LuBuilding2 size={24} color={dashboardTitleIconColor} />}
            mx={resM}
          />
        }
      />

      <Box {...pageContentWrapperStyles}>
        <FormContainer maxW="800px">
          <Form method="put" action=".">
            <AddressInput
              mb={resGap}
              formData={formData}
              errors={errors}
              onChange={handleFormData}
              onFormDataChange={handleAddressFormDataChange}
              country={userCountry}
            />

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
                labelPosition="right"
              />
            </Box>

            {formSubmitError && (
              <FormAlert status="error" mt={resM} title={formSubmitError} />
            )}

            <ButtonGroup
              size="md"
              variant="solid"
              justifyContent="center"
              align="center"
              display="flex"
              mt={resM}
            >
              <PrimaryButton
                type="submit"
                disabled={!formDirty || pending}
                label={t("save", { ns: "profile" })}
              />
              <Tooltip
                disabled={!formDirty || pending}
                showArrow
                content={t("restore-the-last-saved-values", { ns: "profile" })}
              >
                <SecondaryButton
                  neutral
                  type="button"
                  as={NavLink}
                  to="../"
                  disabled={!formDirty || pending}
                >
                  {t("cancel", { ns: "common" })}
                </SecondaryButton>
              </Tooltip>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </Box>
    </PageContainer>
  )
}

export default EditCompanyAddress

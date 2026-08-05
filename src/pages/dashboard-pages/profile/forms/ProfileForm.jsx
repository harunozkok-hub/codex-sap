import { Alert, Box, ButtonGroup, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useId, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router"

import {
  mapProfileToForm,
  rolesList,
} from "@/pages/dashboard-pages/profile/util/profile"
import { clearFieldErrorFromErrors, isFormDifferent } from "@/utils/validators"
import { Tooltip } from "@/components/ui/tooltip"
import FormCheckbox from "@/components/form/FormCheckbox"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import FormSelect from "@/components/form/FormSelect"
import PhoneInput from "@/components/form/PhoneInput"
import { resGap, resM } from "@/utils/css-chakra"

function ProfileForm({ profile }) {
  const { t } = useTranslation(["profile", "common"])
  const { setBlockerState } = useOutletContext()
  const blockerId = useId()
  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"
  const initialProfile = useMemo(() => mapProfileToForm(profile), [profile])
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialProfile, formData)

  const firstNameError = errors?.firstName
  const lastNameError = errors?.lastName
  const jobTitleError = errors?.jobTitle
  const phoneNumberError = errors?.phoneNumber
  const formSubmitError = errors?.form

  useEffect(() => {
    setBlockerState(blockerId, formDirty)
    return () => setBlockerState(blockerId, false)
  }, [blockerId, formDirty, setBlockerState])

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.errors) {
      setErrors(actionData.errors)
    }
  }, [actionData, navigation.state])

  const handleFormData = (e, checkboxName = null) => {
    if (checkboxName) {
      setFormData((prev) => ({ ...prev, [checkboxName]: !!e.checked }))
      return
    }

    setFormData((prev) => ({ ...prev, [e.target?.name]: e.target?.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
  }

  const resetFormHandler = () => {
    setFormData(initialProfile)
    setErrors(null)
  }

  return (
    <Form method="post" action=".">
      <SimpleGrid minChildWidth="xs" gap={resGap}>
        <FormInput
          readOnly
          value={formData?.email}
          inputName="email"
          placeholder="name@company.com"
          label="Email"
        />
        <FormSelect
          value={formData?.role}
          placeholder={t("select-a-role")}
          inputName="role"
          selectList={rolesList(t)}
          label={t("dashboard-role")}
          readOnly
        />
        <FormInput
          inputName="firstName"
          label={t("first-name")}
          placeholder={t("first-name-0")}
          value={formData?.firstName}
          onChange={handleFormData}
          error={firstNameError}
          required
        />
        <FormInput
          inputName="lastName"
          label={t("last-name")}
          placeholder={t("last-name-0")}
          value={formData?.lastName}
          onChange={handleFormData}
          error={lastNameError}
          required
        />
        <FormInput
          readOnly
          value={formData?.companyName}
          inputName="companyName"
          placeholder={t("company-name-0")}
          label={t("company-name")}
        />
        <FormInput
          inputName="jobTitle"
          label={t("job-title")}
          placeholder={t("e-g-it-manager")}
          value={formData?.jobTitle}
          onChange={handleFormData}
          error={jobTitleError}
        />
        <PhoneInput
          error={phoneNumberError}
          label={t("phone-number")}
          countryCodeValue={formData?.countryCode}
          phoneNumberValue={formData?.phoneNumber}
          onChange={handleFormData}
        />
        <Box alignSelf="center" justifySelf="center">
          <FormCheckbox
            inputName="newsletter"
            checked={formData?.newsletter}
            onCheckedChange={(e) => handleFormData(e, "newsletter")}
            text={t("subscribe-to-our-newsletter-fo")}
          />
        </Box>
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
          disabled={!formDirty || pending}
          label={t("save")}
        />
        <Tooltip
          disabled={!formDirty || pending}
          showArrow
          content={t("restore-the-last-saved-values")}
        >
          <SecondaryButton
            neutral
            type="button"
            onClick={resetFormHandler}
            disabled={!formDirty || pending}
          >
            {t("reset-changes")}
          </SecondaryButton>
        </Tooltip>
      </ButtonGroup>
    </Form>
  )
}

export default ProfileForm

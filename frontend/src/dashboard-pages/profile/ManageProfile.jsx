import {
  Box,
  HStack,
  Separator,
  Stack,
  Text,
  SimpleGrid,
  Checkbox,
  ButtonGroup,
  Button,
  Alert,
} from "@chakra-ui/react"

import { Tooltip } from "../../components/ui/tooltip"
import { FiUser } from "react-icons/fi"
import { useState, useMemo, useEffect } from "react"
import {
  useActionData,
  useNavigation,
  Form,
  useOutletContext,
} from "react-router"
import { useTranslation } from "react-i18next"
import { useSuspenseQuery } from "@tanstack/react-query"
import { mapProfileToForm } from "./util/profile"
import {
  clearFieldErrorFromErrors,
  isFormDifferent,
} from "../../utils/validators"
import { resGap, resP, resM } from "../../utils/css-chakra"

import { rolesList } from "./util/profile"
import { sessionQuery } from "../../queries/profile-queries"
import FullpageSpinner from "../../components/generic/FullpageSpinner"
import PageTitle from "../../components/generic/PageTitle"
import FormInput from "../../components/form/FormInput"
import FormSelect from "../../components/form/FormSelect"
import PhoneInput from "../../components/form/PhoneInput"

function ManageProfile() {
  const { t } = useTranslation("profile")
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const actionData = useActionData()
  const navigation = useNavigation()
  const { isDirty, setIsDirty } = useOutletContext()

  const pending = navigation.state === "submitting"

  const initialProfile = useMemo(() => mapProfileToForm(profile), [profile])
  // ✅ baseline = "last saved snapshot" (starts from prefetched query)
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)

  // Report dirty state upward (and clean up on unmount)
  useEffect(() => {
    const formDirty = isFormDifferent(initialProfile, formData)
    setIsDirty(formDirty)

    return () => {
      setIsDirty(false)
    }
  }, [initialProfile, formData, setIsDirty])

  const firstNameError = errors?.firstName
  const lastNameError = errors?.lastName
  const jobTitleError = errors?.jobTitle
  const phoneNumberError = errors?.phoneNumber
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  const handleFormData = (e, checkboxName = null) => {
    if (checkboxName) {
      setFormData((prev) => ({ ...prev, [checkboxName]: !!e.checked }))
    } else {
      setFormData((prev) => ({ ...prev, [e.target?.name]: e.target?.value }))
      setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
    }
  }

  const resetFormHandler = () => {
    setFormData(initialProfile)
    setErrors(null)
  }

  return (
    <Box
      bg="white"
      position="relative"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={resP}
      boxShadow="sm"
    >
      <PageTitle ns="profile" titleKey="manage-personal-profile" />
      <HStack spacing={3} m={1} align="center">
        <FiUser size={24} color="#2b6cb0" />
        <Stack>
          <Text fontWeight="bold" fontSize="lg">
            {t("manage-personal-profile")}
          </Text>
        </Stack>
      </HStack>
      <Stack px={1}>
        <Text fontSize="sm" color="gray.600">
          {t("you-can-modify-the-personal-in")}
        </Text>
      </Stack>
      <Separator size="xs" colorPalette="blue" m={2} />

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

          <Box alignSelf="center">
            <Checkbox.Root
              name="newsletter"
              checked={formData?.newsletter}
              onCheckedChange={(e) => handleFormData(e, "newsletter")}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Label>
                {t("subscribe-to-our-newsletter-fo")}
              </Checkbox.Label>
              <Checkbox.Control />
            </Checkbox.Root>
          </Box>
        </SimpleGrid>
        {formSubmitError && (
          <Alert.Root status="error" title={formSubmitError}>
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
            disabled={!isDirty || pending}
            colorPalette="teal"
          >
            {t("save")}
          </Button>
          <Tooltip
            disabled={!isDirty || pending}
            showArrow
            content={t("restore-the-last-saved-values")}
          >
            <Button
              type="button"
              variant="outline"
              color="red.600"
              onClick={resetFormHandler}
              disabled={!isDirty || pending}
            >
              {t("reset-changes")}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Form>
      {pending && <FullpageSpinner />}
    </Box>
  )
}

export default ManageProfile

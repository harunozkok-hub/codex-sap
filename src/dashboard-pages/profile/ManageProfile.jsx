import {
  Box,
  HStack,
  Separator,
  Stack,
  Text,
  SimpleGrid,
  ButtonGroup,
  Button,
  Alert,
} from "@chakra-ui/react"

import { Tooltip } from "../../components/ui/tooltip"
import { FiUser } from "react-icons/fi"
import { useState, useMemo, useEffect } from "react"
import { useActionData, useNavigation, Form, NavLink } from "react-router"
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
import FormCheckbox from "../../components/form/FormCheckbox"
import PhoneInput from "../../components/form/PhoneInput"
import UnsavedChangesBlocker from "../../components/generic/UnsavedChangesBlocker"

function ManageProfile() {
  const { t } = useTranslation(["profile", "common"])
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"

  const initialProfile = useMemo(() => mapProfileToForm(profile), [profile])

  // ✅ baseline = "last saved snapshot" (starts from prefetched query)
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialProfile, formData)

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
      <UnsavedChangesBlocker when={formDirty} />
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
          <Button
            type="submit"
            variant="surface"
            disabled={!formDirty || pending}
            colorPalette="teal"
          >
            {t("save")}
          </Button>
          <Tooltip
            disabled={!formDirty || pending}
            showArrow
            content={t("restore-the-last-saved-values")}
          >
            <Button
              type="button"
              variant="outline"
              color="red.600"
              onClick={resetFormHandler}
              disabled={!formDirty || pending}
            >
              {t("reset-changes")}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Form>
      <Stack
        align="center"
        p={1}
        my={2}
        borderBottomWidth="1px"
        borderTopWidth="1px"
        color="blue.900"
        borderColor="blue.800"
      >
        <Text fontWeight="bold">{t("common:password")}</Text>
      </Stack>
      <SimpleGrid
        minChildWidth="48"
        gap={resGap}
        mx={{ base: "0.5rem", md: "1rem" }}
        my={resM}
        maxW="2xl"
      >
        <FormInput
          inputName="password"
          type="password"
          value={t("common:e-g-mystrongpass_95")}
          readOnly
        />
        <Stack justifyContent="center">
          <Tooltip
            disabled={pending}
            showArrow
            content={t("click-to-change-your-password")}
          >
            <Button
              type="button"
              variant="outline"
              colorPalette="teal"
              onClick={resetFormHandler}
              disabled={pending}
              as={NavLink}
              to="../change-user-password"
            >
              {t("change-password")}
            </Button>
          </Tooltip>
        </Stack>
      </SimpleGrid>
      {pending && <FullpageSpinner />}
    </Box>
  )
}

export default ManageProfile

import {
  Box,
  HStack,
  Separator,
  Stack,
  Text,
  SimpleGrid,
  Field,
  Input,
  Checkbox,
  NativeSelect,
  For,
  GridItem,
  Grid,
  ButtonGroup,
  Button,
  Alert,
  Center,
  Spinner,
} from "@chakra-ui/react"

import { Tooltip } from "../../components/ui/tooltip"
import { autofillInput } from "../../utils/css-chakra"
import { FiUser } from "react-icons/fi"
import { useState, useMemo, useEffect } from "react"
import {
  useRouteLoaderData,
  useActionData,
  useNavigation,
  Form,
} from "react-router"
import { country } from "../../utils/country"
import { mapProfileToForm } from "./util/manage-profile"
import {
  clearFieldErrorFromErrors,
  isFormDifferent,
} from "../../utils/validators"
import { useTranslation } from "react-i18next"

function ManageProfile() {
  const { t } = useTranslation("profile")
  const { profile } = useRouteLoaderData("dashboard")
  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"

  const initialProfile = useMemo(() => mapProfileToForm(profile), [profile])
  // ✅ baseline = "last saved snapshot" (starts from loader)
  const [baseline, setBaseline] = useState(initialProfile)
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)

  const firstNameError = errors?.firstName
  const lastNameError = errors?.lastName
  const jobTitleError = errors?.jobTitle
  const phoneNumberError = errors?.phoneNumber
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.newProfile) {
        const next = mapProfileToForm(actionData.newProfile)
        setBaseline(next)
        setFormData(next)
      }
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

  const isDirty = useMemo(() => {
    return isFormDifferent(baseline, formData)
  }, [formData, baseline])

  const resetFormHandler = () => {
    setFormData(baseline)
    setErrors(null)
  }

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
      boxShadow="sm"
    >
      <HStack spacing={3} align="center">
        <FiUser size={24} color="#2b6cb0" />
        <Stack>
          <Text fontWeight="bold" fontSize="lg">
            {t("manage-personal-profile")}
          </Text>
        </Stack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          {t("you-can-modify-the-personal-in")}
        </Text>
      </Stack>
      <Separator size="xs" colorPalette="blue" m={2} />
      <Form method="post" action=".">
        <SimpleGrid minChildWidth="xs" gap="2rem" m={3}>
          <Box rounded="sm">
            <Field.Root disabled readOnly>
              <Field.Label>Email:</Field.Label>
              <Input
                name="email"
                placeholder="name@company.com"
                value={formData?.email}
              />
            </Field.Root>
          </Box>
          <Box alignSelf="flex-end">
            <Field.Root disabled readOnly>
              <Field.Label>{t("dashboard-role")}</Field.Label>
              <NativeSelect.Root size="md">
                <NativeSelect.Field
                  placeholder={t("select-a-role")}
                  name="role"
                  value={formData?.role}
                >
                  <option value="admin">{t("admin")}</option>
                  <option value="user">{t("user")}</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root required invalid={!!firstNameError}>
              <Field.Label>
                {t("first-name")}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="firstName"
                _autofill={autofillInput}
                placeholder={t("first-name-0")}
                value={formData?.firstName}
                onChange={handleFormData}
              />
              {firstNameError && (
                <Field.ErrorText>{firstNameError}</Field.ErrorText>
              )}
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root required invalid={!!lastNameError}>
              <Field.Label>
                {t("last-name")}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="lastName"
                _autofill={autofillInput}
                placeholder={t("last-name-0")}
                value={formData?.lastName}
                onChange={handleFormData}
              />
              {lastNameError && (
                <Field.ErrorText>{lastNameError}</Field.ErrorText>
              )}
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root disabled readOnly>
              <Field.Label>{t("company-name")}</Field.Label>
              <Input
                name="companyName"
                placeholder={t("company-name-0")}
                value={formData?.companyName}
              />
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root invalid={!!jobTitleError}>
              <Field.Label>{t("job-title")}</Field.Label>
              <Input
                name="jobTitle"
                _autofill={autofillInput}
                placeholder={t("e-g-it-manager")}
                value={formData?.jobTitle}
                onChange={handleFormData}
              />
              {jobTitleError && (
                <Field.ErrorText>{jobTitleError}</Field.ErrorText>
              )}
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root invalid={!!phoneNumberError}>
              <Field.Label>{t("phone-number")}</Field.Label>
              <Grid templateColumns="repeat(4, 1fr)" width="100%">
                <GridItem colSpan={1}>
                  <NativeSelect.Root width="8rem">
                    <NativeSelect.Field
                      name="countryCode"
                      fontSize="xs"
                      _autofill={autofillInput}
                      placeholder={t("country-code")}
                      value={formData?.countryCode}
                      onChange={handleFormData}
                    >
                      <For each={country}>
                        {(item) => (
                          <option key={item.iso2} value={item.phone_code}>
                            {item.icon +
                              "  " +
                              item.iso2 +
                              "  " +
                              "(" +
                              item.phone_code +
                              ")"}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </GridItem>
                <GridItem colSpan={3}>
                  <Input
                    name="phoneNumber"
                    _autofill={autofillInput}
                    placeholder={t("123123123-without-country-code")}
                    value={formData?.phoneNumber}
                    onChange={handleFormData}
                  />
                </GridItem>
              </Grid>
              {phoneNumberError && (
                <Field.ErrorText>{phoneNumberError}</Field.ErrorText>
              )}
            </Field.Root>
          </Box>

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
          my={10}
        >
          <Button
            type="submit"
            variant="surface"
            disabled={!isDirty || pending}
            colorPalette="green"
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
              color="red.500"
              onClick={resetFormHandler}
              disabled={!isDirty || pending}
            >
              {t("reset-changes")}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Form>
      {pending && (
        <Box pos="absolute" inset="0" bg="bg/80">
          <Center h="full">
            <Spinner color="blue" />
          </Center>
        </Box>
      )}
    </Box>
  )
}

export default ManageProfile

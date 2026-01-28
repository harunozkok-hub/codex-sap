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

function ManageProfile() {
  const { profile } = useRouteLoaderData("dashboard")
  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state !== "idle"

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
  console.log("rerender")

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
            Manage Profile
          </Text>
        </Stack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          You can modify the company & user information provided by you
        </Text>
      </Stack>
      <Separator size="xs" colorPalette="blue" m={2} />
      <Form method="post" action=".">
        <SimpleGrid minChildWidth="xs" gap="2rem" m={3}>
          <Box rounded="sm">
            <Field.Root disabled readOnly>
              <Field.Label>Email:</Field.Label>
              <Input name="email" placeholder="Email" value={formData?.email} />
            </Field.Root>
          </Box>
          <Box alignSelf="flex-end">
            <Field.Root disabled readOnly>
              <Field.Label>Dashboard Role</Field.Label>
              <NativeSelect.Root size="md">
                <NativeSelect.Field
                  placeholder="Select a role"
                  name="role"
                  value={formData?.role}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root required invalid={!!firstNameError}>
              <Field.Label>
                First name:
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="firstName"
                placeholder="First name"
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
                Last name:
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="lastName"
                placeholder="Last name"
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
              <Field.Label>Company name:</Field.Label>
              <Input
                name="companyName"
                placeholder="Company name"
                value={formData?.companyName}
              />
            </Field.Root>
          </Box>
          <Box rounded="sm">
            <Field.Root invalid={!!jobTitleError}>
              <Field.Label>Job title:</Field.Label>
              <Input
                name="jobTitle"
                placeholder="Job title"
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
              <Field.Label>Phone number:</Field.Label>
              <Grid templateColumns="repeat(4, 1fr)" width="100%">
                <GridItem colSpan={1}>
                  <NativeSelect.Root width="8rem">
                    <NativeSelect.Field
                      name="countryCode"
                      fontSize="xs"
                      placeholder="Country Code"
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
                    placeholder="Phone number"
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
                Subscribe to our newsletter for news & offers
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
          my={5}
        >
          <Button
            type="submit"
            disabled={!isDirty || pending}
            colorPalette="blue"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={resetFormHandler}
            disabled={!isDirty || pending}
          >
            Reset Changes
          </Button>
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

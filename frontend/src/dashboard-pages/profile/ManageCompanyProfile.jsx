import {
  Box,
  HStack,
  Stack,
  Text,
  Field,
  Input,
  NativeSelect,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { Tooltip } from "../../components/ui/tooltip"
import { useTranslation } from "react-i18next"
import { PiFactory } from "react-icons/pi"
import { Form, useActionData, useNavigation, useLoaderData } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { autofillInput } from "../../utils/css-chakra"
import ErrorMessage from "../../components/generic/ErrorMessage"
import {
  companyProfileQuery,
  companyAddressesQuery,
} from "../../queries/profile-queries"

function ManageCompanyProfile() {
  const { t } = useTranslation(["company-profile", "profile", "common"])
  const dataLoaded = useLoaderData()

  const { data: companyDetails } = useQuery(companyProfileQuery())
  const { data: companyAddresses } = useQuery(companyAddressesQuery())

  if (!dataLoaded.ok) {
    return <div>Error loading data.</div>
  }

  // const actionData = useActionData()
  // const navigation = useNavigation()

  // const pending = navigation.state === "submitting"

  // let companyDetailsLoaded = true
  // let addressesLoaded = true
  // if (!dataLoaded.ok) {
  //   if (dataLoaded.errorSection === "company-details") {
  //     companyDetailsLoaded = false
  //   } else {
  //     addressesLoaded = false
  //   }
  // }

  // const initialProfile = useMemo(() => mapProfileToForm(profile), [profile])
  // // ✅ baseline = "last saved snapshot" (starts from loader)
  // const [formData, setFormData] = useState(initialProfile)
  // const [errors, setErrors] = useState(null)
  return (
    <Box
      bg="white"
      position="relative"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
      boxShadow="sm"
    >
      <HStack spacing={3} align="center">
        <PiFactory size={24} color="#2b6cb0" />
        <Stack>
          <Text fontWeight="bold" fontSize="lg">
            {t("manage-company-profile")}
          </Text>
        </Stack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          {t("modify-your-companys-profile-i")}
        </Text>
      </Stack>

      <Stack
        align="center"
        p={1}
        my={2}
        borderBottomWidth="1px"
        borderTopWidth="1px"
        color="blue.900"
        borderColor="blue.800"
      >
        <Text fontWeight="bold">Company Details</Text>
      </Stack>
      <Form method="post" action=".">
        <SimpleGrid minChildWidth="xs" gap="2rem" m={3}>
          <Box rounded="sm">
            <Field.Root disabled readOnly>
              <Field.Label>{t("company-name", { ns: "profile" })}</Field.Label>
              <Input
                name="companyName"
                placeholder={t("company-name-0", { ns: "profile" })}
                //value={formData?.email}
              />
            </Field.Root>
          </Box>
        </SimpleGrid>
        {/* {formSubmitError && (
          <Alert.Root status="error" title={formSubmitError}>
            <Alert.Indicator />
            <Alert.Title>{formSubmitError}</Alert.Title>
          </Alert.Root>
        )} */}

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
            //disabled={!isDirty || pending}
            colorPalette="teal"
          >
            {t("save", { ns: "profile" })}
          </Button>
          <Tooltip
            //disabled={!isDirty || pending}
            showArrow
            content={t("restore-the-last-saved-values", { ns: "profile" })}
          >
            <Button
              type="button"
              variant="outline"
              color="red.600"
              //onClick={resetFormHandler}
              //disabled={!isDirty || pending}
            >
              {t("reset-changes", { ns: "profile" })}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Form>
      <Stack
        align="center"
        borderBottomWidth="1px"
        borderTopWidth="1px"
        color="blue.900"
        borderColor="blue.800"
        p={1}
        my={2}
      >
        <Text fontWeight="bold">Adresses</Text>
      </Stack>
    </Box>
  )
}

export default ManageCompanyProfile

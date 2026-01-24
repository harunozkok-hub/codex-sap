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
  Flex,
} from "@chakra-ui/react"
import { FiUser } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useRouteLoaderData } from "react-router"
import { country } from "../../utils/country"

function ManageProfile() {
  // const { profile } = useRouteLoaderData("dashboard")
  // const [formData, setFormData] = useState({})

  // handleFormData = () => {}

  // useEffect(() => {
  //   const newFormData = {
  //     email: profile.email,
  //     first_name: profile.first_name,
  //     last_name: profile.last_name,
  //   }
  //   setFormData((prevData) => {
  //     return { ...prevData, newFormData }
  //   })
  // }, [profile])

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
      <SimpleGrid minChildWidth="xs" gap="2rem" m={3}>
        <Box rounded="sm">
          <Field.Root disabled>
            <Field.Label>Email:</Field.Label>
            <Input name="email" placeholder="Email" />
          </Field.Root>
        </Box>
        <Box alignSelf="flex-end">
          <Field.Root>
            <Field.Label>Dashboard Role:</Field.Label>
            <NativeSelect.Root size="md">
              <NativeSelect.Field placeholder="Select a role" disabled>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </Box>
        <Box rounded="sm">
          <Field.Root required>
            <Field.Label>
              First name:
              <Field.RequiredIndicator />
            </Field.Label>
            <Input name="firstName" placeholder="First name" />
          </Field.Root>
        </Box>
        <Box rounded="sm">
          <Field.Root required>
            <Field.Label>
              Last name:
              <Field.RequiredIndicator />
            </Field.Label>
            <Input name="lastName" placeholder="Last name" />
          </Field.Root>
        </Box>
        <Box rounded="sm">
          <Field.Root>
            <Field.Label>Company name:</Field.Label>
            <Input name="companyName" placeholder="Company name" />
          </Field.Root>
        </Box>
        <Box rounded="sm">
          <Field.Root>
            <Field.Label>Job Title:</Field.Label>
            <Input name="jobTitle" placeholder="Job title" />
          </Field.Root>
        </Box>
        <Box rounded="sm">
          <Field.Root>
            <Field.Label>Phone Number:</Field.Label>
            <Grid templateColumns="repeat(4, 1fr)" width="100%">
              <GridItem colSpan={1}>
                <NativeSelect.Root width="8rem">
                  <NativeSelect.Field name="countryCode">
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
                <Input name="phoneNumber" placeholder="Phone Number" />
              </GridItem>
            </Grid>
          </Field.Root>
        </Box>

        <Box alignSelf="center">
          <Checkbox.Root name="newsletter" value="newsletter">
            <Checkbox.HiddenInput />
            <Checkbox.Label>
              Subscribe to our newsletter for news & offers
            </Checkbox.Label>
            <Checkbox.Control />
          </Checkbox.Root>
        </Box>
      </SimpleGrid>

      <ButtonGroup
        size="md"
        variant="outline"
        justifyContent="center"
        align="center"
        display="flex"
        my={5}
      >
        <Button colorPalette="blue">Save</Button>
        <Button>Reset Changes</Button>
      </ButtonGroup>
    </Box>
  )
}

export default ManageProfile

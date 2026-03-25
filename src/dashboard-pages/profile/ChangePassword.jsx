import { FiUser } from "react-icons/fi"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Form, useActionData, useNavigation } from "react-router"
import PageTitle from "../../components/generic/PageTitle"
import { resGap, resM, resP } from "../../utils/css-chakra"

import NavBreadCrumb from "../../components/navigation/NavBreadCrumb"
import { useTranslation } from "react-i18next"
import FullpageSpinner from "../../components/generic/FullpageSpinner"
import FormInput from "../../components/form/FormInput"

function ChangePassword() {
  const { t } = useTranslation("profile")
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const currentPasswordError = actionData?.errors?.currentPassword
  const newPasswordError = actionData?.errors?.newPassword?.password
  const repeatNewPasswordError =
    actionData?.errors?.newPassword?.confirmPassword
  const formSubmitError = actionData?.errors?.form

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
      <PageTitle ns="common" titleKey="password" />
      <HStack spacing={3} m={1} align="center">
        <FiUser size={24} color="#2b6cb0" />
        <NavBreadCrumb
          currentPageLabel={t("change-password")}
          items={[{ link: "../", title: t("manage-personal-profile") }]}
        />
      </HStack>
      <Stack px={1}>
        <Text fontSize="sm" color="gray.600">
          {t("update-your-password-by-enteri")}
        </Text>
      </Stack>

      <Separator size="xs" colorPalette="blue" m={2} />
      <Form method="put" action=".">
        <SimpleGrid minChildWidth="xs" gap={resGap}>
          <FormInput
            inputName="currentPassword"
            type="password"
            label={t("current-password")}
            placeholder={t("common:e-g-mystrongpass_95")}
            error={currentPasswordError}
            required
          />
          <FormInput
            inputName="newPassword"
            type="password"
            label={t("new-password")}
            placeholder={t("common:e-g-mystrongpass_95")}
            error={newPasswordError}
            required
          />
          <FormInput
            inputName="repeatNewPassword"
            type="password"
            label={t("repeat-new-password")}
            placeholder={t("common:e-g-mystrongpass_95")}
            error={repeatNewPasswordError}
            required
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
          <Button
            type="submit"
            variant="surface"
            colorPalette="teal"
            loading={pending}
          >
            {t("save")}
          </Button>
        </ButtonGroup>
      </Form>
      {pending && <FullpageSpinner />}
    </Box>
  )
}

export default ChangePassword

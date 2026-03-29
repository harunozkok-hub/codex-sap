import { FiUser } from "react-icons/fi"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Form, useActionData, useNavigation } from "react-router"
import PageTitle from "../../components/generic/PageTitle"
import { resGap, resM } from "../../utils/css-chakra"

import NavBreadCrumb from "../../components/navigation/NavBreadCrumb"
import { useTranslation } from "react-i18next"
import FullpageSpinner from "../../components/generic/FullpageSpinner"
import FormInput from "../../components/form/FormInput"
import StickyTitleWithBackButton from "../../components/navigation/StickyTitleWithBackButton"
import PageContainer from "../../components/containers/PageContainer"
import FormContainer from "../../components/containers/FormContainer"

function ChangePassword() {
  const { t } = useTranslation("profile")
  const [isDesktop] = useMediaQuery("(min-width: 768px)")
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const currentPasswordError = actionData?.errors?.currentPassword
  const newPasswordError = actionData?.errors?.newPassword?.password
  const repeatNewPasswordError =
    actionData?.errors?.newPassword?.confirmPassword
  const formSubmitError = actionData?.errors?.form

  return (
    <PageContainer>
      <PageTitle ns="common" titleKey="password" />
      {pending && <FullpageSpinner />}
      <FormContainer maxW="800px">
        {isDesktop ? (
          <NavBreadCrumb
            currentPageLabel={t("change-password")}
            items={[{ link: "../", title: t("manage-personal-profile") }]}
            icon={<FiUser size={24} color="#2b6cb0" />}
          />
        ) : (
          <StickyTitleWithBackButton
            pageTitle={t("change-password")}
            icon={<FiUser size={24} color="#2b6cb0" />}
          />
        )}

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
      </FormContainer>
    </PageContainer>
  )
}

export default ChangePassword

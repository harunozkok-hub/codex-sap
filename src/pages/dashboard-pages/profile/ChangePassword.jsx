import {
  Box,
  ButtonGroup,
  SimpleGrid,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LuIdCard } from "react-icons/lu"
import { Form, useActionData, useNavigation } from "react-router"

import {
  dashboardTitleIconColor,
  pageContentWrapperStyles,
  resGap,
  resM,
} from "@/utils/css-chakra"
import { clearFieldErrorFromErrors } from "@/utils/validators"
import FormContainer from "@/components/containers/FormContainer"
import PageContainer from "@/components/containers/PageContainer"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import PageHeaderWrapper from "@/components/generic/PageHeaderWrapper"
import NavBreadCrumb from "@/components/navigation/NavBreadCrumb"
import FormAlert from "@/components/form/FormAlert"

function ChangePassword() {
  const { t } = useTranslation("profile")
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const [errors, setErrors] = useState(null)

  const currentPasswordError = errors?.currentPassword
  const newPasswordError = errors?.newPassword?.password
  const repeatNewPasswordError = errors?.newPassword?.confirmPassword
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  const handleFormChange = (e) => {
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
  }

  return (
    <PageContainer px="0">
      {pending && <FullpageSpinner />}
      <PageHeaderWrapper
        titleNs="common"
        titleKey="password"
        pageTitle={t("change-password")}
        pageDescription={t("update-your-password-by-enteri")}
        pageIcon={<LuIdCard size={24} color={dashboardTitleIconColor} />}
        contentMaxW="800px"
        desktopTitleBreadCrumb={
          <NavBreadCrumb
            currentPageLabel={t("change-password")}
            items={[{ link: "../", title: t("manage-personal-profile") }]}
            icon={<LuIdCard size={24} color={dashboardTitleIconColor} />}
            mx={resM}
          />
        }
      />

      <Box {...pageContentWrapperStyles}>
        <FormContainer maxW="800px">
          <Form method="put" action=".">
            <SimpleGrid minChildWidth="xs" gap={resGap}>
              <FormInput
                inputName="currentPassword"
                type="password"
                label={t("current-password")}
                placeholder={t("common:e-g-mystrongpass_95")}
                onChange={handleFormChange}
                error={currentPasswordError}
                required
              />
              <FormInput
                inputName="newPassword"
                type="password"
                label={t("new-password")}
                placeholder={t("common:e-g-mystrongpass_95")}
                onChange={handleFormChange}
                error={newPasswordError}
                required
              />
              <FormInput
                inputName="repeatNewPassword"
                type="password"
                label={t("repeat-new-password")}
                placeholder={t("common:e-g-mystrongpass_95")}
                onChange={handleFormChange}
                error={repeatNewPasswordError}
                required
              />
            </SimpleGrid>

            {formSubmitError && (
              <FormAlert status="error" title={formSubmitError} mt={resM} />
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
                loading={pending}
                label={t("save")}
              />
            </ButtonGroup>
          </Form>
        </FormContainer>
      </Box>
    </PageContainer>
  )
}

export default ChangePassword

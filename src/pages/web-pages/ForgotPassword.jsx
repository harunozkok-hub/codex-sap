import { Heading, Text, Flex, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router"

import { resM } from "@/utils/css-chakra"
import { clearFieldErrorFromErrors } from "@/utils/validators"
import FormAlert from "@/components/form/FormAlert"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"

function ForgotPassword() {
  const { t } = useTranslation("common")
  const [searchParams] = useSearchParams()
  const defaultEmail = searchParams.get("email") || ""

  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const [errors, setErrors] = useState(null)

  const emailError = errors?.email
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
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <GlassEffectContainer>
        <PageTitle ns="common" titleKey="forgot-password" />
        <Heading size="md" mb={3}>
          {t("forgot-password").toUpperCase()}:
        </Heading>
        <Form method="post">
          <Stack>
            <Text mb={resM}>{t("forgot-password-description")}</Text>
            <FormInput
              inputName="email"
              label="Email"
              placeholder={t("e-g-example-example-com")}
              error={emailError}
              defaultValue={actionData?.email ?? defaultEmail}
              onChange={handleFormChange}
              required
            />
            {formSubmitError && (
              <FormAlert status="error" mt={resM} title={formSubmitError} />
            )}
            <PrimaryButton
              type="submit"
              loading={pending}
              mt={resM}
              label={t("reset-password")}
            />
          </Stack>
        </Form>
      </GlassEffectContainer>
    </Flex>
  )
}

export default ForgotPassword

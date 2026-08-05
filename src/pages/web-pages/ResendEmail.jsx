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

function ResendEmail() {
  const { t } = useTranslation("common")
  const [params] = useSearchParams()

  const emailFromQuery = params.get("email") || ""
  const emailFromSession = sessionStorage.getItem("pending_signup_email") || ""
  const defaultEmail = emailFromQuery || emailFromSession

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
        <PageTitle ns="common" titleKey="resend-verification-email" />
        <Heading size="md" mb={3}>
          {t("resend-verification-email").toUpperCase()}:
        </Heading>
        <Form method="post" style={{ width: "100%" }}>
          <Stack>
            <Text mb="2">{t("please-enter-your-email-that-y")}</Text>
            <FormInput
              inputName="email"
              label="Email"
              placeholder={t("e-g-example-example-com")}
              error={emailError}
              onChange={handleFormChange}
              defaultValue={actionData?.email ?? defaultEmail}
              required
            />
            {formSubmitError && (
              <FormAlert title={formSubmitError} status="error" mt={resM} />
            )}
            <PrimaryButton
              type="submit"
              loading={pending}
              mt={resM}
              label={t("resend-verification-email")}
            />
          </Stack>
        </Form>
      </GlassEffectContainer>
    </Flex>
  )
}

export default ResendEmail

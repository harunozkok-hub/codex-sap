import { Button, Text, Stack, Heading, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useNavigation,
  useActionData,
  NavLink,
  useParams,
} from "react-router"

import { resM } from "@/utils/css-chakra"
import { clearFieldErrorFromErrors } from "@/utils/validators"
import FormAlert from "@/components/form/FormAlert"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"

function Login() {
  const { t } = useTranslation("common")
  const params = useParams()
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const [errors, setErrors] = useState(null)
  const [resendDismissed, setResendDismissed] = useState(false)
  const [editedEmail, setEditedEmail] = useState("")

  const emailError = errors?.email
  const passwordError = errors?.password
  const formSubmitError = errors?.form
  const needsVerification = !!actionData?.needsVerification
  const showResend = needsVerification && !resendDismissed
  const resendEmail = needsVerification
    ? editedEmail || actionData?.email || ""
    : editedEmail

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        // Existing form pattern: copy latest action errors into local state so inputs
        // can clear field-by-field as the user edits.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  const handleFormChange = (e) => {
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))

    if (needsVerification && !resendDismissed) {
      setResendDismissed(true)
    }

    if (e.target?.name === "email") {
      setEditedEmail(e.target.value)
    }
  }

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <GlassEffectContainer>
        <PageTitle ns="common" titleKey="login" />
        <Heading>{t("login").toUpperCase()}</Heading>
        <Form
          method="POST"
          style={{ width: "100%" }}
          onSubmit={() => setResendDismissed(false)}
        >
          <Stack>
            <FormInput
              inputName="email"
              error={emailError}
              label="Email:"
              placeholder={t("e-g-example-example-com")}
              onChange={handleFormChange}
              required
            />
            <FormInput
              inputName="password"
              error={passwordError}
              label={t("password")}
              type="password"
              placeholder={t("e-g-mystrongpass_95")}
              onChange={handleFormChange}
              required
            />
            <Stack align="flex-end">
              <Button
                size="sm"
                height="1rem"
                colorPalette="purple"
                type="button"
                variant="plain"
                as={NavLink}
                to={`/${params.lang}/forgot-password${resendEmail ? `?email=${encodeURIComponent(resendEmail)}` : ""}`}
              >
                {t("forgot-password")}?
              </Button>
            </Stack>

            {formSubmitError && (
              <FormAlert status="error" mt={resM} title={formSubmitError} />
            )}
            <PrimaryButton
              type="submit"
              disabled={showResend}
              loading={pending}
              mt={resM}
              label={t("submit")}
            />
          </Stack>
        </Form>
        {showResend && (
          <>
            <Text fontSize="sm" mt={2}>
              {t("didnt-receive-the-email")}
            </Text>
            <SecondaryButton
              type="button"
              to={`/${params.lang}/resend-email${resendEmail ? `?email=${encodeURIComponent(resendEmail)}` : ""}`}
              label={t("resend-verification-email")}
              mt={2}
            />
          </>
        )}
      </GlassEffectContainer>
    </Flex>
  )
}

export default Login

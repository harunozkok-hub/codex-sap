import { Heading, Flex, Stack, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useActionData,
  useLoaderData,
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

function ResetPassword() {
  const { t } = useTranslation("common")
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""

  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const data = useLoaderData()
  const { ok, message } = data

  const [errors, setErrors] = useState(null)
  const passwordError = errors?.password
  const confirmPasswordError = errors?.confirmPassword
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
        <PageTitle ns="common" titleKey="reset-your-password" />
        <Heading size="md" mb={3}>
          {t("reset-your-password").toUpperCase()}:
        </Heading>
        {ok ? (
          <Form method="post" style={{ width: "100%" }}>
            <Stack>
              <Input type="hidden" name="token" value={token} />
              <FormInput
                inputName="password"
                label={t("new-password")}
                type="password"
                placeholder={t("e-g-mystrongpass_95")}
                error={passwordError}
                onChange={handleFormChange}
                required
              />
              <FormInput
                inputName="confirmPassword"
                label={t("confirm-new-password")}
                type="password"
                placeholder={t("e-g-mystrongpass_95")}
                error={confirmPasswordError}
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
        ) : (
          <FormAlert status="error" mt={resM} title={message} />
        )}
      </GlassEffectContainer>
    </Flex>
  )
}

export default ResetPassword

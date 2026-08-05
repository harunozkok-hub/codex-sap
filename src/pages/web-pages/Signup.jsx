import { Stack, Heading, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  useParams,
} from "react-router"

import { resM } from "@/utils/css-chakra"
import { clearFieldErrorFromErrors } from "@/utils/validators"
import FormAlert from "@/components/form/FormAlert"
import FormCheckbox from "@/components/form/FormCheckbox"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"

const Register = () => {
  const { t } = useTranslation(["common", "profile"])
  const params = useParams()
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const pending = navigation.state === "submitting"

  const [errors, setErrors] = useState(null)

  const formSubmitError = errors?.form
  const companyNameError = errors?.companyName
  const firstNameError = errors?.firstName
  const lastNameError = errors?.lastName
  const emailError = errors?.email
  const passwordError = errors?.password?.password
  const confirmPasswordError = errors?.password?.confirmPassword
  const acceptTermsError = errors?.acceptTerms

  useEffect(() => {
    if (actionData?.ok && actionData?.email) {
      sessionStorage.setItem("pending_signup_email", actionData.email)
      navigate(`/${params.lang}/signup-success`, { replace: true })
    }
  }, [actionData, navigate, params])

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  const handleFormChange = (e, checkboxName = null) => {
    if (checkboxName) {
      setErrors((prev) => clearFieldErrorFromErrors(prev, checkboxName))
    } else {
      setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
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
        <Heading>{t("signup").toUpperCase()}</Heading>
        <PageTitle ns="common" titleKey="signup" />
        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <FormAlert
              status="info"
              hiddenTitle={t("single-admin-registry-per-comp")}
              title={t("please-note-that-you-can-regis")}
            />

            <FormInput
              inputName="companyName"
              placeholder={t("company-name-0", { ns: "profile" })}
              label={t("company-name", { ns: "profile" })}
              error={companyNameError}
              onChange={handleFormChange}
              required
            />
            <FormInput
              inputName="firstName"
              placeholder={t("first-name-0", { ns: "profile" })}
              label={t("first-name", { ns: "profile" })}
              error={firstNameError}
              onChange={handleFormChange}
              required
            />
            <FormInput
              inputName="lastName"
              placeholder={t("last-name-0", { ns: "profile" })}
              label={t("last-name", { ns: "profile" })}
              onChange={handleFormChange}
              error={lastNameError}
              required
            />
            <FormInput
              inputName="email"
              placeholder={t("e-g-example-example-com")}
              label="Email"
              onChange={handleFormChange}
              error={emailError}
              required
            />
            <FormInput
              type="password"
              inputName="password"
              placeholder={t("e-g-mystrongpass_95")}
              label={t("password")}
              onChange={handleFormChange}
              error={passwordError}
              required
            />
            <FormInput
              type="password"
              inputName="confirmPassword"
              placeholder={t("e-g-mystrongpass_95")}
              label={t("confirm-password")}
              onChange={handleFormChange}
              error={confirmPasswordError}
              required
            />
            <FormCheckbox
              mt="2"
              inputName="acceptTerms"
              value="acceptTerms"
              text={t("i-have-read-and-agree-to-the-t")}
              error={acceptTermsError}
              onCheckedChange={(e) => handleFormChange(e, "newsletter")}
              required
              labelPosition="right"
            />
            <FormCheckbox
              inputName="newsletter"
              value="newsletter"
              text={t("subscribe-to-our-newsletter-fo", { ns: "profile" })}
              labelPosition="right"
            />
            {formSubmitError && (
              <FormAlert title={formSubmitError} status="error" mt={resM} />
            )}
            <PrimaryButton
              type="submit"
              mt={10}
              loading={pending}
              label={t("submit")}
            />
          </Stack>
        </Form>
      </GlassEffectContainer>
    </Flex>
  )
}

export default Register

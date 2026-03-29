import {
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  SimpleGrid,
  Button,
  ButtonGroup,
  IconButton,
  For,
  Alert,
  useMediaQuery,
} from "@chakra-ui/react"
import { Tooltip } from "../../components/ui/tooltip"
import { toaster } from "../../components/ui/toaster"
import { useTranslation } from "react-i18next"
import { PiFactory } from "react-icons/pi"
import { FiPlusSquare, FiTrash2 } from "react-icons/fi"
import { Form, useActionData, useNavigation, useNavigate } from "react-router"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useState, useMemo, useEffect } from "react"
import { resGap, resPY, resM } from "../../utils/css-chakra"
import ErrorMessage from "../../components/generic/ErrorMessage"
import {
  companyBillingAddressQueryKey,
  companyHQAddressQueryKey,
  companyAddressQuery,
  companyProfileQuery,
  companyAddressQueryKey,
  deleteCompanyAddress,
} from "../../queries/profile-queries"
import { mapCompanyDetailsToForm } from "./util/profile"
import {
  clearFieldErrorFromErrors,
  isFormDifferent,
} from "../../utils/validators"

import FormInput from "../../components/form/FormInput"
import PhoneInput from "../../components/form/PhoneInput"
import AddressCard from "../../components/form/AddressCard"
import CustomCard from "../../components/generic/CustomCard"
import CustomDialog from "../../components/generic/CustomDialog"
import PageTitle from "../../components/generic/PageTitle"
import FullpageSpinner from "../../components/generic/FullpageSpinner"
import UnsavedChangesBlocker from "../../components/generic/UnsavedChangesBlocker"
import PageContainer from "../../components/containers/PageContainer"
import FormContainer from "../../components/containers/FormContainer"
import StickyTitleWithBackButton from "../../components/navigation/StickyTitleWithBackButton"

function ManageCompanyProfile() {
  const { t } = useTranslation(["company-profile", "profile", "common"])
  const [isDesktop] = useMediaQuery("(min-width: 768px)")
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: compDetailsData } = useSuspenseQuery(companyProfileQuery())
  const { data: hqAddress } = useSuspenseQuery(companyAddressQuery("hq"))
  const { data: billingAddress } = useSuspenseQuery(
    companyAddressQuery("billing"),
  )
  const compAddressesData = {
    hq: hqAddress,
    billing: billingAddress,
  }

  const actionData = useActionData()
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"

  const initialProfile = useMemo(
    () => mapCompanyDetailsToForm(compDetailsData),
    [compDetailsData],
  )
  // ✅ baseline = "last saved snapshot" (starts from prefetched query)
  const [formData, setFormData] = useState(initialProfile)
  const [errors, setErrors] = useState(null)
  const formDirty = isFormDifferent(initialProfile, formData)

  const [openDialog, setOpenDialog] = useState(null) // "hq" | "billing" | null

  const deleteAddressMutation = useMutation({
    mutationFn: deleteCompanyAddress,
    onSuccess: (_, type) => {
      setOpenDialog(null)
      const queryKey = companyAddressQueryKey(type)

      queryClient.setQueryData(queryKey, null)
      toaster.create({
        title: t("delete-address"),
        type: "success",
        duration: 6000,
        description: t("address-deleted-successfully"),
      })
    },
    onError: (err) => {
      toaster.create({
        title: t("delete-address"),
        type: "error",
        duration: 6000,
        description: err?.message || t("deleting-address-failed-please"),
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: companyHQAddressQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: companyBillingAddressQueryKey,
      })
    },
  })

  const legalNameError = errors?.legalName
  const displayNameError = errors?.displayName
  const billingEmailError = errors?.billingEmail
  const vatNumberError = errors?.vatNumber
  const companyPhoneError = errors?.companyPhone
  const formSubmitError = errors?.form

  useEffect(() => {
    if (navigation.state === "idle") {
      if (actionData?.errors) {
        setErrors(actionData.errors)
      }
    }
  }, [actionData, navigation.state])

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target?.name]: e.target?.value }))
    setErrors((prev) => clearFieldErrorFromErrors(prev, e.target?.name))
  }

  const resetFormHandler = () => {
    setFormData(initialProfile)
    setErrors(null)
  }
  const addAddressHandler = (type) => {
    navigate(`address/${type}`)
  }
  const editAddressHandler = (type) => navigate(`address/${type}`)
  const deleteAddressHandler = (type) => {
    deleteAddressMutation.mutate(type)
  }

  const addressesList = [
    { type: "hq", label: t("hq-address") },
    { type: "billing", label: t("billing-address") },
  ]

  return (
    <PageContainer>
      {pending && <FullpageSpinner />}
      <PageTitle ns="company-profile" titleKey="manage-company-profile" />
      <FormContainer>
        {isDesktop ? (
          <HStack spacing={3} m={1} align="center">
            <PiFactory size={24} color="#2b6cb0" />
            <Stack>
              <Text fontWeight="bold" fontSize="lg">
                {t("manage-company-profile")}
              </Text>
            </Stack>
          </HStack>
        ) : (
          <StickyTitleWithBackButton
            pageTitle={t("manage-company-profile")}
            backButton={false}
            icon={<PiFactory size={24} color="#2b6cb0" />}
          />
        )}
        <Stack px={1}>
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
          <Text fontWeight="bold">{t("company-details")}</Text>
        </Stack>
        {compDetailsData ? (
          <>
            <UnsavedChangesBlocker when={formDirty} />
            <Form method="post" action=".">
              <SimpleGrid minChildWidth="xs" gap={resGap}>
                <FormInput
                  readOnly={true}
                  value={formData?.companyName}
                  inputName="companyName"
                  placeholder={t("company-name-0", { ns: "profile" })}
                  label={t("company-name", { ns: "profile" })}
                />
                <FormInput
                  value={formData?.legalName}
                  inputName="legalName"
                  placeholder={t("legal-name-placeholder")}
                  label={t("legal-name")}
                  error={legalNameError}
                  onChange={handleFormData}
                  tooltipInfo={t("legal-name-tooltip")}
                />
                <FormInput
                  inputName="displayName"
                  placeholder={t("display-name-placeholder")}
                  value={formData?.displayName}
                  onChange={handleFormData}
                  label={t("display-name")}
                  error={displayNameError}
                  tooltipInfo={t("display-name-tooltip")}
                />
                <FormInput
                  inputName="billingEmail"
                  placeholder={t("billing-email-placeholder")}
                  value={formData?.billingEmail}
                  onChange={handleFormData}
                  label={t("billing-email")}
                  error={billingEmailError}
                  tooltipInfo={t("biling-email-tooltip")}
                />
                <FormInput
                  inputName="vatNumber"
                  placeholder={t("vat-number-placeholder")}
                  value={formData?.vatNumber}
                  onChange={handleFormData}
                  label={t("vat-number")}
                  error={vatNumberError}
                  tooltipInfo={t("vat-number-tooltip")}
                />
                <PhoneInput
                  error={companyPhoneError}
                  label={t("company-phone")}
                  tooltipInfo={t("company-phone-tooltip")}
                  countryCodeValue={formData?.countryCodeCompany}
                  phoneNumberValue={formData?.phoneNumberCompany}
                  onChange={handleFormData}
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
                  disabled={!formDirty || pending}
                  colorPalette="teal"
                >
                  {t("save", { ns: "profile" })}
                </Button>
                <Tooltip
                  disabled={!formDirty || pending}
                  showArrow
                  content={t("restore-the-last-saved-values", {
                    ns: "profile",
                  })}
                >
                  <Button
                    type="button"
                    variant="outline"
                    color="red.600"
                    onClick={resetFormHandler}
                    disabled={!formDirty || pending}
                  >
                    {t("reset-changes", { ns: "profile" })}
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Form>
          </>
        ) : (
          <ErrorMessage
            title={t("company-details-could-not-fetc")}
            description={t("common:please-refresh-or-try-again-later")}
          />
        )}
        <Stack
          align="center"
          borderBottomWidth="1px"
          borderTopWidth="1px"
          color="blue.900"
          borderColor="blue.800"
          p={1}
          my={2}
        >
          <Text fontWeight="bold">{t("adresses")}</Text>
        </Stack>
        <SimpleGrid
          minChildWidth="xs"
          gap={resGap}
          mx="auto"
          my={resM}
          maxW="3xl"
          justifyItems="center"
        >
          <For each={addressesList}>
            {(item) => {
              const deletePending =
                deleteAddressMutation.isPending &&
                deleteAddressMutation.variables === item.type

              return compAddressesData[item.type] ? (
                <AddressCard
                  key={item.type}
                  address={compAddressesData[item.type]}
                  editHandler={() => editAddressHandler(item.type)}
                  deletable
                  label={item.label}
                  deleteDialog={
                    <CustomDialog
                      type="delete"
                      triggerButton={
                        <IconButton
                          aria-label={t("delete-address")}
                          colorPalette="red"
                          variant="ghost"
                          loading={deletePending}
                          disabled={deletePending}
                        >
                          <FiTrash2 size={20} color="#f87171" />
                        </IconButton>
                      }
                      dialogTitle={t("delete-address")}
                      dialogText={t("are-you-sure-you-want-to-delet")}
                      onConfirm={() => deleteAddressHandler(item.type)}
                      confirmLoading={deletePending}
                      isOpen={openDialog === item.type}
                      onOpenChange={(open) =>
                        setOpenDialog(open && !deletePending ? item.type : null)
                      }
                    />
                  }
                />
              ) : (
                <CustomCard key={item.type}>
                  <VStack justifyContent="center" p={resPY} mb={2}>
                    <Text fontWeight="bold">{item.label}</Text>
                    <Text>{t("no-address-information-was-fou")}</Text>
                    <Button
                      mt={3}
                      variant="outline"
                      colorPalette="teal"
                      onClick={() => addAddressHandler(item.type)}
                    >
                      <FiPlusSquare /> {t("add-address")}
                    </Button>
                  </VStack>
                </CustomCard>
              )
            }}
          </For>
        </SimpleGrid>
      </FormContainer>
    </PageContainer>
  )
}

export default ManageCompanyProfile

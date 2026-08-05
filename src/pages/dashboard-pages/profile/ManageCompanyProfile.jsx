import {
  Box,
  For,
  Stack,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useId, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuBuilding2, LuSquarePlus, LuTrash2 } from "react-icons/lu"
import {
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
} from "react-router"

import {
  companyAddressQuery,
  companyAddressQueryKey,
  companyBillingAddressQueryKey,
  companyProfileQuery,
  companyHQAddressQueryKey,
  deleteCompanyAddress,
  resetCompanyCountry,
  companyDetailsQueryKey,
} from "@/queries/profile-queries"
import {
  dashboardSectionHeaderStyles,
  dashboardSectionTitleTextStyles,
  dashboardTitleIconColor,
  pageContentWrapperStyles,
  resGap,
  resM,
  resPX,
} from "@/utils/css-chakra"
import { toaster } from "@/components/ui/toaster"
import { country } from "@/utils/country"
import FormContainer from "@/components/containers/FormContainer"
import PageContainer from "@/components/containers/PageContainer"
import AddressCard from "@/components/form/AddressCard"
import DangerButton from "@/components/form/DangerButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import CustomDialog from "@/components/generic/CustomDialog"
import ErrorMessage from "@/components/generic/ErrorMessage"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import NavBreadCrumb from "@/components/navigation/NavBreadCrumb"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageHeaderWrapper from "@/components/generic/PageHeaderWrapper"
import CompanyProfileForm from "@/pages/dashboard-pages/profile/forms/CompanyProfileForm"
import {
  dashboardOnboardingQuery,
  dashboardOnboardingQueryKey,
} from "@/queries/dashboard-queries"

function ManageCompanyProfile() {
  const { t } = useTranslation([
    "company-profile",
    "profile",
    "common",
    "dashboard",
  ])
  const { lang } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const { setBlockerState } = useOutletContext()
  const blockerId = useId()
  const pending = navigation.state === "submitting"

  const { data: onboardingData } = useSuspenseQuery(dashboardOnboardingQuery())
  const { data: compDetailsData } = useSuspenseQuery(companyProfileQuery())
  const { data: hqAddress } = useSuspenseQuery(companyAddressQuery("hq"))
  const { data: billingAddress } = useSuspenseQuery(
    companyAddressQuery("billing"),
  )
  const compAddressesData = {
    hq: hqAddress,
    billing: billingAddress,
  }
  const countryOptions = country(t)
  const [openDialog, setOpenDialog] = useState(null) // "hq" | "billing" | "change-country" | null

  const changeCompanyCountryMutation = useMutation({
    mutationFn: resetCompanyCountry,
    onSuccess: (nextOnboardingData) => {
      setOpenDialog(null)
      setBlockerState(blockerId, false)
      queryClient.setQueryData(
        dashboardOnboardingQueryKey,
        () => nextOnboardingData,
      )

      toaster.create({
        title: t("change-company-country"),
        type: "success",
        duration: 6000,
        description: t("company-country-changed-successfully"),
      })

      navigate(`/${lang}/dashboard-onboarding`, { replace: true })
    },
    onError: (err) => {
      toaster.create({
        title: t("change-company-country"),
        type: "error",
        duration: 6000,
        description: err?.message || t("change-company-country-failed"),
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: dashboardOnboardingQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: companyDetailsQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: companyHQAddressQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: companyBillingAddressQueryKey,
      })
    },
  })
  const changeCompanyPending = changeCompanyCountryMutation.isPending
  const profileFormKey = useMemo(
    () =>
      JSON.stringify({
        company: compDetailsData,
        countryMetadata: onboardingData?.country_metadata ?? null,
      }),
    [compDetailsData, onboardingData?.country_metadata],
  )

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
  const changeCompanyCountryHandler = () => {
    changeCompanyCountryMutation.mutate()
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
    <PageContainer px="0">
      {pending && <FullpageSpinner />}
      <PageHeaderWrapper
        titleNs="company-profile"
        titleKey="manage-company-profile"
        pageTitle={t("manage-company-profile")}
        pageDescription={t("modify-your-companys-profile-i")}
        pageIcon={<LuBuilding2 size={24} color={dashboardTitleIconColor} />}
        mobileBackButtonEnabled={false}
        desktopTitleBreadCrumb={
          <NavBreadCrumb
            currentPageLabel={t("manage-company-profile")}
            icon={<LuBuilding2 size={24} color={dashboardTitleIconColor} />}
            mx={resM}
          />
        }
      />

      <Box {...pageContentWrapperStyles}>
        <FormContainer>
          <Stack {...dashboardSectionHeaderStyles}>
            <Text {...dashboardSectionTitleTextStyles}>
              {t("company-details")}
            </Text>
          </Stack>
          {compDetailsData ? (
            <CompanyProfileForm
              key={profileFormKey}
              compDetailsData={compDetailsData}
              onboardingData={onboardingData}
              countryOptions={countryOptions}
              onChangeCountry={changeCompanyCountryHandler}
              changeCompanyPending={changeCompanyPending}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          ) : (
            <ErrorMessage
              title={t("company-details-could-not-fetc")}
              description={t("common:please-refresh-or-try-again-later")}
            />
          )}
          <Stack {...dashboardSectionHeaderStyles}>
            <Text {...dashboardSectionTitleTextStyles}>{t("adresses")}</Text>
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
                    timezone={compDetailsData.timezone}
                    deletable
                    label={item.label}
                    deleteDialog={
                      <CustomDialog
                        type="delete"
                        triggerButton={
                          <DangerButton
                            forIcon
                            aria-label={t("delete-address")}
                            loading={deletePending}
                            disabled={deletePending}
                          >
                            <LuTrash2 size={20} />
                          </DangerButton>
                        }
                        dialogTitle={t("delete-address")}
                        dialogText={t("are-you-sure-you-want-to-delet")}
                        onConfirm={() => deleteAddressHandler(item.type)}
                        confirmLoading={deletePending}
                        isOpen={openDialog === item.type}
                        onOpenChange={(open) =>
                          setOpenDialog(
                            open && !deletePending ? item.type : null,
                          )
                        }
                      />
                    }
                  />
                ) : (
                  <GlassEffectContainer
                    maxW="md"
                    minH="sm"
                    p={4}
                    key={item.type}
                    justifyContent="center"
                  >
                    <VStack justifyContent="center" w="100%">
                      <Text fontWeight="bold">{item.label}</Text>
                      <Text>{t("no-address-information-was-fou")}</Text>
                      <HStack
                        w="100%"
                        justifyContent="center"
                        mt={2}
                        px={resPX}
                      >
                        <SecondaryButton
                          mt={3}
                          onClick={() => addAddressHandler(item.type)}
                        >
                          <LuSquarePlus /> {t("add-address")}
                        </SecondaryButton>
                      </HStack>
                    </VStack>
                  </GlassEffectContainer>
                )
              }}
            </For>
          </SimpleGrid>
        </FormContainer>
      </Box>
    </PageContainer>
  )
}

export default ManageCompanyProfile

import {
  SimpleGrid,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { LuIdCard } from "react-icons/lu"
import { useNavigation } from "react-router"

import { sessionQuery } from "@/queries/profile-queries"
import {
  dashboardSectionContentSpacing,
  dashboardSectionHeaderStyles,
  dashboardSectionTitleTextStyles,
  dashboardTitleIconColor,
  pageContentWrapperStyles,
  resGap,
} from "@/utils/css-chakra"
import { Tooltip } from "@/components/ui/tooltip"
import FormContainer from "@/components/containers/FormContainer"
import PageContainer from "@/components/containers/PageContainer"
import FormInput from "@/components/form/FormInput"
import SecondaryButton from "@/components/form/SecondaryButton"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import PageHeaderWrapper from "@/components/generic/PageHeaderWrapper"
import ProfileForm from "@/pages/dashboard-pages/profile/forms/ProfileForm"

function ManageProfile() {
  const { t } = useTranslation(["profile", "common"])
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const navigation = useNavigation()

  const pending = navigation.state === "submitting"
  const profileFormKey = useMemo(
    () => JSON.stringify(profile ?? null),
    [profile],
  )

  return (
    <PageContainer px="0">
      {pending && <FullpageSpinner />}
      <PageHeaderWrapper
        titleNs="profile"
        titleKey="manage-personal-profile"
        pageTitle={t("manage-personal-profile")}
        pageDescription={t("you-can-modify-the-personal-in")}
        pageIcon={<LuIdCard size={24} color={dashboardTitleIconColor} />}
        mobileBackButtonEnabled={false}
      />

      <Box {...pageContentWrapperStyles}>
        <FormContainer>
          <ProfileForm key={profileFormKey} profile={profile} />
          <Stack {...dashboardSectionHeaderStyles}>
            <Text {...dashboardSectionTitleTextStyles}>
              {t("common:password")}
            </Text>
          </Stack>
          <SimpleGrid
            {...dashboardSectionContentSpacing}
            minChildWidth="48"
            gap={resGap}
            mx={{ base: "0.5rem", md: "1rem" }}
            maxW="2xl"
          >
            <FormInput
              inputName="password"
              type="password"
              value={t("common:e-g-mystrongpass_95")}
              readOnly
            />
            <Stack justifyContent="center">
              <Tooltip
                disabled={pending}
                showArrow
                content={t("click-to-change-your-password")}
              >
                <SecondaryButton
                  type="button"
                  disabled={pending}
                  to="../change-user-password"
                  label={t("change-password")}
                />
              </Tooltip>
            </Stack>
          </SimpleGrid>
        </FormContainer>
      </Box>
    </PageContainer>
  )
}

export default ManageProfile

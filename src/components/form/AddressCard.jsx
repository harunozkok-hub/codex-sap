import { Box, HStack, VStack, Text } from "@chakra-ui/react"
import { country } from "@/utils/country"
import { useTranslation } from "react-i18next"
import { LuPencilLine } from "react-icons/lu"

import SecondaryButton from "@/components/form/SecondaryButton"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import { resPX } from "@/utils/css-chakra"
import { formatDateTime } from "@/utils/datetime"

const AddressCard = ({
  address,
  editHandler,
  label,
  deletable,
  deleteDialog,
  editDateHidden = false,
  timezone = null,
  editable = true,
  showPhone = false,
  maxW = "md",
  minH = "sm",
  px = { base: "1rem", md: "1.2rem" },
  py = { base: "1rem", md: "1.15rem" },
}) => {
  const { t } = useTranslation(["common", "profile"])
  const localUpdatedAt = formatDateTime(address.updated_at, { timezone })
  const countryStr = country(t).find(
    (item) => item.iso2 === address.country_code,
  )?.country

  const line1 = address.street + " " + address.house_number

  return (
    <GlassEffectContainer
      maxW={maxW}
      w="100%"
      justifyContent="space-between"
      minH={minH}
      px={px}
      py={py}
      gap="3"
    >
      {deletable && (
        <HStack width="100%" justifyContent="flex-end">
          {deleteDialog}
        </HStack>
      )}
      <VStack mb={2} w="100%" align="stretch">
        <Text fontWeight="bold" textAlign="center">
          {label ?? address.type}
        </Text>

        <Box
          w="100%"
          textAlign="start"
          pt="3"
          overflowWrap="anywhere"
          wordBreak="break-word"
        >
          {address.name && (
            <Text fontSize="sm" fontWeight="bold">
              {address.name}
            </Text>
          )}
          <Text>{line1}</Text>
          <Text>{address.address_extra}</Text>
          <Text>
            {address.city}, {address.postal_code}
          </Text>
          <Text>{countryStr}</Text>
          {showPhone && (
            <Box pt="3" overflowWrap="anywhere" wordBreak="break-word">
              <Text fontSize="sm" fontWeight="bold">
                {t("profile:phone-number")}
              </Text>
              <Text>{address.phone ?? "-"}</Text>
            </Box>
          )}
        </Box>
      </VStack>

      {editable && (
        <HStack w="100%" justifyContent="center" mt={2} px={resPX}>
          <SecondaryButton onClick={editHandler} w="100%">
            <LuPencilLine /> {t("edit")}
          </SecondaryButton>
        </HStack>
      )}

      {!editDateHidden && (
        <Box display="flex" justifyContent="flex-end" mt={7} w="100%">
          <Text fontSize="xs" fontWeight="semibold">
            {t("updated-at")} {localUpdatedAt}
          </Text>
        </Box>
      )}
    </GlassEffectContainer>
  )
}

export default AddressCard

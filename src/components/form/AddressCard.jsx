import { Box, HStack, VStack, Text, Button, IconButton } from "@chakra-ui/react"
import { country } from "../../utils/country"
import { useTranslation } from "react-i18next"
import { FiEdit } from "react-icons/fi"

const AddressCard = ({
  address,
  editHandler,
  label,
  deletable,
  deleteDialog,
}) => {
  const { t } = useTranslation("common")
  const utcUpdatedAt = new Date(address.updated_at)

  const localUpdatedAt = utcUpdatedAt.toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  })
  const countryStr = country.find(
    (item) => item.iso2 === address.country_code,
  ).country

  return (
    <Box
      bg="white"
      borderRadius="md"
      p={4}
      h="100%"
      boxShadow="md"
      shadowColor="teal.100"
      maxW="md"
      w="100%"
      justifySelf="center"
    >
      {deletable && <HStack justifyContent="flex-end">{deleteDialog}</HStack>}
      <VStack mb={2}>
        <Text fontWeight="bold">{label ?? address.type}</Text>

        <Box width="max-content" textAlign="start">
          {address.name && (
            <Text fontSize="sm" fontWeight="bold">
              {address.name}
            </Text>
          )}
          <Text>{address.line1}</Text>
          <Text>{address.line2}</Text>
          <Text>
            {address.city}, {address.postal_code}
          </Text>
          <Text>{countryStr}</Text>
        </Box>
      </VStack>

      <HStack justifyContent="center" mt={2}>
        <Button variant="outline" colorPalette="teal" onClick={editHandler}>
          <FiEdit /> {t("edit")}
        </Button>
      </HStack>

      <Box display="flex" justifyContent="flex-end" mt={7}>
        <Text fontSize="xs" fontWeight="semibold">
          {t("updated-at")} {localUpdatedAt}
        </Text>
      </Box>
    </Box>
  )
}

export default AddressCard

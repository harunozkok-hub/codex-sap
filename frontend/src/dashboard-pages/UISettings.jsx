import LanguageSelector from "../components/LanguageSelector"
import {
  Box,
  HStack,
  Stack,
  Switch,
  Text,
  Separator,
  useMediaQuery,
} from "@chakra-ui/react"
import { FiSettings, FiCheck, FiX } from "react-icons/fi"
import { useTranslation } from "react-i18next"

function UISettings() {
  const [bigSize] = useMediaQuery("(min-width: 800px)")
  const { t } = useTranslation("ui-settings")

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
      boxShadow="sm"
    >
      <HStack spacing={3} align="center">
        <FiSettings size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {t("user-interface-settings")}
          </Text>
        </Box>
      </HStack>

      <Stack>
        <Text fontSize="sm" color="gray.600">
          {t("adjust-your-ui-settings")}
        </Text>
      </Stack>
      <Separator size="xs" colorPalette="blue" m={2} />
      <Box width={{ md: "90%", base: "100%" }} px={3} py={4} mx="auto">
        <Switch.Root
          width="100%"
          py="0.5rem"
          justifyContent="space-between"
          variant="raised"
          colorPalette="purple"
          size="md"
        >
          <Switch.HiddenInput />
          <Switch.Label>{t("switch-to-the-dark-mode")}</Switch.Label>
          <Switch.Control bg="gray.200" shadow="sm">
            <Switch.Thumb size="sm">
              <Switch.ThumbIndicator fallback={<FiX color="black" />}>
                <FiCheck color="white" />
              </Switch.ThumbIndicator>
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Root>
        <Separator size="xs" m={2} />
        <HStack display="flex" justifyContent="space-between" py="0.5rem">
          <Box>
            <Text fontWeight="medium" fontSize="sm">
              {t("dashboard-language")}
            </Text>
          </Box>

          <Box>
            {bigSize ? (
              <LanguageSelector dark size="lg" />
            ) : (
              <LanguageSelector dark />
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

export default UISettings

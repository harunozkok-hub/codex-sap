import { Box, HStack, Stack, Switch, Text } from "@chakra-ui/react"
import { FiSettings } from "react-icons/fi"

function UISettings() {
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
            Settings
          </Text>
        </Box>
      </HStack>

      <Stack>
        <Text fontSize="sm" color="gray.600">
          Adjust your Ui settings and personolize your dashboard.
        </Text>
        <Box shadow="xs" display="flex" flexBasis="75%" p={3}>
          <Switch.Root
            display="flex"
            flex="1"
            justifyContent="space-between"
            variant="raised"
            colorPalette="blue"
            size="md"
          >
            <Switch.HiddenInput />
            <Switch.Label>Switch to the Dark Mode</Switch.Label>
            <Switch.Control bg="gray.200" shadow="sm" />
          </Switch.Root>
        </Box>
      </Stack>
    </Box>
  )
}

export default UISettings

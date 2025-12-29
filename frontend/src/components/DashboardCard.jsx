import { Box, HStack, Text } from '@chakra-ui/react'

function DashboardCard({ title, value, subtitle, icon, color = 'blue' }) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
      h="100%"
      boxShadow="sm"
    >
      <HStack spacing={4} align="center">
        <Box
          w={12}
          h={12}
          borderRadius="lg"
          bg={`${color}.50`}
          color={`${color}.500`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
        >
          {icon}
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600">
            {title}
          </Text>
          <Text fontWeight="bold" fontSize="lg">
            {value}
          </Text>
          {subtitle ? (
            <Text fontSize="xs" color="gray.500">
              {subtitle}
            </Text>
          ) : null}
        </Box>
      </HStack>
    </Box>
  )
}

export default DashboardCard

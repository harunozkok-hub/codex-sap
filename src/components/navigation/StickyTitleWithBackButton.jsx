import { Flex, Text, IconButton, HStack } from "@chakra-ui/react"
import { FiArrowLeft } from "react-icons/fi"
import { NavLink } from "react-router"
import { useTranslation } from "react-i18next"
import { resPX } from "../../utils/css-chakra"
import { useState, useEffect } from "react"

function StickyTitleWithBackButton({
  pageTitle,
  backButton = true,
  titleSize = "sm",
  icon = null,
}) {
  const { t } = useTranslation("common")
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    // Function to update the scroll position state
    const updatePosition = () => setScrollPosition(window.scrollY)

    // Adding the event listener to track scroll events
    window.addEventListener("scroll", updatePosition)

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", updatePosition)
  }, []) // Empty dependency array ensures this effect runs only once on mount

  const bordersAdded = scrollPosition > 58

  return (
    <Flex
      position="sticky"
      top="64px"
      zIndex={2}
      align="center"
      justify="space-between"
      borderYWidth={bordersAdded ? 1 : 0}
      gap={2}
      minH="56px"
      mx={`calc(${resPX.base} * -1)`}
      px={resPX.base}
      borderColor="gray.200"
      boxShadow={bordersAdded ? "0 3px 2px -2px rgba(0, 0, 0, 0.2)" : null}
      bg="rgba(255, 255, 255, 0.92)"
      backdropFilter="blur(8px)"
    >
      <HStack spacing={3} m={1} align="center">
        {icon}
        <Text
          fontWeight="bold"
          fontSize={titleSize}
          color="gray.800"
          lineClamp={1}
        >
          {pageTitle}
        </Text>
      </HStack>
      {backButton && (
        <IconButton
          as={NavLink}
          to="../"
          aria-label={t("common:back")}
          variant="subtle"
          size="md"
          color="gray.600"
        >
          <FiArrowLeft />
        </IconButton>
      )}
    </Flex>
  )
}
export default StickyTitleWithBackButton

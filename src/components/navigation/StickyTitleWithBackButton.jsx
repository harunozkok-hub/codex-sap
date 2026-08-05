import { Flex, Text, IconButton, HStack } from "@chakra-ui/react"
import { LuArrowLeft } from "react-icons/lu"
import { cloneElement, isValidElement, useEffect, useState } from "react"
import { NavLink } from "react-router"
import { useTranslation } from "react-i18next"
import {
  dashboardSectionDividerStyles,
  dashboardSectionTitleTextStyles,
  dashboardTitleIconColor,
  glassIconButtonSecondary,
  headerHeight,
  resM,
} from "@/utils/css-chakra"

function StickyTitleWithBackButton({
  pageTitle,
  pxFullWidth = resM,
  backButton = true,
  titleSize = "sm",
  icon = null,
}) {
  const { t } = useTranslation("common")
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY)
    window.addEventListener("scroll", updatePosition)
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  const bordersAdded = scrollPosition > 65
  const leadingIcon = isValidElement(icon)
    ? cloneElement(icon, {
        color: dashboardTitleIconColor,
        size: icon.props.size ?? 22,
      })
    : icon

  return (
    <Flex
      position="sticky"
      top={headerHeight}
      zIndex={2}
      w="100%"
      align="center"
      justify="space-between"
      borderYWidth={bordersAdded ? 1 : 0}
      gap={2}
      minH="56px"
      mx="0"
      px={pxFullWidth}
      borderRadius="0"
      borderColor={dashboardSectionDividerStyles.borderColor}
      boxShadow={bordersAdded ? "0 3px 2px -2px rgba(0, 0, 0, 0.2)" : null}
      bg="rgba(255, 255, 255, 0.92)"
      backdropFilter="blur(8px)"
    >
      <HStack spacing={3} my={1} align="center">
        {leadingIcon}
        <Text
          {...dashboardSectionTitleTextStyles}
          fontSize={titleSize}
          lineClamp={1}
        >
          {pageTitle}
        </Text>
      </HStack>
      {backButton && (
        <IconButton
          {...glassIconButtonSecondary}
          as={NavLink}
          to="../"
          aria-label={t("common:back")}
          h="36px"
          w="36px"
          minW="36px"
          borderRadius="12px"
        >
          <LuArrowLeft />
        </IconButton>
      )}
    </Flex>
  )
}
export default StickyTitleWithBackButton

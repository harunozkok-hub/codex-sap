"use client"
/* eslint-disable react-refresh/only-export-components */

import {
  Box,
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"
import {
  LuCircleAlert,
  LuCircleCheck,
  LuInfo,
  LuTriangleAlert,
} from "react-icons/lu"

import { toastStatusStyles } from "@/utils/css-chakra"

const toastIcons = {
  success: LuCircleCheck,
  error: LuCircleAlert,
  warning: LuTriangleAlert,
  info: LuInfo,
  neutral: LuInfo,
}

export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ base: "4", md: "6" }}
        offset={{ top: "5", right: "5", left: "5", bottom: "5" }}
      >
        {(toast) => {
          const type = toast.type ?? "neutral"
          const styles = toastStatusStyles[type] ?? toastStatusStyles.neutral
          const StatusIcon = toastIcons[type] ?? toastIcons.neutral

          return (
            <Toast.Root
              position="relative"
              width={{ base: "full", md: "sm" }}
              gap="3"
              px="4"
              py="3.5"
              borderRadius="20px"
              borderWidth="1px"
              borderColor={styles.borderColor}
              bg={styles.bg}
              color={styles.descriptionColor}
              backdropFilter="blur(18px)"
              boxShadow={`inset 0 1px 0 rgba(255,255,255,0.88), 0 14px 28px ${styles.shadowColor}, 0 4px 10px rgba(15, 23, 42, 0.06)`}
            >

              <Box
                pt="0.5"
                color={styles.indicatorColor}
                flexShrink="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="9"
                h="9"
                borderRadius="full"
                bg={styles.accentSoftBg}
                borderWidth="1px"
                borderColor={styles.borderColor}
                boxShadow="inset 0 1px 0 rgba(255,255,255,0.72)"
              >
                {toast.type === "loading" ? (
                  <Spinner size="sm" color={styles.indicatorColor} />
                ) : (
                  <Box as={StatusIcon} boxSize="4.5" strokeWidth="2.4px" />
                )}
              </Box>

              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title
                    fontWeight="700"
                    fontSize="sm"
                    lineHeight="1.35"
                    color={styles.titleColor}
                  >
                    {toast.title}
                  </Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description
                    fontSize="sm"
                    lineHeight="1.5"
                    color={styles.descriptionColor}
                  >
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>

              {toast.action && (
                <Toast.ActionTrigger
                  alignSelf="center"
                  flexShrink="0"
                  px="3"
                  h="8"
                  borderRadius="10px"
                  fontSize="xs"
                  fontWeight="700"
                  color={styles.titleColor}
                  bg={styles.actionBg}
                  borderWidth="1px"
                  borderColor={styles.borderColor}
                  transition="background 0.2s ease, border-color 0.2s ease"
                  _hover={{ bg: styles.actionHoverBg, borderColor: styles.accentColor }}
                >
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}

              {toast.closable && (
                <Toast.CloseTrigger
                  alignSelf="flex-start"
                  flexShrink="0"
                  mt="-1"
                  mr="-1"
                  rounded="full"
                  color={styles.titleColor}
                  transition="background 0.2s ease, color 0.2s ease"
                  _hover={{ bg: styles.closeHoverBg, color: styles.indicatorColor }}
                />
              )}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}

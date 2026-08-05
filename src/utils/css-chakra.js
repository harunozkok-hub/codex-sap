import { keyframes } from "@emotion/react"

import bgTexture from "@/assets/bg-layout-public.png"

export const autofillInput = {
  boxShadow: "0 0 0px 1000px rgba(255,255,255,0.42) inset",
  WebkitTextFillColor: "#1f2937",
  transition: "background-color 5000s ease-in-out 0s",
}

export const sidebarMask = {
  "--scroll-shadow-size": "2rem",
  maskImage:
    "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  "&[data-at-top]": {
    maskImage:
      "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  },
  "&[data-at-bottom]": {
    maskImage:
      "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  },
}

const authGradientDrift = keyframes`
  0% {
    background-position: center, center, 15% 20%, 85% 25%, 75% 85%, center;
  }
  100% {
    background-position: center, center, 18% 24%, 82% 22%, 72% 82%, center;
  }
`

export const backgroundGradient = {
  background: `
      linear-gradient(rgba(245,248,255,0.25), rgba(245,248,255,0.25)),
      url(${bgTexture}),
      radial-gradient(circle at 15% 20%, rgba(173,216,255,0.30), transparent 30%),
      radial-gradient(circle at 85% 25%, rgba(196,181,253,0.25), transparent 32%),
      radial-gradient(circle at 75% 85%, rgba(191,219,254,0.24), transparent 30%),
      linear-gradient(135deg, #f7fbff 0%, #eef4ff 45%, #f4efff 100%)
    `,
  backgroundSize: "cover, cover, 120% 120%, 120% 120%, 120% 120%, 100% 100%",
  backgroundPosition: "center, center, 15% 20%, 85% 25%, 75% 85%, center",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "normal, multiply, normal, normal, normal, normal",
  animation: `${authGradientDrift} 18s ease-in-out infinite alternate`,
}

export const dashboardCanvasBackground = {
  background: `
    radial-gradient(circle at top right, rgba(196,181,253,0.18), transparent 24%),
    radial-gradient(circle at top left, rgba(191,219,254,0.16), transparent 22%),
    linear-gradient(180deg, #f7f9ff 0%, #f3f6ff 48%, #eef3fb 100%)
  `,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
}

export const dashboardHeaderShellStyles = {
  bg: "rgba(255,255,255,0.58)",
  backdropFilter: "blur(16px)",
  borderBottomWidth: "1px",
  borderColor: "rgba(202, 213, 240, 0.62)",
  boxShadow: "0 10px 30px rgba(148, 163, 184, 0.08)",
}

export const dashboardPageSurfaceStyles = {
  bg: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(14px)",
  borderWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.78)",
  borderRadius: "24px",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.72), 0 20px 45px rgba(148, 163, 184, 0.10)",
}

export const glassDialogBackdropStyles = {
  bg: "rgba(235, 241, 255, 0.42)",
  backdropFilter: "blur(10px) saturate(125%)",
}

export const glassDialogContentStyles = {
  bg: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.56) 100%)",
  backdropFilter: "blur(20px) saturate(150%)",
  borderWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.78)",
  borderRadius: "24px",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.78), 0 20px 45px rgba(148, 163, 184, 0.16)",
  overflow: "hidden",
  position: "relative",
  css: {
    WebkitBackdropFilter: "blur(20px) saturate(150%)",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "24px",
      pointerEvents: "none",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 48%, rgba(196,181,253,0.08) 100%)",
    },
  },
}

export const glassDialogHeaderStyles = {
  px: { base: "1.1rem", md: "1.35rem" },
  pt: { base: "1rem", md: "1.2rem" },
  pb: "0.5rem",
}

export const glassDialogTitleStyles = {
  fontWeight: "700",
  color: "gray.800",
  lineHeight: "1.25",
  letterSpacing: "0.01em",
}

export const glassDialogBodyStyles = {
  px: { base: "1.1rem", md: "1.35rem" },
  pt: "0.4rem",
  pb: "0.8rem",
  color: "gray.600",
  lineHeight: "1.65",
}

export const glassDialogFooterStyles = {
  px: { base: "1.1rem", md: "1.35rem" },
  pt: "1rem",
  pb: { base: "1rem", md: "1.2rem" },
  gap: "3",
  justifyContent: "flex-end",
  borderTopWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.62)",
}

export const dashboardFormContainerStyles = {
  w: "full",
  mx: "auto",
}

export const dashboardPageIntroWrapStyles = {
  px: 1,
  mb: { base: "0.75rem", md: "1rem" },
}

export const dashboardPageIntroTextStyles = {
  fontSize: "sm",
  color: "gray.600",
  lineHeight: "1.6",
  maxW: "68ch",
}

export const dashboardSectionDividerStyles = {
  borderColor: "rgba(186, 199, 230, 0.78)",
  opacity: 1,
  my: { base: "0.75rem", md: "1rem" },
}

export const dashboardSectionHeaderStyles = {
  align: "center",
  py: { base: "0.35rem", md: "0.45rem" },
  my: { base: "1rem", md: "1.25rem" },
  borderTopWidth: "1px",
  borderBottomWidth: "1px",
  borderColor: "rgba(186, 199, 230, 0.78)",
  color: "gray.700",
}

export const dashboardSectionTitleTextStyles = {
  fontWeight: "700",
  fontSize: { base: "sm", md: "md" },
  letterSpacing: "0.01em",
}

export const dashboardTitleIconColor = "var(--chakra-colors-purple-700)"

export const dashboardSectionContentSpacing = {
  mt: { base: "1rem", md: "1.25rem" },
}

export const pageContentWrapperStyles = {
  w: "full",
  mt: { base: "0.5rem", md: "0.75rem" },
  bg: "rgba(255,255,255,0.92)",
  borderTopWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.88)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.82)",
  px: { base: "1rem", md: "1.4rem" },
  py: { base: "1rem", md: "1.25rem" },
}

export const glassAccordionRootStyles = {
  w: "100%",
  gap: "3",
}

export const glassAccordionItemStyles = {
  overflow: "hidden",
  borderWidth: "1px",
  borderColor: "rgba(196,181,253,0.22)",
  borderRadius: "18px",
  bg: "linear-gradient(180deg, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.40) 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)",
  backdropFilter: "blur(12px) saturate(130%)",
}

export const glassAccordionTriggerStyles = {
  w: "100%",
  px: { base: "1rem", md: "1.2rem" },
  py: { base: "0.9rem", md: "1rem" },
  justifyContent: "space-between",
  alignItems: "center",
  gap: "3",
  fontWeight: "700",
  color: "purple.700",
  transition: "background 0.2s ease, color 0.2s ease",
  _hover: {
    bg: "rgba(255,255,255,0.22)",
    color: "purple.800",
  },
}

export const glassAccordionIndicatorStyles = {
  color: "purple.700",
  flexShrink: 0,
  transition: "transform 0.2s ease, color 0.2s ease",
}

export const glassAccordionContentStyles = {
  borderTopWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.62)",
}

export const glassAccordionBodyStyles = {
  px: { base: "1rem", md: "1.2rem" },
  py: { base: "0.95rem", md: "1.1rem" },
  color: "gray.700",
}
export const glassDisabledState = {
  opacity: 0.55,
  cursor: "not-allowed",
  bg: "rgba(255,255,255,0.38)",
  borderColor: "rgba(180,190,220,0.22)",
  color: "gray.500",
  boxShadow: "none",
}

export const glassInvalidState = {
  borderColor: "rgba(239, 68, 68, 0.36)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 2px rgba(239, 68, 68, 0.08)",
}

export const glassFieldBaseStyles = {
  h: "48px",
  borderRadius: "14px",
  bg: "rgba(255,255,255,0.52)",
  border: "1px solid",
  borderColor: "rgba(180,190,220,0.38)",
  color: "gray.800",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
  transition: "all 0.2s ease",
  _disabled: glassDisabledState,
  _invalid: glassInvalidState,
}

export const glassInputStyles = {
  ...glassFieldBaseStyles,
  _placeholder: {
    color: "gray.500",
  },
  _hover: {
    bg: "rgba(255,255,255,0.65)",
    borderColor: "rgba(167,139,250,0.45)",
  },
  _focusVisible: {
    bg: "rgba(255,255,255,0.68)",
    borderColor: "rgba(147, 112, 219, 0.48)",
    boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.10)",
    outline: "none",
  },
}

export const glassSelectStyles = {
  ...glassFieldBaseStyles,
  appearance: "none",
  pr: "2.5rem",
  pl: "0.875rem",
  _placeholder: {
    color: "gray.500",
  },
  _hover: {
    bg: "rgba(255,255,255,0.60)",
    borderColor: "rgba(167,139,250,0.30)",
  },
  _focusVisible: {
    bg: "rgba(255,255,255,0.68)",
    borderColor: "rgba(147, 112, 219, 0.48)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 2px rgba(168, 85, 247, 0.10)",
    outline: "none",
  },
}

export const glassCheckboxControlStyles = {
  borderRadius: "6px",
  border: "1px solid",
  borderColor: "rgba(180,190,220,0.42)",
  bg: "rgba(255,255,255,0.46)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
  transition: "all 0.2s ease",
  _checked: {
    bg: "purple.500",
    borderColor: "purple.500",
    color: "white",
    boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.25)",
    _hover: {
      bg: "purple.600",
      borderColor: "purple.600",
    },
  },
  _hover: {
    borderColor: "rgba(167,139,250,0.55)",
    bg: "rgba(255,255,255,0.65)",
  },
  _focusVisible: {
    boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.12)",
    borderColor: "rgba(147, 112, 219, 0.50)",
    outline: "none",
  },
  _disabled: glassDisabledState,
}

export const glassRadioGroupItemStyles = {
  w: "full",
  borderRadius: "16px",
  border: "1px solid",
  borderColor: "rgba(180,190,220,0.30)",
  bg: "rgba(255,255,255,0.36)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
  transition: "all 0.2s ease",
  px: "1rem",
  py: "0.9rem",
  _hover: {
    bg: "rgba(255,255,255,0.46)",
    borderColor: "rgba(167,139,250,0.28)",
  },
  _checked: {
    bg: "rgba(243,232,255,0.42)",
    borderColor: "rgba(168,85,247,0.32)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.20), 0 0 0 1px rgba(168,85,247,0.06)",
  },
  _focusWithin: {
    borderColor: "rgba(147,112,219,0.48)",
    boxShadow: "0 0 0 3px rgba(168,85,247,0.12)",
  },
  _disabled: glassDisabledState,
}

export const glassRadioIndicatorStyles = {
  borderRadius: "full",
  border: "1px solid",
  borderColor: "rgba(180,190,220,0.52)",
  bg: "rgba(255,255,255,0.64)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
  color: "purple.600",
}

export const alertStatusStyles = {
  info: {
    bg: "rgba(255,255,255,0.42)",
    borderColor: "rgba(120,170,255,0.26)",
    titleColor: "blue.700",
    descriptionColor: "blue.800",
    indicatorColor: "blue.500",
  },
  success: {
    bg: "rgba(134,239,172,0.14)",
    borderColor: "rgba(134,239,172,0.24)",
    titleColor: "green.700",
    descriptionColor: "green.800",
    indicatorColor: "green.500",
  },
  warning: {
    bg: "rgba(253,224,71,0.16)",
    borderColor: "rgba(253,224,71,0.26)",
    titleColor: "yellow.700",
    descriptionColor: "yellow.800",
    indicatorColor: "yellow.500",
  },
  error: {
    bg: "rgba(252,165,165,0.14)",
    borderColor: "rgba(252,165,165,0.24)",
    titleColor: "red.700",
    descriptionColor: "red.800",
    indicatorColor: "red.500",
  },
  neutral: {
    bg: "rgba(255,255,255,0.24)",
    borderColor: "rgba(180,190,220,0.28)",
    titleColor: "gray.700",
    descriptionColor: "gray.700",
    indicatorColor: "gray.500",
  },
}

export const toastStatusStyles = {
  info: {
    ...alertStatusStyles.info,
    bg: "rgba(247,251,255,0.97)",
    borderColor: "rgba(96,165,250,0.36)",
    shadowColor: "rgba(59, 130, 246, 0.18)",
    accentColor: "rgba(37,99,235,0.88)",
    accentSoftBg: "rgba(219,234,254,0.62)",
    actionBg: "rgba(219,234,254,0.42)",
    actionHoverBg: "rgba(191,219,254,0.54)",
    closeHoverBg: "rgba(219,234,254,0.30)",
  },
  success: {
    ...alertStatusStyles.success,
    bg: "rgba(244,252,247,0.97)",
    borderColor: "rgba(74,222,128,0.34)",
    shadowColor: "rgba(34, 197, 94, 0.16)",
    accentColor: "rgba(22,163,74,0.84)",
    accentSoftBg: "rgba(220,252,231,0.64)",
    actionBg: "rgba(220,252,231,0.40)",
    actionHoverBg: "rgba(187,247,208,0.50)",
    closeHoverBg: "rgba(220,252,231,0.28)",
  },
  warning: {
    ...alertStatusStyles.warning,
    bg: "rgba(255,249,235,0.98)",
    borderColor: "rgba(245,158,11,0.40)",
    shadowColor: "rgba(217, 119, 6, 0.20)",
    accentColor: "rgba(217,119,6,0.88)",
    accentSoftBg: "rgba(254,243,199,0.78)",
    actionBg: "rgba(253,230,138,0.42)",
    actionHoverBg: "rgba(253,230,138,0.56)",
    closeHoverBg: "rgba(253,230,138,0.30)",
  },
  error: {
    ...alertStatusStyles.error,
    bg: "rgba(255,244,244,0.98)",
    borderColor: "rgba(248,113,113,0.46)",
    shadowColor: "rgba(220, 38, 38, 0.20)",
    accentColor: "rgba(220,38,38,0.9)",
    accentSoftBg: "rgba(254,226,226,0.74)",
    actionBg: "rgba(254,226,226,0.42)",
    actionHoverBg: "rgba(254,202,202,0.54)",
    closeHoverBg: "rgba(254,226,226,0.30)",
  },
  loading: {
    bg: "rgba(247,245,255,0.96)",
    borderColor: "rgba(167,139,250,0.42)",
    titleColor: "purple.700",
    descriptionColor: "purple.800",
    indicatorColor: "purple.500",
    shadowColor: "rgba(147, 51, 234, 0.22)",
    accentColor: "rgba(147,51,234,0.9)",
    accentSoftBg: "rgba(237,233,254,0.84)",
    actionBg: "rgba(221,214,254,0.42)",
    actionHoverBg: "rgba(221,214,254,0.62)",
    closeHoverBg: "rgba(221,214,254,0.34)",
  },
  neutral: {
    ...alertStatusStyles.neutral,
    bg: "rgba(255,255,255,0.96)",
    borderColor: "rgba(148,163,184,0.36)",
    shadowColor: "rgba(148, 163, 184, 0.20)",
    accentColor: "rgba(100,116,139,0.88)",
    accentSoftBg: "rgba(241,245,249,0.86)",
    actionBg: "rgba(226,232,240,0.58)",
    actionHoverBg: "rgba(226,232,240,0.8)",
    closeHoverBg: "rgba(226,232,240,0.44)",
  },
}

const sharedGlassButtonBase = {
  h: "40px",
  minW: "92px",
  px: "18px",
  borderRadius: "12px",
  fontSize: "sm",
  backdropFilter: "blur(10px)",
  transition: "all 0.2s ease",
}

export const glassButtonPrimary = {
  ...sharedGlassButtonBase,
  fontWeight: "700",
  bg: "linear-gradient(135deg, rgba(196,181,253,0.50), rgba(233,213,255,0.72))",
  color: "purple.700",
  border: "1px solid",
  borderColor: "rgba(192, 132, 252, 0.30)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 20px rgba(168, 85, 247, 0.10)",
  _hover: {
    bg: "linear-gradient(135deg, rgba(196,181,253,0.62), rgba(233,213,255,0.82))",
    borderColor: "rgba(168, 85, 247, 0.38)",
    color: "purple.800",
    transform: "translateY(-1px)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 24px rgba(168, 85, 247, 0.14)",
  },
  _active: {
    transform: "translateY(0)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 14px rgba(168, 85, 247, 0.10)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.14)",
    borderColor: "rgba(147, 112, 219, 0.52)",
  },
}

export const glassButtonSecondary = {
  ...sharedGlassButtonBase,
  fontWeight: "600",
  bg: "rgba(255,255,255,0.34)",
  color: "purple.700",
  border: "1px solid",
  borderColor: "rgba(168, 85, 247, 0.34)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
  _hover: {
    bg: "rgba(255,255,255,0.48)",
    borderColor: "rgba(168, 85, 247, 0.48)",
    color: "purple.800",
    transform: "translateY(-1px)",
  },
  _active: {
    bg: "rgba(255,255,255,0.56)",
    transform: "translateY(0)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.14)",
    borderColor: "rgba(147, 112, 219, 0.52)",
  },
}

export const glassButtonSecondaryNeutral = {
  ...sharedGlassButtonBase,
  fontWeight: "600",
  bg: "rgba(255,255,255,0.44)",
  color: "gray.700",
  border: "1px solid",
  borderColor: "rgba(148, 163, 184, 0.34)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.20), 0 10px 24px rgba(148, 163, 184, 0.08)",
  _hover: {
    bg: "rgba(255,255,255,0.58)",
    borderColor: "rgba(148, 163, 184, 0.48)",
    color: "gray.800",
    transform: "translateY(-1px)",
  },
  _active: {
    bg: "rgba(255,255,255,0.66)",
    transform: "translateY(0)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(148, 163, 184, 0.18)",
    borderColor: "rgba(100, 116, 139, 0.52)",
  },
}

export const glassIconButtonSecondary = {
  h: "42px",
  w: "42px",
  minW: "42px",
  p: "0",
  borderRadius: "14px",
  bg: "rgba(255,255,255,0.42)",
  color: "purple.700",
  border: "1px solid",
  borderColor: "rgba(168, 85, 247, 0.24)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.24), 0 8px 18px rgba(168, 85, 247, 0.08)",
  backdropFilter: "blur(12px)",
  transition: "all 0.2s ease",
  _hover: {
    bg: "rgba(255,255,255,0.56)",
    borderColor: "rgba(168, 85, 247, 0.34)",
    color: "purple.800",
    transform: "translateY(-1px)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.26), 0 10px 20px rgba(168, 85, 247, 0.10)",
  },
  _active: {
    bg: "rgba(255,255,255,0.62)",
    transform: "translateY(0)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.22), 0 5px 12px rgba(168, 85, 247, 0.08)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.14)",
    borderColor: "rgba(147, 112, 219, 0.46)",
  },
}

export const sidebarSecondaryButton = {
  h: "32px",
  px: "14px",
  borderRadius: "10px",
  fontSize: "xs",
  fontWeight: "600",
  bg: "whiteAlpha.100",
  color: "whiteAlpha.900",
  border: "1px solid",
  borderColor: "whiteAlpha.300",
  backdropFilter: "blur(8px)",
  transition: "all 0.18s ease",

  _hover: {
    bg: "whiteAlpha.200",
    borderColor: "whiteAlpha.400",
    transform: "translateY(-1px)",
  },

  _active: {
    bg: "whiteAlpha.300",
    transform: "translateY(0)",
  },

  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(255,255,255,0.25)",
  },
}

const sharedDangerGlassButtonProps = {
  bg: "rgba(255,255,255,0.38)",
  color: "red.600",
  backdropFilter: "blur(10px)",
  transition: "all 0.2s ease",
  _hover: {
    bg: "rgba(255,240,240,0.56)",
    color: "red.700",
    transform: "translateY(-1px)",
  },
  _active: {
    bg: "rgba(255,232,232,0.62)",
    transform: "translateY(0)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.14)",
  },
}

export const glassButtonDanger = {
  h: "40px",
  minW: "92px",
  px: "18px",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "sm",
  ...sharedDangerGlassButtonProps,
  border: "1px solid",
  borderColor: "rgba(248, 113, 113, 0.30)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 18px rgba(248, 113, 113, 0.08)",
  _hover: {
    ...sharedDangerGlassButtonProps._hover,
    borderColor: "rgba(239, 68, 68, 0.40)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 14px rgba(239, 68, 68, 0.08)",
  },
  _active: {
    ...sharedDangerGlassButtonProps._active,
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 12px rgba(239, 68, 68, 0.10)",
  },
  _focusVisible: {
    ...sharedDangerGlassButtonProps._focusVisible,
    borderColor: "rgba(239, 68, 68, 0.48)",
  },
}

export const glassIconButtonDanger = {
  h: "44px",
  minW: "44px",
  w: "44px",
  p: "0",
  borderRadius: "22px",
  ...sharedDangerGlassButtonProps,
  bg: "rgba(255,244,244,0.52)",
  boxShadow: "none",
  _hover: {
    ...sharedDangerGlassButtonProps._hover,
    bg: "rgba(255,236,236,0.72)",
    boxShadow: "0 4px 10px rgba(239, 68, 68, 0.08)",
  },
  _active: {
    ...sharedDangerGlassButtonProps._active,
    bg: "rgba(255,228,228,0.78)",
    boxShadow: "none",
  },
}

export const maxPageWidth = "1600px"
export const headerHeight = { base: "60px", sm: "60px", md: "70px" }

export const resGap = { base: "1rem", sm: "1.5rem", md: "2rem" }
export const resM = { base: "1rem", sm: "2rem", md: "3rem" }
export const resPY = { base: "1rem", sm: "2rem", md: "2rem" }
export const resPX = { base: "2rem", sm: "3rem", md: "4rem" }
export const logoWidth = { base: "60px", sm: "80px", md: "100px" }

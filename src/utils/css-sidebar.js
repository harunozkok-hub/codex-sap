export const sidebarShellStyles = {
  bg: "purple.950",
  color: "white",
  h: "100%",
  pl: 5,
  pr: 2,
  py: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
}

export const sidebarUserSectionStyles = {
  maxH: "20%",
}

export const sidebarUserInfoStyles = {
  align: "flex-start",
  mb: 3,
  mx: 3,
}

export const sidebarLogoutWrapStyles = {
  px: 3,
  pb: 4,
  borderBottomWidth: "1px",
  borderColor: "whiteAlpha.300",
}

export const sidebarScrollRootStyles = {
  h: "75%",
  spacing: 2,
  mt: 5,
}

export const sidebarScrollContentStyles = {
  paddingEnd: "3",
  py: "4",
  textStyle: "sm",
}

export const sidebarMenuStackStyles = {
  alignItems: "flex-start",
  gap: 1,
}

export const sidebarSectionWrapStyles = {
  width: "100%",
}

export const sidebarItemBaseStyles = {
  align: "center",
  gap: 3,
  px: 3,
  py: 2.5,
  borderRadius: "14px",
  fontSize: "md",
  transition: "all 0.18s ease",
}

export const sidebarItemHoverStyles = {
  bg: "rgba(255,255,255,0.05)",
}

export const sidebarItemOpenStyles = {
  bg: "rgba(255,255,255,0.08)",
}

export const sidebarItemActiveStyles = {
  bg: "rgba(255,255,255,0.14)",
  color: "white",
  fontWeight: "600",
  boxShadow: "inset 2px 0 0 rgba(196,181,253,0.82)",
}

export const sidebarParentItemStyles = {
  ...sidebarItemBaseStyles,
  justify: "space-between",
  cursor: "pointer",
}

export const sidebarParentLabelWrapStyles = {
  align: "center",
  gap: 3,
  minW: 0,
}

export const sidebarParentTextStyles = {
  fontSize: "md",
  fontWeight: "500",
  truncate: true,
}

export const sidebarLinkItemStyles = {
  ...sidebarItemBaseStyles,
  justify: "flex-start",
}

export const sidebarLinkIdleStyles = {
  bg: "transparent",
  fontWeight: "500",
  color: "whiteAlpha.900",
}

export const sidebarChildGroupStyles = {
  align: "stretch",
  gap: 1,
  mt: 1,
  ml: 3,
  pl: 3,
  py: 2,
  borderLeftWidth: "1px",
  borderColor: "whiteAlpha.200",
}

export const sidebarChildItemBaseStyles = {
  gap: 2,
  pl: 4,
  pr: 3,
  py: 2.5,
  borderRadius: "12px",
  fontSize: "sm",
  transition: "all 0.18s ease",
}

export const sidebarChildItemIdleStyles = {
  bg: "transparent",
  fontWeight: "500",
  color: "whiteAlpha.900",
}

export const sidebarChildItemActiveStyles = {
  bg: "rgba(255,255,255,0.14)",
  color: "white",
  fontWeight: "600",
  boxShadow: "inset 2px 0 0 rgba(196,181,253,0.82)",
}

export const sidebarChevronStyles = {
  boxSize: 4,
  transition: "transform 0.2s ease",
  color: "whiteAlpha.800",
}

export const sidebarScrollbarStyles = {
  bg: "whiteAlpha.300",
}

export const sidebarScrollbarThumbStyles = {
  bg: "whiteAlpha.600",
}

import {
  Accordion,
  Box,
  Group,
  HStack,
  IconButton,
  Pagination,
  Stack,
  Table,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import {
  LuChevronDown,
  LuEyeOff,
  LuFilter,
  LuMail,
  LuPlus,
  LuSearch,
  LuTrash2,
} from "react-icons/lu"

import FormContainer from "@/components/containers/FormContainer"
import PageContainer from "@/components/containers/PageContainer"
import FormInput from "@/components/form/FormInput"
import FormTagInput from "@/components/form/FormTagInput"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import PageHeaderWrapper from "@/components/generic/PageHeaderWrapper"
import {
  dashboardTitleIconColor,
  glassButtonSecondary,
  pageContentWrapperStyles,
} from "@/utils/css-chakra"
import { formatDateTime } from "@/utils/datetime"

const previewInvitations = [
  {
    id: 12,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
  {
    id: 13,
    email: "viewer@example.com",
    role: "viewer",
    status: "green",
    created_at: "2026-04-10T09:00:00.000000Z",
    expires_at: "2026-04-17T09:00:00.000000Z",
    accepted_at: "2026-04-11T14:20:10.000000Z",
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: false,
  },
  {
    id: 14,
    email: "ops@example.com",
    role: "admin",
    status: "red",
    created_at: "2026-04-14T08:10:00.000000Z",
    expires_at: "2026-04-21T08:10:00.000000Z",
    accepted_at: null,
    inviter_email: "owner@company.com",
    inviter_name: "Marco Bianchi",
    can_delete: true,
  },
  {
    id: 15,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
  {
    id: 16,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
  {
    id: 17,
    email: "viewer@example.com",
    role: "viewer",
    status: "green",
    created_at: "2026-04-10T09:00:00.000000Z",
    expires_at: "2026-04-17T09:00:00.000000Z",
    accepted_at: "2026-04-11T14:20:10.000000Z",
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: false,
  },
  {
    id: 18,
    email: "ops@example.com",
    role: "admin",
    status: "red",
    created_at: "2026-04-14T08:10:00.000000Z",
    expires_at: "2026-04-21T08:10:00.000000Z",
    accepted_at: null,
    inviter_email: "owner@company.com",
    inviter_name: "Marco Bianchi",
    can_delete: true,
  },
  {
    id: 19,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
  {
    id: 20,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
  {
    id: 21,
    email: "viewer@example.com",
    role: "viewer",
    status: "green",
    created_at: "2026-04-10T09:00:00.000000Z",
    expires_at: "2026-04-17T09:00:00.000000Z",
    accepted_at: "2026-04-11T14:20:10.000000Z",
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: false,
  },
  {
    id: 22,
    email: "ops@example.com",
    role: "admin",
    status: "red",
    created_at: "2026-04-14T08:10:00.000000Z",
    expires_at: "2026-04-21T08:10:00.000000Z",
    accepted_at: null,
    inviter_email: "owner@company.com",
    inviter_name: "Marco Bianchi",
    can_delete: true,
  },
  {
    id: 23,
    email: "manager@example.com",
    role: "manager",
    status: "yellow",
    created_at: "2026-04-15T10:22:31.123456Z",
    expires_at: "2026-04-22T10:22:31.123456Z",
    accepted_at: null,
    inviter_email: "admin@company.com",
    inviter_name: "Anna Rossi",
    can_delete: true,
  },
]

const statusStyles = {
  green: {
    bg: "rgba(34, 197, 94, 0.12)",
    borderColor: "rgba(34, 197, 94, 0.22)",
    color: "green.700",
    dot: "green.500",
  },
  yellow: {
    bg: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.22)",
    color: "orange.700",
    dot: "orange.400",
  },
  red: {
    bg: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.22)",
    color: "red.700",
    dot: "red.500",
  },
}

const tableMainStyles = {
  "& th": {
    px: "1rem",
    py: "0.8rem",
  },
  "& td": {
    px: "1rem",
    py: "0.9rem",
  },
  "& th:last-of-type, & td:last-of-type": {
    px: "0.5rem",
    pr: "1rem",
  },
  "& [data-sticky]": {
    position: "sticky",
    zIndex: 1,
    backdropFilter: "blur(4px)",
  },
  "& th[data-sticky]": {
    bg: "linear-gradient(180deg, rgba(238,233,254,0.94) 0%, rgba(243,232,255,0.82) 100%)",
  },
  "& td[data-sticky]": {
    bg: "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(252,250,255,0.96) 100%)",
    boxShadow: "inset 0 -1px 0 rgba(226, 232, 240, 0.9)",
  },
  "& [data-sticky]::after": {
    content: '""',
    position: "absolute",
    pointerEvents: "none",
    top: "0",
    bottom: "-1px",
    width: "18px",
  },
  "& [data-sticky=start]": {
    left: 0,
  },
  "& [data-sticky=start]::after": {
    insetInlineEnd: "0",
    transform: "translateX(100%)",
    boxShadow: "inset 8px 0 8px -8px rgba(168, 85, 247, 0.12)",
  },
  "& [data-sticky=end]": {
    right: 0,
  },
  "& [data-sticky=end]::after": {
    insetInlineStart: "0",
    transform: "translateX(-100%)",
    boxShadow: "inset -8px 0 8px -8px rgba(168, 85, 247, 0.12)",
  },
  "& th[data-sticky=end], & td[data-sticky=end]": {
    width: "1%",
    minW: "0",
    whiteSpace: "nowrap",
  },
}

const headerHideButtonStyles = {
  appearance: "none",
  h: "20px",
  w: "20px",
  minW: "20px",
  p: "0",
  borderRadius: "full",
  bg: "transparent",
  color: "purple.600",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  lineHeight: "0",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  cursor: "pointer",
  transition: "all 0.2s ease",
  _hover: {
    bg: "rgba(255,255,255,0.56)",
    borderColor: "rgba(168, 85, 247, 0.24)",
    color: "purple.800",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.12)",
    borderColor: "rgba(168, 85, 247, 0.24)",
  },
}

const headerDeleteButtonStyles = {
  appearance: "none",
  h: "24px",
  w: "24px",
  minW: "24px",
  p: "0",
  borderRadius: "full",
  bg: "transparent",
  color: "red.600",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  lineHeight: "0",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  cursor: "pointer",
  transition: "all 0.2s ease",
  _hover: {
    bg: "rgba(255,240,240,0.24)",
    borderColor: "rgba(239, 68, 68, 0.26)",
    color: "red.700",
  },
  _active: {
    bg: "rgba(255,232,232,0.36)",
    color: "red.700",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.34)",
  },
}

const paginationIconButtonStyles = {
  ...glassButtonSecondary,
  h: "36px",
  w: "36px",
  minW: "36px",
  borderRadius: "12px",
  _disabled: {
    opacity: 0.42,
    cursor: "not-allowed",
  },
}

const paginationPageButtonStyles = {
  ...glassButtonSecondary,
  h: "36px",
  minW: "36px",
  px: "0.65rem",
  borderRadius: "12px",
  fontSize: "sm",
  fontWeight: "700",
  color: "gray.700",
  _currentPage: {
    bg: "rgba(243,232,255,0.92)",
    color: "purple.800",
    borderColor: "rgba(168, 85, 247, 0.28)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.64), 0 6px 14px rgba(168, 85, 247, 0.08)",
  },
}

const paginationEllipsisStyles = {
  h: "36px",
  minW: "24px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray.500",
  fontWeight: "700",
}

const tableToolbarShellStyles = {
  maxW: "980px",
  mx: "auto",
  mb: "0.95rem",
  gap: "3",
}

const tableToolbarSearchStyles = {
  position: "relative",
  flex: "1",
  minW: "0",
}

const tableToolbarSearchInputProps = {
  ps: "2.8rem",
}

const tableToolbarSearchIconStyles = {
  position: "absolute",
  left: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: "1",
  pointerEvents: "none",
  color: "gray.500",
}

const tableToolbarSecondaryActionStyles = {
  h: "42px",
  px: "1rem",
  minW: "unset",
  borderRadius: "14px",
}

const tableToolbarPrimaryActionStyles = {
  h: "42px",
  px: "1rem",
  minW: "unset",

  bg: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
  color: "white",
  borderColor: "transparent",
  boxShadow: "0 10px 22px rgba(59, 130, 246, 0.18)",
  _hover: {
    bg: "linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%)",
    color: "white",
    borderColor: "transparent",
    transform: "translateY(-1px)",
    boxShadow: "0 12px 24px rgba(59, 130, 246, 0.22)",
  },
  _active: {
    bg: "linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%)",
    color: "white",
    transform: "translateY(0)",
    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.16)",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.18)",
    borderColor: "rgba(96, 165, 250, 0.45)",
  },
}

const tableToolbarChipButtonStyles = {
  minW: "unset",
}

const mobileInvitationAccordionRootStyles = {
  w: "full",
  display: "flex",
  flexDirection: "column",
  gap: "3",
}

const mobileInvitationAccordionItemStyles = {
  overflow: "hidden",
  borderRadius: "18px",
  borderWidth: "1px",
  borderColor: "rgba(208, 218, 243, 0.9)",
  bg: "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.52) 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72)",
}

const mobileInvitationAccordionHeaderStyles = {
  px: "0.95rem",
  py: "0.9rem",
  bg: "linear-gradient(180deg, rgba(243,232,255,0.35) 0%, rgba(243,232,255,0.1) 100%)",
  borderBottomWidth: "1px",
  borderColor: "rgba(226, 232, 240, 0.72)",
}

const mobileInvitationAccordionTriggerStyles = {
  w: "100%",
  justifyContent: "center",
  alignItems: "center",
  h: "34px",
  borderRadius: "0",
  bg: "linear-gradient(135deg, rgba(109,40,217,0.13) 0%, rgba(37,99,235,0.13) 100%)",
  color: "white",
  borderTopWidth: "1px",
  borderColor: "rgba(255,255,255,0.14)",
  _hover: {
    bg: "linear-gradient(135deg, rgba(91,33,182,0.15) 0%, rgba(29,78,216,0.15) 100%)",
  },
}

const mobileInvitationAccordionIndicatorStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "purple.700",
  transition: "transform 0.2s ease",
}

const mobileInvitationAccordionContentStyles = {
  borderTopWidth: "1px",
  borderColor: "rgba(226, 232, 240, 0.72)",
}

const mobileInvitationAccordionBodyStyles = {
  px: "0.95rem",
  py: "0.9rem",
}

function InvitationStatusBadge({ status, label }) {
  const current = statusStyles[status] || statusStyles.yellow

  return (
    <HStack
      gap="2"
      px="2.5"
      py="1.5"
      borderRadius="full"
      borderWidth="1px"
      borderColor={current.borderColor}
      bg={current.bg}
      color={current.color}
      w="fit-content"
    >
      <Box w="2" h="2" borderRadius="full" bg={current.dot} />
      <Text fontSize="xs" fontWeight="700" lineHeight="1">
        {label}
      </Text>
    </HStack>
  )
}

function InvitationInfoRow({ label, value, subvalue = null }) {
  return (
    <Stack gap="0.5" minW="0">
      <Text fontSize="xs" fontWeight="700" color="gray.500" lineHeight="1">
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="600" color="gray.800" lineHeight="1.35">
        {value}
      </Text>
      {subvalue ? (
        <Text fontSize="xs" color="gray.500" lineHeight="1.35">
          {subvalue}
        </Text>
      ) : null}
    </Stack>
  )
}

function Invitations() {
  const { t } = useTranslation(["invitations", "common"])
  const [isDesktop] = useMediaQuery("(min-width: 768px)")
  const [hiddenColumns, setHiddenColumns] = useState([])
  const [page, setPage] = useState(1)
  const paginationCount = 20
  const paginationPageSize = 10
  const paginationSiblingCount = 1
  const quickFilterLabels = ["All", "Mine", "Pending", "Accepted", "Failed"]

  const desktopColumns = useMemo(
    () => [
      {
        id: "email",
        label: t("table-email"),
        hideable: false,
        headerProps: { "data-sticky": "start" },
        cellProps: { "data-sticky": "start" },
        renderCell: (item) => (
          <Stack gap="0.5" minW="15rem">
            <Text fontWeight="700" color="gray.800">
              {item.email}
            </Text>
          </Stack>
        ),
      },
      {
        id: "role",
        label: t("table-role"),
        hideable: true,
        renderCell: (item) => (
          <Text fontSize="sm" fontWeight="600" textTransform="capitalize">
            {t(`common:${item.role}`)}
          </Text>
        ),
      },
      {
        id: "status",
        label: t("table-status"),
        hideable: true,
        renderCell: (item) => (
          <InvitationStatusBadge
            status={item.status}
            label={t(`status-${item.status}`)}
          />
        ),
      },
      {
        id: "invited-by",
        label: t("table-invited-by"),
        hideable: true,
        renderCell: (item) => (
          <Stack gap="0.5" minW="12rem">
            <Text fontWeight="600" color="gray.800">
              {item.inviter_name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {item.inviter_email}
            </Text>
          </Stack>
        ),
      },
      {
        id: "invited-at",
        label: t("table-invited-at"),
        hideable: true,
        renderCell: (item) => (
          <Text fontSize="sm" color="gray.700">
            {formatDateTime(item.created_at)}
          </Text>
        ),
      },
      {
        id: "accepted-or-expires",
        label: t("table-accepted-or-expires"),
        hideable: true,
        renderCell: (item) => {
          const dateLabel =
            item.status === "green" ? t("accepted-at") : t("expires-at")
          const dateValue =
            item.status === "green" ? item.accepted_at : item.expires_at

          return (
            <Stack gap="0.5">
              <Text fontSize="xs" fontWeight="700" color="gray.500">
                {dateLabel}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {formatDateTime(dateValue)}
              </Text>
            </Stack>
          )
        },
      },
      {
        id: "actions",
        label: t("table-actions"),
        hideable: false,
        headerProps: {
          "data-sticky": "end",
          textAlign: "center",
          width: "1%",
          whiteSpace: "nowrap",
        },
        cellProps: {
          "data-sticky": "end",
          textAlign: "center",
          width: "1%",
          whiteSpace: "nowrap",
        },
        renderCell: (item) =>
          item.can_delete ? (
            <Box
              as="button"
              type="button"
              aria-label={t("delete-invitation")}
              title={t("delete-invitation")}
              {...headerDeleteButtonStyles}
            >
              <LuTrash2 size={20} />
            </Box>
          ) : (
            <Text color="gray.400"></Text>
          ),
      },
    ],
    [t],
  )

  const hiddenColumnSet = new Set(hiddenColumns)
  const visibleDesktopColumns = desktopColumns.filter(
    (column) => !hiddenColumnSet.has(column.id),
  )
  const hiddenColumnValue = desktopColumns
    .filter((column) => column.hideable && hiddenColumnSet.has(column.id))
    .map((column) => column.id)
  const hiddenColumnOptions = Object.fromEntries(
    desktopColumns
      .filter((column) => column.hideable)
      .map((column) => [column.id, column.label]),
  )
  const useStickyEdgeColumns = visibleDesktopColumns.length >= 5

  const hideColumn = (columnId) => {
    setHiddenColumns((current) =>
      current.includes(columnId) ? current : [...current, columnId],
    )
  }

  const paginationElement = (
    <Pagination.Root
      count={paginationCount}
      pageSize={paginationPageSize}
      siblingCount={paginationSiblingCount}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <Group
        variant="ghost"
        size="sm"
        justifyContent="center"
        display="flex"
        gap="2"
        wrap="wrap"
      >
        <Pagination.PrevTrigger asChild>
          <IconButton
            aria-label={t("common:back")}
            {...paginationIconButtonStyles}
          >
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Context>
          {({ pages }) =>
            pages.map((paginationPage, index) =>
              paginationPage.type === "page" ? (
                <Pagination.Item
                  key={paginationPage.value}
                  {...paginationPage}
                  asChild
                >
                  <IconButton
                    aria-label={`Page ${paginationPage.value}`}
                    variant="ghost"
                    {...paginationPageButtonStyles}
                  >
                    {paginationPage.value}
                  </IconButton>
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis
                  key={`ellipsis-${index}`}
                  index={index}
                  {...paginationEllipsisStyles}
                >
                  ...
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>

        <Pagination.NextTrigger asChild>
          <IconButton
            aria-label={t("common:next")}
            {...paginationIconButtonStyles}
          >
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </Group>
    </Pagination.Root>
  )

  const quickFilterControls = (
    <Box
      overflowX={{ base: "auto", md: "visible" }}
      overflowY="hidden"
      pb={{ base: "1", md: "0" }}
      mx={{ base: "-0.15rem", md: "0" }}
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Group attached flexWrap="nowrap" w="max-content" minW="full">
        {quickFilterLabels.map((label) => (
          <SecondaryButton
            key={label}
            neutral
            {...tableToolbarChipButtonStyles}
          >
            {label}
          </SecondaryButton>
        ))}
      </Group>
    </Box>
  )

  return (
    <PageContainer px="0">
      <PageHeaderWrapper
        titleNs="invitations"
        titleKey="title"
        pageTitle={t("title")}
        pageDescription={t("description")}
        pageIcon={<LuMail size={24} color={dashboardTitleIconColor} />}
        mobileBackButtonEnabled={false}
        contentMaxW="1200px"
      />

      {isDesktop ? (
        <Box {...pageContentWrapperStyles} overflow="hidden">
          <FormContainer maxW="1200px">
            <Stack {...tableToolbarShellStyles}>
              <HStack
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
                gap="3"
                flexDirection={{ base: "column", md: "row" }}
              >
                <Box {...tableToolbarSearchStyles}>
                  <Box {...tableToolbarSearchIconStyles}>
                    <LuSearch size={20} />
                  </Box>
                  <FormInput
                    placeholder="Search invitations"
                    inputProps={tableToolbarSearchInputProps}
                  />
                </Box>

                <HStack
                  gap="3"
                  flexWrap="wrap"
                  justify={{ base: "stretch", md: "flex-end" }}
                >
                  <SecondaryButton
                    neutral
                    iconLeft={<LuFilter />}
                    {...tableToolbarSecondaryActionStyles}
                  >
                    Filters
                  </SecondaryButton>
                  <PrimaryButton
                    iconLeft={<LuPlus />}
                    {...tableToolbarPrimaryActionStyles}
                  >
                    Add invitation
                  </PrimaryButton>
                </HStack>
              </HStack>

              {quickFilterControls}

              {hiddenColumnValue.length ? (
                <FormTagInput
                  label="Hidden columns"
                  value={hiddenColumnValue}
                  onValueChange={setHiddenColumns}
                  options={hiddenColumnOptions}
                  placeholder="No hidden columns"
                />
              ) : null}
            </Stack>

            <Table.ScrollArea>
              <Table.Root
                size="sm"
                variant="line"
                bg="transparent"
                colorPalette="purple"
                width="100%"
                maxW="980px"
                mx="auto"
                css={tableMainStyles}
              >
                <Table.Header
                  bg="linear-gradient(180deg, rgba(237,233,254,0.88) 0%, rgba(243,232,255,0.74) 100%)"
                  boxShadow="inset 0 0 0 rgba(168, 85, 247, 0.55), inset 0 0 0 rgba(168, 85, 247, 0.42), 0 1px 10px rgba(168, 85, 247, 0.06)"
                >
                  <Table.Row bg="rgba(255,255,255,0.18)">
                    {visibleDesktopColumns.map((column) => (
                      <Table.ColumnHeader
                        key={column.id}
                        {...(useStickyEdgeColumns ? column.headerProps : {})}
                      >
                        <HStack
                          gap="1"
                          justify={
                            useStickyEdgeColumns &&
                            column.headerProps?.textAlign === "right"
                              ? "flex-end"
                              : "flex-start"
                          }
                        >
                          <Text
                            fontSize="sm"
                            fontWeight="700"
                            color="gray.700"
                            lineHeight="1.2"
                          >
                            {column.label}
                          </Text>
                          {column.hideable ? (
                            <Box
                              as="button"
                              type="button"
                              aria-label={t("hide-column", {
                                column: column.label,
                              })}
                              title={t("hide-column", {
                                column: column.label,
                              })}
                              onClick={() => hideColumn(column.id)}
                              {...headerHideButtonStyles}
                            >
                              <LuEyeOff size={16} />
                            </Box>
                          ) : null}
                        </HStack>
                      </Table.ColumnHeader>
                    ))}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {previewInvitations.map((item) => (
                    <Table.Row key={item.id}>
                      {visibleDesktopColumns.map((column) => (
                        <Table.Cell
                          key={column.id}
                          w="min-content"
                          {...(useStickyEdgeColumns ? column.cellProps : {})}
                        >
                          {column.renderCell(item)}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>

            <Box mt="1.2rem">{paginationElement}</Box>
          </FormContainer>
        </Box>
      ) : (
        <Box {...pageContentWrapperStyles}>
          <FormContainer maxW="1200px">
            <Stack {...tableToolbarShellStyles} mb="0.8rem">
              <HStack
                justify="space-between"
                align="stretch"
                gap="3"
                flexDirection="column"
              >
                <Box {...tableToolbarSearchStyles}>
                  <Box {...tableToolbarSearchIconStyles}>
                    <LuSearch size={20} />
                  </Box>
                  <FormInput
                    placeholder="Search invitations"
                    inputProps={tableToolbarSearchInputProps}
                  />
                </Box>

                <HStack gap="3" flexWrap="wrap">
                  <SecondaryButton
                    neutral
                    flex="1"
                    iconLeft={<LuFilter />}
                    {...tableToolbarSecondaryActionStyles}
                  >
                    Filters
                  </SecondaryButton>
                  <PrimaryButton
                    flex="1"
                    iconLeft={<LuPlus />}
                    {...tableToolbarPrimaryActionStyles}
                  >
                    Add invitation
                  </PrimaryButton>
                </HStack>
              </HStack>

              {quickFilterControls}
            </Stack>

            <Accordion.Root
              multiple
              collapsible
              defaultValue={[]}
              {...mobileInvitationAccordionRootStyles}
            >
              {previewInvitations.map((item) => {
                const dateLabel =
                  item.status === "green" ? t("accepted-at") : t("expires-at")
                const dateValue =
                  item.status === "green" ? item.accepted_at : item.expires_at

                return (
                  <Accordion.Item
                    key={item.id}
                    value={String(item.id)}
                    {...mobileInvitationAccordionItemStyles}
                  >
                    <Box {...mobileInvitationAccordionHeaderStyles}>
                      <HStack align="flex-start" gap="3">
                        <Stack gap="1.5" minW="0" flex="1">
                          <Text
                            fontWeight="700"
                            color="gray.800"
                            lineHeight="1.35"
                            overflowWrap="anywhere"
                          >
                            {item.email}
                          </Text>
                          <HStack gap="2" wrap="wrap">
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              textTransform="capitalize"
                              color="gray.700"
                            >
                              {t(`common:${item.role}`)}
                            </Text>
                            <InvitationStatusBadge
                              status={item.status}
                              label={t(`status-${item.status}`)}
                            />
                          </HStack>
                        </Stack>

                        {item.can_delete ? (
                          <Box
                            as="button"
                            type="button"
                            aria-label={t("delete-invitation")}
                            title={t("delete-invitation")}
                            mt="0.2rem"
                            h="34px"
                            w="34px"
                            minW="34px"
                            {...headerDeleteButtonStyles}
                          >
                            <LuTrash2 size={16} />
                          </Box>
                        ) : null}
                      </HStack>
                    </Box>

                    <Accordion.ItemTrigger
                      {...mobileInvitationAccordionTriggerStyles}
                    >
                      <Accordion.ItemIndicator
                        data-mobile-chevron
                        {...mobileInvitationAccordionIndicatorStyles}
                      >
                        <LuChevronDown size={16} />
                      </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent
                      {...mobileInvitationAccordionContentStyles}
                    >
                      <Accordion.ItemBody
                        {...mobileInvitationAccordionBodyStyles}
                      >
                        <Stack gap="3">
                          <HStack align="stretch" gap="4">
                            <Box flex="1" minW="0">
                              <InvitationInfoRow
                                label={t("table-invited-by")}
                                value={item.inviter_name}
                                subvalue={item.inviter_email}
                              />
                            </Box>
                            <Box flex="1" minW="0">
                              <InvitationInfoRow
                                label={t("table-invited-at")}
                                value={formatDateTime(item.created_at)}
                              />
                            </Box>
                          </HStack>

                          <InvitationInfoRow
                            label={dateLabel}
                            value={formatDateTime(dateValue)}
                          />
                        </Stack>
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                )
              })}
            </Accordion.Root>

            <Box mt="1rem">{paginationElement}</Box>
          </FormContainer>
        </Box>
      )}
    </PageContainer>
  )
}

export default Invitations

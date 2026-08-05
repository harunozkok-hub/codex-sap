import { CloseButton, Dialog, Portal, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import DangerButton from "@/components/form/DangerButton"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import {
  glassDialogBackdropStyles,
  glassDialogBodyStyles,
  glassDialogContentStyles,
  glassDialogFooterStyles,
  glassDialogHeaderStyles,
  glassDialogTitleStyles,
  glassIconButtonSecondary,
} from "@/utils/css-chakra"

const CustomDialog = ({
  type,
  size = "sm",
  triggerButton,
  dialogTitle,
  dialogText,
  actionLabel = null,
  onConfirm,
  onCancel = () => {},
  confirmLoading = false,
  isOpen,
  onOpenChange,
}) => {
  const { t } = useTranslation("common")
  const isDestructive =
    type === "discard" ||
    type === "delete" ||
    type === "custom-destructive"
  const role = isDestructive ? "alertDialog" : "dialog"
  const resolvedConfirmLabel =
    actionLabel ||
    (type === "discard"
      ? t("discard-changes")
      : type === "delete"
        ? t("delete")
        : "OK")

  const confirmButton = isDestructive ? (
    <DangerButton
      onClick={onConfirm}
      loading={confirmLoading}
      disabled={confirmLoading}
      label={resolvedConfirmLabel}
    />
  ) : (
    <PrimaryButton
      onClick={onConfirm}
      loading={confirmLoading}
      disabled={confirmLoading}
      label={resolvedConfirmLabel}
    />
  )

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      motionPreset="slide-in-bottom"
      role={role}
      size={size}
      onOpenChange={(e) => onOpenChange?.(e.open)}
      placement="center"
      closeOnInteractOutside={!confirmLoading}
      closeOnEscape={!confirmLoading}
    >
      {triggerButton && (
        <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>
      )}
      <Portal>
        <Dialog.Backdrop {...glassDialogBackdropStyles} />
        <Dialog.Positioner>
          <Dialog.Content {...glassDialogContentStyles}>
            <Dialog.Header {...glassDialogHeaderStyles}>
              <Dialog.Title {...glassDialogTitleStyles}>
                {dialogTitle}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body {...glassDialogBodyStyles}>
              {typeof dialogText === "string" ? (
                <Text whiteSpace="pre-line">{dialogText}</Text>
              ) : (
                dialogText
              )}
            </Dialog.Body>
            <Dialog.Footer {...glassDialogFooterStyles}>
              <Stack
                direction={{ base: "column-reverse", sm: "row" }}
                w={{ base: "100%", sm: "auto" }}
                align="stretch"
              >
                <Dialog.ActionTrigger asChild>
                  <SecondaryButton
                    neutral
                    onClick={onCancel}
                    disabled={confirmLoading}
                    label={t("cancel")}
                    w={{ base: "100%", sm: "auto" }}
                  />
                </Dialog.ActionTrigger>
                {confirmButton}
              </Stack>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                {...glassIconButtonSecondary}
                onClick={onCancel}
                disabled={confirmLoading}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default CustomDialog

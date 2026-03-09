import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const CustomDialog = ({
  type,
  size = "sm",
  triggerButton,
  dialogTitle,
  dialogText,
  onConfirm,
  onCancel = () => {},
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation("common")
  const role =
    type === "discard" || type === "delete" ? "alertDialog" : "dialog"
  const actionButtonText =
    type === "discard"
      ? t("discard-changes")
      : type === "delete"
        ? t("delete")
        : "OK"
  const actionButtonColor =
    type === "discard" || type === "delete" ? "red" : "green"

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      motionPreset="slide-in-bottom"
      role={role}
      size={size}
      onOpenChange={(e) => setIsOpen(e.open)}
      placement="center"
    >
      {triggerButton && (
        <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>
      )}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{dialogText}</Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <Button
                variant="subtle"
                colorPalette={actionButtonColor}
                onClick={onConfirm}
              >
                {actionButtonText}
              </Button>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onCancel}>
                  {t("cancel")}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onCancel} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default CustomDialog

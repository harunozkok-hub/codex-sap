import { useCallback } from "react"
import { useBlocker } from "react-router"
import { useTranslation } from "react-i18next"
import CustomDialog from "@/components/generic/CustomDialog"

function UnsavedChangesBlocker({ when }) {
  const { t } = useTranslation("common")
  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }) => {
      if (!when) return false

      return currentLocation.pathname !== nextLocation.pathname
    },
    [when],
  )
  const blocker = useBlocker(shouldBlock)

  return (
    <CustomDialog
      type="discard"
      dialogTitle={t("unsaved-changes")}
      dialogText={t("are-you-sure-you-want-to-disca")}
      onConfirm={() => {
        if (blocker.state === "blocked") {
          blocker.proceed()
        }
      }}
      onCancel={() => {
        if (blocker.state === "blocked") {
          blocker.reset?.()
        }
      }}
      isOpen={blocker.state === "blocked"}
      onOpenChange={(open) => {
        if (!open && blocker.state === "blocked") {
          blocker.reset?.()
        }
      }}
    />
  )
}

export default UnsavedChangesBlocker

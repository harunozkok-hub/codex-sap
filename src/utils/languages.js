export const LANGUAGES = (t) => {
  return [
    { code: "en", label: t("english", { ns: "common" }), flag: "🇬🇧" },
    { code: "es", label: t("spanish", { ns: "common" }), flag: "🇪🇸" },
    { code: "it", label: t("italian", { ns: "common" }), flag: "🇮🇹" },
    { code: "pt", label: t("portuguese", { ns: "common" }), flag: "🇧🇷" },
    // { code: "de", label: t("german"), flag: "🇩🇪" },
    // { code: "fr", label: t("french"), flag: "🇫🇷" },
  ]
}

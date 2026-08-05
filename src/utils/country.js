const countryList = [
  { countryKey: "austria", iso2: "AT", phone_code: "+43", icon: "🇦🇹" },
  { countryKey: "belgium", iso2: "BE", phone_code: "+32", icon: "🇧🇪" },
  { countryKey: "bulgaria", iso2: "BG", phone_code: "+359", icon: "🇧🇬" },
  { countryKey: "croatia", iso2: "HR", phone_code: "+385", icon: "🇭🇷" },
  { countryKey: "cyprus", iso2: "CY", phone_code: "+357", icon: "🇨🇾" },
  {
    countryKey: "czech-republic",
    iso2: "CZ",
    phone_code: "+420",
    icon: "🇨🇿",
  },
  { countryKey: "denmark", iso2: "DK", phone_code: "+45", icon: "🇩🇰" },
  { countryKey: "estonia", iso2: "EE", phone_code: "+372", icon: "🇪🇪" },
  { countryKey: "finland", iso2: "FI", phone_code: "+358", icon: "🇫🇮" },
  { countryKey: "france", iso2: "FR", phone_code: "+33", icon: "🇫🇷" },
  { countryKey: "germany", iso2: "DE", phone_code: "+49", icon: "🇩🇪" },
  { countryKey: "greece", iso2: "GR", phone_code: "+30", icon: "🇬🇷" },
  { countryKey: "hungary", iso2: "HU", phone_code: "+36", icon: "🇭🇺" },
  { countryKey: "iceland", iso2: "IS", phone_code: "+354", icon: "🇮🇸" },
  { countryKey: "ireland", iso2: "IE", phone_code: "+353", icon: "🇮🇪" },
  { countryKey: "italy", iso2: "IT", phone_code: "+39", icon: "🇮🇹" },
  { countryKey: "latvia", iso2: "LV", phone_code: "+371", icon: "🇱🇻" },
  {
    countryKey: "lithuania",
    iso2: "LT",
    phone_code: "+370",
    icon: "🇱🇹",
  },
  {
    countryKey: "luxembourg",
    iso2: "LU",
    phone_code: "+352",
    icon: "🇱🇺",
  },
  { countryKey: "malta", iso2: "MT", phone_code: "+356", icon: "🇲🇹" },
  {
    countryKey: "netherlands",
    iso2: "NL",
    phone_code: "+31",
    icon: "🇳🇱",
  },
  { countryKey: "norway", iso2: "NO", phone_code: "+47", icon: "🇳🇴" },
  { countryKey: "poland", iso2: "PL", phone_code: "+48", icon: "🇵🇱" },
  { countryKey: "portugal", iso2: "PT", phone_code: "+351", icon: "🇵🇹" },
  { countryKey: "romania", iso2: "RO", phone_code: "+40", icon: "🇷🇴" },
  { countryKey: "slovakia", iso2: "SK", phone_code: "+421", icon: "🇸🇰" },
  { countryKey: "slovenia", iso2: "SI", phone_code: "+386", icon: "🇸🇮" },
  { countryKey: "spain", iso2: "ES", phone_code: "+34", icon: "🇪🇸" },
  { countryKey: "sweden", iso2: "SE", phone_code: "+46", icon: "🇸🇪" },
  {
    countryKey: "switzerland",
    iso2: "CH",
    phone_code: "+41",
    icon: "🇨🇭",
  },
  {
    countryKey: "united-kingdom",
    iso2: "GB",
    phone_code: "+44",
    icon: "🇬🇧",
  },
]

const currencyList = [
  { code: "EUR", symbol: "EUR", nameKey: "currency-euro" },
  { code: "BGN", symbol: "BGN", nameKey: "currency-bulgarian-lev" },
  { code: "CZK", symbol: "CZK", nameKey: "currency-czech-koruna" },
  { code: "DKK", symbol: "DKK", nameKey: "currency-danish-krone" },
  { code: "HUF", symbol: "HUF", nameKey: "currency-hungarian-forint" },
  { code: "ISK", symbol: "ISK", nameKey: "currency-icelandic-krona" },
  { code: "NOK", symbol: "NOK", nameKey: "currency-norwegian-krone" },
  { code: "PLN", symbol: "PLN", nameKey: "currency-polish-zloty" },
  { code: "RON", symbol: "RON", nameKey: "currency-romanian-leu" },
  { code: "SEK", symbol: "SEK", nameKey: "currency-swedish-krona" },
  { code: "CHF", symbol: "CHF", nameKey: "currency-swiss-franc" },
  { code: "GBP", symbol: "GBP", nameKey: "currency-british-pound" },
]

export const country = (t) =>
  countryList.map(({ countryKey, ...item }) => ({
    ...item,
    country: t(countryKey, { ns: "common" }),
  }))

export const currencies = (t) =>
  currencyList.map((item) => ({
    value: item.code,
    code: item.code,
    symbol: item.symbol,
    label: `${item.code} - ${t(item.nameKey, { ns: "common" })}`,
  }))

export const europeTimezones = [
  { value: "Atlantic/Reykjavik", label: "Atlantic/Reykjavik (UTC+00:00)" },
  { value: "Europe/Dublin", label: "Europe/Dublin (UTC+00:00 / UTC+01:00)" },
  { value: "Europe/Lisbon", label: "Europe/Lisbon (UTC+00:00 / UTC+01:00)" },
  { value: "Europe/London", label: "Europe/London (UTC+00:00 / UTC+01:00)" },
  {
    value: "Europe/Amsterdam",
    label: "Europe/Amsterdam (UTC+01:00 / UTC+02:00)",
  },
  { value: "Europe/Andorra", label: "Europe/Andorra (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Athens", label: "Europe/Athens (UTC+02:00 / UTC+03:00)" },
  {
    value: "Europe/Belgrade",
    label: "Europe/Belgrade (UTC+01:00 / UTC+02:00)",
  },
  { value: "Europe/Berlin", label: "Europe/Berlin (UTC+01:00 / UTC+02:00)" },
  {
    value: "Europe/Bratislava",
    label: "Europe/Bratislava (UTC+01:00 / UTC+02:00)",
  },
  {
    value: "Europe/Brussels",
    label: "Europe/Brussels (UTC+01:00 / UTC+02:00)",
  },
  {
    value: "Europe/Bucharest",
    label: "Europe/Bucharest (UTC+02:00 / UTC+03:00)",
  },
  {
    value: "Europe/Budapest",
    label: "Europe/Budapest (UTC+01:00 / UTC+02:00)",
  },
  {
    value: "Europe/Copenhagen",
    label: "Europe/Copenhagen (UTC+01:00 / UTC+02:00)",
  },
  {
    value: "Europe/Helsinki",
    label: "Europe/Helsinki (UTC+02:00 / UTC+03:00)",
  },
  {
    value: "Europe/Ljubljana",
    label: "Europe/Ljubljana (UTC+01:00 / UTC+02:00)",
  },
  {
    value: "Europe/Luxembourg",
    label: "Europe/Luxembourg (UTC+01:00 / UTC+02:00)",
  },
  { value: "Europe/Madrid", label: "Europe/Madrid (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Malta", label: "Europe/Malta (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Oslo", label: "Europe/Oslo (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Paris", label: "Europe/Paris (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Prague", label: "Europe/Prague (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Riga", label: "Europe/Riga (UTC+02:00 / UTC+03:00)" },
  { value: "Europe/Rome", label: "Europe/Rome (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Sofia", label: "Europe/Sofia (UTC+02:00 / UTC+03:00)" },
  {
    value: "Europe/Stockholm",
    label: "Europe/Stockholm (UTC+01:00 / UTC+02:00)",
  },
  { value: "Europe/Tallinn", label: "Europe/Tallinn (UTC+02:00 / UTC+03:00)" },
  { value: "Europe/Vienna", label: "Europe/Vienna (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Vilnius", label: "Europe/Vilnius (UTC+02:00 / UTC+03:00)" },
  { value: "Europe/Warsaw", label: "Europe/Warsaw (UTC+01:00 / UTC+02:00)" },
  { value: "Europe/Zurich", label: "Europe/Zurich (UTC+01:00 / UTC+02:00)" },
]

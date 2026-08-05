# Frontend AI Context (React + Chakra + Router v7)

## TL;DR For AI
- React Router v7 data APIs: loaders + actions
- TanStack Query is for server state only
- Chakra UI is the UI system
- FastAPI backend with cookie auth
- Forms use local component state + React Router `<Form>`
- Local app imports now use the `@/...` alias for `src/*`
- Prefer raw query data or `null`, not `{ ok, data, errorMessage, errorStatus }` wrappers for normal server-state queries

---

## Stack
- React
- Chakra UI
- React Router v7
- TanStack Query
- FastAPI backend

---

## Routing Pattern

### Import convention
- Prefer `@/...` imports for local files under `src`
- Avoid adding new `./` or `../` imports for app code unless there is a specific reason

### Loaders
- Use loaders to prefetch query data before rendering
- Loader should usually call `queryClient.ensureQueryData(...)`
- If one backend request seeds multiple related query keys, use a prefetch helper in the loader
- Public token-based flows can return lightweight objects like `{ ok, message, status? }` from loaders when the page needs to branch between a form and an error state

### Actions
- Use route `action` handlers for mutations
- Validate inside the action
- Call backend from the action
- Return structured `errors` for field/form messages
- Localize toaster messages and fallback error messages

### Forms
- Use React Router `<Form>`
- Do not use manual `fetch` for standard mutations
- `method="put"` is valid if the matched route has an `action`
- Nested routes must use `action`, not `actions`

### Current auth-recovery routes
- `/:lang/resend-email`
  action: `resendEmailVerificationAction`
- `/:lang/forgot-password`
  action: `forgotPasswordAction`
- `/:lang/reset-password`
  loader: `resetPasswordLoader`
  action: `resetPasswordAction`
- `/:lang/confirm-email`
  loader: `confirmEmailLoader`

### Current token loader pattern
- `confirmEmailLoader()` reads `token` from search params and maps backend statuses to user-friendly localized messages
- `resetPasswordLoader()` reads `token` from search params and returns `{ ok, message }`
- `ResetPassword.jsx` uses `useLoaderData()` and:
  - renders the password form only when `ok === true`
  - renders an error alert instead when the token is missing/invalid/expired
- For public token-validation endpoints, avoid backend `401` if the request is not an authenticated-session flow, because the shared axios interceptor will try refresh-token logic on `401`

---

## Data Pattern (TanStack Query)
- Use TanStack Query only for server state
- Use `useSuspenseQuery`
- Loader prefetches, component consumes

### Important
- Prefer returning raw backend data on success
- Return `null` for expected soft-failure/missing-data cases when appropriate
- Avoid caching wrapper objects like:
  - `{ ok, data, errorMessage, errorStatus }`
  for normal server-state queries
- Query cache should be easy to patch with `setQueryData`

### Do not use React Query for
- form state
- transient UI state
- checkbox/input local state

---

## Current Company Profile / Address Pattern

### Company profile
- `companyProfileQuery()` returns raw company object or `null`
- `updateCompanyProfile()` returns raw updated company object

### Company addresses
- Company addresses are split by query key, not stored as one primary combined cached object
- Use:
  - `companyAddressQuery("hq")`
  - `companyAddressQuery("billing")`
  - `companyAddressQueryKey(type)`
- Query keys:
  - `["profile", "company-addresses", "hq"]`
  - `["profile", "company-addresses", "billing"]`
- `prefetchCompanyAddresses(queryClient)` fetches `/api-user/company-addresses` once and seeds both split address keys
- Successful address mutations should patch the relevant split query key directly when possible

### Address backend shape
- GET `/api-user/company-addresses` returns:
  - `{ hq: {...} | null, billing: {...} | null }`
- PUT `/api-user/company-address/:type` returns the full saved address object for that type
- Backend address objects already include `type`

---

## Current Address Form Contract
- `name`
- `streetName`
- `houseNumber`
- `addressExtra`
- `postalCode`
- `city`
- `region`
- `country`
- `countryCodeAddress`
- `phoneNumberAddress`
- `copyToOtherAddress`

Backend payload mapping currently follows:
- `streetName -> street`
- `houseNumber -> house_number`
- `addressExtra -> address_extra`
- `postalCode -> postal_code`
- `country -> country_code`
- `countryCodeAddress + phoneNumberAddress -> phone`

---

## Form Pattern
1. Build initial form state from prefetched query data
2. Keep local state in component
3. Submit with `<Form>`
4. Validate in action
5. Map backend field errors to frontend field names
6. Patch relevant query cache on success

### Field errors
- Current repo pattern often uses local `errors` state
- Many pages sync action errors with:
  - `useEffect(() => setErrors(actionData.errors), ...)`
- React 19 ESLint flags this with `react-hooks/set-state-in-effect`
- This is a known repo pattern/caveat
- Some auth pages also use `clearFieldErrorFromErrors(...)` on input change to clear field/form errors progressively

---

## UI Pattern
- Prefer composition over one-off UI
- Reuse components from:
  - `components/form`
  - `components/navigation`
  - `components/generic`
  - `components/containers`
  - `components/ui`
- Keep spacing consistent with shared chakra spacing helpers
- Avoid heavy inline styles unless needed for layout fixes

### Current glass UI system
- Public/auth pages now use a glassmorphism-oriented shared style layer from `utils/css-chakra.js`
- Reusable shared style exports include:
  - `backgroundGradient`
  - `glassInputStyles`
  - `glassSelectStyles`
  - `glassCheckboxControlStyles`
  - `alertStatusStyles`
  - `navPrimaryGlassButton`
  - `navGhostGlassButton`
  - spacing/layout tokens like `resGap`, `resM`, `resPX`, `resPY`, `logoWidth`, `headerHeight`, `maxPageWidth`
- Public auth pages commonly wrap content in `GlassEffectContainer`
- Form components in `components/form` are already styled against this glass system:
  - `FormInput`
  - `FormSelect`
  - `FormCheckbox`
  - `PhoneInput`
  - `FormAlert`
- Shared dashboard/profile/onboarding UI also follows this glass direction:
  - `StickyTitleWithBackButton`
  - `CustomDialog`
  - `CustomAccordion`
  - `AddressCard`
  - `toaster`

### Reusable button convention
- `PrimaryButton` wraps the glass primary button style
- `SecondaryButton` wraps the glass ghost/outline button style
- Current migration rule:
  - `variant="surface"` generally became `PrimaryButton`
  - `variant="outline"` generally became `SecondaryButton`
- Destructive actions should use `DangerButton`
- Neutral non-destructive actions like reset/cancel should prefer `SecondaryButton neutral`

### Current profile pages
- Frequently use:
  - `PageContainer`
  - `FormContainer`
  - `PageTitle`
  - desktop breadcrumb / mobile sticky title pattern
  - `FullpageSpinner` during submitting
  - `ErrorMessage` for missing/failed data
- Dashboard pages now also use shared shell/hierarchy tokens from `utils/css-chakra.js`
  - softer `PageContainer` shell
  - shared section divider/title styling
  - shared purple title icon color for desktop/mobile page titles
- Current profile form pages were extracted into keyed child components to avoid stale local form state:
  - `forms/ProfileForm.jsx`
  - `forms/CompanyProfileForm.jsx`
- Parent pages keep shell/query/mutation logic while child forms own local form state and dirty tracking

### Icons
- Prefer one consistent icon family across dashboard/profile/onboarding
- Current direction is `react-icons/lu` (Lucide)
- Avoid introducing new `Fi` / `Pi` icons in these areas unless there is a strong reason

---

## i18n
- Use `useTranslation()`
- Routes are language-prefixed: `/:lang/...`
- Prefer localized toaster titles/descriptions and error fallback messages
- If adding reusable generic text, prefer `common.json`
- Current locales in active use include:
  - `en`
  - `it`
  - `es`
  - `pt` (currently written in PT-BR style)

---

## Backend Contract
- Backend returns structured field errors that are mapped in actions
- Messages should be localized in frontend when used for toasts/fallbacks
- Cookie-based auth only, no manual token handling
- Session payload permissions are the source of truth for access control
- Sidebar visibility and route guards now depend on explicit `permissions` strings, not a coarse admin-role check
- Use:
  - `requireModulePerm(...)` for module-prefix access like `catalog.read` / `catalog.write`
  - `requirePermissions(...)` for exact capability checks like `users.manage` or `user_permissions.manage`

---

## Do / Don’t

### Do
- use loaders for prefetching
- use actions for mutations
- use local form state
- patch query cache directly when mutation response already contains the updated entity
- keep query cache shapes simple
- reuse `PrimaryButton` / `SecondaryButton` before adding new ad hoc button styling
- reuse glass form components before styling raw Chakra fields manually
- prefer alias imports with `@/...`
- current unsaved-changes blocking pattern is route-owned:
  - one blocker is mounted in `Layout`
  - child dashboard pages publish dirty state through `Outlet context`
  - React `StrictMode` can still produce transient dev-only blocker warnings even when non-Strict behavior is fine

### Don’t
- fetch inside components for normal server-state flows
- mix form state with query state
- invent custom query wrappers unless truly necessary
- duplicate route/action/query logic
- introduce new `401` responses for public token-validation flows unless refresh-token interceptor behavior is explicitly desired

---

## Recent Work
- Dashboard onboarding flow is built end-to-end:
  - `welcome`
  - `company-country`
  - `company-legal-info`
  - `company-address`
  - `preferences`
  - `done`
- Onboarding routes use React Router actions wired in `App.jsx`, with query prefetch from `dashboardOnboardingQuery()`
- Main onboarding action file:
  - `src/actions/dashboard-onboarding.js`
  - uses action-side validation, localized fallback errors, `mapBackendFieldErrors(...)`, and cache patching via `queryClient.setQueryData(["dashboardOnboarding"], ...)`
- Important onboarding dirty-state rule:
  - `company-country` and `preferences` can start from auto-filled/suggested values
  - so “not dirty” does not always mean “already saved”
  - skip submit only when submitted values already match saved backend values
- Shared onboarding util mappings live in:
  - `src/pages/dashboard-onboarding/util/dashboard-onboarding.js`
  - includes form mappers and backend field maps for nested pydantic errors
- Reusable address layer was extracted and should be preferred for all address forms:
  - `src/components/form/AddressInput.jsx`
  - `src/components/form/util/address-input.js`
  - shared pieces include `mapAddressToForm`, `addressesFieldMap`, `EMPTY_ADDRESS_FORM`, `getAddressPayloadAndErrors`
- `AddressInput` supports country restriction:
  - `country` prop locks the country field
  - a hidden input keeps `country` in submitted `FormData`
  - `AddressSuggestionInput` rejects suggestions from other countries and shows a localized inline error
- Error mapping helper in `src/utils/validators.js` now supports nested backend paths recursively
  - works for flat, 1-level, and deeper nested maps like `addresses.hq.country_code`
- Onboarding layout now supports unsaved-changes blocking like dashboard pages:
  - `LayoutDashboardOnboarding.jsx` owns blocker state
  - child pages publish dirty state through `Outlet` context
- `CustomDialog.jsx` and `CustomAccordion.jsx` are now part of the shared glass UI layer
- `Done.jsx` uses the glass summary accordion plus required confirmation checkbox before final completion
- Company/profile work completed recently:
  - company profile supports country/document-language reset back into onboarding
  - company/profile forms were extracted into keyed child components to avoid stale local form state
  - blocker host was fixed so only one blocker mounts at a time
  - session/company query caches are patched directly after profile mutations when needed
- `src/utils/datetime.js` was added as the shared date helper:
  - `formatDateTime(value, { timezone })`
  - `formatDateOnly(value, { timezone })`
  - defaults to browser/user timezone when no timezone is passed
- Invitations page work:
  - dedicated locale namespace: `public/locales/*/invitations.json`
  - desktop version uses a glass table with sticky first/last columns
  - mobile version uses stacked invitation cards that mirror the desktop hierarchy
- Icon cleanup:
  - dashboard/profile/onboarding pages were aligned to Lucide icons
  - several reusable components were migrated away from `Fi` / `Pi`
- Locale coverage:
  - onboarding/company-profile/invitations keys were added or updated across `en`, `it`, `es`, `pt`

---

## AI Instructions
- Follow existing repo patterns, but prefer simplifying toward raw query data where possible
- Be careful with route nesting and route `action` placement
- When touching forms, verify frontend field names against action `formData.get(...)`
- When touching cache logic, prefer simple per-entity/per-slot query keys over complex wrapped cache objects
- Keep code production-ready and consistent with current app conventions
- If touching auth pages, preserve the glass visual system unless the user asks for a redesign
- If replacing buttons, preserve spacing/props and only switch safe non-danger cases to `PrimaryButton` / `SecondaryButton`

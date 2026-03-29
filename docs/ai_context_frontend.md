# Frontend AI Context (React + Chakra + Router v7)

## TL;DR For AI
- React Router v7 data APIs: loaders + actions
- TanStack Query is for server state only
- Chakra UI is the UI system
- FastAPI backend with cookie auth
- Forms use local component state + React Router `<Form>`
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

### Loaders
- Use loaders to prefetch query data before rendering
- Loader should usually call `queryClient.ensureQueryData(...)`
- If one backend request seeds multiple related query keys, use a prefetch helper in the loader

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

### Current profile pages
- Frequently use:
  - `PageContainer`
  - `FormContainer`
  - `PageTitle`
  - desktop breadcrumb / mobile sticky title pattern
  - `FullpageSpinner` during submitting
  - `ErrorMessage` for missing/failed data

---

## i18n
- Use `useTranslation()`
- Routes are language-prefixed: `/:lang/...`
- Prefer localized toaster titles/descriptions and error fallback messages
- If adding reusable generic text, prefer `common.json`

---

## Backend Contract
- Backend returns structured field errors that are mapped in actions
- Messages should be localized in frontend when used for toasts/fallbacks
- Cookie-based auth only, no manual token handling

---

## Do / Don’t

### Do
- use loaders for prefetching
- use actions for mutations
- use local form state
- patch query cache directly when mutation response already contains the updated entity
- keep query cache shapes simple

### Don’t
- fetch inside components for normal server-state flows
- mix form state with query state
- invent custom query wrappers unless truly necessary
- duplicate route/action/query logic

---

## AI Instructions
- Follow existing repo patterns, but prefer simplifying toward raw query data where possible
- Be careful with route nesting and route `action` placement
- When touching forms, verify frontend field names against action `formData.get(...)`
- When touching cache logic, prefer simple per-entity/per-slot query keys over complex wrapped cache objects
- Keep code production-ready and consistent with current app conventions

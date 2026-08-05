import { useState, useRef, useEffect } from "react"
import {
  Field,
  Input,
  Group,
  Box,
  HStack,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { LuSearch } from "react-icons/lu"
import { api } from "@/utils/api"
import { glassInputStyles } from "@/utils/css-chakra"
import SecondaryButton from "@/components/form/SecondaryButton"

const AddressSuggestionInput = ({
  onSelect,
  minEntry = 5,
  country: restrictedCountry = null,
  countryLabel = "",
}) => {
  const { t } = useTranslation("common")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const containerRef = useRef(null)

  const fetchSuggestions = async () => {
    const value = query.trim()

    if (!value || value.length < 5) {
      setResults([])
      setOpen(false)
      return
    }

    try {
      setError(null)
      setLoading(true)

      const res = await api.get("/utils/address-autocomplete", {
        params: { q: value },
      })

      const data = res.data
      const nextResults = data.results || []

      setResults(nextResults)
      setOpen(nextResults.length > 0)
    } catch (err) {
      const error =
        err.message ||
        "Server cannot get address suggestions! You can manually fill the address!"
      setError(error)
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setError(null)
      fetchSuggestions()
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectSuggestion = (item) => {
    const suggestionCountry = item?.country_code?.toUpperCase()

    if (restrictedCountry && suggestionCountry !== restrictedCountry) {
      setOpen(false)
      setError(
        t("address-country-restriction", {
          country: countryLabel || restrictedCountry,
        }),
      )
      return
    }

    setQuery(item.formatted || "")
    setError(null)
    setOpen(false)
    onSelect?.(item)
  }

  return (
    <Box ref={containerRef} position="relative" mb="5">
      <Field.Root invalid={!!error}>
        <HStack mb={1}>
          <LuSearch color="#6B46C1" />
          <Field.Label color="purple.700">Find Address</Field.Label>
        </HStack>

        <Group attached w="full">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setError(null)
              setOpen(false)
            }}
            onKeyDown={handleKeyDown}
            autoComplete="empty"
            placeholder="Start typing street, number, city..."
            {...glassInputStyles}
          />
          <SecondaryButton
            onClick={fetchSuggestions}
            loading={loading}
            disabled={query.trim().length < minEntry}
            label="Search"
            h="48px"
          />
        </Group>
        {error && (
          <Field.ErrorText
            mt="0.5"
            fontSize="xs"
            fontWeight="500"
            color="rgba(220, 38, 38, 0.82)"
            lineHeight="1.4"
          >
            {error}
          </Field.ErrorText>
        )}
      </Field.Root>

      {open && (results.length > 0 || loading) && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          mt={1}
          zIndex={10}
        >
          {loading ? (
            <HStack p={3} justify="center">
              <Spinner size="sm" />
              <Text fontSize="sm">Searching...</Text>
            </HStack>
          ) : (
            <VStack align="stretch" gap={0}>
              {results.map((item, idx) => (
                <Box
                  key={idx}
                  px={3}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <Text fontSize="sm">{item.formatted}</Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default AddressSuggestionInput

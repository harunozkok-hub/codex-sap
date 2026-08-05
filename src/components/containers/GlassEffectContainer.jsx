import { Stack } from "@chakra-ui/react"
import { resPX, resPY } from "@/utils/css-chakra"

function GlassEffectContainer({
  maxW = "xl",
  px = resPX,
  py = resPY,
  align = "center",
  children,
  ...props
}) {
  return (
    <Stack
      maxW={maxW}
      width="100%"
      gap="4"
      align={align}
      rounded="24px"
      py={py}
      px={px}
      position="relative"
      // glass base
      bg="linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.30) 100%)"
      border="1px solid rgba(255,255,255,0.38)"
      // soft premium shadow
      boxShadow="
    0 10px 40px rgba(80, 90, 140, 0.10),
    inset 0 1px 0 rgba(255,255,255,0.35)
  "
      // blur effect
      backdropFilter="blur(18px) saturate(140%)"
      WebkitBackdropFilter="blur(18px) saturate(140%)"
      // subtle light reflection layer
      css={{
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "24px",
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 45%, rgba(196,181,253,0.08) 100%)",
        },
      }}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 14px 50px rgba(80, 90, 140, 0.12)",
      }}
      transition="all 0.25s ease"
      {...props}
    >
      {children}
    </Stack>
  )
}

export default GlassEffectContainer

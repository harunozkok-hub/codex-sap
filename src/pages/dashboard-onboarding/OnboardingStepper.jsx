import { Box, Steps, Text } from "@chakra-ui/react"

import { onboardingSteps } from "@/pages/dashboard-onboarding/onboarding-steps"

function OnboardingStepper({
  currentStep,
  indicatorSize = { base: "3.5", md: "4" },
  stepLabelColor = "rgba(106, 74, 179, 0.88)",
}) {
  const currentIndex = Math.max(
    0,
    Math.min(onboardingSteps.length - 1, currentStep - 1),
  )

  return (
    <Steps.Root
      count={onboardingSteps.length}
      step={currentIndex}
      linear
      orientation="horizontal"
      unstyled
      width="100%"
    >
      <Text
        textAlign="center"
        fontSize={{ base: "xs", md: "sm" }}
        fontWeight="600"
        letterSpacing="0.1em"
        textTransform="uppercase"
        color={stepLabelColor}
        textShadow="0 1px 10px rgba(255,255,255,0.14)"
        mb="3"
      >
        {onboardingSteps[currentIndex].stepLabel}
      </Text>

      <Steps.List
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="2"
        width="100%"
      >
        {onboardingSteps.map((step, index) => (
          <Steps.Item key={step.path} index={index}>
            <Steps.Indicator
              w={indicatorSize}
              h={indicatorSize}
              borderRadius="full"
              transition="all 0.2s ease"
            >
              <Steps.Status
                complete={
                  <Box
                    w={indicatorSize}
                    h={indicatorSize}
                    borderRadius="full"
                    bg="rgba(199,188,252,0.92)"
                    borderWidth="1px"
                    borderColor="rgba(255,255,255,0.82)"
                    boxShadow="0 0 0 4px rgba(206, 196, 252, 0.14), 0 4px 12px rgba(168, 85, 247, 0.10)"
                  />
                }
                current={
                  <Box
                    w={indicatorSize}
                    h={indicatorSize}
                    borderRadius="full"
                    bg="rgba(255,255,255,0.96)"
                    borderWidth="2px"
                    borderColor="rgba(184, 134, 255, 0.98)"
                    boxShadow="0 0 0 6px rgba(191, 153, 255, 0.20), 0 6px 16px rgba(168, 85, 247, 0.14)"
                  />
                }
                incomplete={
                  <Box
                    w={indicatorSize}
                    h={indicatorSize}
                    borderRadius="full"
                    bg="rgba(255,255,255,0.62)"
                    borderWidth="1px"
                    borderColor="rgba(205, 183, 255, 0.92)"
                    boxShadow="0 3px 10px rgba(148, 163, 184, 0.08), inset 0 1px 0 rgba(255,255,255,0.92)"
                  />
                }
              />
            </Steps.Indicator>
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  )
}

export default OnboardingStepper

import { Accordion, Box } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"

import {
  glassAccordionBodyStyles,
  glassAccordionContentStyles,
  glassAccordionIndicatorStyles,
  glassAccordionItemStyles,
  glassAccordionRootStyles,
  glassAccordionTriggerStyles,
} from "@/utils/css-chakra"

function CustomAccordion({
  items = [],
  multiple = true,
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  ...props
}) {
  return (
    <Accordion.Root
      multiple={multiple}
      collapsible={collapsible}
      {...glassAccordionRootStyles}
      {...(defaultValue !== undefined && { defaultValue })}
      {...(value !== undefined && { value })}
      {...(onValueChange && { onValueChange })}
      {...props}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          {...glassAccordionItemStyles}
        >
          <Accordion.ItemTrigger {...glassAccordionTriggerStyles}>
            <Box flex="1" textAlign="left">
              {item.title}
            </Box>
            <Accordion.ItemIndicator {...glassAccordionIndicatorStyles}>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent {...glassAccordionContentStyles}>
            <Accordion.ItemBody {...glassAccordionBodyStyles}>
              {item.body}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default CustomAccordion

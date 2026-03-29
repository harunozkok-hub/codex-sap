import { Fragment } from "react"
import { Breadcrumb, Text, HStack } from "@chakra-ui/react"
import { NavLink } from "react-router"
import { LiaSlashSolid } from "react-icons/lia"

export default function NavBreadCrumb({
  items = [],
  currentPageLabel,
  size = "lg",
  icon = null,
}) {
  return (
    <HStack spacing={3} m={1} align="center">
      {icon}
      <Breadcrumb.Root my="1.5px" size={size}>
        <Breadcrumb.List>
          {items.map((item, index) => (
            <Fragment key={index}>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as={NavLink}
                  to={item.link}
                  fontWeight="semibold"
                >
                  {item.title}
                </Breadcrumb.Link>
              </Breadcrumb.Item>

              <Breadcrumb.Separator>
                <LiaSlashSolid />
              </Breadcrumb.Separator>
            </Fragment>
          ))}

          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink asChild>
              <Text fontWeight="bold" fontSize="lg">
                {currentPageLabel}
              </Text>
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </HStack>
  )
}

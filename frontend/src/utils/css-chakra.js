export const autofillInput = {
  textFillColor: "black",
  boxShadow: "0 0 0px 1000px #E6FFFA inset", // Arka plan rengini "kapatmak" için hile
  transition: "background-color 5000s ease-in-out 0s",
}

export const sidebarMask = {
  "--scroll-shadow-size": "2rem",
  maskImage:
    "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  "&[data-at-top]": {
    maskImage:
      "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  },
  "&[data-at-bottom]": {
    maskImage:
      "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
  },
}

export const resGap = { base: "1rem", sm: "1.5rem", md: "2rem" }
export const resM = { base: "1rem", sm: "2rem", md: "3rem" }
export const resP = { base: "1rem", sm: "2rem", md: "2rem" }

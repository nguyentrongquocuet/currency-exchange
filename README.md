# Assignment Notes
## Scenario assumption:
* User already logged in and required data is fetched
* User has separated amount for each currency
* Exchange rates, fees, base-currency are controlled by the api

## Project overview
### Functional
* Text input with options to format input and output value
* Exchange between multiple currency with fees
* Dropdown (don't have navigation by keyboard support)
* Loading skeleton on exchange

### Technical stack: VueJS, Typescript, SCSS

### Styling approach
* Vanilla CSS with SCSS
* Style inside component with hardcoding spacing, colors, typography styles..., im not building a design system

### Known issues
* Unexpected auto-cast value from numeric string when the input gets out of MaxInteger
* Not yet support polling rates, fees, user-balance
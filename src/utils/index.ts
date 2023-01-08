const getDecimalTransform = (digitsAfterPoint?: number) => {
  const regex =
    typeof digitsAfterPoint === 'number'
      ? new RegExp(`[0-9]+\\.?[0-9]{0,${digitsAfterPoint}}`, 'g')
      : /[0-9]+\.?[0-9]*/

  const strToDecimalStr = (value: string) => {
    let result = ''

    if (value === '.') {
      return '0.'
    }

    const matchedDecimalResult = value.match(regex)

    if (matchedDecimalResult) {
      result = matchedDecimalResult[0]
    }

    return result
  }

  return strToDecimalStr
}

export const appDecimalTransform = getDecimalTransform(5)

export const toNumber = (input: number | string) => {
  const num = Number.parseFloat(input.toString())

  if (Number.isNaN(num)) {
    return 0
  }

  return num
}

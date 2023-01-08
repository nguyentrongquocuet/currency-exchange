const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 5,
})

export const formatNum = (num: number) => {
  return formatter.format(num)
}

export const formatNumStr = (numStr: string) => {
  if (!numStr) {
    return ''
  }

  return formatNum(Number.parseFloat(numStr))
}

/**
 *
 * @param numStr formatted numeric string
 * @returns
 */
export const getOgNum = (numStr: string) => {
  console.log('og', numStr)
  return numStr.replaceAll(/,+/g, '')
}

const getDecimalTransform = (digitsAfterPoint?: number) => {
  const regex =
    typeof digitsAfterPoint === 'number'
      ? new RegExp(`[0-9]+\\.?[0-9]{0,${digitsAfterPoint}}`, 'g')
      : /[0-9]+\.?[0-9]*/

  const strToDecimalStr = (value: string) => {
    value = getOgNum(value)
    let result = ''

    if (!value) {
      return '0'
    }

    if (value === '.') {
      return '0.'
    }

    const matchedDecimalResult = value.match(regex)

    if (matchedDecimalResult) {
      result = matchedDecimalResult[0]
      result = formatNumStr(result)
    }

    // result = result ? formatter.format(Number.parseFloat(result)) : ''

    console.log('result', result)

    if (value.indexOf('.') === value.length - 1) {
      return result + '.'
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

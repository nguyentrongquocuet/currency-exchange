export function debounce<F extends (...inputs: any[]) => void>(
  fn: F,
  time = 500
) {
  let timeout: number

  const newFn = (...inputs: Parameters<F>) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(fn, time, ...inputs)
  }

  return newFn
}

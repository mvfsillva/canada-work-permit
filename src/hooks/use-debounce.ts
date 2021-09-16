import { useState, useEffect } from 'react'

function useDebounce(value: string | number | null | undefined, delay: number) {
  const [val, setVal] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setVal(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return val
}

export default useDebounce

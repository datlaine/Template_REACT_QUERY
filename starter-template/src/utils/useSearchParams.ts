import { useSearchParams } from 'react-router-dom'

export const useSearchParamesCustom = () => {
  const [search] = useSearchParams()
  const page = Object.fromEntries([...search])
  // console.log(page)
  return page
}

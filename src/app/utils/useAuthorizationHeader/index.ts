import { useSession } from "next-auth/react"

export const useAuthorizationHeaders = () => {
  const session = useSession()
  return {
    Authorization: `Bearer ${session?.data?.token}`,
  }
}
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import {  getServerSession } from "next-auth"


export const AuthorizationHeaders = async () => {
  const session = await getServerSession(authOptions)

  return {
    Authorization: `Bearer ${session?.token}`,
  }
}
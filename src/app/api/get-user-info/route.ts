import { getUserInfo } from "@/services/auth/getUserInfo";

export async function GET() {
  const user = await getUserInfo();
  return Response.json(user || null);
}

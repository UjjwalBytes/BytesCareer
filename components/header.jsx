import { checkUser } from "@/lib/checkUser";
import ClientHeader from "./ClientHeader";

export default async function Header() {
  const user = await checkUser();

  return <ClientHeader user={user} />;
}
import { path } from "@/config/path";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(path.dashboard.fights.all);
}

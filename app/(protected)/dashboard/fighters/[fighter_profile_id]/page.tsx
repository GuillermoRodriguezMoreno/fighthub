import { FighterProfilePageContainer } from "@/components/fighter-profiles/pages/fighter-profile-page";

export default async function Page({
  params,
}: {
  params: { fighter_profile_id: number };
}) {
  const { fighter_profile_id } = await params;
  return <FighterProfilePageContainer fighterProfileId={fighter_profile_id} />;
}

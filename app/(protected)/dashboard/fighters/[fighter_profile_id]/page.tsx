import { FighterProfilePageContainer } from "@/components/fighter-profiles/pages/fighter-profile-page";

type Props = { params: { fighter_profile_id: number } };

export default async function Page({
  params,
}: Props) {
  const { fighter_profile_id } = await params;
  return <FighterProfilePageContainer fighterProfileId={fighter_profile_id} />;
}

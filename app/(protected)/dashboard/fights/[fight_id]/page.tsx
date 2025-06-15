import { FightPageContainer } from "@/components/fights/pages/fight-page";

export default async function Page({
  params,
}: {
  params: { fight_id: number };
}) {
  const { fight_id } = await params;
  return <FightPageContainer fightId={fight_id} />;
}

import { FightPageContainer } from "@/components/fights/pages/fight-page";

type Props = { params: { fight_id: number } };

export default async function Page({
  params,
}: Props) {
  const { fight_id } = await params;
  return <FightPageContainer fightId={fight_id} />;
}

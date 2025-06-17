import { ClubPageContainer } from "@/components/clubs/pages/club-page";

type Props = { params: { club_id: string } };

export async function Page({ params }: Props) {
  const { club_id } = await params;
  return <ClubPageContainer clubId={club_id} />;
}

import { ClubPageContainer } from "@/components/clubs/pages/club-page";

export default async function Page({ params }: {
  params: Promise<{ club_id: string }>
}) {
  const { club_id } = await params;
  return <ClubPageContainer clubId={club_id} />;
}

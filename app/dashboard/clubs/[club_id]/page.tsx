import { ClubFigthers } from "@/components/clubs/club-fighters";
import ClubInfo from "@/components/clubs/club-info";
import ClubPhotos from "@/components/clubs/club-photos";

export default function Page() {
  return (
    <>
      <h2 className="text-3xl font-semibold md:mb-4 md:text-4xl">Club</h2>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 ">
        <div className="col-span-2">
          <ClubPhotos />
        </div>
        <div className="col-span-1">
          <ClubInfo />
        </div>
      </div>
      <ClubFigthers />
    </>
  )
}

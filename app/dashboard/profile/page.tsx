import ProfileClubInfo from "@/components/profile/profile-club-info";
import ProfileInfo from "@/components/profile/profile-info";
import ProfilePhotos from "@/components/profile/profile-photos";
import { UpcomingFigtherFights } from "@/components/profile/profile-upcoming-fights";

export default function Page() {
  return (
    <>
      <h2 className="text-3xl font-semibold md:mb-4 md:text-4xl">Profile</h2>
      <ProfileInfo />
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 ">
        <div className="col-span-1">
          <ProfileClubInfo />
        </div>
        <div className="col-span-2">
          <ProfilePhotos />
        </div>
      </div>
      <UpcomingFigtherFights />
    </>
  );
}

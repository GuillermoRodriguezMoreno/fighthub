import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, LightBulbIcon } from "@/components/home/Icons";
import { JSX } from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Customization",
    description:
      "Build your fighter profile",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Connect with promoters and gyms",
  },
  {
    icon: <PlaneIcon />,
    title: "Find",
    description:
      "Find fight opportunities and tournaments",
  },
  {
    icon: <LightBulbIcon />,
    title: "Updates",
    description:
      "Stay updated with the latest events in combat sports",
  },
];

export const WhyJoinUs = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Why{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Join{" "}
        </span>
        Us?
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Step into the ultimate combat sports community where fighters, coaches, and promoters come together. Whether you're looking to build your reputation, find fight opportunities, or connect with like-minded warriors, our platform is designed to take your career to the next level. Join a network that understands your passion, fuels your growth, and opens doors to new possibilities in K1, Muay Thai, and MMA. Your journey to greatness starts here! 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

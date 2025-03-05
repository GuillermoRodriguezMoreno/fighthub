import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Fighter Profiles",
    description:
      "Create and customize your fighter profile to showcase your skills, record, and achievements.",
    image: "/feature1.jpeg",
  },
  {
    title: "Event Listings & Registration",
    description:
      "Discover upcoming K1, Muay Thai, and MMA events, and register with ease.",
    image: "/feature2.jpeg",
  },
  {
    title: "Sponsorship & Exposure",
    description:
      "Gain visibility and connect with potential sponsors and fans through our platform",
    image: "/feature3.jpeg",
  },
];

const featureList: string[] = [
  "Fighter Profiles",
  "Matchmaking & Networking",
  "Event Listings & Registration",
  "Training Resources",
  "Fight Analytics & Stats",
  "Sponsorship & Exposure",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="rounded-lg shadow-lg"
                />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

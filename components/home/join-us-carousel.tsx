import * as React from "react"

import { MedalIcon, MapIcon, PlaneIcon, LightBulbIcon } from "@/components/home/Icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface FeatureProps {
    icon: React.JSX.Element;
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

export function JoinUsCarousel() {
    return (
        <div className="relative overflow-hidden">
            <div className="flex flex-col animate-marquee md:flex-row">
                {features.concat(features).map(({ icon, title, description }: FeatureProps, index) => (
                    <div key={index} className="flex flex-col p-2 md:flex-none md:w-1/4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="flex flex-col items-center gap-1">
                                    {icon}
                                    {title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>{description}</CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { Plus } from "lucide-react";

export type MainHeaderProps = {
    title: string;
    link?: string;
    buttonContent?: string;
}

export function MainHeader({ title, link, buttonContent }: MainHeaderProps): JSX.Element {
    const path = usePathname();
    const isActive = path.includes("new")
    return (
        <div className="flex justify-between">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {title}
            </h2>
            {(buttonContent && link && !isActive)  ? <Button><Plus /><Link href={link}>New {buttonContent}</Link></Button> : null}
        </div>
    )
}
'use client'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathnames.map((_name, index) => (
                    <>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={`/${pathnames.slice(0, index + 1).join('/')}`}>
                                {_name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < pathnames.length - 1 && <BreadcrumbSeparator key={index} />}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
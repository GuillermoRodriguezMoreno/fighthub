"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((_name, index) => (
          <div className="flex items-center gap-2" key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${pathnames.slice(0, index + 1).join("/")}`}
              >
                {_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <div>
              {index < pathnames.length - 1 && (
                <BreadcrumbSeparator key={index} />
              )}
            </div>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;

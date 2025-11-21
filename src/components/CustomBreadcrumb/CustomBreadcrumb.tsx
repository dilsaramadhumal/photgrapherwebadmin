import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { cn } from "@/lib/utils"; 
  import { BreadcrumbItem as BreadcrumbItemType } from "@/types/breadcrumb";
  
  interface CustomBreadcrumbProps {
    items: BreadcrumbItemType[];
  }
  
  export function CustomBreadcrumb({ items }: CustomBreadcrumbProps) {
    return (
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList className="items-baseline"> 
            {items.map((item, index) => (
              <>
                <BreadcrumbItem key={index}>
                  {item.dropdownItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {item.dropdownItems.map((dropdownItem, i) => (
                          <DropdownMenuItem key={i} asChild>
                            <BreadcrumbLink href={dropdownItem.href}>
                              {dropdownItem.label}
                            </BreadcrumbLink>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : item.isCurrent ? (
                    <BreadcrumbPage className={cn(
                      "text-base font-normal", 
                      index === 0 && "text-xl font-semibold" 
                    )}>
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      href={item.href}
                      className={cn(
                        "text-base font-normal hover:underline",
                        index === 0 && "text-xl font-semibold hover:no-underline" 
                      )}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && (
                  <BreadcrumbSeparator className="mx-2 text-muted-foreground" />
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }
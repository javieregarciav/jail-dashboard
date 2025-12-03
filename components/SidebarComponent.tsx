"use client";

import {
  LayoutDashboard,
  Skull,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useProjectContext } from "@/context/ProjectContext";

const SidebarComponent = () => {
  const { user } = useUser();
  const { prisonName, setPrisonName } = useProjectContext();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/prisons').then(res => res.json()).then(data => (data.length > 0 ? setPrisonName(data[0].name) : setPrisonName("Prison Admin")))
  }, [])

  if (!user) return null;

  return (
    <Sidebar className="border-r-2 bg-white">
      <SidebarHeader>
        <Item className="hover:bg-[#f5f5f5] cursor-pointer">
          <Skull />
          <p className="font-semibold text-[19px]">{prisonName}</p>
        </Item>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="flex items-center">
        <SidebarGroup />
        <Link href="/dashboard">
        <Item className="hover:bg-[#f5f5f5] cursor-pointer active-btn w-[225px]">
          <LayoutDashboard />
          <p className="text-[15px]">Dashboard</p>
        </Item></Link>        
        <SidebarGroup />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <Item className="hover:bg-[#f5f5f5] cursor-pointer">
          <UserButton></UserButton>
          <ItemContent>
            <ItemTitle>{user?.firstName}</ItemTitle>
            <ItemDescription className="text-[12px]">
              {user.primaryEmailAddress?.emailAddress}
            </ItemDescription>
          </ItemContent>
        </Item>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;

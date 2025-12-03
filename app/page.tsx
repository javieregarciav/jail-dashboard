import SidebarComponent from "@/components/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";

export default function Home({ children }: { children: React.ReactNode }) {
  redirect('/dashboard', RedirectType.replace)
  return (
    <div>nothing</div>
  );
}

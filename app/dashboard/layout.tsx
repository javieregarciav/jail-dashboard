import SidebarComponent from "@/components/SidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ContextProvider } from "@/context/ProjectContext";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ContextProvider>
      <SidebarProvider>
        <SidebarComponent />
        {children}
      </SidebarProvider>
    </ContextProvider>
  );
};

export default Layout;

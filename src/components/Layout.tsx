import { Link, useLocation } from "react-router-dom";
import { CheckSquare, FileText, BarChart3, Timer, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navItems = [
  { path: "/", label: "Todo App", icon: CheckSquare },
  { path: "/form", label: "Form Handling", icon: FileText },
  { path: "/progress", label: "Progress Bar", icon: BarChart3 },
  { path: "/timer", label: "Countdown Timer", icon: Timer },
  { path: "/search", label: "Live Search", icon: Search },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <h1 className="text-lg font-bold text-sidebar-foreground">React Tasks</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.path}>
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">
              {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
            </span>
          </header>
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

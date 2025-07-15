import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ header, sidebar, children }) => {
    return (
        <SidebarProvider>
            {/* Sidebar */}
            {sidebar}

            {/* Main content area with header and content */}
            <SidebarInset className="min-h-screen">
                {/* Header */}
                {header}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="w-full max-w-4xl mx-auto">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}; 
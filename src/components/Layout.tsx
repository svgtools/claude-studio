import React from 'react';

interface LayoutProps {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ header, sidebar, children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            {header}

            {/* Content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Conversation list) */}
                <div className="w-64 border-r border-border overflow-y-auto bg-sidebar text-sidebar-foreground">
                    {sidebar}
                </div>

                {/* Main Content */}
                <main className="flex-1 flex justify-center overflow-y-auto">
                    <div className="w-full max-w-4xl flex flex-col">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}; 
import React from 'react';

interface LayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
    return (
        <div className="flex h-screen bg-background">
            {/* Left Sidebar */}
            <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
                {sidebar}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}; 
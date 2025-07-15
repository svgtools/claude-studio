import React from 'react';
import type { Chat } from '../types/claude-export';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
    chats: Chat[];
    selectedChatId: string | null;
    onChatSelect: (chatId: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
    chats,
    selectedChatId,
    onChatSelect,
}) => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Chats</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chats.map((chat) => (
                                <SidebarMenuItem key={chat.uuid}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={selectedChatId === chat.uuid}
                                    >
                                        <button
                                            className="w-full text-left truncate"
                                            onClick={() => onChatSelect(chat.uuid)}
                                        >
                                            {chat.name || 'Untitled Chat'}
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {chats.length === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-3 text-center text-muted-foreground">
                                        No chats found
                                    </div>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}; 
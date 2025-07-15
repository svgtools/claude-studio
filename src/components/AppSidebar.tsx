import React, { useState } from 'react';
import type { Conversation } from '../types/claude-export';
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AppSidebarProps {
    conversations: Conversation[];
    selectedConversationId: string | null;
    onConversationSelect: (conversationId: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
    conversations,
    selectedConversationId,
    onConversationSelect,
}) => {
    const [selectedView, setSelectedView] = useState<string>("chats");

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="px-4 py-2 flex justify-center">
                        <ToggleGroup
                            type="single"
                            value={selectedView}
                            onValueChange={(value) => value && setSelectedView(value)}
                            className="grid grid-cols-2 w-32 h-7"
                            size="sm"
                        >
                            <ToggleGroupItem value="chats" className="text-xs h-6 px-1 py-0">
                                Chats
                            </ToggleGroupItem>
                            <ToggleGroupItem value="projects" className="text-xs h-6 px-1 py-0">
                                Projects
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    {selectedView === "chats" && (
                        <>
                            <SidebarGroupLabel>Chats</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {conversations.map((conversation) => (
                                        <SidebarMenuItem key={conversation.uuid}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={selectedConversationId === conversation.uuid}
                                            >
                                                <button
                                                    className="w-full text-left truncate"
                                                    onClick={() => onConversationSelect(conversation.uuid)}
                                                >
                                                    {conversation.name || 'Untitled Chat'}
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}

                                    {conversations.length === 0 && (
                                        <SidebarMenuItem>
                                            <div className="px-2 py-3 text-center text-muted-foreground">
                                                No Chats found
                                            </div>
                                        </SidebarMenuItem>
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </>
                    )}

                    {selectedView === "projects" && (
                        <>
                            <SidebarGroupLabel>Projects</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <div className="px-2 py-3 text-center text-muted-foreground">
                                            Projects functionality coming soon
                                        </div>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </>
                    )}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}; 
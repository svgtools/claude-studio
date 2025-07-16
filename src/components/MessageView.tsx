import React from 'react';
import type { Conversation } from '../types/claude-export';
import { MessageSquareDashed } from 'lucide-react';
import { Message } from './Message';

interface MessageViewProps {
    conversation: Conversation | null;
}

export const MessageView: React.FC<MessageViewProps> = ({ conversation }) => {
    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                        <span className="flex justify-center">
                            <MessageSquareDashed className="w-16 h-16 mx-auto text-muted-foreground" />
                        </span>
                    </div>
                    <p className="text-muted-foreground">Select a conversation to view messages</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-background">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {conversation.chat_messages.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-8">
                        No messages in this conversation
                    </div>
                ) : (
                    conversation.chat_messages.map(message => (
                        <Message key={message.uuid} message={message} />
                    ))
                )}
            </div>
        </div>
    );
}; 
export interface User {
  uuid: string;
  full_name: string;
  email_address: string;
  verified_phone_number: string;
}

export interface ProjectDoc {
  uuid: string;
  filename: string;
  content: string;
  created_at: string;
}

export interface Project {
  uuid: string;
  name: string;
  description: string;
  is_private: boolean;
  is_starter_project: boolean;
  prompt_template: string;
  created_at: string;
  updated_at: string;
  creator: User;
  docs: ProjectDoc[];
}

export interface MessageContent {
  start_timestamp: string;
  stop_timestamp: string;
  type: string;
  text: string;
  citations: any[];
}

export interface ChatMessage {
  uuid: string;
  text: string;
  content: MessageContent[];
  sender: 'human' | 'assistant';
  created_at: string;
  updated_at: string;
  attachments: any[];
  files: any[];
}

export interface Conversation {
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  account: {
    uuid: string;
  };
  chat_messages: ChatMessage[];
}

export interface ClaudeExportData {
  users: User[];
  projects: Project[];
  conversations: Conversation[];
} 
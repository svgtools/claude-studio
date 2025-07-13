import { useState } from 'react';
import { Layout } from './components/Layout';
import { ConversationList } from './components/ConversationList';
import { MessageView } from './components/MessageView';
import { useClaudeData } from './hooks/useClaudeData';
import { Button } from './components/ui/button';
import { ConversationHeader } from './components/ConversationHeader';

function App() {
  const { data, loading, error } = useClaudeData();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Claude data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="text-destructive mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }

  const selectedConversation = selectedConversationId
    ? data.conversations.find(c => c.uuid === selectedConversationId) || null
    : null;

  return (
    <Layout
      header={
        selectedConversation && (
          <ConversationHeader conversation={selectedConversation} />
        )
      }
      sidebar={
        <ConversationList
          conversations={data.conversations}
          selectedConversationId={selectedConversationId}
          onConversationSelect={setSelectedConversationId}
        />
      }
    >
      <MessageView conversation={selectedConversation} />
    </Layout>
  );
}

export default App;
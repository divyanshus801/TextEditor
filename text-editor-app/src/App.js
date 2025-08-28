import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import TextEditor from './components/TextEditor';
import DocumentRenderer from './components/DocumentRenderer';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px 0;
`;

const Header = styled.header`
  text-align: center;
  padding: 20px 0 40px 0;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const AppSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const NavButton = styled.button`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &.active {
    background: white;
    color: #667eea;
    border-color: white;
  }
`;

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentView, setCurrentView] = useState('documents'); // 'documents', 'editor', 'viewer'

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocuments = localStorage.getItem('textEditorDocuments');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    localStorage.setItem('textEditorDocuments', JSON.stringify(documents));
  }, [documents]);

  const handleSaveDocument = (document) => {
    setDocuments(prevDocs => [...prevDocs, document]);
    // Auto-navigate to documents view after saving
    setTimeout(() => {
      setCurrentView('documents');
    }, 2000);
  };

  const handleSelectDocument = (document) => {
    setSelectedDocument(document);
    setCurrentView('viewer');
  };

  const handleBackToList = () => {
    setSelectedDocument(null);
    setCurrentView('documents');
  };

  const handleNavigateToEditor = () => {
    setCurrentView('editor');
    setSelectedDocument(null);
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Header>
        <AppTitle>📝 Document Editor</AppTitle>
        <AppSubtitle>Create, edit, and manage your documents with style</AppSubtitle>
      </Header>

      <Navigation>
        <NavButton 
          className={currentView === 'documents' ? 'active' : ''}
          onClick={() => setCurrentView('documents')}
        >
          📚 My Documents ({documents.length})
        </NavButton>
        <NavButton 
          className={currentView === 'editor' ? 'active' : ''}
          onClick={handleNavigateToEditor}
        >
          ✏️ Create New
        </NavButton>
      </Navigation>

      {currentView === 'editor' && (
        <TextEditor onSave={handleSaveDocument} />
      )}

      {(currentView === 'documents' || currentView === 'viewer') && (
        <DocumentRenderer
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={handleSelectDocument}
          onBackToList={handleBackToList}
          onNavigateToEditor={handleNavigateToEditor}
          onDeleteDocument={handleDeleteDocument}
        />
      )}
    </AppContainer>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';

const RendererContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-weight: 600;
  font-size: 2.5rem;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(108, 117, 125, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DocumentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: #007bff;
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const CardMeta = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardPreview = styled.div`
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  max-height: 60px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    padding-left: 20px;
  }
`;

const DocumentViewer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const DocumentTitle = styled.h1`
  color: #2c3e50;
  margin: 0 0 20px 0;
  font-size: 2.5rem;
  font-weight: 700;
  border-bottom: 3px solid #007bff;
  padding-bottom: 15px;
`;

const DocumentMeta = styled.div`
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DocumentContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;

  h1, h2, h3, h4, h5, h6 {
    color: #2c3e50;
    margin-top: 2em;
    margin-bottom: 1em;
    font-weight: 600;
  }

  h1 { 
    font-size: 2.2em; 
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
  h2 { 
    font-size: 1.8em; 
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 8px;
  }
  h3 { font-size: 1.4em; }
  h4 { font-size: 1.2em; }

  p {
    margin-bottom: 1.5em;
    text-align: justify;
  }

  ul, ol {
    padding-left: 2em;
    margin-bottom: 1.5em;
  }

  li {
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid #007bff;
    padding: 15px 20px;
    margin: 2em 0;
    background: #f8f9fa;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #555;
    position: relative;

    &::before {
      content: '"';
      font-size: 3em;
      color: #007bff;
      position: absolute;
      top: -10px;
      left: 10px;
      opacity: 0.3;
    }
  }

  code {
    background: #f8f9fa;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #e83e8c;
    border: 1px solid #e9ecef;
  }

  pre {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2em 0;
    border: 1px solid #e9ecef;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    code {
      background: none;
      padding: 0;
      border: none;
      color: #333;
    }
  }

  strong {
    font-weight: 700;
    color: #2c3e50;
  }

  em {
    font-style: italic;
    color: #495057;
  }

  hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, #007bff, transparent);
    margin: 3em 0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const CreateButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }

  &.delete {
    border-color: #dc3545;
    color: #dc3545;

    &:hover {
      background: #dc3545;
      color: white;
    }
  }
`;

const DocumentRenderer = ({ documents, selectedDocument, onSelectDocument, onBackToList, onNavigateToEditor, onDeleteDocument }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTextContent = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  if (selectedDocument) {
    return (
      <RendererContainer>
        <Header>
          <Title>Document Viewer</Title>
          <BackButton onClick={onBackToList}>
            ← Back to Documents
          </BackButton>
        </Header>
        
        <DocumentViewer>
          <DocumentTitle>{selectedDocument.title}</DocumentTitle>
          <DocumentMeta>
            <span>📅 Created: {formatDate(selectedDocument.createdAt)}</span>
            <span>📄 Document ID: {selectedDocument.id}</span>
          </DocumentMeta>
          <DocumentContent dangerouslySetInnerHTML={{ __html: selectedDocument.content }} />
        </DocumentViewer>
      </RendererContainer>
    );
  }

  return (
    <RendererContainer>
      <Header>
        <Title>My Documents</Title>
        <BackButton onClick={onNavigateToEditor}>
          ✏️ Create New Document
        </BackButton>
      </Header>

      {documents.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📄</EmptyIcon>
          <EmptyText>No documents yet</EmptyText>
          <CreateButton onClick={onNavigateToEditor}>
            Create Your First Document
          </CreateButton>
        </EmptyState>
      ) : (
        <DocumentGrid>
          {documents.map((doc) => (
            <DocumentCard key={doc.id} onClick={() => onSelectDocument(doc)}>
              <CardTitle>{doc.title}</CardTitle>
              <CardMeta>
                <span>📅 {formatDate(doc.createdAt)}</span>
              </CardMeta>
              <CardPreview>
                {getTextContent(doc.content).substring(0, 150)}
              </CardPreview>
              <ActionButtons>
                <ActionButton onClick={(e) => {
                  e.stopPropagation();
                  onSelectDocument(doc);
                }}>
                  👁️ View
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this document?')) {
                      onDeleteDocument(doc.id);
                    }
                  }}
                >
                  🗑️ Delete
                </ActionButton>
              </ActionButtons>
            </DocumentCard>
          ))}
        </DocumentGrid>
      )}
    </RendererContainer>
  );
};

export default DocumentRenderer;
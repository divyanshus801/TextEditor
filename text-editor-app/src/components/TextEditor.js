import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';

const EditorContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h2`
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 8px 12px;
  margin-bottom: 10px;
  width: 100%;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #007bff;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f0f0f0'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EditorWrapper = styled.div`
  border: 2px solid #e9ecef;
  border-radius: 8px;
  min-height: 400px;
  padding: 20px;
  background: white;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .ProseMirror {
    outline: none;
    min-height: 350px;
    font-size: 16px;
    line-height: 1.6;
    color: #333;

    h1, h2, h3 {
      color: #2c3e50;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }

    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.2em; }

    p {
      margin-bottom: 1em;
    }

    ul, ol {
      padding-left: 1.5em;
      margin-bottom: 1em;
    }

    li {
      margin-bottom: 0.3em;
    }

    blockquote {
      border-left: 4px solid #007bff;
      padding-left: 1em;
      margin: 1em 0;
      font-style: italic;
      color: #666;
    }

    code {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    pre {
      background: #f8f9fa;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1em 0;
    }
  }
`;

const StatusMessage = styled.div`
  margin-top: 15px;
  padding: 12px;
  border-radius: 6px;
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
  font-weight: 500;
`;

const TextEditor = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your document here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const handleSave = () => {
    if (!title.trim()) {
      setSaveStatus({ success: false, message: 'Please enter a title for your document.' });
      return;
    }

    if (!editor || !editor.getHTML()) {
      setSaveStatus({ success: false, message: 'Please add some content to your document.' });
      return;
    }

    const document = {
      id: Date.now(),
      title: title,
      content: editor.getHTML(),
      createdAt: new Date().toISOString(),
    };

    onSave(document);
    setSaveStatus({ success: true, message: 'Document saved successfully!' });
    
    // Clear the status message after 3 seconds
    setTimeout(() => setSaveStatus(null), 3000);
  };

  if (!editor) {
    return null;
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <Title>Create New Document</Title>
        <SaveButton onClick={handleSave}>
          💾 Save Document
        </SaveButton>
      </EditorHeader>

      <TitleInput
        type="text"
        placeholder="Enter document title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          ❝ Quote
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        >
          &lt;/&gt; Code
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          ― Rule
        </ToolbarButton>
      </Toolbar>

      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>

      {saveStatus && (
        <StatusMessage success={saveStatus.success}>
          {saveStatus.message}
        </StatusMessage>
      )}
    </EditorContainer>
  );
};

export default TextEditor;
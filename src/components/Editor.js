import React, { useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap } from '@codemirror/commands';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';


// Custom theme for editor to increase font size
const myTheme = EditorView.theme({
    ".cm-content": {
      fontSize: "16px",
    }
  });


const CodeEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize the editor state with individual extensions
    const startState = EditorState.create({
      doc: '',
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        javascript(),
        closeBrackets(),
        oneDark,
        keymap.of(defaultKeymap),
        syntaxHighlighting(defaultHighlightStyle),
        myTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const value = update.state.doc.toString();
            console.log('Editor content:', value);
          }
        }),
        EditorView.lineWrapping,
      ],
    });

    // Initialize the editor view
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    // Cleanup function to destroy the editor on component unmount
    return () => view.destroy();
  }, []);

  return <div ref={editorRef} style={{borderRadius: '4px',background:'#f00' }} />;
};

export default CodeEditor;

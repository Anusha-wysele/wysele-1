import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { Extension } from '@tiptap/core';

import Toolbar from './Toolbar';
import ImageUploader from './ImageUploader';
import api from '../../services/api';

// Inline Custom Font Size Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

const BlogEditor = ({ value, onChange }) => {
  const [showImageUploadArea, setShowImageUploadArea] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);

  const handleMouseOver = (event) => {
    const target = event.target.closest('.ProseMirror a');
    if (target) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      const rect = target.getBoundingClientRect();
      const href = target.getAttribute('href');
      setHoveredLink({ href, rect });
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredLink(null);
    }, 400);
    setHideTimeout(timeout);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('file', file);

    try {
      const res = await api.post('/blogs/upload-images', formData);
      const data = res.data;
      const imgUrl = Array.isArray(data) ? data[0] : (
                     data.url || 
                     (Array.isArray(data.urls) && data.urls[0]) || 
                     (data.data && data.data.url) ||
                     (Array.isArray(data.data) && data.data[0]) ||
                     data.imageUrl
                   );

      if (imgUrl) {
        editor.chain().focus().setImage({ src: imgUrl }).run();
      } else {
        throw new Error('Image URL not found in API response');
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#005A9E] underline cursor-pointer hover:text-[#004b85]',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-6 mx-auto',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-6 border border-gray-300',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-300',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2.5 min-w-[50px] relative text-left',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2.5 min-w-[50px] relative bg-gray-50 text-left font-bold',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your article here...',
        emptyEditorClass: 'is-editor-empty',
      }),
      FontSize,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === '<p></p>' ? '' : html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-5 bg-white text-gray-800 font-sans',
      },
    },
  });

  // Handle external value changes (like when switching tabs, loading existing blog)
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-lg flex flex-col overflow-hidden shadow-sm bg-white">
      <Toolbar editor={editor} onTriggerImageUpload={() => setShowImageUploadArea(!showImageUploadArea)} />
      
      {showImageUploadArea && (
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <ImageUploader onUpload={handleImageUpload} />
        </div>
      )}

      <div 
        className="relative flex-1"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <EditorContent editor={editor} />

        {/* Hover Link Tooltip */}
        {hoveredLink && (
          <div
            className="fixed z-[9999] bg-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-100"
            style={{
              left: `${hoveredLink.rect.left + window.scrollX + hoveredLink.rect.width / 2}px`,
              top: `${hoveredLink.rect.top + window.scrollY - 32}px`,
              transform: 'translateX(-50%)',
            }}
            onMouseEnter={() => {
              if (hideTimeout) {
                clearTimeout(hideTimeout);
                setHideTimeout(null);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={hoveredLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              Click to follow
              <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Editor specific styles for tables, placeholders, and selected items */}
      <style>{`
        .ProseMirror {
          min-height: 500px;
        }
        .ProseMirror a {
          display: inline !important;
          border-bottom: none !important;
          text-decoration: underline !important;
          text-decoration-thickness: 1px !important;
          text-underline-offset: 3px !important;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        /* Table Styles inside editor */
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          min-width: 1em;
          border: 1px solid #ced4da;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8f9fa;
        }
        .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }
        .ProseMirror .column-resize-handle {
          position: absolute;
          right: -2px; top: 0; bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #adf;
          pointer-events: none;
        }
        .tableWrapper {
          overflow-x: auto;
        }
        .resize-cursor {
          cursor: ew-resize;
          cursor: col-resize;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;

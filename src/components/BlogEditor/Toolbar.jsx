import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Quote,
  Code,
  Undo2,
  Redo2,
  Type,
  ChevronDown
} from 'lucide-react';

const FONT_FAMILIES = [
  { name: 'Default', value: 'var(--font-inter)' },
  { name: 'Inter Tight', value: '"Inter Tight"' },
  { name: 'Jost', value: 'Jost' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Serif (Georgia)', value: 'Georgia, serif' },
  { name: 'Monospace', value: 'monospace' },
];

const FONT_SIZES = [
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
  { name: '20px', value: '20px' },
  { name: '24px', value: '24px' },
  { name: '30px', value: '30px' },
  { name: '36px', value: '36px' },
];

const HEADINGS = [
  { name: 'Paragraph', value: 'paragraph' },
  { name: 'Heading 1', value: '1' },
  { name: 'Heading 2', value: '2' },
  { name: 'Heading 3', value: '3' },
];

const COLORS = [
  '#000000', '#333333', '#666666', '#999999', 
  '#005A9E', '#C9184A', '#800000', '#ffcc00', 
  '#22c55e', '#3b82f6', '#a855f7', '#ec4899'
];

const HIGHLIGHTS = [
  '#fffae6', '#e6f4ea', '#e8f0fe', '#fce8e6',
  '#ffeb3b', '#4caf50', '#2196f3', '#e91e63'
];

const Toolbar = ({ editor, onTriggerImageUpload }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  if (!editor) return null;

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkModal(true);
  };

  const saveLink = (e) => {
    e?.preventDefault();
    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      let formattedUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run();
    }
    setShowLinkModal(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShowLinkModal(false);
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const getActiveFontFamily = () => {
    const current = FONT_FAMILIES.find(f => editor.isActive('textStyle', { fontFamily: f.value }));
    return current ? current.name : 'Font';
  };

  const getActiveFontSize = () => {
    const current = FONT_SIZES.find(s => editor.isActive('textStyle', { fontSize: s.value }));
    return current ? current.name : 'Size';
  };

  const getActiveHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
    return 'Paragraph';
  };

  return (
    <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200 p-2.5 flex flex-wrap items-center gap-1 sm:gap-1.5 select-none rounded-t-lg">
      
      {/* Dropdown: Heading */}
      <div className="relative group">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {getActiveHeading()}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
        <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[120px]">
            {HEADINGS.map((h) => (
              <button
                key={h.value}
                type="button"
                onClick={() => {
                  if (h.value === 'paragraph') {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().toggleHeading({ level: parseInt(h.value) }).run();
                  }
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${
                  (h.value === 'paragraph' && editor.isActive('paragraph')) ||
                  (h.value !== 'paragraph' && editor.isActive('heading', { level: parseInt(h.value) }))
                    ? 'bg-blue-50 text-[#005A9E] font-bold'
                    : 'text-gray-700'
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dropdown: Font Family */}
      <div className="relative group">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span className="truncate max-w-[80px]">{getActiveFontFamily()}</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
        <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[140px]">
            {FONT_FAMILIES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => {
                  if (f.name === 'Default') {
                    editor.chain().focus().unsetFontFamily().run();
                  } else {
                    editor.chain().focus().setFontFamily(f.value).run();
                  }
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${
                  editor.isActive('textStyle', { fontFamily: f.value })
                    ? 'bg-blue-50 text-[#005A9E] font-bold'
                    : 'text-gray-700'
                }`}
                style={{ fontFamily: f.value }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dropdown: Font Size */}
      <div className="relative group">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {getActiveFontSize()}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
        <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[80px]">
            {FONT_SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  editor.chain().focus().setFontSize(s.value).run();
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${
                  editor.isActive('textStyle', { fontSize: s.value })
                    ? 'bg-blue-50 text-[#005A9E] font-bold'
                    : 'text-gray-700'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* Basic Marks */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('bold') ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-600'
        }`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('underline') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Strike"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* Text Color Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowColorPicker(!showColorPicker);
            setShowHighlightPicker(false);
          }}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-0.5"
          title="Text Color"
        >
          <Type className="w-4 h-4" />
          <span className="text-[10px] border-b-2 border-black leading-none" style={{ borderColor: editor.getAttributes('textStyle').color || 'black' }}>A</span>
        </button>
        {showColorPicker && (
          <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 grid grid-cols-4 gap-1 z-50 w-36">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  editor.chain().focus().setColor(c).run();
                  setShowColorPicker(false);
                }}
                className="w-6 h-6 rounded-md border border-gray-100 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
                setShowColorPicker(false);
              }}
              className="col-span-4 text-[10px] font-semibold text-gray-500 hover:bg-gray-100 py-1 rounded"
            >
              Reset Color
            </button>
          </div>
        )}
      </div>

      {/* Text Highlight Color Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowHighlightPicker(!showHighlightPicker);
            setShowColorPicker(false);
          }}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-0.5"
          title="Highlight Color"
        >
          <span className="w-4 h-4 rounded bg-yellow-200 flex items-center justify-center font-bold text-xs text-gray-700 border border-gray-300">H</span>
        </button>
        {showHighlightPicker && (
          <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 grid grid-cols-4 gap-1 z-50 w-36">
            {HIGHLIGHTS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => {
                  editor.chain().focus().toggleHighlight({ color: h }).run();
                  setShowHighlightPicker(false);
                }}
                className="w-6 h-6 rounded-md border border-gray-100 hover:scale-110 transition-transform"
                style={{ backgroundColor: h }}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetHighlight().run();
                setShowHighlightPicker(false);
              }}
              className="col-span-4 text-[10px] font-semibold text-gray-500 hover:bg-gray-100 py-1 rounded"
            >
              Reset Highlight
            </button>
          </div>
        )}
      </div>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Justify"
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* Inserts */}
      <button
        type="button"
        onClick={openLinkModal}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('link') ? 'bg-gray-200 text-[#005A9E]' : 'text-gray-600'
        }`}
        title="Hyperlink"
      >
        <Link2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onTriggerImageUpload}
        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600"
        title="Insert Image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={insertTable}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('table') ? 'bg-gray-200 text-[#005A9E]' : 'text-gray-600'
        }`}
        title="Insert Table (3x3)"
      >
        <TableIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600"
        title="Horizontal Line"
      >
        <Minus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('blockquote') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('codeBlock') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
        }`}
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-gray-200 mx-1"></div>

      {/* History */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      {/* Link Modal Popup */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-[#005A9E] uppercase tracking-wider">
                {editor.isActive('link') ? 'Edit Hyperlink' : 'Insert Hyperlink'}
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">URL Address</label>
                <input
                  type="text"
                  required
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      saveLink(e);
                    }
                  }}
                  className="w-full border border-gray-200 p-2.5 rounded text-sm focus:border-[#005A9E] outline-none bg-gray-50 focus:bg-white transition-all font-sans text-gray-900"
                  autoFocus
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                {editor.isActive('link') ? (
                  <button
                    type="button"
                    onClick={removeLink}
                    className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Remove Link
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveLink}
                    className="px-4 py-2 bg-[#005A9E] hover:bg-[#004b85] text-white text-xs font-semibold rounded transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Toolbar;

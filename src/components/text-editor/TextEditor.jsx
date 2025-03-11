import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Link as TiptapLink} from '@tiptap/extension-link';
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code} from 'lucide-react';
import './textEditorStyles.css';
import { useEffect, useRef } from 'react';


// eslint-disable-next-line react/prop-types
const MenuBar = ({editor}) => {
  if (!editor) {
      return null
  }

  const setLink = () => {
      const url = window.prompt('Enter URL:')
      if (url) {
          editor.chain().focus().setLink({ href: url }).run()
      }
  }

  return (
      <div className="border-b border-gray-200 p-2 flex gap-1 flex-wrap">
          <button
            type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              title="Bold"
          >
              <Bold size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              title="Italic"
          >
              <Italic size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
              title="Underline"
          >
              <UnderlineIcon size={16} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
              title="Heading 1"
          >
              <Heading1 size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
              title="Heading 2"
          >
              <Heading2 size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
              title="Heading 3"
          >
              <Heading3 size={16} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
              title="Bullet List"
          >
              <List size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
              title="Numbered List"
          >
              <ListOrdered size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
              title="Quote"
          >
              <Quote size={16} />
          </button>
          <button
          type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
              title="Code"
          >
              <Code size={16} />
          </button>
          <button
          type="button"
              onClick={setLink}
              className={`block-interactive p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
              title="Add Link"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
          </button>
      </div>
  )
}

// eslint-disable-next-line react/prop-types
const TextEditor = ({ blogContent, setBlogContent }) => {
    const contentRef = useRef(blogContent);

  const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
            placeholder: 'Start writing something...',
        }),
        TiptapLink.configure({
            autolink: true,
            defaultProtocol: 'https',
            protocols: ['http', 'https'],
            openOnClick: true,
            HTMLAttributes: {
                style: 'color: blue; text-decoration: underline;',
                class: 'cursor-pointer'
            },
            isAllowedUri: (url, ctx) => {
                try {
                  // construct URL
                  const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
      
                  // use default validation
                  if (!ctx.defaultValidate(parsedUrl.href)) {
                    return false
                  }
      
                  // disallowed protocols
                  const disallowedProtocols = ['ftp', 'file', 'mailto']
                  const protocol = parsedUrl.protocol.replace(':', '')
      
                  if (disallowedProtocols.includes(protocol)) {
                    return false
                  }
      
                  // only allow protocols specified in ctx.protocols
                  const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
      
                  if (!allowedProtocols.includes(protocol)) {
                    return false
                  }
      
                  // disallowed domains
                  const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                  const domain = parsedUrl.hostname
      
                  if (disallowedDomains.includes(domain)) {
                    return false
                  }
      
                  // all checks have passed
                  return true
                } catch {
                  return false
                }
              },
              shouldAutoLink: url => {
                try {
                  // construct URL
                  const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
      
                  // only auto-link if the domain is not in the disallowed list
                  const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                  const domain = parsedUrl.hostname
      
                  return !disallowedDomains.includes(domain)
                } catch {
                  return false
                }
              }
        }),
    ],
    content: blogContent || '',  // Initialize with empty string
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose-base mx-auto focus:outline-none min-h-[85vh] px-4',
        },
        handleDOMEvents: {
            beforeinput: (view, event) => {
              if (event.inputType === "insertText" && event.data === " ") {
                event.preventDefault(); // Prevents cursor jump on space
                view.dispatch(view.state.tr.insertText(" "));
                return true;
              }
              return false;
            },
        },
    },
    onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        console.log('Content updated:', html);
        if (contentRef.current !== html) {
            contentRef.current = html; // Update ref, not state
            setBlogContent(html); // Update state only when necessary
        }
    }
})

useEffect(() => {
    if (editor && contentRef.current !== blogContent) {
        editor.commands.setContent(blogContent, false); // false prevents history reset
        contentRef.current = blogContent; // Sync ref with prop
    }
}, [editor, blogContent]);

  return (
    <div className="w-full border border-gray-300 pb-[50px pt-1">
    <div className="bg-white sticky top-[0px] z-[70]">
        <MenuBar editor={editor}/>
    </div>
    <div className="h-full pt-2">
        <EditorContent editor={editor}/>
    </div>
</div>
  )
}

export default TextEditor
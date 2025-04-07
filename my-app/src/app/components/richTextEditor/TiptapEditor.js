"use client"; // 只在前端运行

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { html2txt } from "@/lib/utils";
import './TiptapEditor.scss'

// interface TiptapEditorProps {
//     value: string;
//     onChange: (value: string) => void;
//     /* wtest added */
//     config: {};
//     keyName: string;
//     register: {};
//     errors: {};
//     /* /wtest added */
// }
export const TiptapEditor = ({ config, keyName, value, onChange, register }) => {
    const editor = useEditor({
        // extensions: [StarterKit.configure({
        //     history: false,
        //     heading: {
        //         levels: [1, 2]
        //     }
        // })],
        extensions: [
            StarterKit,
            Placeholder.configure({ // wtest config: https://tiptap.dev/docs/editor/extensions/functionality/placeholder
                placeholder: 'Write something …',
            })],
        content: "<p>Hello <strong>Tiptap</strong> in Next.js! 🚀</p>",
        onUpdate: ({ editor }) => {
            const val = editor.getHTML()
            const newVal = html2txt(val)
            onChange(newVal === '' ? '' : val); // 更新表单中的 content 值
        },
    });

    // 确保 value 变化时，编辑器同步更新（避免外部修改无效）
    useEffect(() => {
        if (editor && editor.getHTML() !== value) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null; // 避免编辑器未加载时报错
    }

    const toggleBlockquote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        editor.chain().focus().toggleBlockquote().run()
    }
    const setBlockquote = (event) => {
        event.preventDefault();
        editor.chain().focus().setBlockquote().run()
    }
    const unsetBlockquote = (event) => {
        event.preventDefault();
        editor.chain().focus().unsetBlockquote().run()
    }

    const toggleCodeBlock = (event) => {
        event.preventDefault();
        editor.chain().focus().toggleCodeBlock().run()
    }

    const setCodeBlock = (event) => {
        event.preventDefault();
        editor.chain().focus().setCodeBlock().run()
    }
    
    const handleEditorClick = (event) => {
        // console.log('handleEditorClick fun >>> ---', event.target)
        // if ((event.target as HTMLElement).closest(".blockquote-button")) {
        // return; // 如果点击的是 blockquote 按钮，则不执行
        // }
        if (event.target.closest(".tiptap")) {
            return; // 如果点击的是 blockquote 按钮，则不执行
        }
    }
    return (
        <>
            <label className="block">
                <span className="text-lg font-medium">{config.title}:</span>
                <div className="border p-4 rounded-md shadow-md mx-auto area-editor">
                    {/* <div className="control-group">
                        <div className="button-group"> */}
                            {/* <button
                                type="button"
                                onClick={toggleBlockquote}
                                className={`blockquote-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                            >
                                Toggle blockquote
                            </button>
                            <button
                                type="button"
                                onClick={toggleCodeBlock}
                                className={editor.isActive('codeBlock') ? 'is-active' : ''}
                            >
                                Toggle code block
                            </button>
                            <button
                                type="button"
                                onClick={setCodeBlock}
                                disabled={editor.isActive('codeBlock')}
                            >
                                Set code block
                            </button> */}
                            
                            {/* <button
                                onClick={setBlockquote}
                                disabled={!editor.can().setBlockquote()}
                            >
                                Set blockquote
                            </button>
                            <button
                                onClick={unsetBlockquote}
                                disabled={!editor.can().unsetBlockquote()}
                            >
                                Unset blockquote
                            </button> */}
                        {/* </div>
                    </div> */}
                    {/* max-w-2xl */}
                    <EditorContent
                        editor={editor}
                        className="min-h-[150px]"
                        onClick={handleEditorClick} />
                </div>
            </label>
        </>
    );
}
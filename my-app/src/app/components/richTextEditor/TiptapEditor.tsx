"use client"; // 只在前端运行

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import './TiptapEditor.scss'

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
  }

export const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello <strong>Tiptap</strong> in Next.js! 🚀</p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()); // 更新表单中的 content 值
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

    return (
        <div className="border p-4 rounded-md shadow-md mx-auto area-editor">
            {/* max-w-2xl */}
            <EditorContent editor={editor} className="min-h-[150px]" />
        </div>
    );
}
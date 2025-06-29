import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: input.description || "",
    onUpdate: ({ editor }) => {
      setInput({ ...input, description: editor.getHTML() });
    },
  });

  // Update editor content if input.description changes from outside
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || "");
    }
  }, [input.description, editor]);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
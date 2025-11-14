"use client";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  Type,
} from "lucide-react";
import type React from "react";

interface FormattingToolbarProps {
  show: boolean;
  editorRef: React.RefObject<HTMLDivElement | null>;
}

export function FormattingToolbar({ show, editorRef }: FormattingToolbarProps) {
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-secondary/50 backdrop-blur-sm transition-all duration-500 ease-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={() => applyFormat("bold")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Bold"
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4 text-foreground" />
      </button>

      <button
        onClick={() => applyFormat("italic")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Italic"
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4 text-foreground" />
      </button>

      <div className="w-px h-4 bg-border" />

      <button
        onClick={() => applyFormat("formatBlock", "h1")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Heading 1"
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4 text-foreground" />
      </button>

      <button
        onClick={() => applyFormat("formatBlock", "h2")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Heading 2"
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4 text-foreground" />
      </button>

      <button
        onClick={() => applyFormat("formatBlock", "h3")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Heading 3"
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4 text-foreground" />
      </button>

      <button
        onClick={() => applyFormat("formatBlock", "p")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Paragraph"
        title="Paragraph"
      >
        <Type className="w-4 h-4 text-foreground" />
      </button>

      <div className="w-px h-4 bg-border" />

      <button
        onClick={() => applyFormat("insertUnorderedList")}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Bullet list"
        title="Bullet List"
      >
        <List className="w-4 h-4 text-foreground" />
      </button>
    </div>
  );
}

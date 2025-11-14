"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { WritingToolbar } from "@/components/writing-toolbar";
import { FormattingToolbar } from "@/components/formatting-toolbar";
import { TypewriterAnimation } from "@/components/typewriter-animation";
import { SoundSelector, SOUND_OPTIONS } from "@/components/sound-selector";

export default function TypeflowPage() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const keypressAudioRef = useRef<HTMLAudioElement | null>(null);
  const returnAudioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedSound, setSelectedSound] = useState("typewriter");
  const [isLoaded, setIsLoaded] = useState(false);

  const updateWordCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
    }
  };

  // Load content and preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load saved content
      const savedContent = localStorage.getItem("typeflow-content");
      const savedSound = localStorage.getItem("typeflow-sound");

      if (savedContent && editorRef.current) {
        editorRef.current.innerHTML = savedContent;
        updateWordCount();
      }

      if (savedSound) {
        setSelectedSound(savedSound);
      }

      setIsLoaded(true);
    }
  }, []);

  // Fade in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize return sound (return.mp3) - this stays constant
  useEffect(() => {
    returnAudioRef.current = new Audio("/sounds/return.mp3");
    returnAudioRef.current.volume = 0.3;
  }, []);

  // Update keypress sound when selectedSound changes
  useEffect(() => {
    const selectedSoundOption = SOUND_OPTIONS.find(
      (sound) => sound.id === selectedSound
    );

    if (selectedSoundOption && selectedSoundOption.file) {
      keypressAudioRef.current = new Audio(selectedSoundOption.file);
      keypressAudioRef.current.volume = 0.3;
    } else {
      // Silent mode - set to null
      keypressAudioRef.current = null;
    }

    // Save sound preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("typeflow-sound", selectedSound);
    }
  }, [selectedSound]);

  // Auto-focus on mount (after content is loaded)
  useEffect(() => {
    if (isLoaded) {
      editorRef.current?.focus();
    }
  }, [isLoaded]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Don't play sound for modifier keys
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta"
    ) {
      return;
    }

    // Play return sound when Enter is pressed
    if (e.key === "Enter") {
      if (returnAudioRef.current) {
        returnAudioRef.current.currentTime = 0;
        returnAudioRef.current.play().catch(() => {
          // Ignore errors if audio can't play
        });
      }
      return;
    }

    // Play selected keypress sound for regular typing (if not silent)
    if (keypressAudioRef.current) {
      keypressAudioRef.current.currentTime = 0;
      keypressAudioRef.current.play().catch(() => {
        // Ignore errors if audio can't play
      });
    }
  };

  const handleInput = () => {
    updateWordCount();

    // Save content to localStorage
    if (editorRef.current && typeof window !== "undefined") {
      localStorage.setItem("typeflow-content", editorRef.current.innerHTML);
    }

    // Hide toolbars while actively typing
    setShowToolbar(false);
    setShowFormattingToolbar(false);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show toolbars after 2 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      if (editorRef.current && editorRef.current.innerText.trim().length > 0) {
        setShowToolbar(true);
        setShowFormattingToolbar(true);
      }
    }, 2000);
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setWordCount(0);
      setShowToolbar(false);
      setShowFormattingToolbar(false);

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("typeflow-content");
      }

      editorRef.current.focus();
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "typeflow-document.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div
        className={`w-full max-w-3xl transition-opacity duration-1000 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          data-placeholder="Start writing..."
          className="w-full min-h-[60vh] bg-transparent text-foreground text-lg md:text-xl leading-relaxed focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/40 empty:before:transition-opacity empty:before:duration-500"
          spellCheck="false"
        />
      </div>

      <SoundSelector
        show={showFormattingToolbar}
        selectedSound={selectedSound}
        onSoundChange={setSelectedSound}
      />

      <FormattingToolbar show={showFormattingToolbar} editorRef={editorRef} />

      {/* Toolbar that appears on pause */}
      <WritingToolbar
        show={showToolbar}
        wordCount={wordCount}
        onClear={handleClear}
        onDownload={handleDownload}
      />

      <TypewriterAnimation />

      {/* Subtle word count at bottom */}
      <div
        className={`fixed bottom-8 right-8 text-sm text-muted-foreground/60 transition-opacity duration-500 ${
          wordCount > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </div>
    </div>
  );
}

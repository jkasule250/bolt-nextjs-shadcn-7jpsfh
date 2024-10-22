'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/lib/types';

interface NoteEditorProps {
  note: Note;
  onNoteUpdate: (note: Note) => void;
}

export default function NoteEditor({ note, onNoteUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onNoteUpdate({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onNoteUpdate({ ...note, content: e.target.value });
  };

  return (
    <div className="p-6 h-full flex flex-col gap-4">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="Note title"
        className="text-2xl font-semibold bg-transparent border-none focus-visible:ring-0 px-0 text-foreground"
      />
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing your note..."
        className="flex-1 resize-none bg-transparent border-none focus-visible:ring-0 text-foreground"
      />
    </div>
  );
}
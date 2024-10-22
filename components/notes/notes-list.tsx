'use client';

import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Note } from '@/lib/types';
import NoteActions from './note-actions';

interface NotesListProps {
  notes: Note[];
  selectedNoteId: string | undefined;
  onNoteSelect: (note: Note) => void;
  onNoteDelete: (noteId: string) => void;
  onNoteDuplicate: (note: Note) => void;
}

export default function NotesList({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteDelete,
  onNoteDuplicate,
}: NotesListProps) {
  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          className={cn(
            'group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-accent',
            selectedNoteId === note.id && 'bg-accent'
          )}
          onClick={() => onNoteSelect(note)}
        >
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="font-medium truncate">{note.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
            </p>
          </div>
          <NoteActions
            note={note}
            onDelete={onNoteDelete}
            onDuplicate={onNoteDuplicate}
          />
        </div>
      ))}
      {notes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No notes found
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Plus, Search, FolderOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NotesList from './notes-list';
import NoteEditor from './note-editor';
import { Note } from '@/lib/types';

export default function NotesContainer() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const addNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      category: 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note
    ));
    setSelectedNote(updatedNote);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
    toast({
      description: "Note deleted successfully",
    });
  };

  const duplicateNote = (note: Note) => {
    const duplicatedNote: Note = {
      ...note,
      id: Date.now().toString(),
      title: `${note.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([duplicatedNote, ...notes]);
    setSelectedNote(duplicatedNote);
    toast({
      description: "Note duplicated successfully",
    });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 p-4 flex flex-col">
        <div className="space-y-4">
          <Button 
            onClick={addNewNote} 
            className="w-full"
            size="lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
          
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
            <FolderOpen className="h-4 w-4" />
            All Notes
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-auto">
          <NotesList
            notes={filteredNotes}
            selectedNoteId={selectedNote?.id}
            onNoteSelect={setSelectedNote}
            onNoteDelete={deleteNote}
            onNoteDuplicate={duplicateNote}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onNoteUpdate={updateNote}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">No Note Selected</h3>
              <p>Select a note from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
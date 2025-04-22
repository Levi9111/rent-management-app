'use client';

import { useEffect, useState } from 'react';

interface Note {
  _id: string;
  text: string;
  createdAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch notes on mount
  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data.notes || []));
  }, []);

  const handleAddOrUpdateNote = async () => {
    if (!newNote.trim()) return;

    if (editIndex !== null) {
      const noteToUpdate = notes[editIndex];
      const res = await fetch(`/api/notes/${noteToUpdate._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNote }),
      });
      const updated = await res.json();
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = updated.note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNote }),
      });
      const newNoteFromDB = await res.json();
      setNotes([newNoteFromDB.note, ...notes]);
    }

    setNewNote('');
  };

  const handleEdit = (index: number) => {
    setNewNote(notes[index].text);
    setEditIndex(index);
  };

  const handleDelete = async (index: number) => {
    const id = notes[index]._id;
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-10'>
      <h1 className='text-3xl font-bold text-gray-800'>📝 Notes</h1>

      <div className='bg-white rounded-2xl shadow p-6 border border-gray-200'>
        <h2 className='text-xl font-semibold mb-4 text-indigo-600'>
          {editIndex !== null ? '✏️ Edit Note' : '➕ Create Note'}
        </h2>
        <textarea
          rows={4}
          className='w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder='Write your note here...'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdateNote}
          className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition'
        >
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <div className='bg-white rounded-2xl shadow p-6 border border-gray-200'>
        <h2 className='text-xl font-semibold mb-4 text-indigo-600'>
          📚 Previous Notes
        </h2>

        {notes.length === 0 ? (
          <p className='text-gray-500'>No notes added yet.</p>
        ) : (
          <ul className='space-y-4'>
            {notes.map((note, index) => (
              <li
                key={note._id}
                className='border border-gray-300 rounded-xl p-4 flex justify-between items-start bg-gray-50'
              >
                <div className='w-3/4'>
                  <p className='text-gray-700 whitespace-pre-wrap'>
                    {note.text}
                  </p>
                  <p className='text-xs text-gray-500 mt-2'>
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className='flex flex-col gap-2 ml-4'>
                  <button
                    onClick={() => handleEdit(index)}
                    className='text-sm text-blue-600 hover:underline'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='text-sm text-red-600 hover:underline'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notes;

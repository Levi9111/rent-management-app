'use client';

import { useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdateNote = () => {
    if (!newNote.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = newNote;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([newNote, ...notes]);
    }
    setNewNote('');
  };

  const handleEdit = (index: number) => {
    setNewNote(notes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-10'>
      <h1 className='text-3xl font-bold text-gray-800'>📝 Notes</h1>

      {/* Create Note Section */}
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

      {/* Previous Notes Section */}
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
                key={index}
                className='border border-gray-300 rounded-xl p-4 flex justify-between items-start bg-gray-50'
              >
                <p className='text-gray-700 w-3/4 whitespace-pre-wrap'>
                  {note}
                </p>
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

'use client';

import {
  getDataFromDB,
  postToDB,
  updateDataIntoDB,
  deleteDataFromDB,
} from '@/api';
import { useContextData } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Note {
  _id: string;
  text: string;
  createdAt: string;
}

const Notes = () => {
  const { base_url } = useContextData();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getDataFromDB(`${base_url}/notes`);
        if (result.success) {
          setNotes(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Something went wrong while fetching notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [base_url]);

  const handleAddOrUpdateNote = async () => {
    if (!newNote.trim()) {
      toast.warning('Please write something.');
      return;
    }

    try {
      if (editIndex !== null) {
        const noteToUpdate = notes[editIndex];
        setLoading(true);
        const result = await updateDataIntoDB(
          `${base_url}/notes/update-note/${noteToUpdate._id}`,
          { note: { text: newNote } },
        );
        if (result.success) {
          const updatedNotes = [...notes];
          updatedNotes[editIndex] = result.data;
          setNotes(updatedNotes);
          setLoading(false);
          setNewNote('');
          setEditIndex(null);
          toast.success(result.message);
        }
      } else {
        setLoading(true);
        const result = await postToDB(`${base_url}/notes/create-note`, {
          note: { text: newNote },
        });
        if (result.success) {
          setNotes((prevNotes) => [result.data, ...prevNotes]);
          setLoading(false);
          setNewNote('');
          setEditIndex(null);
          toast.success(result.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving the note.');
    }
  };

  const handleEdit = (index: number) => {
    setNewNote(notes[index].text);
    setEditIndex(index);
  };

  const handleDelete = async (index: number) => {
    const id = notes[index]._id;
    try {
      const result = await deleteDataFromDB(
        `${base_url}/notes/delete-note/${id}`,
      );
      if (result.success) {
        const updated = notes.filter((_, i) => i !== index);
        setNotes(updated);
        toast.success('Note deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete note.');
      }
    } catch {
      toast.error('Error deleting the note.');
    }
  };

  // Loading state
  if (loading) return <div className='p-6'>Loading...</div>;

  return (
    <div className='p-6 max-w-3xl mx-auto space-y-10'>
      <h1 className='text-2xl font-bold'>📝 Notes</h1>

      {/* Create / Update Form */}
      <div className='bg-white p-6 rounded-xl shadow border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4'>
          {editIndex !== null ? 'Edit Note' : 'Add New Note'}
        </h2>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          rows={4}
          placeholder='Type your note...'
        />
        <button
          onClick={handleAddOrUpdateNote}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md'
        >
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      {/* List of Notes */}
      <div className='bg-white p-6 rounded-xl shadow border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4'>All Notes</h2>

        {notes.length === 0 ? (
          <p className='text-gray-500'>No notes available.</p>
        ) : (
          <ul className='space-y-4'>
            {notes.map((note, index) =>
              // Check that note and note.text are defined
              note && note.text ? (
                <li
                  key={note._id}
                  className='p-4 bg-gray-50 border border-gray-300 rounded-md flex justify-between items-start'
                >
                  <div className='w-4/5'>
                    <p className='text-gray-800 whitespace-pre-wrap'>
                      {note.text}
                    </p>
                    {/* Display the createdAt date */}
                    <span className='text-sm text-gray-500'>
                      Created at: {new Date(note.createdAt).toLocaleString()}
                    </span>
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
              ) : null,
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notes;

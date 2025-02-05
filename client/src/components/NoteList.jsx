import { useState, useEffect } from "react"
import NoteItem from "./NoteItem"
import NoteForm from "./NoteForm"
import { getNotes, createNote, updateNote, deleteNote } from "../services/api"

function NoteList({ setAuth }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes()
      setNotes(fetchedNotes)
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData)
      setNotes([...notes, newNote])
    } catch (error) {
      console.error("Error creating note:", error)
    }
  }

  const handleUpdateNote = async (id, noteData) => {
    try {
      const updatedNote = await updateNote(id, noteData)
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)))
    } catch (error) {
      console.error("Error updating note:", error)
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id)
      setNotes(notes.filter((note) => note._id !== id))
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setAuth(false)
  }

  return (
    <div className="note-list">
      <h2>My Notes</h2>
      <button onClick={handleLogout}>Logout</button>
      <NoteForm onSubmit={handleCreateNote} />
      {notes && notes.map((note) => (
        <NoteItem key={note._id} note={note} onUpdate={handleUpdateNote} onDelete={handleDeleteNote} />
      ))}
    </div>
  )
}

export default NoteList


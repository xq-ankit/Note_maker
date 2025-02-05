import { useState } from "react"

function NoteForm({ onSubmit }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, content })
    setTitle("")
    setContent("")
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Add Note</button>
    </form>
  )
}

export default NoteForm


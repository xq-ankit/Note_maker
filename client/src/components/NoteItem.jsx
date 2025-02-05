import { useState } from "react"

function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleUpdate = () => {
    onUpdate(note._id, { title, content })
    setIsEditing(false)
  }

  return (
    <div className="note-item">
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(note._id)}>Delete</button>
        </>
      )}
    </div>
  )
}

export default NoteItem


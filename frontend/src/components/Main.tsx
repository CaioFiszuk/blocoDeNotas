import { useState, useEffect } from "react";
import Popup from "./Popup";
import CreateForm from "./CreateForm";
import { api } from "../utils/api";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteData {
  title: string;
  content: string;
}

function Main() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createNoteModal, setCreateNoteModal] = useState(false);

  const openCreateModal = () => {
    setCreateNoteModal(true);
  }

  const closeCreateModal = () => {
    setCreateNoteModal(false);
  }

  const getAllNotes = async () => {
    await api.getNotes()
    .then((data)=>{
     setNotes(data);
    })
    .catch((error) => console.error("Erro ao buscar as notas:", error));
  }

  const handleCreateNote = async (data: NoteData): Promise<Note> => {
    try {
      const newNote = await api.createNote(data);
      setNotes(prevNotes => [...prevNotes, newNote]);
      closeCreateModal();
      console.log(newNote)
      return newNote;
    }
    catch(error) {
      console.error(error);
      throw error; 
    }
  }

  useEffect(()=>{
    getAllNotes();
  }, []);

    return (
      <main>

        <button className="main__add-button" onClick={openCreateModal}>+</button>

        <ul className="main__notes-section">
          {
            notes.map((note)=>(
              <li className="main__notes-section__element" key={note._id}><p className="main__notes-section__content">{note.title}</p></li>
            ))
          }
        </ul> 

        <Popup isOpen={createNoteModal} onClose={closeCreateModal}>
           <CreateForm submission={handleCreateNote}/>
        </Popup>
      </main>
    )
  }
  
  export default Main;

import { useState, useEffect, useContext } from "react";
import { api } from "../utils/api";
import { currentUserContext } from "../contexts/CurrentUserContext";
import CreateForm from '../components/CreateForm';
import Popup from '../components/Popup';

function Main() {
  const [notes, setNotes] = useState([]);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const  currentUser = useContext(currentUserContext);

  console.log("ele esta aqui: ", currentUser);

  const openCreateModal = () => {
    setCreateNoteModal(true);
  }

  const closeCreateModal = () => {
    setCreateNoteModal(false);
  }

  const getAllNotes = async () => {
    api.getNotes()
    .then((data)=>{
     setNotes(data);
    })
    .catch((error) => console.error("Erro ao buscar as notas:", error));
  }

    const handleCreateNote = async (data) => {
    try {
      const noteData = {
        ...data,
        owner: currentUser.data._id,
      };
      const newNote = await api.createNote(noteData);
      setNotes(prevNotes => [...prevNotes, newNote]);
      closeCreateModal();
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
              <li 
                className="main__notes-section__element" 
                key={note._id}>
                <p className="main__notes-section__content">
                  {note.title}
                </p>
              </li>
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

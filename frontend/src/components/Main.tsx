interface Note {
  _id: string;
  title: string;
  content: string;
}

interface mainProps {
  notes: Array<Note>;
}

function Main({notes}: mainProps) {

    return (
      <main>
        <ul>
          {
            notes.map((note)=>(
              <li>{note.title}</li>
            ))
          }
        </ul> 
      </main>
    )
  }
  
  export default Main;

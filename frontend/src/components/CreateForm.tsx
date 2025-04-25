interface NoteData {
  title: string;
  content: string;
}

interface CreateFormProps {
  submission: (data: NoteData) => void;
}

function CreateForm({submission}: CreateFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    submission(data);
    e.currentTarget.reset();
  };

    return (
      <form onSubmit={handleSubmit}>
         <input type="text" name="title" placeholder="Title" required/>

         <textarea name="content" required></textarea>

         <button type='submit'>+</button>
      </form>
    )
}
  
  export default CreateForm;

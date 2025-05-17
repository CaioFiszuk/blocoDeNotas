
function CreateForm({submission}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    submission(data);
    e.currentTarget.reset();
  };

    return (
      <form className="form-create" onSubmit={handleSubmit}>
         <input className="form__input" type="text" name="title" placeholder="Title" required/>

         <textarea className="form__textarea" name="content" required></textarea>

         <button className="form__create-button" type='submit'>+</button>
      </form>
    )
}
  
  export default CreateForm;

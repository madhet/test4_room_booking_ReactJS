import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addHall } from '../redux/dispatchers'

function HallForm(props) {
  const { auth, toggleShowForm, addHall } = props

  // console.log('hall-form-props', props)

  const [hallTitle, setTitle] = useState('');
  const [hallDescription, setDescription] = useState('');
  const [hallPhoto, setPhoto] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  const changeInputFile = event => {
    setInputFile(event.target);
    if (!event.target.files.length) return;
    let file = event.target.files[0];
    if (
      !["image/jpg", "image/jpeg", "image/png"].includes(
        file.type
      )
    ) {
      alert("Unsupported filetype!");
      event.target.value = "";
      return;
    } else if (file.size > 80 * 1024) {
      alert("File is too big!");
      event.target.value = "";
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  function clickCreateHall() {
    if (!hallTitle || !hallDescription) return;
    let body = {
      title: hallTitle,
      description: hallDescription,
      imageURL: hallPhoto
    }
    addHall(body, auth);
    setTitle('')
    setDescription('')
    setPhoto(null)
    inputFile.value = ''
    setInputFile(null)
    // toggleShowForm()
  }
  // console.log('hall props', props)
  return (
    <div className='hall-form-wrapper'>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" required value={hallTitle} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" cols="30" rows="10" required value={hallDescription} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div><label htmlFor="photo">Photo: </label>
          <input type="file" id="photo" name="photo" accept=".jpg, .jpeg, .png" onChange={e => changeInputFile(e)} />
        </div>
      </form>
      <div>
        <button onClick={clickCreateHall}>Create</button>
        <button onClick={toggleShowForm}>Cancel</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { auth: state.user.authUserToken }
}

const mapDispatchToProps = {
  addHall
}

export default connect(mapStateToProps, mapDispatchToProps)(HallForm)
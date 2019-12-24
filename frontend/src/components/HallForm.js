import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addHall } from '../redux/dispatchers'

function HallForm(props) {
  const { auth, addHall } = props

  console.log('hall-form-props', props)

  const [hallTitle, setTitle] = useState('');
  const [hallDescription, setDescription] = useState('');
  const [hallPhoto, setPhoto] = useState(null);

  const changeInputFile = event => {
    let file = event.target.files[0];
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
          <input type="file" id="photo" name="photo" onChange={e => changeInputFile(e)} />
        </div>
        <div>
          <button onClick={clickCreateHall}>Create</button>
          <button>Cancel</button>
        </div>
      </form>
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
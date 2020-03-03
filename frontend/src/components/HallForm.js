import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addHall } from '../redux/dispatchers'

function HallForm(props) {
  const { toggleShowForm, addHall } = props

  const [hallTitle, setTitle] = useState('');
  const [hallDescription, setDescription] = useState('');
  const [hallPhoto, setPhoto] = useState(null);
  const [inputFile, setInputFile] = useState(null);
  const [fieldError, setFieldError] = useState({ title: '', description: '', image: '' })

  function validateField() {
    let isValid = true;
    if (!hallTitle) {
      setFieldError(prevState => {
        return { ...prevState, title: 'Field is required' }
      })
      isValid = false;
    }
    if (!hallDescription) {
      setFieldError(prevState => {
        return { ...prevState, description: 'Field is required' }
      })
      isValid = false;
    }
    if (fieldError.image) {
      isValid = false;
    }
    return isValid;
  }

  function changeInput(event) {
    switch (event.target.name) {
      case 'title': {
        if (fieldError.title) {
          setFieldError(prevState => {
            return { ...prevState, title: '' }
          })
        }
        setTitle(event.target.value)
        break;
      }
      case 'description': {
        if (fieldError.description) {
          setFieldError(prevState => {
            return { ...prevState, description: '' }
          })
        }
        setDescription(event.target.value)
        break;
      }
      default:
        break;
    }
  }

  const changeInputFile = event => {
    if (!inputFile) setInputFile(event.target);
    if (fieldError.image) {
      setFieldError(prevState => {
        return { ...prevState, image: '' }
      })
    }
    if (!event.target.files.length) {
      return;
    }
    let file = event.target.files[0];
    if (
      !["image/jpg", "image/jpeg", "image/png"].includes(
        file.type
      )
    ) {
      setFieldError(prevState => {
        return { ...prevState, image: 'Unsupported filetype!' }
      })
      // event.target.value = "";
      return;
    } else if (file.size > 80 * 1024) {
      setFieldError(prevState => {
        return { ...prevState, image: "File is too big!" }
      })
      // event.target.value = "";
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  function clickCreateHall(event) {
    event.preventDefault();
    if (!validateField()) return;
    let body = {
      title: hallTitle,
      description: hallDescription,
      imageURL: hallPhoto
    }
    addHall(body);
    clearForm()
  }

  function clearForm() {
    setTitle('')
    setDescription('')
    setPhoto(null)
    if (inputFile) {
      inputFile.value = ''
      setInputFile(null)
    }
  }

  function closeForm() {
    clearForm()
    toggleShowForm()
  }

  return (
    <div className='hall-form-wrapper'>
      <form className='hall-form' onSubmit={e => e.preventDefault()}>
        <div className='input-wrapper'>
          <label className='input-label' htmlFor="title">Title: </label>
          <input className={'input-field' + (fieldError.title ? ' error' : '')} type="text" id="title" name="title" required value={hallTitle} onChange={changeInput} />
          <div className={'input-error' + (fieldError.title ? ' error' : '')}>Field is required</div>
        </div>
        <div className='input-wrapper'>
          <label className='input-label' htmlFor="description">Description: </label>
          <textarea className={'input-field' + (fieldError.description ? ' error' : '')} id="description" name="description" cols="30" rows="10" required value={hallDescription} onChange={changeInput}></textarea>
          <div className={'input-error' + (fieldError.description ? ' error' : '')}>Field is required</div>
        </div>
        <div>
          <label className='input-label' htmlFor="photo">Photo (jpg, jpeg, png; less then 80 Kb): </label>
          <input className={'input-field' + (fieldError.image ? ' error' : '')} type="file" id="photo" name="photo" accept=".jpg, .jpeg, .png" onChange={e => changeInputFile(e)} />
          <div className={'input-error' + (fieldError.image ? ' error' : '')}>{fieldError.image ? fieldError.image : 'Invalid filetype'}</div>
        </div>
      </form>
      <div>
        <button className='booking-button' onClick={clickCreateHall}>Create</button>
        <button className='booking-button' onClick={closeForm}>Cancel</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  addHall
}

export default connect(mapStateToProps, mapDispatchToProps)(HallForm)
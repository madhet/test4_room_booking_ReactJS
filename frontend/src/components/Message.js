import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Growl } from 'primereact/growl';
import { messageClear } from '../redux/dispatchers'

function Message(props) {
  const { messages, messageClear } = props;

  // console.log('message-props', props)

  const growl = useRef(null)

  useEffect(() => {
    if (messages.length) {
      showMany()
      messageClear()
    }
  })

  function showMany() {
    growl.current.show(messages);
  }

  // function showSuccess(message) {
  //   growl.current.show({ severity: 'success', summary: 'Success', detail: message });
  // }

  // function showSuccessMany() {
  //   growl.current.show(success.map(message => {
  //     return { severity: 'success', summary: 'Success', detail: message }
  //   }));
  // }

  // function showError(message) {
  //   growl.current.show({ severity: 'error', summary: 'Error', detail: message });
  // }

  // function showErrorMany() {
  //   growl.current.show(error.map(message => {
  //     return { severity: 'error', summary: 'Error', detail: message }
  //   }));
  // }

  return (
    <Growl ref={growl} />
  )
}

const mapStateToProps = state => {
  return { messages: state.messages };
};

const mapDispatchToProps = {
  messageClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
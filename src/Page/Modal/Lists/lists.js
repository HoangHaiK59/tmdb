import React from 'react';

import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const ModalSelectList = props => {
    return (
        <Modal isOpen={props.modal} fade={false} toggle={props.toggle} centered>
        <ModalHeader toggle={props.toggle}>My movie lists</ModalHeader>
        <ModalBody>
          {
            props.lists.results.map((list, index) => (
              <div key={index}>
              <button className="btn" onClick={() => props.add2List(list.id, props.movieId)}>
                <div>
                <img src={process.env.REACT_APP_API_DEFAULT_POSTER} style={{width: '50px', height: '50px'}} alt=""/>
                </div>
                {list.name}
              </button>
              </div>
            ))
          }
        </ModalBody>
      </Modal>
    );
}

export default ModalSelectList;
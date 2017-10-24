import React from 'react';

import '../css/EditArticles.css';

const EditArticles = ({editMode, changeMode}) => (
  <div className='edit-mode'>
    <span onClick={() => changeMode(editMode)}>Edit Mode</span>
  </div>
);

export default EditArticles;

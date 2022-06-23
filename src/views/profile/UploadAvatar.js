import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import PropTypes from 'prop-types'

const UploadAvatar = (props) => {
  const [preview, setPreview] = useState(null)
  const [url] = useState(null)
  const onClose = () => {
    setPreview(null)
  }

  const onCrop = (preview) => {
    setPreview(preview)
    props.setMypic(preview)
  }

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 7168000) {
      alert('File is too big!')
      elem.target.value = ''
    }
  }

  return (
    <div>
      <Avatar
        width={390}
        height={295}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={url}
      />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  )
}

export default UploadAvatar

UploadAvatar.propTypes = {
  setMypic: PropTypes.func,
}

import React from 'react'

const PopUpHoc = (WrappedComponent) => {
  return (props) => {
    const closePopup = () => {
      props.trigger(false);
    }
    return (
      <div className='popup position-fixed d-flex justify-content-center align-items-center'>
        <div className={`d-flex flex-column justify-content-start align-items-center ${props.width + ' ' + props.height}  overflow-auto rounded-5`} style={{
          scrollbarWidth: 'thin',
          minWidth: "170px",
          minHeight: '140px',
        }} >
          <button onClick={closePopup} className='closeButton btn btn-close btn-danger'></button>
          <WrappedComponent {...props} />
        </div>
      </div>
    )
  }
}

export default PopUpHoc
import React from 'react'
import { Button, Modal } from 'antd'

export const ModalComponent = ({openModal, btnText, handleCancel,title}) => {
  return (
    <>
        <Modal
            open={openModal}
            title={title}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button>
                {btnText}
              </Button>
            ]}
          >
            <span>test</span>
          </Modal>
    </>
  )
}

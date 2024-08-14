
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void 
  }

const ModalClose = ({ isOpen,  onClose, }: Props) => {
  return (
    <>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top="20%">
        <ModalHeader>Delete Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <p>Are you sure you deleted the note?</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>  )
}

export default ModalClose
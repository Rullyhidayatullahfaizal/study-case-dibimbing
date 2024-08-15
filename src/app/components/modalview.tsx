import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, } from '@chakra-ui/react'
import React from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string; 
    body: string; 
    
  };
const ModalView:React.FC<Props> = ({isOpen, onClose ,title, body}) => {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      ) 
    
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
    
      return (
        <>
          
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>{body}</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ModalView
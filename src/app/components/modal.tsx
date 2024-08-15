import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import React from "react";
  import axios from "axios";
  
  type Props = {
    isOpen: boolean;
    onClose: () => void;
    noteId: string; 
    onDelete: (noteId: string) => void; 
    
  };
  
  const ModalClose: React.FC<Props> = ({ isOpen, onClose, noteId, onDelete }) => {
    const handleDelete = async () => {
      try {
        await axios.delete(`/api/notes/${noteId}`);
        onDelete(noteId); 
        onClose(); 
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    };
  
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent top="20%">
            <ModalHeader>Delete Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <p>Are you sure you want to delete this note?</p>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalClose;
  
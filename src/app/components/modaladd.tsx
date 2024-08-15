"use client";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLInputElement>;
  addNote: (note: any) => void;
}

const ModalFormAdd: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  addNote,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/notes", { title, body });
      console.log("Note created:", response.data);
      addNote(response.data);
      setTitle("");
      setBody("");
      onClose(); 
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Your Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <FormHelperText color="red">*must fill it in</FormHelperText>
                <Input
                  ref={initialRef}
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Note</FormLabel>
                <Textarea
                  placeholder="Notes"
                  height="150px"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="gray"
                mr={3}
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default ModalFormAdd;

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
  useDisclosure,
  Modal,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLInputElement>;
  noteId?: string; // Tambahkan ini untuk mengedit mode
  initialTitle?: string; // Tambahkan ini untuk mengedit mode
  initialBody?: string; // Tambahkan ini untuk mengedit mode
  onSave: (updatedNote: any) => void; // Callback setelah note berhasil diupdate
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  noteId, // Digunakan untuk mengedit mode
  initialTitle = "",
  initialBody = "",
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (noteId) {
        response = await axios.put(`/api/notes/${noteId}`, { title, body });
      } else {
        response = await axios.post("/api/notes", { title, body });
      }

      onSave(response.data); // Memanggil callback untuk memperbarui state di Home
      onClose(); // Tutup modal setelah berhasil menyimpan
    } catch (error) {
      console.error("Failed to save note:", error);
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
            <ModalHeader>{noteId ? "Edit Your Note" : "Add Your Note"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
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
              <Button colorScheme="gray" mr={3} type="submit" onClick={handleSubmit}>
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

export default ModalForm;

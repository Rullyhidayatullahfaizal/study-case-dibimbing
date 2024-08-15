"use client";
import { LampDemo } from "./components/ui/lamp";
import Card from "./components/card";
import ButtonChakra from "./components/ui/button";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Pagination from "./components/pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalFormAdd from "./components/modaladd";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Note[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 12; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const result = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(result);
      setCurrentPage(1); 
    } else {
      setSearchResult([]);
    }
  }, [search, notes]);

  const displayedNotes = search
    ? searchResult.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : notes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <>
      <LampDemo>
        {!isLoading && (
          <div>
            <div className="flex justify-between mt-20 mx-7">
              <div className="w-1/5 min-w-60">
                <InputGroup borderRadius={5} size="sm">
                  <InputLeftElement pointerEvents="none">
                    <Search2Icon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    className=""
                    color="white"
                    type="text"
                    placeholder="Search Judul..."
                    border="1px solid #949494"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputRightAddon p={0} border="none">
                    <Button
                      size="sm"
                      borderLeftRadius={0}
                      borderRightRadius={3.3}
                      border="1px solid #949494"
                    >
                      Search
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </div>
              {!search && (
                <div>
                  <ButtonChakra onClick={onOpen}>Add +</ButtonChakra>
                  <ModalFormAdd
                    isOpen={isOpen}
                    onClose={onClose}
                    initialRef={initialRef}
                    finalRef={finalRef}
                    addNote={addNote}
                  />
                </div>
              )}
            </div>

            <div className="mx-auto container pt-10 px-6">
              <div
                className={`grid ${
                  displayedNotes.length > 0
                    ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                } gap-6`}
              >
                {displayedNotes.length > 0 ? (
                  displayedNotes.map((note: Note) => (
                    <Card
                      key={note.id}
                      note={note}
                      onSave={updateNote}
                      onDelete={deleteNote}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    Tidak ada hasil ditemukan.
                  </div>
                )}
              </div>
            </div>

            {displayedNotes.length > 0 && (
              <div className="flex justify-center items-center mt-8">
                <Pagination
                  totalItems={search ? searchResult.length : notes.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={(page: number) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        )}
      </LampDemo>
    </>
  );
}


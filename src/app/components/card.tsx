"use client";
import { Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ModalForm from "./modalform";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import ModalClose from "./modal";

const Card = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <div className="rounded">
        <div className="w-full h-64 flex flex-col justify-between bg-gray-700 dark:bg-gray-700 dark:border-gray-700 rounded-lg border from-cyan-500 mb-6 py-5 px-4">
          <div>
            <h4 className="text-white dark:text-gray-100 font-bold mb-3">
              13 things to work on
            </h4>
            <p className="text-white dark:text-gray-100 text-sm">
              Our interior design experts work with you to create the space that
              you have been dreaming about.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-white dark:text-gray-100">
              <p className="text-sm">March 28, 2020</p>
              <div className="grid grid-flow-col gap-4">
                <button
                  className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300  focus:ring-black"
                  aria-label="edit note"
                  role="button"
                  onClick={onOpen}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pencil"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                  </svg>
                </button>
                <button onClick={onOpenDelete}>
                  <Icon as={DeleteIcon} boxSize={5}></Icon>
                </button>
                <button>
                    <Icon as={ViewIcon} boxSize={5}></Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
        />
        <ModalClose
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        />

      </div>
    </>
  );
};

export default Card;

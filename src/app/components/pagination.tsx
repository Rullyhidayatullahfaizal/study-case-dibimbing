"use client"
import React, { useState, useEffect } from "react";
import { Box, Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [pagesQuantity, setPagesQuantity] = useState<number>(0);

  useEffect(() => {
    const pagesTotal = Math.ceil(totalItems / itemsPerPage);
    setPagesQuantity(pagesTotal);
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagesQuantity) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: pagesQuantity }, (_, index) => (
      <Button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        bg={currentPage === index + 1 ? "blue.300" : "white"}
        mx={1}
      >
        {index + 1}
      </Button>
    ));
  };

  return (
    <Flex p={4} justifyContent="center" alignItems="center">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        aria-label="Previous Page"
      />
      <Flex mx={2}>{renderPageNumbers()}</Flex>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === pagesQuantity}
        aria-label="Next Page"
      />
    </Flex>
  );
};

export default Pagination;

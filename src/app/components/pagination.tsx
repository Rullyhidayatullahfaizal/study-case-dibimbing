"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [pagesQuantity, setPagesQuantity] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(1);

  useEffect(() => {
    const pagesTotal = Math.ceil(totalItems / itemsPerPage);
    setPagesQuantity(pagesTotal);
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurPage(page);
    if (onPageChange) onPageChange(page);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: pagesQuantity }, (_, index) => (
      <Button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        bg={curPage === index + 1 ? "blue.300" : "white"}
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
        onClick={() => handlePageChange(curPage - 1)}
        isDisabled={curPage === 1}
        aria-label="Previous Page"
      />
      <Flex mx={2}>{renderPageNumbers()}</Flex>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={() => handlePageChange(curPage + 1)}
        isDisabled={curPage === pagesQuantity}
        aria-label="Next Page"
      />
    </Flex>
  );
};

export default Pagination;

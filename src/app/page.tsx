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
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Pagination from "./components/pagination";

export default function Home() {
  return (
    <>
      <LampDemo>
        <div className="flex justify-between  mt-20 mx-7">
          <div className="w-1/5 ">
            <InputGroup borderRadius={5} size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.600" />}
              />
              <Input
                color="white"
                type="text"
                placeholder="Search Judul..."
                border="1px solid #949494"
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
          <div>
          <ButtonChakra  >Add +</ButtonChakra>
          </div>
        </div>
       
        <div className="mx-auto container pt-10 px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Pagination
            totalItems={10}
            itemsPerPage={2}
            onPageChange={(page: number) =>
              console.log("Page changed to:", page)
            }
          />
        </div>
      </LampDemo>
    </>
  );
}

import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

const ButtonChakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button colorScheme='gray' size='sm'  iconSpacing="6" w={20}>
    {children}
  </Button>
  )
}

export default ButtonChakra
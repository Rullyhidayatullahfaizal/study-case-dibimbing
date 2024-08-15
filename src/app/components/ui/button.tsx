import { Button  } from '@chakra-ui/react'
import React from 'react'

const ButtonChakra = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  return (
    <Button colorScheme='gray' size='sm' iconSpacing="6" w={20} onClick={onClick}>
      {children}
    </Button>
  )
}

export default ButtonChakra

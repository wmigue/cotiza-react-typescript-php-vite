import React from 'react'

interface Props{
   children: React.ReactElement
}
export default function ModalChild({children}:Props) {
  return (
    <div>
         {children}
    </div>
  )
}


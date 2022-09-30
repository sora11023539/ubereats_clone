import React from 'react'

// style
import { RoundButton } from "../shared_style";

export const CountDownButton = ({ onclick, isDisabled }) => {
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      -
    </RoundButton>
  )
}

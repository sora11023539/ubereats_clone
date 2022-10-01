import React from 'react'

// components
import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import { OrderButton } from "./Buttons/OrderButton";

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurantName,
  newRestaurantName,
  onClickSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
    >
      <DialogTitle>Start a new order?</DialogTitle>
      <DialogContent>
        <p>
          {
            `This order contains item ${existingRestaurantName} .
            Please add a new order and add item ${newRestaurantName}.`
          }
        </p>
        <OrderButton onClick={onClickSubmit}>A new order</OrderButton>
      </DialogContent>
    </Dialog>
  )
}

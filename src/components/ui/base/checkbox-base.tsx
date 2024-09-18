import React from "react";
import { Checkbox } from "../checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }) => (
  <Checkbox
    className="border-checkbox-border bg-checkbox-background checked:bg-checkbox-checked-background checked:border-checkbox-checked-border checked:text-checkbox-checked-icon"
    {...props}
  />
));

export default CheckboxBase;

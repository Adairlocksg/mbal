import { Button, ButtonProps } from "../button";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  icon?: React.ReactNode;
}

const LoadingButton = ({
  loading,
  children,
  icon,
  ...otherProps
}: LoadingButtonProps) => {
  return (
    <Button {...otherProps} disabled={loading}>
      {children}
      {!loading && !!icon ? icon : null}
      <Loader2Icon
        className={`h-4 w-4 mr-2 animate-spin ${loading ? "block" : "hidden"}`}
      />
    </Button>
  );
};

export default LoadingButton;

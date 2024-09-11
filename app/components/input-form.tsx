import { Input } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

type Props = ComponentProps<typeof Input> & {
  name: string;
};

export const InputForm = ({ name, ...rest }: Props) => {
  const formContextMethods = useFormContext();

  return <Input {...rest} {...formContextMethods.register(name)} />;
};

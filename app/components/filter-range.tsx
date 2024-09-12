import { WrapItem, Box, FormLabel, HStack, Divider } from "@chakra-ui/react";
import { InputForm } from "./input-form";

type Field = {
  name: string;
  placeholder: string;
};

type Props = {
  label: string;
  minFieldProps: Field;
  maxFieldProsp: Field;
};

export const FilterRange = ({ label, minFieldProps, maxFieldProsp }: Props) => {
  return (
    <WrapItem>
      <Box>
        <FormLabel>{label}</FormLabel>
        <HStack>
          <InputForm
            size={["sm", "md"]}
            name={minFieldProps.name}
            placeholder={minFieldProps.placeholder}
          />
          <Divider w={8} />
          <InputForm
            size={["sm", "md"]}
            name={maxFieldProsp.name}
            placeholder={maxFieldProsp.placeholder}
          />
        </HStack>
      </Box>
    </WrapItem>
  );
};

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Data = {
  label: string;
  value: string;
};

type Props = {
  data: Data[];
  placeholder?: string;
  name: string;
};

export const DropdownForm = ({ data, placeholder, name }: Props) => {
  const formContextMethods = useFormContext();
  const watchedValue = formContextMethods.watch(name);

  const onSelect = (item: Data) => {
    formContextMethods.setValue(name, {
      label: item.label,
      value: item.value,
    });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        size={["sm", "md"]}
      >
        {watchedValue?.label || placeholder}
      </MenuButton>
      <MenuList>
        {data.map((item) => (
          <MenuItem key={item.value} onClick={() => onSelect(item)}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

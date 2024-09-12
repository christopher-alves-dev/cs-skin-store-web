import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FilterFormData } from "../hooks/use-filter-form/schema";
import { FindAllParams } from "../services/api/items/types";
import { categoryOptions, sortOptions } from "../utils";
import { parseParams } from "../utils/parse-params";
import { DropdownForm } from "./dropdown-form";
import { FilterRange } from "./filter-range";
import { InputForm } from "./input-form";

type Props = {
  onRequestFetchItems: (params: FindAllParams) => void;
};

export const FiltersBlock = ({ onRequestFetchItems }: Props) => {
  const formContextMethods = useFormContext();
  const onSubmit: SubmitHandler<FilterFormData> = (formValues) => {
    const params = parseParams(formValues);
    onRequestFetchItems(params);
  };

  return (
    <VStack>
      <Wrap spacing={4} w="100%">
        <DropdownForm
          data={categoryOptions}
          name="category"
          placeholder="Todos os itens"
        />
        <WrapItem as="div" w="100%" maxW={400}>
          <InputForm
            name="name"
            placeholder="Procurar skin pelo nome"
            size={["sm", "md"]}
          />
        </WrapItem>
        <DropdownForm
          data={sortOptions.types}
          name="orderBy"
          placeholder="Ordenar por"
        />
        <DropdownForm
          data={sortOptions.directions}
          name="orderDirection"
          placeholder="Ordem"
        />
        <WrapItem>
          <Button
            colorScheme="blue"
            size={["sm", "md"]}
            onClick={formContextMethods.handleSubmit(onSubmit)}
          >
            Pesquisar
          </Button>
        </WrapItem>
      </Wrap>
      <Accordion allowToggle w="100%">
        <AccordionItem>
          {({ isExpanded }) => {
            return (
              <>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      <Text as="span">Filtros avançados</Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Wrap spacing={4}>
                    <FilterRange
                      label="Preço"
                      minFieldProps={{
                        name: "price.min",
                        placeholder: "Preço (min)",
                      }}
                      maxFieldProsp={{
                        name: "price.max",
                        placeholder: "Preço (max)",
                      }}
                    />
                    <FilterRange
                      label="Float"
                      minFieldProps={{
                        name: "float.min",
                        placeholder: "Float (min)",
                      }}
                      maxFieldProsp={{
                        name: "float.max",
                        placeholder: "Float (max)",
                      }}
                    />
                  </Wrap>
                </AccordionPanel>
              </>
            );
          }}
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

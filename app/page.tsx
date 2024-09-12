"use client";

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  FormLabel,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { DropdownForm } from "./components";
import { InputForm } from "./components/input-form";
import { ItemCard } from "./components/item-card";
import { useFetchItems } from "./hooks/use-fetch-items";
import { useFilterForm } from "./hooks/use-filter-form";
import { FilterFormData } from "./hooks/use-filter-form/schema";
import { categoryOptions, sortOptions } from "./utils";
import { parseParams } from "./utils/parse-params";

export default function Home() {
  const { items, error, loading, fetchItems } = useFetchItems();
  const { formMethods } = useFilterForm();

  const onSubmit: SubmitHandler<FilterFormData> = async (formValues) => {
    console.log({ formValues });
    const params = parseParams(formValues);
    console.log({ params });
    await fetchItems(params);
  };

  if (loading) return <Spinner size="xl" color="teal.500" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <FormProvider {...formMethods}>
      <Container maxW="8xl" p={8}>
        <VStack>
          <Wrap spacing={4}>
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
                onClick={formMethods.handleSubmit(onSubmit)}
              >
                Pesquisar
              </Button>
            </WrapItem>
          </Wrap>
          <Divider />
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
                        <WrapItem>
                          <Box>
                            <FormLabel>Preço</FormLabel>
                            <HStack>
                              <InputForm
                                size={["sm", "md"]}
                                name="price.min"
                                placeholder="Preço (min)"
                              />
                              <Divider w={8} />
                              <InputForm
                                size={["sm", "md"]}
                                name="price.max"
                                placeholder="Preço (max)"
                              />
                            </HStack>
                          </Box>
                        </WrapItem>
                        <WrapItem>
                          <Box>
                            <FormLabel>Float</FormLabel>
                            <HStack>
                              <InputForm
                                size={["sm", "md"]}
                                name="float.min"
                                placeholder="Float (min)"
                              />
                              <Divider w={8} />
                              <InputForm
                                size={["sm", "md"]}
                                name="float.max"
                                placeholder="Float (max)"
                              />
                            </HStack>
                          </Box>
                        </WrapItem>
                      </Wrap>
                    </AccordionPanel>
                  </>
                );
              }}
            </AccordionItem>
          </Accordion>
        </VStack>

        <Stack spacing={8} p={5}>
          <Heading as="h1" size="lg">
            Lista de Itens
          </Heading>
          {!items.length ? (
            <Text>Nenhum item encontrado.</Text>
          ) : (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
              spacing={8}
            >
              {items.map((item) => {
                return <ItemCard key={item.id} data={item} />;
              })}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </FormProvider>
  );
}

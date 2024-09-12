"use client";

import {
  Image,
  Text,
  Stack,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  SimpleGrid,
  Container,
  Button,
  Wrap,
  WrapItem,
  Divider,
  Box,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

import { sortOptions, categoryOptions } from "./utils";
import { useFetchItems } from "./hooks/use-fetch-items";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { InputForm } from "./components/input-form";
import { useFilterForm } from "./hooks/use-filter-form";
import { DropdownForm } from "./components";
import { FilterFormData } from "./hooks/use-filter-form/schema";
import { parseParams } from "./utils/parse-params";
import { parseToCurrency } from "./utils/parse-to-currency";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

export default function Home() {
  const { items, error, loading, fetchItems } = useFetchItems();
  const { formMethods } = useFilterForm();

  // console.log({ errors: formMethods.formState.errors });
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
                return (
                  <Card
                    key={item.id}
                    shadow="md"
                    borderWidth="2px"
                    borderColor="blackAlpha.300"
                    rounded="lg"
                  >
                    <CardBody>
                      <Box
                        display="flex"
                        flexDir="column"
                        gap={4}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack w="100%">
                          <Heading as="h4" size="sm">
                            {item.name}
                          </Heading>
                          <Text fontSize="sm" color="darkslategray">
                            {item.category}
                          </Text>
                        </Stack>
                        <Image
                          flex="1"
                          objectFit="contain"
                          src={item.image}
                          alt={item.name}
                          borderRadius="md"
                        />
                        <Stack spacing={2} w="100%">
                          <Text textAlign="center">
                            {parseToCurrency(item.price)}
                          </Text>

                          {!!item.float && (
                            <>
                              <Box
                                display="flex"
                                flexDirection="column"
                                position="relative"
                                pt={2.5}
                              >
                                <TriangleDownIcon
                                  fontSize={10}
                                  position="absolute"
                                  top={0}
                                  left={`${Number(item.float) * 100}%`}
                                  transform="translateX(-50%)"
                                />
                                <HStack
                                  w="100%"
                                  h={2}
                                  spacing={0}
                                  borderRadius="99"
                                  overflow="hidden"
                                >
                                  <Box bg="darkgreen" w="7%" h="inherit" />
                                  <Box bg="green" w="8%" h="inherit" />
                                  <Box bg="yellow" w="22.99%" h="inherit" />
                                  <Box bg="coral" w="7%" h="inherit" />
                                  <Box bg="red" w="57.58%" h="inherit" />
                                </HStack>
                              </Box>
                              <Text textAlign="center" fontSize={"small"}>
                                float: {item.float}
                              </Text>
                            </>
                          )}
                        </Stack>
                      </Box>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </FormProvider>
  );
}

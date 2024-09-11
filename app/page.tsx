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
} from "@chakra-ui/react";

import { sortOptions, categoryOptions } from "./utils";
import { useFetchItems } from "./hooks/use-fetch-items";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { InputForm } from "./components/input-form";
import { useFilterForm } from "./hooks/use-filter-form";
import { DropdownForm } from "./components";
import { FilterFormData } from "./hooks/use-filter-form/schema";
import { parseParams } from "./utils/parse-params";

export default function Home() {
  const { items, error, loading, fetchItems } = useFetchItems();
  const { formMethods } = useFilterForm();

  const onSubmit: SubmitHandler<FilterFormData> = async (formValues) => {
    const params = parseParams(formValues);
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
        <Wrap spacing={4}>
          <DropdownForm
            data={categoryOptions}
            name="category"
            placeholder="Todos os itens"
          />
          <WrapItem as="div" className="w-full" maxW={400}>
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
        <Stack spacing={8} p={5}>
          <Heading as="h1" size="xl" mb={5}>
            Lista de Itens
          </Heading>
          {items.length === 0 ? (
            <Text>Nenhum item encontrado.</Text>
          ) : (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
              spacing={8}
            >
              {items.map((item) => (
                <Card key={item.id} shadow="md" borderWidth="1px" rounded="lg">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Stack className="w-full">
                        <Heading as="h4" size="sm">
                          {item.name}
                        </Heading>
                        <Text fontSize="sm" color="darkslategray">
                          {item.category}
                        </Text>
                      </Stack>
                      <Image
                        boxSize="160px"
                        objectFit="cover"
                        src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7duJhJKCmePnJ6nUl2Zu5Mx2gv2P9o-t21fj-RI_Nz2ncYbDcFNoYArYrgDql-3m08PptcjBn3tgs3Yis2GdwUJr9IfvpA/"
                        alt={item.name}
                        borderRadius="md"
                      />
                      <Stack spacing={2} className="w-full">
                        <Text>Preço: R$ {item.price.toFixed(2)}</Text>
                        <Text>Float: {item.float || "N/A"}</Text>
                      </Stack>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </FormProvider>
  );
}

"use client";

import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FormProvider } from "react-hook-form";
import { FiltersBlock } from "./components/filters-block";
import { ItemCard } from "./components/item-card";
import { useFetchItems } from "./hooks/use-fetch-items";
import { useFilterForm } from "./hooks/use-filter-form";

export default function Home() {
  const { fetchItems, isEmptyList, items, isLoading, isFiltering } =
    useFetchItems();
  const { formMethods } = useFilterForm();
  const isLoadingItems = isLoading || isFiltering;

  return (
    <FormProvider {...formMethods}>
      <Container maxW="8xl" p={8}>
        <FiltersBlock onRequestFetchItems={fetchItems} />

        <Stack spacing={8} p={5}>
          <Heading as="h1" size="lg">
            Lista de Itens
          </Heading>

          {isLoadingItems ? (
            <Center>
              <Stack align="center" spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text fontSize="lg">Carregando Skins</Text>
              </Stack>
            </Center>
          ) : isEmptyList ? (
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

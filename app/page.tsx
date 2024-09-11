"use client";

import { useEffect, useState } from "react";
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
  Input,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { itemsApi } from "./services/items";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  float?: string;
  price: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch de itens no carregamento da página
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await itemsApi.index(); // URL do backend
        const data = await res.json();
        if (res.ok) {
          setItems(data); // Setando os itens recebidos
        } else {
          setError("Erro ao buscar os itens");
        }
      } catch (error) {
        console.log({ error });
        setError("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <Spinner size="xl" color="teal.500" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Container maxW="8xl" p={8}>
      <HStack>
        <Input placeholder="Procurar skin pelo nome" maxW={400} />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Ordenar por
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
        <Button colorScheme="blue">Pesquisar</Button>
      </HStack>
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
  );
}

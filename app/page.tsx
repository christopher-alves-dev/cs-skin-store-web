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
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { itemsApi } from "./services/api/items";
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
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await itemsApi.index();
        console.log({ res: res.data });

        setItems(res.data);
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
      <Wrap spacing={4}>
        <WrapItem as="div" className="w-full" maxW={400}>
          <Input placeholder="Procurar skin pelo nome" size={["sm", "md"]} />
        </WrapItem>
        <WrapItem>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              size={["sm", "md"]}
            >
              {orderBy || "Ordenar por"}
            </MenuButton>
            <MenuList onChange={(e) => console.log({ e })}>
              <MenuItem onClick={() => setOrderBy("price")}>Preço</MenuItem>
              <MenuItem onClick={() => setOrderBy("float")}>
                Float (Desgaste)
              </MenuItem>
            </MenuList>
          </Menu>
        </WrapItem>
        <WrapItem>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              size={["sm", "md"]}
            >
              {orderDirection || "Ordem"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setOrderDirection("asc")}>
                Crescente
              </MenuItem>
              <MenuItem onClick={() => setOrderDirection("desc")}>
                Decrescente
              </MenuItem>
            </MenuList>
          </Menu>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="blue" size={["sm", "md"]}>
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
  );
}

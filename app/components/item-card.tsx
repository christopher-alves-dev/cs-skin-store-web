import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { parseToCurrency } from "../utils/parse-to-currency";

type Item = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  float?: string;
};

type Props = {
  data: Item;
};

export const ItemCard = ({ data }: Props) => {
  return (
    <Card
      key={data.id}
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
          h="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack w="100%">
            <Heading as="h4" size="sm">
              {data.name}
            </Heading>
            <Text fontSize="sm" color="darkslategray">
              {data.category}
            </Text>
          </Stack>
          <Image
            objectFit="contain"
            src={data.image}
            alt={data.name}
            borderRadius="md"
          />
          <Stack spacing={2} w="100%">
            <Text textAlign="center">{parseToCurrency(data.price)}</Text>

            {!!data.float && (
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
                    left={`${Number(data.float) * 100}%`}
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
                  float: {data.float}
                </Text>
              </>
            )}
          </Stack>
        </Box>
      </CardBody>
    </Card>
  );
};

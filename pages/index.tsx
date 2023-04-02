import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', { prompt });
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error(error);
      alert('Error generating image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">
          AI Image Generator
        </Heading>
        <Box>
          <FormControl id="image-description">
            <FormLabel>Enter image description</FormLabel>
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Image description"
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={generateImage}
            isLoading={loading}
          >
            Generate Image
          </Button>
        </Box>
        {loading && (
          <Box>
            <Spinner size="xl" />
            <Text>Loading...</Text>
          </Box>
        )}
        {imageUrl && (
          <Box>
            <Heading as="h2" size="lg">
              Generated Image
            </Heading>
            <Image src={imageUrl} alt="Generated" borderRadius="md" mt={4} />
          </Box>
        )}
      </VStack>
    </Container>
  );
}

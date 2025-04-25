import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../lib/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });
  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        <Heading fontSize='4xl' mb={6}>
          Create an account
        </Heading>
        <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
          {isError && (
            <Box mb={3} color='red.400'>
              {error?.message || 'An error occurred'}
            </Box>
          )}
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
            </FormControl>

            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Text color='text.muted' fontSize='xs' textAlign='left' mt={2}>
                - Must be at least 6 characters long.
              </Text>
            </FormControl>

            <FormControl id='confirmPassword'>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  createAccount({ email, password, confirmPassword })
                }
              />
            </FormControl>

            <Button
              my={2}
              isLoading={isPending}
              isDisabled={
                !email || password.length < 6 || password !== confirmPassword
              }
              onClick={() =>
                createAccount({ email, password, confirmPassword })
              }
            >
              Create Account
            </Button>

            <Text align='center' fontSize='sm' color='text.muted'>
              Already have an account?{' '}
              <ChakraLink as={Link} to='/login'>
                Sign in
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};
export default Register;

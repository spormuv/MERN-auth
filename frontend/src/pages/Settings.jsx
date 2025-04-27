import { Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import SessionCard from '../components/SessionCard';
import useSessions from '../hookes/useSessions';

const Settings = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();

  return (
    <Container mt={16}>
      <Heading mb={6}>My Sessions</Heading>
      {isPending && <Spinner />}
      {isError && <Text color='red.400'>Failed to get sessions</Text>}
      {isSuccess && (
        <VStack spacing={3} align='flex-start'>
          {sessions.map(session => (
            <SessionCard key={session._id} session={session} />
          ))}
        </VStack>
      )}
    </Container>
  );
};
export default Settings;

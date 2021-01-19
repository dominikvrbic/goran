import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { useAsync } from 'react-use';
import { Link } from 'react-router-dom';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import { sUsers } from '../api/github.api';

export const Users = () => {
  const [search, setsearch] = useState('');

  const { loading, value, error } = useAsync(() => {
    return sUsers(search);
  }, [search]);
  return (
    <div>
      users
      <Input
        placeholder="Basic usage"
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      {value?.total_count}
      {!loading && (
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {value?.items.map((item) => (
            <GridItem
              as={Link}
              to={`/user/${item.login}`}
              rowSpan={2}
              colSpan={1}
              bg="tomato"
            >
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {item.login}
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </div>
  );
};

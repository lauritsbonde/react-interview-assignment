import {Box, Heading} from '@chakra-ui/react';
import React from 'react';
import Accordion from './components/Accordion';

function Page() {
	return (
		<Box width="100dvw" height="100dvh">
			<Heading size="2xl" textAlign="center" marginY={12}>
				Users
			</Heading>

			<Accordion />
		</Box>
	);
}

export default Page;

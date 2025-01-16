'use client';

import React from 'react';
import {SingleUser} from '@/app/types/types';
import {useQuery} from '@tanstack/react-query';
import {usePathname} from 'next/navigation';
import {Avatar, Box, Container, Flex, Heading, Link, Text, Skeleton, SkeletonCircle} from '@chakra-ui/react';
import {default as NXTLink} from 'next/link';

const page = () => {
	const pathname = usePathname();

	const {isPending, error, data} = useQuery({
		queryKey: [`user-${pathname}`],
		queryFn: async () => {
			const response = await fetch(`https://reqres.in/api/users/${pathname.split('/').at(-1)}`);
			return (await response.json()) as SingleUser;
		},
	});

	if (isPending) {
		return (
			<Container padding={4}>
				<Flex gap={4} alignItems="center">
					<SkeletonCircle size="24" />
					<Box>
						<Skeleton height="24px" width="200px" marginBottom={2} />
						<Skeleton height="16px" width="150px" />
					</Box>
				</Flex>

				<Box marginTop={8}>
					<Skeleton height="16px" marginBottom={2} />
					<Skeleton height="16px" width="300px" />
				</Box>
			</Container>
		);
	}

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<Container padding={4}>
			<Flex gap={4} alignItems="center">
				<Avatar src={data.data.avatar} size="xl" />
				<Box>
					<Heading size="2xl">
						{data.data.first_name} {data.data.last_name}
					</Heading>
					<Link as={NXTLink} href={`mailto:${data.data.email}`} color="blue">
						{data.data.email}
					</Link>
				</Box>
			</Flex>

			<Box marginTop={8}>
				<Text>{data.support.text}</Text>
				<Link as={NXTLink} href={data.support.url} color="blue" isExternal>
					{data.support.url}
				</Link>
			</Box>
		</Container>
	);
};

export default page;

'use client';

import React, {useState} from 'react';
import {AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Container, Avatar, Stack, Text, Accordion as CHAccordion, Flex, Skeleton, SkeletonCircle, Link} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {default as NXTLink} from 'next/link';
import {AllUsers} from '../types/types';
import Pagination from './Pagination';

const Accordion = () => {
	const [page, setPage] = useState<number>(0);
	const [pages, setPages] = useState<number>(0);

	const {isPending, error, data} = useQuery({
		queryKey: [`users-${page === 0 ? 1 : page}`],
		queryFn: async () => {
			const url = page ? `https://reqres.in/api/users?page=${page}` : `https://reqres.in/api/users`;
			const response = await fetch(url);
			const data = (await response.json()) as AllUsers;

			setPage(data.page);
			setPages(data.total_pages);

			return data;
		},
	});

	if (isPending) {
		return (
			<Container>
				<CHAccordion>
					{Array.from({length: 6}).map((_, index) => (
						<AccordionItem key={index}>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" justifyContent="space-between">
									<Box display="flex" alignItems="center" gap={2}>
										<SkeletonCircle size="12" />
										<Skeleton height="16px" width="100px" />
									</Box>
									<AccordionIcon />
								</Box>
							</AccordionButton>
							<AccordionPanel pb={4}>
								<Stack spacing={4}>
									<Flex gap={1}>
										<Skeleton height="16px" width="80px" />
										<Skeleton height="16px" width="150px" />
									</Flex>
									<Flex gap={1}>
										<Skeleton height="16px" width="80px" />
										<Skeleton height="16px" width="150px" />
									</Flex>
									<Flex gap={1}>
										<Skeleton height="16px" width="80px" />
										<Skeleton height="16px" width="200px" />
									</Flex>
								</Stack>
							</AccordionPanel>
						</AccordionItem>
					))}
				</CHAccordion>
			</Container>
		);
	}

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<Container>
			<CHAccordion allowToggle>
				{data.data.map((user) => {
					return (
						<AccordionItem key={user.id}>
							<AccordionButton _expanded={{fontWeight: 600}}>
								<Box as="span" flex="1" textAlign="left" display="flex" alignItems="center" justifyContent="space-between">
									<Box display="flex" alignItems="center" gap={2}>
										<Avatar name={user.first_name} src={user.avatar} />
										{user.first_name}
									</Box>
									<AccordionIcon />
								</Box>
							</AccordionButton>
							<AccordionPanel pb={4}>
								<Stack>
									<Text fontWeight={600}>
										First name:{' '}
										<Link href={`/profile/${user.id}`} style={{cursor: 'hover'}} as={NXTLink} color={'blue'} fontWeight={400}>
											{user.first_name}
										</Link>
									</Text>
									<Text fontWeight={600}>
										Last name:{' '}
										<Text as="span" fontWeight={400}>
											{user.last_name}
										</Text>
									</Text>
									<Text fontWeight={600}>
										Email:{' '}
										<Text as="span" fontWeight={400}>
											{user.email}
										</Text>
									</Text>
								</Stack>
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</CHAccordion>

			<Pagination
				page={page}
				pages={pages}
				handlePage={(page) => {
					if (page <= 0) {
						console.error('Page is less than 0');
						return;
					} else if (page > pages) {
						console.error('Page is greater than available pages');
						return;
					}
					setPage(page);
				}}
			/>
		</Container>
	);
};

export default Accordion;

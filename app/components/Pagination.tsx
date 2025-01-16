'use client';

import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Button, ButtonGroup, Container} from '@chakra-ui/react';
import React, {FC, useMemo} from 'react';

interface PaginationProps {
	page: number;
	pages: number; //max page
	handlePage: (shift: number) => void;
}

const Pagination: FC<PaginationProps> = ({page, pages, handlePage}) => {
	if (pages < 1) return null;

	const pageButtons = useMemo(() => {
		return new Array(pages).fill(0).map((_, idx) => idx + 1);
	}, [pages]);

	return (
		<Container width="100%" display="flex" justifyContent="space-between" mt={4} gap={4}>
			<Button size="sm" onClick={() => handlePage(page - 1)} isDisabled={page <= 1}>
				<ChevronLeftIcon />
			</Button>
			<ButtonGroup width="fit-content" isAttached>
				{pageButtons.map((pb) => {
					return (
						<Button size="sm" onClick={() => handlePage(pb)} mx={1} scale={page === pb ? 2 : 1} key={pb} fontWeight={pb === page ? 700 : 400}>
							{pb}
						</Button>
					);
				})}
			</ButtonGroup>
			<Button
				size="sm"
				onClick={() => {
					handlePage(page + 1);
				}}
				isDisabled={page >= pages}>
				<ChevronRightIcon />
			</Button>
		</Container>
	);
};

export default Pagination;

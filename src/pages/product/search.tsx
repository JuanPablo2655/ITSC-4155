import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Item } from '~/components/item';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';
import { api } from '~/utils/api';
import type { Item as ItemProp } from '@prisma/client';
import type { ModularFeedResponse } from '~/lib/types';
import useResizeObserver from 'use-resize-observer';
import { chunk } from '~/lib/utils';
import { Footer } from '~/components/footer';

type possibleQuery = string | undefined;
type possibleCategory = 'TEXTBOOKS' | 'ELECTRONICS' | 'CLOTHING' | 'ESSENTIALS' | 'FURNITURE' | 'OTHER' | undefined;

export default function Search() {
	const { query } = useRouter();
	const [width, setWidth] = useState<number>(0);
	const { ref, width: _width } = useResizeObserver<HTMLDivElement>({
		onResize: ({ width }) => {
			setWidth(width ?? 0);
		},
	});
	useEffect(() => {
		if (_width) {
			setWidth(_width);
		}
	}, [_width]);
	const raw = Math.floor(width / 256) - 1;
	const itemsPerRow = raw === 0 ? 1 : raw;
	const originalItems = null;
	// api.item.getItemMatchList.useQuery({
	// 	input: query.q as possibleQuery,
	// 	category: (query.c as possibleCategory)?.toUpperCase() as possibleCategory,
	// });
	const [looseTileItems, setLooseTileItems] = useState<ItemProp[]>([]);
	useEffect(() => {
		const fetchLooseTiles = async () => {
			try {
				let response = null;
				let offerUpCat = 0;
				if (offerUpCat != 0) {
					switch (query.c) {
						case 'essentials':
							offerUpCat = 2.2;
							break;
						case 'furniture':
							offerUpCat = 2.1;
							break;
						case 'electronics':
							offerUpCat = 1;
							break;
						case 'clothing':
							offerUpCat = 4;
							break;
						default:
							query.q = query.c?.toString();
							break;
					}
					console.log(offerUpCat + 'first');

					if (offerUpCat != 0) {
						console.log(offerUpCat + 'first');
						response = await axios.post<ModularFeedResponse>('/api/thirdParty/offerUpListingCategories', {
							zipcode: '28213',
							category: '1', //offerUpCat ?? null,
						});
					} else {
						response = await axios.post<ModularFeedResponse>('/api/thirdParty/offerUpListingSearch', {
							searchQuery: query.q as possibleQuery,
							zipcode: '28213',
						});
					}
					console.log(offerUpCat + 'second');
				} else {
					response = await axios.post<ModularFeedResponse>('/api/thirdParty/offerUpListingSearch', {
						searchQuery: query.q as possibleQuery,
						zipcode: '28213',
					});
				}
				//console.log(response);
				const { data } = response;
				setLooseTileItems(
					data.data.modularFeed.looseTiles.slice(0, 50).map(
						tile =>
							({
								id: parseInt(tile.listing.listingId),
								title: tile.listing.title,
								slug: 'https://offerup.com/item/detail/' + tile.listing.listingId,
								category: 'OTHER',
								price: parseFloat(tile.listing.price),
								description: 'Description not available',
								images: [tile.listing.image.url],
								location: tile.listing.locationName,
								institution: 'OfferUp',
								condition: 'Description not available',
								createdAt: new Date(),
								updatedAt: new Date(),
								visits: 0,
								UniqueVisits: 0,
								createdById: 'default-user',
							}) as ItemProp,
					),
				);
			} catch (error) {
				console.error('Failed to fetch loose tiles:', error);
			}
		};

		if (query.q) {
			void fetchLooseTiles();
		}
	}, [query.q]);

	// if (originalItems.isLoading) return <div>Loading...</div>;
	// if (originalItems.isError) return <div>Error: {originalItems.error.message}</div>;
	// if (!originalItems.data) return <div>No data</div>;

	//const combinedItems = [...(originalItems.data || []), ...looseTileItems];
	const combinedItems = [...looseTileItems];
	const rows = chunk(combinedItems, itemsPerRow);
	return (
		<div className="relative flex flex-col">
			<SiteHeader />
			<h1 className="text-center">Searching for {query.q}</h1>
			<div className="flex gap-10">
				<SiteSideBar query={query.q as possibleQuery} />
				<div ref={ref} className="flex w-full justify-center">
					<div className="flex flex-col gap-7">
						{rows.map((row, i) => (
							<div key={i} className="flex gap-7">
								{row.map(item => (
									<Item key={item.id} {...item} />
								))}
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

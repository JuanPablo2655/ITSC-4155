import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import type { Item } from '@prisma/client';
import Link from 'next/link';
import { formatLocation } from '~/lib/utils';

export function Item({ title, images, price, location, slug }: Item) {
	if (!slug.startsWith('https')) {
		slug = '/product/' + slug;
	}

	return (
		<div className="flex max-w-64 flex-col">
			<Link className="flex w-64 flex-col" target={slug.startsWith('https') ? '_blank' : '_self'} href={`${slug}`}>
				<AspectRatio ratio={1 / 1} className="bg-muted">
					<Image
						src={images[0] ?? 'https://i.imgur.com/G4f21Ai.jpeg'}
						alt={title}
						fill
						className="rounded-md object-cover"
					/>
				</AspectRatio>
				<h4 className="mt-2 font-semibold leading-none text-zinc-950 dark:text-white">${price}</h4>
				<p className="truncate leading-7 text-zinc-950 dark:text-white">{title}</p>
				{slug.startsWith('https') ? (
					<div className="mt-1 flex">
						<small className="text-sm font-medium leading-none text-zinc-950/50 dark:text-white/50">OfferUp</small>
						<Image className="-mt-1" src="/icon_external.svg" alt="" height={20} width={20} />
					</div>
				) : (
					<small className="text-sm font-medium leading-none text-zinc-950/50 dark:text-white/50">
						{formatLocation(location)}
					</small>
				)}
			</Link>
		</div>
	);
}

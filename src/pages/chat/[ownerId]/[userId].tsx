import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ChatComponentWithId from '~/components/chatComponentWithId';
import { SiteHeader } from '~/components/site-header';
import { Footer } from '~/components/footer';
import { api } from '~/utils/api';

export default function ChatPage() {
	const router = useRouter();
	const ownerId = Array.isArray(router.query.ownerId) ? router.query.ownerId[0] : router.query.ownerId!;
	const userId = router.query.userId as string;

	// Assuming userId is always a string
	// const ownerName = router.query.ownerName as string;
	// const userName = router.query.userName as string;
	const { data: session, status } = useSession();

	const sessionUserName = api.user.getUserNameById.useQuery(userId);
	const otherName = api.user.getUserNameById.useQuery(ownerId ?? '');

	if (status === 'loading') {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-lg font-semibold">Loading...</div>
			</div>
		);
	}

	if (!session || session.user.id !== userId) {
		return (
			<div className="flex min-h-screen items-center justify-center text-lg font-bold text-red-500">
				Access Denied. You shouldn&apos;t be here bud
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col ">
			<SiteHeader />
			<div className="flex-grow p-4">
				<h1 className="mb-4 text-2xl font-bold text-gray-700">Chat with the Seller</h1>
				<div className="mb-6 rounded-lg bg-white p-4 shadow">
					<h1 className="text-xl font-semibold text-gray-800">Chat with: {otherName.data?.name}</h1>
					<p className="text-gray-600">Chatting as: {sessionUserName.data?.name}</p>
				</div>
				{userId && ownerId && <ChatComponentWithId userId={userId} otherUserId={ownerId} />}
			</div>
			<p className="">
				<iframe
					className="m-auto w-[80%] rounded"
					height="600"
					src="https://maps.uncc.edu/#/?nav=plds&amp;ctr=35.30709,-80.73270000000002&amp;z=17"
				></iframe>
			</p>
			<Footer />
		</div>
	);
}

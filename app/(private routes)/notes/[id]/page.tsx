import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchServerNoteById } from "@/lib/api/serverApi";


type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { id } = await params;

  const note = await fetchServerNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: `${note.content.slice(0, 30)}...`,

    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'website',
    },
  }
}

export default async function NoteDetailsPage({ params }: Props) {

const { id } = await params;

const queryClient = new QueryClient();

await queryClient.prefetchQuery({
  queryKey: ["notes", id],
  queryFn: () => fetchServerNoteById(id),
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
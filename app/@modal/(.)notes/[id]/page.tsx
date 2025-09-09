import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import NotePreviewClient from "./NotePreview.client";
import { fetchServerNoteById } from "@/lib/api/serverApi";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({
  params }: Props) {
  
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient/>
    </HydrationBoundary>
  );
}
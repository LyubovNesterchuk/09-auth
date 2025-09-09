import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

// -- Auth ------------------

export const checkServerSession = async () => {
  
  const cookieStore = await cookies();
  
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
  return res;
};

// ------------------ User ------------------

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

export const updateServerMe = async (payload: Partial<User>): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.patch<User>("/users/me", payload, {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

// ------------------ Notes ------------------

export const getServerNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};




// export const getServerMe = async (): Promise<User> => {

//   const cookieStore = await cookies();

//   const { data } = await nextServer.get('/auth/me', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return data;
// };

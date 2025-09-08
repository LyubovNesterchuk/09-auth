import { NewNote, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  search: string,
  page = 1,
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    search,
    page,
    perPage,
  };

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const updateNote = async (
  noteId: string,
  updatedNote: Partial<NewNote>
): Promise<Note> => {
  const { data } = await nextServer.patch<Note>(`/notes/${noteId}`, updatedNote);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

// ------------------ Auth ------------------

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const { data: user } = await nextServer.post<User>("/auth/register", data);
  return user;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const { data: user } = await nextServer.post<User>("/auth/login", data);
  return user;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

// Перевірка сесії (true = активна)
export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get("/auth/session");
    return res.status === 200;
  } catch (error: any) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      return false;
    }
    throw error;
  }
};

// ------------------ User ------------------

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
};

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// };

// export const fetchNotes = async (
//   search: string,
//   page = 1,
//   perPage = 12,
//   tag?: string
// ): Promise<FetchNotesResponse> => {
//   const params: Record<string, string | number> = {
//     search,
//     page,
//     perPage,
//     };
    
//   if (tag && tag !== "all") {
//     params.tag = tag;
//     }
    
//   const response = await nextServer.get<FetchNotesResponse>("/notes", {
//     params,
//   });

//   return response.data;
  
// };

// export const createNote = async (
//   newNote: NewNote): Promise<Note> => {
//   const response = await nextServer.post<Note>("/notes", newNote);
//   return response.data;
// };

// export const deleteNote = async (noteId: string): Promise<Note> => {
//   const response = await nextServer.delete<Note>(`/notes/${noteId}`);
//   return response.data;
// };

// export const fetchNoteById = async (noteId: string): Promise<Note> => {
//   const response = await nextServer.get<Note>(`/notes/${noteId}`);
//   return response.data;
// };


// // ----------------------------------------------------
// export type RegisterRequest = {
//   email: string;
//   password: string;
//   userName: string;
// };


// export const register = async (data: RegisterRequest) => {
//   const res = await nextServer.post<User>('/auth/register', data);
//   return res.data;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// export const login = async (data: LoginRequest) => {
//   const res = await nextServer.post<User>('/auth/login', data);
//   return res.data;
// };

// type CheckSessionRequest = {
//   success: boolean;
// };

// export const checkSession = async () => {
//   const res = await nextServer.get<CheckSessionRequest>('/auth/session');
//   return res.data.success;
// };

// export const getMe = async () => {
//   const { data } = await nextServer.get<User>('/auth/me');
//   return data;
// };

// export const logout = async (): Promise<void> => {
//   await nextServer.post('/auth/logout')
// };

// export type UpdateUserRequest = {
//   userName?: string;
//   photoUrl?: string;
// };

// export const updateMe = async (payload: UpdateUserRequest) => {
//   const res = await nextServer.put<User>('/auth/me', payload);
//   return res.data;
// };

// export const uploadImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', file);
//   const { data } = await nextServer.post('/upload', formData);
//   return data.url;
// };

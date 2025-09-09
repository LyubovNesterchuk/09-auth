export interface Note{
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string,
}

export interface NewNote {
  title: string,
  content: string,
  tag: string,
};

// export type NoteTag =
//   | "Work"
//   | "Personal"
//   | "Meeting"
//   | "Shopping"
//   | "Ideas"
//   | "Travel"
//   | "Finance"
//   | "Health"
//   | "Important"
//   | "Todo";

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
//   tag: NoteTag;
// }

// export interface NewNote {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;  // ISO-строка
//   updatedAt: string;  // ISO-строка
//   userId: string;
//   tag: 
//     | "Work"
//     | "Personal"
//     | "Meeting"
//     | "Shopping"
//     | "Ideas"
//     | "Travel"
//     | "Finance"
//     | "Health"
//     | "Important"
//     | "Todo";
// };

// export type NewNote = {
//   title: string;
//   content: string;
//   tag: Note["tag"];
// };
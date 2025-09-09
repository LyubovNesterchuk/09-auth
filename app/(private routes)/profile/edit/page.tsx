"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUsername(user.username ?? "");
          setEmail(user.email ?? "");
          setAvatar(user.avatar ?? "/default-avatar.png");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: any = {};
      if (username) payload.username = username;
      if (email) payload.email = email;

      await updateMe(payload);
      router.push("/profile");
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  const handleCancel = () => router.push("/profile");

  if (loading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar ? (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>No Image</div>
        )}

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChangeUsername}
            />
          </div>

          <div className={css.emailWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { getMe, updateMe } from "@/lib/api/clientApi";
// import css from "./EditProfilePage.module.css";

// export default function EditProfilePage() {
//   const [userName, setUserName] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("/default-avatar.png");
//   const [email, setEmail] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     getMe().then((user) => {
//       setUserName(user.username ?? "");
//       setPhotoUrl(user.photoUrl ?? "/default-avatar.png");
//       setEmail(user.email ?? "");
//     });
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserName(e.target.value);
//   };

//   const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const payload: any = {};
//       if (userName) payload.username = userName;
//       if (photoUrl) payload.photoUrl = photoUrl;

//       await updateMe(payload);
//       router.push("/profile");
//     } catch (error) {
//       console.error("Update profile error:", error);
//     }
//   };

//   const handleCancel = () => router.push("/profile");

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         {photoUrl ? (
//           <Image
//             src={photoUrl}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         ) : (
//           <div className={css.avatarPlaceholder}>No Image</div>
//         )}

//         <form className={css.profileInfo} onSubmit={handleSaveUser}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               className={css.input}
//               value={userName}
//               onChange={handleChange}
//             />
//           </div>

//           <p>Email: {email}</p>

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton}>
//               Save
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// import { getMe, updateMe } from '@/lib/api/clientApi';
// import css from './EditProfilePage.module.css';

// export default function EditProfilePage() {
//   const [userName, setUserName] = useState('');
//   const [photoUrl, setPhotoUrl] = useState('');
//   const [email, setEmail] = useState('');

//   const router = useRouter();

//   useEffect(() => {
//     getMe().then((user) => {
//       setUserName(user.userName ?? '');
//       setPhotoUrl(user.photoUrl ?? '/default-avatar.png'); 
//       setEmail(user.email ?? '');
//     });
//   }, []);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserName(event.target.value);
//   };

//   const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       await updateMe({ userName });
//       router.push('/profile'); 
//     } catch (error) {
//       console.error('Oops, some error:', error);
//     }
//   };

//   const handleCancel = () => {
//     router.push('/profile'); 
//   };

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>

//         <Image
//           src={photoUrl}
//           alt="User Avatar"
//           width={120}
//           height={120}
//           className={css.avatar}
//         />

//         <form className={css.profileInfo} onSubmit={handleSaveUser}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               className={css.input}
//               value={userName}
//               onChange={handleChange}
//             />
//           </div>

//           <p>Email: {email}</p>

//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton}>
//               Save
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
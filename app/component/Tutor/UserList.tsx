"use client";

import { user } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const UserList = () => {
  const [userList, setUserList] = useState<user[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/user/getall");
      const data = await res.json();
      if (res.status === 200) {
        setUserList(data.data);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-8 lg:gap-1 mt-3">
      {userList.map((c) => (
        <div
          key={c.id_user}
          className="h-auto text-center font-bold flex flex-col justify-center items-center rounded border bg-slate-200 px-12 py-3 text-sm text-blue-primary focus:outline-none focus:ring active:text-indigo-500 cursor-pointer"
        >
          {c.photo && (
            <Image
              src={c.photo}
              alt={"photo de profil"}
              width={100}
              height={200}
            />
          )}
          <span>
            {c.prenom} {c.nom}
          </span>
        </div>
      ))}
    </div>
  );
};

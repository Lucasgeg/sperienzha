"use client";

import { useState } from "react";
import { Input } from "../Input/Input";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";

type UserWelcomeProps = {
  email: string;
};
export enum School {
  LIT = "Learn IT",
  LDS = "La Digital School",
  SDM = "Sup de mode",
}

export enum SchoolLevel {
  B1 = "B1",
  B2 = "B2",
  B3 = "B3",
  M1 = "M1",
  M2 = "M2",
}

export enum Gender {
  M = "Homme",
  F = "Femme",
  O = "Autre",
}

export interface WelcomeForm {
  firstname?: string;
  lastname?: string;
  email?: string;
  age?: number;
  gender?: Gender;
  school?: School;
  level?: SchoolLevel;
  description?: string;
  picture?: string;
}

export const WelcomeForm = ({ email }: UserWelcomeProps) => {
  const router = useRouter();
  const [welcomeForm, setWelcomeForm] = useState<WelcomeForm>({
    email: email,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeForm({ ...welcomeForm, [e.target.id]: e.target.value });
  };

  const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setWelcomeForm({ ...welcomeForm, picture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectGenderChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWelcomeForm({
      ...welcomeForm,
      gender: e.target.value as Gender,
    });
  };

  const handleSelectSchoolChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWelcomeForm({
      ...welcomeForm,
      school: e.target.value as School,
    });
  };
  const handleSelectSchoolLvlChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWelcomeForm({
      ...welcomeForm,
      level: e.target.value as SchoolLevel,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("toto");

    if (
      !welcomeForm.firstname ||
      !welcomeForm.lastname ||
      !welcomeForm.email ||
      !welcomeForm.gender ||
      !welcomeForm.age ||
      !welcomeForm.school ||
      !welcomeForm.level ||
      !welcomeForm.description ||
      !welcomeForm.picture
    ) {
      return;
    }
    console.log("tata");
    console.log(welcomeForm.email);

    const res = await fetch(
      "http://localhost:3000/api/firstConection/updatewelcome",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(welcomeForm),
      }
    );
    if (res) {
      console.log("tutu");
      console.log(res);
    }

    if (res.status === 200) {
      const result = await res.json();
      console.log(result);

      router.push("/");
    }
    console.log("titi");
  };
  /*   const handleTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = welcomeForm;
    const res = await fetch("http://localhost:3000/api/toto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log("tata");
    console.log(await res.json());
  }; */
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="p-8 rounded max-w-md">
          <h2 className="text-2xl font-bold mb-4">Bienvenue sur Spérienzha</h2>
          <p>
            Maintenant que tu es inscrit, merci de compléter ces quelques
            informations afin que nous puissons t&apos;aider à trouver ton
            tuteur
          </p>
          <form className="w-96 mx-auto">
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Prénom"
                value={welcomeForm.firstname}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nom
              </label>
              <input
                type="lastname"
                id="lastname"
                name="lastname"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nom"
                value={welcomeForm.lastname}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Genre
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-2 border rounded-md"
                value={welcomeForm.gender}
                onChange={(e) => handleSelectGenderChange(e)}
              >
                <option value="">Veuillez choisir</option>
                {Object.values(Gender).map((gender) => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your age"
                value={welcomeForm.age}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="school"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Ecole
              </label>
              <select
                id="school"
                name="school"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Veuillez choisir</option>
                {Object.values(School).map((School) => (
                  <option value={School} key={School}>
                    {School}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="level"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Niveau
              </label>
              <select
                id="level"
                name="level"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Veuillez choisir</option>
                {Object.values(SchoolLevel).map((SchoolLevel) => (
                  <option value={SchoolLevel} key={SchoolLevel}>
                    {SchoolLevel}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={welcomeForm.description}
                onChange={(e) =>
                  setWelcomeForm({
                    ...welcomeForm,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Décris toi en quelques mots."
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="profilePicture"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Photo
              </label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => handlePicture(e)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </form>
  );
};

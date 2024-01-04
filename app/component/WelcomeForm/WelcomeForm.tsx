"use client";

import { useState } from "react";
import { Input } from "../Input/Input";
import Image from "next/image";

type UserWelcomeProps = {
  email?: string;
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

interface WelcomeForm {
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

interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList;
  };
}

export const WelcomeForm = ({ email }: UserWelcomeProps) => {
  const [welcomeForm, setWelcomeForm] = useState<WelcomeForm>({});
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(welcomeForm);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 place-items-center">
        <Input title="Prénom" id="firstname" className="w-1/2 text-left" />
        <Input title="Nom" id="lastname" className="w-1/2 text-left" />
        <Input
          title="Email"
          id="email"
          value={email || ""}
          disabled={Boolean(email)}
          className="text-left w-1/2"
        />
        <Input title="Age" id="age" className="text-left w-1/2" />
        <div className="w-1/2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-900 text-left"
          >
            Sexe
          </label>

          <select
            name="gender"
            id="gender"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            {Object.values(Gender).map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="school"
            className="block text-sm font-medium text-gray-900 text-left"
          >
            Ecole
          </label>

          <select
            name="school"
            id="school"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            {Object.values(School).map((school) => (
              <option value={school} key={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-900 text-left"
          >
            Niveau
          </label>

          <select
            name="level"
            id="level"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            {Object.values(SchoolLevel).map((SchoolLevel) => (
              <option value={SchoolLevel} key={SchoolLevel}>
                {SchoolLevel}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label htmlFor="description" className="sr-only">
            Description
          </label>

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <textarea
              id="description"
              className="w-full resize-none border-none align-top focus:ring-0 focus:outline-none sm:text-sm"
              rows={4}
              placeholder="Décris toi en quelques mots"
              maxLength={1500}
            ></textarea>

            <div className="flex items-center justify-end gap-2 bg-white p-3">
              <button
                type="button"
                className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <Input
          title="Photo"
          type="file"
          accept="image/*"
          id="picture"
          className="text-left w-1/2"
          onChange={(e) => handlePicture(e)}
        />
        {welcomeForm.picture && (
          <Image
            src={welcomeForm.picture}
            alt="uploaded"
            width={200}
            height={200}
          />
        )}
      </div>
      <button
        type="submit"
        className="inline-block rounded border border-blue-primary bg-blue-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-primary focus:outline-none focus:ring active:text-blue-primary"
      >
        Valider
      </button>
    </form>
  );
};

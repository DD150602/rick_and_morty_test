import type { Character } from "@/types/character";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "../FaboriteButton";

interface CharacterCardProps
  extends Pick<
    Character,
    "id" | "name" | "image" | "status" | "species" | "origin" | "location"
  > {}

export const CharacterCard = (props: CharacterCardProps) => {
  return (
    <Link
      key={props.id}
      href={`/characters/${props.id}`}
      className="rounded-md border border-gray-300 p-4 shadow-sm"
    >
      {/* Favorite button + image */}
      <div className="flex items-start justify-between gap-4">
        <FavoriteButton characterId={props.id} />

        <Image
          loading="eager"
          width={240}
          height={240}
          alt={props.name}
          src={props.image}
          className="size-16 shrink-0 rounded-full object-cover sm:size-18"
        />
      </div>

      {/* Character information */}
      <div className="mt-4">
        <h3 className="text-lg font-medium wrap-break-word text-white/90">
          {props.name}
        </h3>

        <p className="mt-2 text-sm text-white/80">Status: {props.status}</p>

        <p className="mt-2 text-sm text-white/70">Species: {props.species}</p>

        <p className="mt-2 text-sm wrap-break-word text-white/70">
          Origin: {props.origin.name}
        </p>

        <p className="mt-2 text-sm wrap-break-word text-white/70">
          Location: {props.location.name}
        </p>
      </div>
    </Link>
  );
};

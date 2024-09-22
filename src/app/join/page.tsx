import type { Metadata } from 'next';
import JoiningFormClient from "./JoiningFormClient";
import { PagePropsType } from "@/types";

export async function generateMetadata(
  { searchParams }: PagePropsType,
): Promise<Metadata> {

  let registrationPosition = Array.isArray(searchParams.p) ? searchParams.p[0] : searchParams.p;

  switch (registrationPosition) {
    case "cr":
      registrationPosition = "Campus Representative";
      break;
    default:
      registrationPosition = "Member";
      break;
  };

  return {
    title: `Join as ${registrationPosition}`
  }
};

export default async function Page({ searchParams }: PagePropsType) {

  let registrationPosition = Array.isArray(searchParams.p) ? searchParams.p[0] : searchParams.p;

  switch (registrationPosition) {
    case "cr":
      registrationPosition = "Campus Representative";
      break;
    default:
      registrationPosition = "Member";
      break;
  };

  return <JoiningFormClient registrationPosition={registrationPosition} />;
}
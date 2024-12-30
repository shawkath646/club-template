import type { Metadata } from 'next';
import SignupForm from "./SignupForm";
import getClubInfo from '@/constant/getClubInfo';
import { PagePropsType } from "@/types";

export async function generateMetadata({ searchParams: searchParamsPromise }: PagePropsType): Promise<Metadata> {

  const searchParams = await searchParamsPromise;
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

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {

  const searchParams = await searchParamsPromise;
  let registrationPosition = Array.isArray(searchParams.p) ? searchParams.p[0] : searchParams.p;

  switch (registrationPosition) {
    case "cr":
      registrationPosition = "Campus Representative";
      break;
    default:
      registrationPosition = "Member";
      break;
  };

  const clubInfo = await getClubInfo();

  return <SignupForm clubInfo={clubInfo} registrationPosition={registrationPosition} />;
}
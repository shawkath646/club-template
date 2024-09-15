import { PagePropsType } from "@/types";
import JoiningFormClient from "./JoiningFormClient";

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
import { Metadata } from "next";
import AddNotice from "./AddNotice";

export const metadata: Metadata = {
    title: "Notice Board"
};

export default async function Page() {
    return (
        <>
            <AddNotice />

        </>
    );
}
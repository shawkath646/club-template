import { getHistory } from "@/backend/history";
import { PagePropsType } from "@/types";

export default async function Page({ searchParams }: PagePropsType) {

    const history = await getHistory(0);

    return (
        <section>History</section>
    );
}
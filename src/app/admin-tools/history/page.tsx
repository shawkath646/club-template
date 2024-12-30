import { getHistory } from "@/backend/history";
import { PagePropsType } from "@/types";

export default async function Page() {

    const history = await getHistory(0);

    return (
        <section>History</section>
    );
}
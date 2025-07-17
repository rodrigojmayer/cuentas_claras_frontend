import PostDebt from "@/components/PostDebt";
import PostUser from "../../components/PostUser"
import PostPayment from "@/components/PostPayment";
import DebtsList from "../../components/DataList"

export default function TestApi() {
  return (
    <div className="flex bg-gray-700">
        <div className="flex flex-col ">
            < PostUser />
            < PostDebt />
            < PostPayment />
        </div>
        < DebtsList />
    </div>
    );
}

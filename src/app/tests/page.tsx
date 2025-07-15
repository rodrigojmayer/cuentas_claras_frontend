import PostDebt from "@/components/PostDebt";
import PostUser from "../../components/PostUser"
import DebtsList from "../../components/DataList"

export default function TestApi() {
  return (
    <div className="flex bg-gray-700">
        <div className="flex flex-col ">
            < PostUser />
            < PostDebt />
        </div>
        < DebtsList />
    </div>
    );
}

import PostDebt from "@/components/PostDebt";
import PostUser from "../../components/PostUser"
import PostPayment from "@/components/PostPayment";
import PostAlert from "@/components/PostAlert";
import DataList from "../../components/DataList"

export default function TestApi() {
  return (
    <div className="flex justify-center bg-gray-700">
        <div className="flex flex-col ">
            < PostUser />
            < PostDebt />
            < PostPayment />
            < PostAlert />
        </div>
        < DataList />
    </div>
    );
}

import defaultLogo from "../../../public/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
import { EditFilled, CameraFilled } from "@ant-design/icons";
import { useGetCurrentUserQuery } from "../../redux/features/user/userApi";
import DateFormatter from "../../components/DateFormatter/DateFormatter";
const Brand = () => {
  const { data: user } = useGetCurrentUserQuery();
  const brand = user?.data?.brand;
  return (
    <div>
      <div className="w-full bg-gray-100 rounded grid grid-cols-12 py-12 px-4 relative">
        <div className="col-span-3 flex flex-col items-center">
          <div className="">
            <img
              className="w-[240px]  h-[240px] rounded-md  mx-auto p-2 bg-white hover:scale-105 duration-500 cursor-pointer"
              src={
                brand?.brand_logo?.url ? brand?.brand_logo?.url : defaultLogo
              }
              alt=""
            />
          </div>
          <button className="text-center bg-gray-700 text-white py-2 mt-3 w-[40%] mx-auto rounded">
            <CameraFilled />
            <span className="ml-1">Change Logo</span>
          </button>
        </div>
        <div className="h-full col-span-8 space-y-4 capitalize">
          <div className="flex items-center py-6 px-4 bg-white rounded-lg text-lg">
            <p className="text-gray-500 text-sm">Brand Name:</p>
            <p className="ml-4 text-blue-600 font-semibold">
              {brand?.brand_name}
            </p>
          </div>
          <div className="flex items-center py-6 px-4 bg-white rounded-lg text-lg">
            <p className="text-gray-500 text-sm">Selected Plan:</p>
            <p className="ml-4">
              {brand?.selected_plan?.name ? (
                <span className="text-green-600 font-semibold">
                  brand?.selected_plan?.name
                </span>
              ) : (
                <span className="text-orange-700 font-semibold">
                  No Plan Selected
                </span>
              )}
            </p>
          </div>
          <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
            <div className="flex items-center ">
              <p className="text-gray-500 text-sm">Last Payment:</p>
              <p className="ml-4">
                {brand?.subscription_info?.last_payment ? (
                  <DateFormatter
                    dateString={brand?.subscription_info?.last_payment}
                  />
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className="flex items-center ">
              <p className="text-gray-500 text-sm">Subscription status:</p>
              <p className="ml-4">
                {brand?.subscription_info?.subscription_expired ? (
                  <span className="text-orange-700 font-semibold">Expired</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )}
              </p>
            </div>
            <div className="flex items-center ">
              <p className="text-gray-500 text-sm">Will Expire:</p>
              <span className="ml-4">
                {brand?.subscription_info?.expiresAt ? (
                  <DateFormatter
                    dateString={brand?.subscription_info?.expiresAt}
                  />
                ) : (
                  "N/A"
                )}
              </span>
            </div>
          </div>
          <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
            <div className="text-gray-500 text-sm">
              <p>Contact:</p>
            </div>
            <div className="space-y-2 pl-[5rem]">
              <div className="flex items-center">
                <p className="text-gray-500 text-sm">Mobile:</p>
                <p className="ml-4">
                  {brand?.contact?.mobile1 ? brand?.contact?.mobile1 : "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 text-sm">Mobile:</p>
                <p className="ml-4 space-x-2">
                  <span>
                    {brand?.contact?.mobile2 ? brand?.contact?.mobile2 : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
            <div className="text-gray-500 text-sm">
              <p>Address:</p>
            </div>
            <div className="space-y-2 pl-[5rem]">
              <div className="flex items-center">
                <p className="text-gray-500 text-sm">Location:</p>
                <p className="ml-4">
                  {brand?.address?.location ? brand?.address?.location : "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 text-sm">Sub-District:</p>
                <p className="ml-4 space-x-2">
                  <span>
                    {brand?.address?.sub_district
                      ? brand?.address?.sub_district
                      : "N/A"}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 text-sm">District:</p>
                <p className="ml-4 space-x-2">
                  <span>
                    {brand?.address?.district
                      ? brand?.address?.district
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <button
            title="Edit"
            className="absolute top-0 right-6 text-blue-600 text-xl cursor-pointer"
          >
            <EditFilled />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brand;

import { EditFilled } from "@ant-design/icons";
import CustomModal from "../../Modal/Modal";
import { useState } from "react";

const EditBrand = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="Edit"
        className="absolute top-0 right-6 text-blue-600 text-xl cursor-pointer"
      >
        <EditFilled />
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      ></CustomModal>
    </>
  );
};

export default EditBrand;

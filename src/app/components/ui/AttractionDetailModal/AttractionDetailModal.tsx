import { SF_ATTRACTIONS } from "@/mockData";
import Modal from "../../common/Modal/Modal";

interface AttractionDetailModalProps {
  attraction: (typeof SF_ATTRACTIONS)[0];
  onClose: () => void;
}

const AttractionDetailModal = ({
  attraction,
  onClose,
}: AttractionDetailModalProps) => {
  return (
    <Modal
      onClose={onClose}
      className="!min-w-fit [&>.modalContent]:h-fit [&>.modalContent]:p-4 [&>.modalContent]:bg-[rgba(207,195,184,1)]"
    >
      <div className="grid grid-cols-[300px,400px] gap-4">
        <img
          className=" h-[300px] aspect-square rounded-md"
          src={attraction.image}
          alt={attraction.title}
        />
        <div>
          <h2 className="text-2xl text-gray-600">{attraction.title}</h2>
          <p className="text-gray-500 pt-1">{attraction.description}</p>
          <div className="grid grid-cols-[100px,1fr] text-gray-600 pt-1">
            <p className="font-semibold">Rating</p>
            <p>{attraction.rating}</p>
            <p className="font-semibold">Est. Duration</p>
            <p>{attraction.estimated_visit_duration}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AttractionDetailModal;

import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as hotelApi from "../Api-Client/hotel";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { data } = useQuery(
        "fetchMyHotelById",
        () => hotelApi.fetchMyHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    );
    const hotel = data?.data.hotel;

    const { mutate, isLoading } = useMutation(hotelApi.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        console.log("edit", hotelFormData);
        mutate(hotelFormData);
    };

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    );
};

export default EditHotel;

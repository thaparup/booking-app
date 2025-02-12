import { useQuery } from "react-query";
import * as hotelApi from "../api-client/hotel";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../context/AppContext";
import { useSearchContext } from "../context/SearchContext";

;

const Booking = () => {

    const search = useSearchContext();
    const { hotelId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);

            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData } = useQuery(
        "createPaymentIntent",
        () =>
            authApi.createPaymentIntent(
                hotelId as string,
                numberOfNights.toString()
            ),
        {
            enabled: !!hotelId && numberOfNights > 0,
        }
    );

    const { data: hotel } = useQuery(
        "fetchHotelByID",
        () => hotelApi.fetchHotelById(hotelId as string),
        {
            enabled: !!hotelId,
        }
    );

    const { data: currentUser } = useQuery(
        "fetchCurrentUser",
        hotelApi.fetchCurrentUser
    );

    if (!hotel) {
        return <></>;
    }

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />
            {currentUser && paymentIntentData && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: paymentIntentData.clientSecret,
                    }}
                >
                    <BookingForm
                        currentUser={currentUser}
                        paymentIntent={paymentIntentData}
                    />
                </Elements>
            )}
        </div>
    );
};

export default Booking;

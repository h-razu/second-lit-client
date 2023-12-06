import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext/AuthProvider";

const useAccountType = email => {
    const [accountType, setAccountType] = useState("");
    const [isUserLoading, setIsUserLoading] = useState(true);
    const { loading } = useContext(authContext);

    useEffect(() => {
        if (email && !loading) {
            fetch(`https://second-lit-server.vercel.app/users/checkAccountType?email=${email}`,
                {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('secondLit-token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setAccountType(data.userAccountType);
                    setIsUserLoading(false);
                })
        }

    }, [email, loading])

    return [accountType, isUserLoading];
}

export default useAccountType;
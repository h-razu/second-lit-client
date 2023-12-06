import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../../../Hooks/useTitle/useTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const AllSellers = () => {
    useTitle("All Sellers");

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch("https://second-lit-server.vercel.app/users/sellers", {
                headers: {
                    authorization: `bearer ${localStorage.getItem("secondLit-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    const handleDelete = id => {
        fetch(`https://second-lit-server.vercel.app/users/sellers/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("secondLit-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Delete successful");
                    refetch();
                }
            })
    }

    const handleVerifySeller = id => {

        fetch(`https://second-lit-server.vercel.app/users/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem("secondLit-token")}`
            }
        }).then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    toast.success("Seller Verify Successful");
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>All Sellers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, idx) =>
                                <tr className="hover" key={seller._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={seller.profileImg} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{seller.name}</div>
                                                {
                                                    seller?.verified &&
                                                    <span className="badge bg-secondary text-black">Verified Seller</span>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>{seller.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary"
                                            onClick={() => handleDelete(seller._id)}
                                        >Delete Seller
                                        </button>
                                    </td>
                                    <td>
                                        {
                                            !seller?.verified &&
                                            <button className="btn btn-sm"
                                                onClick={() => handleVerifySeller(seller._id)}>
                                                Verify Seller
                                            </button>
                                        }
                                    </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;
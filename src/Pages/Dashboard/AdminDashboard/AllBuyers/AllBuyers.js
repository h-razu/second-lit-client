import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../../../Hooks/useTitle/useTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const AllBuyers = () => {
    useTitle("All Buyers");

    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch("https://second-lit-server.vercel.app/users/buyers", {
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
        fetch(`https://second-lit-server.vercel.app/users/buyers/${id}`, {
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
    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers?.map((buyer, idx) =>
                                <tr className="hover" key={buyer._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={buyer.profileImg} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{buyer.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{buyer.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary"
                                            onClick={() => handleDelete(buyer._id)}
                                        >Delete Buyer
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;
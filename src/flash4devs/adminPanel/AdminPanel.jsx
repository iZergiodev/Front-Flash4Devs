import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { useState } from "react";

// bad_answers: 0;
// email: "admin@admin";
// github: null;
// good_answers: 0;
// hashed_password: "$2b$12$y2qEZWwQ.tUR8lsJOhhukOig96o1CQuoZqDVwH9XaqDI2txo5l/8.";
// id: 1;
// last_name: "admin";
// level: "beginner";
// linkedin: null;
// name: "admin";
// profile_image: null;
// rating_interview_backend_python: 0;
// rating_interview_front_react: 0;
// role: "admin";
// x: null;



export function AdminPanel() {

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("http://127.0.0.1:8000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      console.log(data);
      setData(data);
    };
    getData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) throw new Error("Error deleting user");

      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };




  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleDelete(row.original.id)}
            className="bg-blue-400 text-white px-2 py-1 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 w-screen h-screen flex justify-center items-center">
      <table className="border-collapse border w-full max-w-4xl">
        <thead className="border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-2 border" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border">
          {table.getRowModel().rows.map((row) => (
            <tr className="border" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="p-2 border" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

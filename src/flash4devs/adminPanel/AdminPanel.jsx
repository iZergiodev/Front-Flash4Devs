// AdminPanel.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Modal } from "./Modal";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";

export function AdminPanel() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      startLoading()
      const resp = await fetch("http://127.0.0.1:8000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      stopLoading()
      console.log(data);
      setData(data);
    };
    getData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      startLoading()
      const resp = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      stopLoading()
      if (!resp.ok) throw new Error("Error deleting user");
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setSelectedUser(row.original);
              setIsModalOpen(true);
            }}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
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

  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
    {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-50"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#054A91"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <nav
        onClick={() => navigate("/")}
        className="bg-accent hover:cursor-pointer w-60 mx-auto text-center rounded-2xl p-3 mb-[-80px] mt-10"
      >
        Volver a la aplicación
      </nav>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUpdate={handleUpdate}
        />
      )}

      
      <div className="p-4 w-screen h-screen flex justify-center items-center flex-col">
        <input
          className="bg-gray-300 mb-2 rounded-xl p-2 border"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <table className="border-collapse border w-full max-w-4xl max-h-[700px]">
          <thead className="border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="p-2 border hover:cursor-pointer"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: "⬆️",
                        desc: "⬇️",
                      }[header.column.getIsSorted() ?? null]
                    }
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
        <div className="flex gap-3">
          <button
            onClick={() => table.setPageIndex(0)}
            className="border rounded p-1 mt-2"
          >
            Primera Página
          </button>
          <button
            onClick={() => table.previousPage()}
            className="border rounded p-1 mt-2"
          >
            Anterior
          </button>
          <button
            onClick={() => table.nextPage()}
            className="border rounded p-1 mt-2"
          >
            Siguiente
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="border rounded p-1 mt-2"
          >
            Última página
          </button>
        </div>
      </div>
    </>
  );
}

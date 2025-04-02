import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ModalFlashcards } from "./ModalFlashcards";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";
import { ModalNewFlashcard } from "./ModalNewFlashcard";

export function AdminFlashCards() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      startLoading();
      const resp = await fetch(
        "https://back-flash4devs-production.up.railway.app/card/get-all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await resp.json();
      stopLoading();
      console.log(data);
      setData(data);
    };
    getData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      startLoading();
      const resp = await fetch(
        `https://back-flash4devs-production.up.railway.app/card/by-id/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      stopLoading();
      if (!resp.ok) throw new Error("Error deleting flashcard");
      setData((prevData) =>
        prevData.filter((flashcard) => flashcard.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete flashcard:", error);
    }
  };

  const handleUpdate = (updateFlashcard) => {
    setData((prevData) =>
      prevData.map((flashcard) =>
        flashcard.id === updateFlashcard.id ? updateFlashcard : flashcard
      )
    );
  };

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Question", accessorKey: "question" },
    { header: "Category", accessorKey: "category" },
    { header: "Difficulty", accessorKey: "difficult" },
    { header: "Solution", accessorKey: "solution" },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setSelectedFlashcard(row.original);
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

  const handleNewFlashcard = (newFlashcard) => {
    setData((prevData) => [...prevData, newFlashcard]);
  };

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
      <div className="min-h-screen" style={{ background: "#FAFAFF" }}>
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
        <div className="flex justify-center gap-5 pt-20">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-accent rounded-xl"
          >
            Volver a la aplicación
          </button>
          <button
            onClick={() => navigate("/admin-users")}
            className="p-2 bg-green-400 rounded-xl"
          >
            Panel Users
          </button>
        </div>
        {isModalOpen && (
          <ModalFlashcards
            onClose={() => {
              setIsModalOpen(false);
              setSelectedFlashcard(null);
            }}
            flashcard={selectedFlashcard}
            onUpdate={handleUpdate}
          />
        )}
        {isNewModalOpen && (
          <ModalNewFlashcard
            onClose={() => setIsNewModalOpen(false)}
            onUpdate={handleNewFlashcard}
          />
        )}

        <div className="p-4 w-screen h-full flex justify-center items-center flex-col mt-10">
          <div className="flex flex-row gap-5">
            <input
              className="bg-gray-300 mb-2 rounded-xl p-2 border"
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="bg-green-400 p-4 mb-2 rounded"
            >
              +
            </button>
          </div>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>
    </>
  );
}

import { useEffect } from "react";
import { decodeToken } from "../utils/decodeToken";
import { useState } from "react";


const useExtractInfo = () => {
  const [emailState, setEmail] = useState("");
  const [nameState, setName] = useState("");
  const [lastName, setLastName] = useState("")
  const [avatar, setAvatar] = useState("/avatarejemplo.jpg");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? decodeToken(token) : null;
    const id = decodedToken ? decodedToken.id : null;

    const extraer = async () => {
      if (!id || !token) {
        console.error("Token o ID no válido");
        return;
      }

      try {
        const response = await fetch(
          `https://back-flash4devs-production.up.railway.app/api/user/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Información del usuario:", data);
          setEmail(data.email);
          setName(data.name);
          setLastName(data.last_name);
          setAvatar(data.profile_image);
        } else {
          console.error("Error al obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    extraer();
  }, []);

  return { emailState, nameState, lastName, avatar };
};

export default useExtractInfo;
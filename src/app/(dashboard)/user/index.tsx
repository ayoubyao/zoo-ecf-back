"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community"; // ColDef type
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import UserForm from "./create/page";
import { UserServices } from "@/services/userServices";
import CustomButtonParams from "./ButtonCellRendererParams";
import UserFormEdit from "./edit/page";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";

export interface IIndexProps {}

export default function Index(props: IIndexProps) {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [user, setUser] = useState(() => {
    const myUser: User = {
      id: 0,
      nom: "",
      prenom: "",
      username: "",
      role: "",
      email: "",
      role_id: 0,
    };

    return myUser;
  });
  const [rowData, setRowData] = useState<
    {
      Nom: string;
      email: string;
      Prenom: string;
      Profil: string;
      Actions: { idUser: number};
    }[]
  >([]);

  const [colDefs, setColDefs] = useState<
    ColDef<
      {
        Nom: string;
        email: string;
        Prenom: string;
        Profil: string;
        Actions: { idUser: number};
      },
      any
    >[]
  >([
    { field: "Nom" },
    { field: "Prenom" },
    { field: "email", headerName: "Adresse email" },
    { field: "Profil" },
    { field: "Actions", cellRenderer: CustomButtonParams },
  ]);

  const router = useRouter();

  const editUser = (idUser: number) => {
    UserServices.getUser(idUser).then((user) => {
      if (user && user.nom !== undefined) {
        setUser(user);
        setDisplayPopup(true);
        
      }
    });
  };

  const RefreshUsers = () => {
    UserServices.getUsers().then((users) => {
      if (users) {
        const rows = users.map((user) => {
          return {
            Nom: user.nom,
            Prenom: user.prenom,
            email: user.username,
            Profil: user.role,
            Actions: { idUser: user.id},
          };
        });
        setRowData(rows);
      }
    });
  };
  useEffect(() => {
    UserServices.getUsers().then((users) => {
      if (users) {
        const rows = users.map((user) => {
          return {
            Nom: user.nom,
            Prenom: user.prenom,
            email: user.username,
            Profil: user.role,
            Actions: { idUser: user.id},
          };
        });
        setRowData(rows);
      }
    });
  }, []);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <UserForm />
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}

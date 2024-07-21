"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community"; // ColDef type
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import CustomButtonParams from "./ButtonCellRendererParams";
import { useRouter } from "next/navigation";
import { Habitat } from "@/models/habitat";
import { HabitatService } from "@/services/habitatService";
import HabitatForm from "./create/page";

export interface IIndexProps {}

export default function Index(props: IIndexProps) {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [habitat, setHabitat] = useState(() => {
    const myHabitat: Habitat = {
      habitat_id: 0,
      nom: "",
      description: "",
      image_data: "",
      description_general: "",
      description_animaux: "",
    };

    return myHabitat;
  });
  const [rowData, setRowData] = useState<
    {
      habitat_id: number;
      Nom: string;
      description: string;
      image_data: string;
      description_general: string;
      description_animaux: string;
      Actions: { idUser: number };
    }[]
  >([]);

  const [colDefs, setColDefs] = useState<
    ColDef<
      {
        habitat_id: number;
        Nom: string;
        description: string;
        image_data: string;
        description_general: string;
        description_animaux: string;
        Actions: { idUser: number };
      },
      any
    >[]
  >([
    { field: "Nom" },
    { field: "description" },
    { field: "image_data", headerName: "Image" },
    { field: "description_general" },
    { field: "description_animaux" },
    { field: "Actions", cellRenderer: CustomButtonParams },
  ]);

  const router = useRouter();

  const editUser = (idHabitat: number) => {
    HabitatService.getHabitat(idHabitat).then((habitat) => {
      if (habitat && habitat.nom !== undefined) {
        setHabitat(habitat);
        setDisplayPopup(true);
      }
    });
  };

  const RefreshHabitats = () => {
    HabitatService.getHabitats().then((habitats) => {
      if (habitats) {
        const rows = habitats.map((habitat) => {
          return {
            habitat_id: habitat.habitat_id,
            Nom: habitat.nom,
            description: habitat.description,
            image_data: habitat.image_data,
            description_general: habitat.description_general,
            description_animaux: habitat.description_animaux,
            Actions: { idUser: habitat.habitat_id },

          };
        });
        setRowData(rows);
      }
    });
  };
  useEffect(() => {
    HabitatService.getHabitats().then((habitats) => {
      if (habitats) {
        const rows = habitats.map((habitat) => {
          return {
            habitat_id: habitat.habitat_id,
            Nom: habitat.nom,
            description: habitat.description,
            image_data: habitat.image_data,
            description_general: habitat.description_general,
            description_animaux: habitat.description_animaux,
            Actions: { idUser: habitat.habitat_id },

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
      <HabitatForm refreshData={RefreshHabitats} />
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}

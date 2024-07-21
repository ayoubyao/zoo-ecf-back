"use client" 
import { User } from "@/models/user";
import { UserServices } from "@/services/userServices";
import type { NextPage } from "next";

import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Modal from "react-modal";

export interface IHabitatFormProps {

}
// Réglage des styles de la modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};



const HabitatForm: NextPage<IHabitatFormProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState(0);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState(() => {
    const roles = [];
    roles.push({ id: "2", name: "Veterinaire" });
    roles.push({ id: "3", name: "Employé" });

    return roles;
  });

  useEffect(() => { 
    Modal.setAppElement("#root");
  }, []);
  // Liaison de l'élément modal avec votre application


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Assuming 'username' can be derived from 'email' or another field, adjust as necessary
    const username = email; // Example adjustment, replace with actual logic if needed
    const id = ""; // Declare and initialize the 'id' variable
    const userData = {
      id: Number(id), // Convert id to number
      nom,
      prenom,
      email,
      password,
      role,
      username, // Added username property
      role_id
    };
    const user: User = userData;

    try {
      const response = await UserServices.createUser(user);
      console.log("User created successfully:", response);

      closeModal();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div id="root">
      <Button onClick={openModal}>Créer un utilisateur</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Créer un utilisateur"
      >
        <h2>Créer un utilisateur</h2>
        <Button onClick={closeModal}>Fermer</Button>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="nom">Nom:</FormLabel>
            <FormControl
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="prenom">Prénom:</FormLabel>
            <FormControl
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormControl
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Mot de passe:</FormLabel>
            <FormControl
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="role">Rôle:</label>
            <select
              id="role_id"
              name="role_id"
              value={role_id}
              onChange={(e) => setRole_id(+e.target.value)}
              required
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <Button type="submit">Créer l&apos;utilisateur</Button>
        </form>
      </Modal>
    </div>
  );
};

export default HabitatForm;

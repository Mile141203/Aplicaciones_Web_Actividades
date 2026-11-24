import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";

export interface Paciente {
  nombre: string;
  cedula: string;
  telefono: string;
  sangre: string;
}

export const usePacientes = () => {
  const estado = useStore({
    nombre: "",
    cedula: "",
    telefono: "",
    sangre: "",
    error: "",
    editando: -1,
    pacientes: [] as Paciente[],
  });

  // Lee los datos guardados al abrir la página
  useVisibleTask$(() => {
    const guardados = localStorage.getItem("pacientes");
    if (guardados) {
      estado.pacientes = JSON.parse(guardados);
    }
  });

  const limpiar = $(() => {
    estado.nombre = "";
    estado.cedula = "";
    estado.telefono = "";
    estado.sangre = "";
    estado.error = "";
    estado.editando = -1;
  });

  const registrar = $(() => {
    if (
      !estado.nombre.trim() ||
      !estado.cedula.trim() ||
      !estado.telefono.trim() ||
      !estado.sangre
    ) {
      estado.error = "Todos los campos son obligatorios.";
      return;
    }

    if (estado.cedula.length !== 10 || estado.telefono.length !== 10) {
      estado.error = "La cédula y el teléfono deben tener 10 dígitos.";
      return;
    }

    const paciente: Paciente = {
      nombre: estado.nombre.trim(),
      cedula: estado.cedula,
      telefono: estado.telefono,
      sangre: estado.sangre,
    };

    if (estado.editando >= 0) {
      estado.pacientes[estado.editando] = paciente;
    } else {
      estado.pacientes.push(paciente);
    }

    localStorage.setItem("pacientes", JSON.stringify(estado.pacientes));
    limpiar();
  });

  const editar = $((i: number) => {
    const p = estado.pacientes[i];
    estado.nombre = p.nombre;
    estado.cedula = p.cedula;
    estado.telefono = p.telefono;
    estado.sangre = p.sangre;
    estado.editando = i;
    estado.error = "";
  });

  const eliminar = $((i: number) => {
    estado.pacientes.splice(i, 1);
    localStorage.setItem("pacientes", JSON.stringify(estado.pacientes));
    if (estado.editando === i) {
      limpiar();
    }
  });

  return { estado, registrar, editar, eliminar, limpiar };
};
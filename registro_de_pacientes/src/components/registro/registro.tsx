import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./registro.css?inline";
import { usePacientes } from "./logica";

export const Registro = component$(() => {
  useStyles$(styles);
  const { estado, registrar, editar, eliminar, limpiar } = usePacientes();
  const tiposSangre = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  return (
    <div class="contenedor">
      <h1>Registro de Pacientes</h1>

      <div class="formulario">
        <input
          type="text"
          placeholder="Nombre completo"
          value={estado.nombre}
          onInput$={(_, el) => (estado.nombre = el.value)}
        />

        <input
          type="text"
          placeholder="Cédula (10 dígitos)"
          maxLength={10}
          value={estado.cedula}
          onInput$={(_, el) =>
            (estado.cedula = el.value.replace(/\D/g, "").slice(0, 10))
          }
        />

        <input
          type="text"
          placeholder="Teléfono (10 dígitos)"
          maxLength={10}
          value={estado.telefono}
          onInput$={(_, el) =>
            (estado.telefono = el.value.replace(/\D/g, "").slice(0, 10))
          }
        />

        <select
          value={estado.sangre}
          onChange$={(_, el) => (estado.sangre = el.value)}
        >
          <option value="">Seleccione tipo de sangre</option>
          {tiposSangre.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {estado.error && <p class="error">{estado.error}</p>}

        <div class="botones">
          <button onClick$={registrar}>
            {estado.editando >= 0 ? "Actualizar" : "Registrar"}
          </button>

          {estado.editando >= 0 && (
            <button class="btn-cancelar" onClick$={limpiar}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div class="lista">
        {estado.pacientes.map((p, i) => (
          <div key={i} class="fila">
            <div>
              <strong>{p.nombre}</strong> — CI: {p.cedula} | Tel: {p.telefono} |
              Sangre: <strong>{p.sangre}</strong>
            </div>
            <div class="acciones">
              <button class="btn-editar" onClick$={() => editar(i)}>
                Editar
              </button>
              <button class="btn-eliminar" onClick$={() => eliminar(i)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
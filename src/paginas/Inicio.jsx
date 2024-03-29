import { Fragment } from "react";

const Inicio = () => {
  return (
    <Fragment>
      <h2>Inicio</h2>
      <p>
        Supabase es una plataforma <strong>BaaS</strong> (
        <em>Backend as a Service</em>) alojada en la nube que{" "}
        <strong>no necesita instalaciones para poder usarla</strong>, sólo
        requiere activar una cuenta para comenzar a desarrollar un proyecto.
        Ofrece todos los servicios y herramientas de <em>backend</em> necesarias
        para crear una aplicación escalable y segura: gestión de base de datos,
        autenticación, almacenamiento de archivos, generación automática de API
        y actualizaciones en tiempo real.
      </p>
      <p>
        Este proyecto está <strong>dividido en ramas</strong> (<em>branches</em>
        ) de Git, por lo que será recomendable que se carguen las ramas a media
        que se avance en el tema. Si se accede a la versión final del código se
        corre el riesgo de perderse entre tanta novedad. Por eso, se recomienda
        encarecidamente que se utilicen las ramas adecuadas en cada momento de
        la unidad.
      </p>
      <p className="important">
        Necesitas <strong>iniciar sesión</strong> para poder interactuar con la aplicación y
        realizar funciones como ver los productos y crear tus propias listas. Si no tienes cuenta,
        puedes <strong>registrarte</strong> en la parte superior derecha de la página.
      </p>
      <p>
        Para acceder a las diferentes ramas, tan sólo será necesario cargarlas
        con los siguientes comandos en el terminal:
      </p>
      <ol start="0">
        <li>git switch master (estado inicial)</li>
        <li>git switch consulta</li>
        <li>git switch creacion</li>
        <li>git switch actualizacion</li>
        <li>git switch borrado</li>
        <li>git switch listas</li>
        <li>git switch usuarios</li>
      </ol>
    </Fragment>
  );
};

export default Inicio;

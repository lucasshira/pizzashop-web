// pagina de erro

import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro inesperado ocorreu na aplicação, abaixo você encontra mais
        detalhes:
      </p>
      <pre>
        {error.name || JSON.stringify(error) || "Erro não identificado"}
      </pre>

      <p className="">
        Voltar para o{" "}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}

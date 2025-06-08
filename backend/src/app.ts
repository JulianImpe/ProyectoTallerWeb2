import { envs } from "./config/envs";
import { AppRoutes } from "./routes/routes.routes";
import { Server } from "./server/server";

(async () => {
  main();
})();


function main(){
    const server = new Server(
        {
            port: envs.PORT,
            routes: AppRoutes.routes
        }
    )
    server.start();
    console.log("Servidor iniciado");
}
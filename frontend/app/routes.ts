import { type RouteConfig, layout } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
    layout('./components/layout/layout.tsx', ...[await flatRoutes()])
] satisfies RouteConfig;

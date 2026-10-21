declare module "weatherWidget/WeatherWidget" {
  import type { ComponentType } from "react";
  import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";

  const WeatherWidget: ComponentType<DashboardWidgetProps>;

  export default WeatherWidget;
}

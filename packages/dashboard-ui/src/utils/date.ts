import { addDays, format } from "date-fns";
import type { DashboardDate } from "@whitebeardeveloper/contracts";

export function getDashboardDate(offsetDays = 0): DashboardDate {
  return format(addDays(new Date(), offsetDays), "yyyy-MM-dd");
}

import type { DashboardDate } from "@whitebeardeveloper/contracts";
import { CalendarInput } from "./../CalendarInput/CalendarInput";
import { QuickDateSelect } from "./../QuickDateSelect/QuickDateSelect";
import styles from "./DateFilter.module.scss";

export interface DateFilterProps {
  value: DashboardDate;
  onChange: (value: DashboardDate) => void;
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className={styles.filter} role="group" aria-label="Фильтр по дате">
      <CalendarInput value={value} onChange={onChange} />
      <QuickDateSelect value={value} onChange={onChange} />
    </div>
  );
}

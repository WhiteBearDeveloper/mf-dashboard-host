import { Label, Select } from "radix-ui";
import type { DashboardDate } from "@whitebeardeveloper/contracts";
import { getDashboardDate } from "../../utils/date";
import styles from "./QuickDateSelect.module.scss";

export interface QuickDateSelectProps {
  value: DashboardDate;
  onChange: (value: DashboardDate) => void;
}

export function QuickDateSelect({ value, onChange }: QuickDateSelectProps) {
  const options = [
    { label: "Сегодня", date: getDashboardDate() },
    { label: "Вчера", date: getDashboardDate(-1) },
    { label: "Завтра", date: getDashboardDate(1) },
  ];

  const selectedValue = options.find(option => option.date === value)?.date;

  return (
    <Label.Root className={styles.field}>
      <span className={styles.label}>Быстрый выбор</span>

      <Select.Root
        value={selectedValue ?? ""}
        onValueChange={nextValue => {
          const selectedOption = options.find(
            option => option.date === nextValue,
          );

          if (selectedOption) {
            onChange(selectedOption.date);
          }
        }}
      >
        <Select.Trigger className={styles.select} type="button">
          <Select.Value placeholder="Выберите день" />

          <Select.Icon className={styles.icon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m4.5 6 3.5 3.5L11.5 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            sideOffset={6}
          >
            <Select.Viewport className={styles.viewport}>
              {options.map(option => (
                <Select.Item
                  key={option.date}
                  className={styles.item}
                  value={option.date}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>

                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="m3.5 8 3 3 6-6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Label.Root>
  );
}

import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Calendar from "react-calendar";
import { Popover } from "radix-ui";
import { useState } from "react";
import type { DashboardDate } from "@whitebeardeveloper/contracts";
import styles from "./CalendarInput.module.scss";

export interface CalendarInputProps {
  value: DashboardDate;
  onChange: (value: DashboardDate) => void;
}

export function CalendarInput({ value, onChange }: CalendarInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = parseISO(value);
  const formattedDate = format(selectedDate, "d MMMM yyyy", { locale: ru });

  return (
    <div className={styles.field}>
      <span className={styles.label}>Дата</span>

      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            className={styles.trigger}
            type="button"
            aria-label={`Открыть календарь. Выбрана дата: ${formattedDate}`}
          >
            <span>{formattedDate}</span>

            <svg
              className={styles.icon}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2.5"
                y="4"
                width="13"
                height="11.5"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5.5 2.5v3M12.5 2.5v3M2.5 7h13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={styles.popover}
            align="start"
            sideOffset={8}
          >
            <Popover.Title className={styles.visuallyHidden}>
              Выбор даты
            </Popover.Title>

            <Calendar
              className={styles.calendar}
              tileClassName={styles.dayTile}
              value={selectedDate}
              locale="ru-RU"
              calendarType="iso8601"
              minDetail="month"
              maxDetail="month"
              showNeighboringMonth={false}
              prevAriaLabel="Предыдущий месяц"
              nextAriaLabel="Следующий месяц"
              onChange={nextValue => {
                if (!(nextValue instanceof Date)) {
                  return;
                }

                onChange(format(nextValue, "yyyy-MM-dd"));
                setIsOpen(false);
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

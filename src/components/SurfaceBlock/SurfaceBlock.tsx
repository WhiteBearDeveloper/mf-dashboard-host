import type { PropsWithChildren } from "react";
import styles from "./SurfaceBlock.module.scss";

type SurfaceBlockProps = PropsWithChildren;

function SurfaceBlock({ children }: SurfaceBlockProps) {
  return <div className={styles.surfaceBlock}>{children}</div>;
}

export default SurfaceBlock;

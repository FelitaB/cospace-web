"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./DashboardWorkspace.module.css";

interface DashboardWorkspaceProps {
  children: ReactNode;
}

export default function DashboardWorkspace({ children }: DashboardWorkspaceProps) {
  return (
    <div className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Dashboard sidebar">
        <p className={styles.sidebarLabel}>Workspace</p>
        <nav className={styles.sidebarNav} aria-label="Dashboard sections">
          <Link className={styles.navLink} href="/" aria-current="page">
            Overview
          </Link>
          <Link className={styles.navLink} href="#bookings">
            Bookings
          </Link>
        </nav>
        <p className={styles.sidebarFooter}>CoSpace desk reservations</p>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.contentInner}>{children}</div>
      </main>
    </div>
  );
}
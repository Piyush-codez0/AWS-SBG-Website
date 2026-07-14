import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoOne() {
  return (
    <div className="app-container">
      <div className="content-overlay">
        <h1>Demo</h1>
        <p>Work in progress.</p>
      </div>
    </div>
  );
}

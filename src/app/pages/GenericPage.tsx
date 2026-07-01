import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";

interface GenericPageProps {
  title: string;
}

export function GenericPage({ title }: GenericPageProps) {
  const isMobile = useIsMobile();

  return (
    <PageShell title={title}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            color: "#1B1B1B",
            margin: 0,
          }}
        >
          {title} page.
        </p>
      </div>
    </PageShell>
  );
}
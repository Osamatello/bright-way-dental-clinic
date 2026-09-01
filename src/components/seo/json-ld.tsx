type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown> | null> | null | undefined;
};

/**
 * Server component that safely renders JSON-LD structured data into the HTML.
 * Omits rendering if the data is null or empty.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  // Filter out any null entries if an array is passed
  const cleanData = Array.isArray(data) ? data.filter(Boolean) : data;
  if (Array.isArray(cleanData) && cleanData.length === 0) return null;

  const jsonString = JSON.stringify(cleanData).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

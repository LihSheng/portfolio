/**
 * Serialize data for a `<script type="application/ld+json">` block.
 *
 * JSON.stringify does not escape `<`, so a value containing `</script>` would
 * end the script element early and let the rest run as HTML. Escaping `<` as
 * `<` keeps the JSON identical for parsers and closes that hole.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

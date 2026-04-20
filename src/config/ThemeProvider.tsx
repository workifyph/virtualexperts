import { theme } from "./site.config";

/**
 * Injects theme CSS variables into the document.
 * Place in <head> via layout.tsx for SSR support.
 */
export function ThemeStyles() {
  const { colors, typography } = theme;

  const css = `:root {
  --bg: ${colors.bg};
  --paper: ${colors.paper};
  --paper-strong: ${colors.paperStrong};
  --ink: ${colors.ink};
  --ink-soft: ${colors.inkSoft};
  --muted: ${colors.muted};
  --line: ${colors.line};
  --gold: ${colors.accent};
  --gold-deep: ${colors.accentDeep};
  --gold-soft: ${colors.accentSoft};
  --sand: ${colors.sand};
  --tan: ${colors.tan};
  --charcoal: ${colors.charcoal};
  --charcoal-soft: ${colors.charcoalSoft};
  --display: ${typography.display};
  --sans: ${typography.sans};
}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

# Code Review Notes — Products & Order Flow

Review of the submitted solution against `PROBLEM.md`. Points below are grouped by area, with the concrete symptom, root cause in the code, and a suggested fix.

## 1. Product card content is cramped / hard to read

**Symptom:** Title, description, and price don't display cleanly on the card.

**Root cause:** `src/features/products/components/ProductCard.tsx`
- Title is clipped to a single line (`line-clamp-1`, line 34) and description to two lines with a fixed `min-h-[2.5rem]` (line 35) — long titles get cut off with no way to see the full text (no `title` attribute / tooltip).
- The discounted price is shown large while the original price is a small strikethrough (lines 48–52), which can read as unclear when there's no discount vs. when there is one.

**Suggested fix:** Add a `title={product.title}` attribute (or a tooltip) so truncated text is still accessible on hover, and give the price block a consistent height regardless of whether a discount exists, so cards don't jump in size across the grid.

## 2. Product grid container doesn't fill the page

**Symptom:** The grid area leaves empty space and doesn't consistently cover the available viewport.

**Root cause:** `src/features/products/components/ProductGrid.tsx:37` hardcodes the scroll container height as `h-[calc(100vh-22rem)]`. That `22rem` is a guess at the combined height of the header, pagination bar, and cart bar — it doesn't account for their actual rendered height, so on different screen sizes / content states the grid either falls short of the page or overflows.

**Suggested fix:** Measure the surrounding chrome with a layout `ref` (or `ResizeObserver`) and size the scroll container to the *actual* remaining space, rather than a fixed rem offset. Alternatively, restructure with flexbox (`flex-1 min-h-0`) so the grid naturally fills whatever space is left.

## 3. Grid spacing is inconsistent between loading and loaded states

**Symptom:** Spacing/columns shift when products finish loading.

**Root cause:** There are two independent implementations of the responsive grid:
- The skeleton loader in `ProductsPage.tsx:31` uses Tailwind's own responsive classes (`sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- The real grid in `ProductGrid.tsx` computes columns in JS via `useResponsiveColumns.ts` (breakpoints `640/1024/1280`) and manually chunks products into rows for virtualization.

Because these are two separate sources of truth for "how many columns right now," they can disagree at the exact breakpoint edges (CSS reflow vs. JS resize-event timing), producing a visible spacing/column jump when the skeleton is replaced by real data.

**Suggested fix:** Derive both from the same breakpoint config, or drop the CSS-based skeleton grid in favor of rendering the same virtualized/column logic for the loading state.

## 4. Order summary dialog has a visibility issue on open

**Symptom:** The dialog isn't fully visible when "Place order" is clicked.

**Root cause:** `PlaceOrderBar.tsx` renders a `sticky bottom-0 z-40` bar (line 15), and `OrderSummaryDialog.tsx:62` opens a `sm:max-w-lg` dialog capped at `max-h-[90vh]` with no explicit `z-index` override. On short/mobile viewports (especially with mobile browser chrome shrinking real `100vh`), the dialog's overlay and the sticky bar's stacking context can conflict, and long content inside the dialog can push the header/footer out of view since only the outer container scrolls.

**Suggested fix:** Make the dialog's internal content (line items + form) the scrollable region instead of the whole `DialogContent`, keep header/footer pinned, and use `dvh` instead of `vh` for the max-height so mobile browser chrome doesn't clip it.

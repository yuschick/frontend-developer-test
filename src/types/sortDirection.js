export const SortDirection = Object.freeze({ asc: "asc", desc: "desc" });
export const InvertSortDirection = Object.freeze({
  [SortDirection.asc]: SortDirection.desc,
  [SortDirection.desc]: SortDirection.asc,
});

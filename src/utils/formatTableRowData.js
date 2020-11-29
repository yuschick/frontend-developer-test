import format from "date-fns/format";

export const formatTableRowData = (data) =>
  data.length
    ? data.map((d) => ({
        date: {
          label: format(d.timestamp, "yyyy-MM-d"),
          value: d.timestamp,
        },
        id: {
          label: d.id,
          value: d.id,
        },
        old: {
          label: d.diff[0].oldValue,
          value: d.diff[0].oldValue,
        },
        new: {
          label: d.diff[0].newValue,
          value: d.diff[0].newValue,
        },
      }))
    : [];

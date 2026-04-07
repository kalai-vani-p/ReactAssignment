export const calculatePoints = (amount) => {
  const value = Number(amount);

  if (!Number.isFinite(value) || value <= 50) return 0;

  if (value > 100) return Math.floor((value - 100) * 2 + 50);

  return Math.floor(value - 50);
};

const getMonthYear = (dateValue) => {
  const date = new Date(dateValue);
  if (isNaN(date)) return null;

  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: date.getFullYear(),
  };
};

export const groupByMonths = (data = []) => {
  const map = {};

  data.forEach((item) => {
    const info = getMonthYear(item.date);
    if (!info) return;

    const key = `${item.customerId}-${info.year}-${info.month}`;

    if (!map[key]) {
      map[key] = {
        customerId: item.customerId,
        customerName: item.customerName,
        month: info.month,
        year: info.year,
        points: 0,
      };
    }

    map[key].points += item.points || 0;
  });

  return Object.values(map);
};

export const groupByTotal = (data = []) => {
  const map = {};

  data.forEach((item) => {
    if (!map[item.customerId]) {
      map[item.customerId] = {
        customerId: item.customerId,
        customerName: item.customerName,
        points: 0,
      };
    }

    map[item.customerId].points += item.points || 0;
  });

  return Object.values(map);
};
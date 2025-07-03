export const medals = [
  "🥇", // Or
  "🥈", // Argent
  "🥉", // Bronze
];

export const getTrophyColor = (index: number) => {
  switch (index) {
    case 0:
      return "#FFD700"; // Or
    case 1:
      return "#C0C0C0"; // Argent
    case 2:
      return "#CD7F32"; // Bronze
    default:
      return "#757575";
  }
};

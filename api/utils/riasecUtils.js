const calculateRiasecScores = (answers) => {
  if (answers.length !== 48) throw new Error("Invalid answer length");

  const scores = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  };

  // Mapping soal ke kategori
  const mapping = {
    realistic: [0, 1, 2, 3, 4, 5, 6, 7],
    investigative: [8, 9, 10, 11, 12, 13, 14, 15],
    artistic: [16, 17, 18, 19, 20, 21, 22, 23],
    social: [24, 25, 26, 27, 28, 29, 30, 31],
    enterprising: [32, 33, 34, 35, 36, 37, 38, 39],
    conventional: [40, 41, 42, 43, 44, 45, 46, 47],
  };

  // Hitung skor untuk masing-masing kategori
  for (const [key, indices] of Object.entries(mapping)) {
    scores[key] =
      indices.reduce((sum, idx) => sum + answers[idx], 0) / indices.length;
  }

  return scores;
};

module.exports = { calculateRiasecScores };

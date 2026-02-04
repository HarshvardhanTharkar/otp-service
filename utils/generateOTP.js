// utils/generateOTP.js
module.exports = (size, type) => {
  const numeric = '0123456789';
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let chars = numeric;

  if (type === 'alphanumeric') chars += alpha;
  if (type === 'alphabet') chars = alpha;

  return Array.from({ length: size })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};

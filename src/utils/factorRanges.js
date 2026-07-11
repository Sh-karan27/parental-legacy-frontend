export const FACTOR_RANGES = {
  "Genetic Inheritance": { min: 9.333, max: 10.777 },
  "Constitutional Vitality": { min: 8.111, max: 9.111 },
  "Mental Patterns": { min: 6.111, max: 7.111 },
  "Intellectual Capacity": { min: 6.333, max: 6.999 },
  "Emotional Foundation": { min: 7.111, max: 7.999 },
  "Spiritual Lineage": { min: 5.011, max: 6.011 },
  "Soul Connections": { min: 5.111, max: 6.222 },
};

export function getFactorRange(name) {
  return FACTOR_RANGES[name] || null;
}

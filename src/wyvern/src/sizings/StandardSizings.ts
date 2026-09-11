const StandardSizings = {
  Pile: {
    Radius: {
      xsmall: -2,
      small: 0,
      medium: 2,
      large: 4,
      xlarge: 10,
    },
    Offset: {
      xsmall: 6,
      small: 4,
      medium: 2,
      large: 0,
      xlarge: -4,
    }
    // follows [Size] * [Scale Factor], these values are the same, positive versions of their CSS values
  },
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 64,
};
export default StandardSizings;

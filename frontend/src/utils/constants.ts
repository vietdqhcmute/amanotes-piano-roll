const colorPalette = ['#ffffff', '#2E1A65', '#C3C0CC', '#E92384', '#9307BD', '#A81DB6'];

export const colors = {
  colorPrimary: colorPalette[1], // #2E1A65 - Dark Blue as primary
  colorSuccess: colorPalette[4], // #9307BD - Darker purple for success
  colorWarning: '#faad14',
  colorError: colorPalette[3], // #E92384 - Pink for error/danger
  colorInfo: colorPalette[1], // #2E1A65 - Dark Blue for info
  colorTextBase: '#1f1f1f',
  colorBgBase: colorPalette[0], // #ffffff - White background
  borderRadius: 8,
  colorBorder: colorPalette[2], // #C3C0CC - Light gray for borders
  colorHighlight: colorPalette[5], // #A81DB6 - Light purple for highlights
};

export const theme = {
  token: colors,
  components: {
    Button: {
      colorPrimary: colors.colorHighlight,
      algorithm: true,
    },
    Layout: {
      colorBgHeader: colorPalette[0],
      colorBgBody: '#fafafa',
    },
    List: {
      colorBgContainer: colorPalette[0],
    },
  },
};

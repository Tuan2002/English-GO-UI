import { ConfigProvider, Modal, theme } from "antd";

const CustomTheme = ({ children }: { children: JSX.Element }): JSX.Element => {
  const customeTheme = {
    token: {
      // Seed Token
      colorPrimary: "#00b96b",
      borderRadius: 2,

      // Alias Token
      colorBgContainer: "#f6ffed",

      Table: {
        colorPrimary: "#00b96b",
        colorBgContainer: "#f4f4f4",
        algorithm: true,
      },

      Input: {
        colorPrimary: "#00b96b",
        colorBgContainer: "#f4f4f4",
        algorithm: true,
      },

      Select: {
        colorPrimary: "#00b96b",
        colorBgContainer: "#f4f4f4",
        algorithm: true,
      },
    },
    // algorithm: theme.darkAlgorithm,
  };
  return <ConfigProvider theme={customeTheme}>{children}</ConfigProvider>;
};

export default CustomTheme;

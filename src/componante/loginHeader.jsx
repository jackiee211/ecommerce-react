import { Typography } from "antd";

const { Title, Text } = Typography;

const LoginHeader = () => {
  return (
    <div style={{ textAlign: "start", padding: "20px" }}>
      <Title
        level={1}
        style={{
          background: "linear-gradient(90deg, #007bff, #6610f2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "4rem",
          fontWeight: "bold",
        }}
      >
        Salla
      </Title>
      <Text
        style={{
          color: "rgba(104, 200, 171, 0.92)",
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        The Right Place to Find All You Wish
      </Text>
    </div>
  );
};

export default LoginHeader;

import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
  isAnimated?: boolean;
}

export function Button({
  title,
  onClick,
  isDisabled = false,
  isAnimated = false,
}: ButtonProps) {
  return (
    <Container
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      animate={isAnimated ? { scale: [1, 1.08] } : {}}
      transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.5 }}
    >
      {title}
    </Container>
  );
}

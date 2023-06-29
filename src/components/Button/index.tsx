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
  isDisabled,
  isAnimated = false,
}: ButtonProps) {
  return (
    <Container type="button" onClick={onClick} disabled={isDisabled}>
      {title}
    </Container>
  );
}

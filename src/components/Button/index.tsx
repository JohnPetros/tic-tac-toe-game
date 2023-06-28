import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export function Button({ title, onClick, isDisabled }: ButtonProps) {
  return (
    <Container type="button" onClick={onClick} disabled={isDisabled}>
      {title}
    </Container>
  );
}
